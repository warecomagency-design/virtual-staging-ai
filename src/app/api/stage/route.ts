import { GoogleGenerativeAI } from "@google/generative-ai";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const STYLE_PROMPTS: Record<string, string> = {
  modern:
    "modern contemporary furniture with clean lines, neutral tones (white, gray, warm beige), statement lighting, geometric rugs, abstract wall art, live plants",
  minimalist:
    "minimalist furniture only the essentials, white and cream palette, open negative space, hidden storage, simple geometric forms, no clutter whatsoever",
  classic:
    "classic traditional furniture with rich upholstery, dark walnut wood finishes, ornate details, persian-style rugs, heavy curtains, antique accessories, warm golden lighting",
  scandinavian:
    "Scandinavian hygge style, light birch wood furniture, white walls, cozy wool throws and cushions, simple clean forms, candles, functional yet warm design",
};

const ROOM_PROMPTS: Record<string, string> = {
  living:
    "living room with sofa, coffee table, TV unit, armchairs, floor lamp, side tables, wall art, decorative cushions and plants",
  bedroom:
    "bedroom with a bed with quality bedding, nightstands, dresser, wardrobe, bedside lamps, soft rugs, curtains",
  dining:
    "dining room with dining table, dining chairs, a pendant light above the table, sideboard, vase with flowers, table setting",
  office:
    "home office with desk, ergonomic chair, bookshelf, desk lamp, computer setup, organizational accessories, motivating wall art",
};

export async function POST(request: NextRequest) {
  try {
    const { image, style, roomType, customPrompt } = await request.json();

    if (!image) {
      return Response.json({ error: "Görsel gerekli" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "API anahtarı eksik" }, { status: 500 });
    }

    // Get authenticated user
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookiesToSet) => {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {}
          },
        },
      }
    );
    const { data: { user } } = await supabase.auth.getUser();

    // Check credits (5 per staging)
    if (user) {
      const { data: creditsRow } = await supabase
        .from("user_credits")
        .select("balance")
        .eq("user_id", user.id)
        .maybeSingle();
      const balance = creditsRow?.balance ?? 0;
      if (balance < 5) {
        return Response.json(
          { error: "Yetersiz kredi. Sahneleme için 5 kredi gerekiyor. Kredi satın almak için ana sayfaya gidin." },
          { status: 402 }
        );
      }
    }

    // Generate image
    const base64Data = image.split(",")[1];
    const mimeType = image.split(";")[0].split(":")[1] as string;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image" });

    const styleDesc = STYLE_PROMPTS[style] ?? STYLE_PROMPTS.modern;
    const roomDesc = ROOM_PROMPTS[roomType ?? "living"] ?? ROOM_PROMPTS.living;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType, data: base64Data } },
            {
              text: `You are a professional interior designer and architectural visualizer. Transform this empty room photo into a stunning, fully furnished and decorated space.

Room type: ${roomDesc}
Decoration style: ${styleDesc}

CRITICAL RULES:
- Keep the room's exact architecture: walls, ceiling, windows, doors, floor material and color MUST stay identical
- Only ADD furniture, rugs, curtains, plants, artwork, lighting fixtures and decorations
- Do NOT change wall colors, floor type, window placement, ceiling height or room structure
- Furniture must be proportional to the room and placed naturally
- Lighting must look natural and photorealistic — use the existing window light direction
- Final result must look like a professional real estate photograph shot with a wide-angle lens
- Ultra-realistic, magazine-quality, 8K photorealistic rendering
${customPrompt ? `\nADDITIONAL INSTRUCTIONS FROM THE USER (high priority, follow these carefully):\n${customPrompt}` : ""}`,
            },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ["IMAGE", "TEXT"],
      } as never,
    });

    const parts = result.response.candidates?.[0]?.content?.parts;
    const imagePart = parts?.find((p) => "inlineData" in p && p.inlineData);

    if (!imagePart || !("inlineData" in imagePart) || !imagePart.inlineData) {
      const textPart = parts?.find((p) => "text" in p);
      const msg = textPart && "text" in textPart ? (textPart as { text: string }).text : "Görsel üretilemedi";
      return Response.json({ error: msg }, { status: 500 });
    }

    const outputBase64 = imagePart.inlineData.data;
    const outputMime = imagePart.inlineData.mimeType;
    const outputImage = `data:${outputMime};base64,${outputBase64}`;

    // Save to Supabase if user is logged in
    if (user) {
      try {
        const timestamp = Date.now();
        const uid = user.id;

        // Convert base64 to Buffer for upload
        const originalBuffer = Buffer.from(base64Data, "base64");
        const stagedBuffer = Buffer.from(outputBase64, "base64");

        const originalPath = `${uid}/${timestamp}_original.jpg`;
        const stagedPath = `${uid}/${timestamp}_staged.jpg`;

        const { error: uploadOriginalError } = await supabase.storage
          .from("stagings")
          .upload(originalPath, originalBuffer, { contentType: mimeType, upsert: false });

        const { error: uploadStagedError } = await supabase.storage
          .from("stagings")
          .upload(stagedPath, stagedBuffer, { contentType: outputMime, upsert: false });

        if (!uploadOriginalError && !uploadStagedError) {
          const { data: { publicUrl: originalUrl } } = supabase.storage
            .from("stagings")
            .getPublicUrl(originalPath);

          const { data: { publicUrl: stagedUrl } } = supabase.storage
            .from("stagings")
            .getPublicUrl(stagedPath);

          await supabase.from("stagings").insert({
            user_id: uid,
            original_url: originalUrl,
            staged_url: stagedUrl,
            style: style ?? "modern",
            room_type: roomType ?? "living",
          });

          // Deduct 5 credits after successful save
          await supabase.rpc("deduct_user_credits", { p_user_id: uid, p_amount: 5 });

          return Response.json({ image: outputImage, saved: true });
        }
      } catch {
        // Storage save failed — still return the generated image
      }
    }

    return Response.json({ image: outputImage, saved: false });
  } catch (err: unknown) {
    console.error("Stage API error:", err);
    const message = err instanceof Error ? err.message : "Görsel işlenirken hata oluştu";
    return Response.json({ error: message }, { status: 500 });
  }
}
