import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

const STYLE_PROMPTS: Record<string, string> = {
  modern:
    "modern and contemporary furniture with clean lines, neutral colors (white, gray, beige), sleek surfaces, and minimalist decorations",
  minimalist:
    "minimalist furniture with only the essentials, white and cream tones, open spaces, no clutter",
  classic:
    "classic and traditional furniture, rich textures, dark wood accents, elegant drapes and ornate rugs",
  scandinavian:
    "Scandinavian style furniture, light natural wood, white walls, cozy textiles, simple and functional design",
};

export async function POST(request: NextRequest) {
  try {
    const { image, style } = await request.json();

    if (!image) {
      return Response.json({ error: "Görsel gerekli" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "API anahtarı eksik" }, { status: 500 });
    }

    const base64Data = image.split(",")[1];
    const mimeType = image.split(";")[0].split(":")[1] as string;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-preview-image-generation",
    });

    const styleDesc = STYLE_PROMPTS[style] ?? STYLE_PROMPTS.modern;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType, data: base64Data } },
            {
              text: `Transform this empty room into a beautifully staged, furnished space. Add ${styleDesc}. Keep the room's architecture exactly the same (walls, windows, floors, ceiling, lighting). Only add furniture, rugs, curtains, and decorations. The result must look like a professional real estate photo — photorealistic, high quality.`,
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
      const textPart = parts?.find((p) => "text" in p && p.text);
      const msg = "text" in (textPart ?? {}) ? (textPart as { text: string }).text : "Görsel üretilemedi";
      return Response.json({ error: msg }, { status: 500 });
    }

    const outputImage = `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
    return Response.json({ image: outputImage });
  } catch (err: unknown) {
    console.error("Stage API error:", err);
    const message = err instanceof Error ? err.message : "Görsel işlenirken hata oluştu";
    return Response.json({ error: message }, { status: 500 });
  }
}
