import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const PACKAGES = [
  {
    key: "baslangic",
    name: "Başlangıç",
    price: 49,
    credits: 150,
    stagings: 30,
    priceId: process.env.STRIPE_PRICE_BASLANGIC!,
    popular: false,
  },
  {
    key: "pro",
    name: "Pro",
    price: 99,
    credits: 200,
    stagings: 40,
    priceId: process.env.STRIPE_PRICE_PRO!,
    popular: true,
  },
  {
    key: "plus",
    name: "Plus",
    price: 120,
    credits: 350,
    stagings: 70,
    priceId: process.env.STRIPE_PRICE_PLUS!,
    popular: false,
  },
] as const;
