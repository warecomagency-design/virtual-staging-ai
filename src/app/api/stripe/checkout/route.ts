import { stripe, PACKAGES } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { priceKey } = await request.json();

    const pkg = PACKAGES.find((p) => p.key === priceKey);
    if (!pkg) {
      return Response.json({ error: "Geçersiz paket" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Giriş yapmanız gerekiyor" }, { status: 401 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: pkg.priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://esyaekle.com"}/success?credits=${pkg.credits}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://esyaekle.com"}/#fiyatlandirma`,
      metadata: {
        user_id: user.id,
        credits: String(pkg.credits),
      },
      customer_email: user.email,
    });

    return Response.json({ url: session.url });
  } catch (err: unknown) {
    console.error("Checkout error:", err);
    return Response.json({ error: "Ödeme başlatılamadı" }, { status: 500 });
  }
}
