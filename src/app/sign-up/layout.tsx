import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ücretsiz Kayıt Ol — esyaekle",
  description:
    "esyaekle'ye ücretsiz kayıt olun. 15 kredi hediye, kredi kartı gerekmez. AI ile boş odaları mobilyalı hale getirin.",
  alternates: { canonical: "https://esyaekle.com/sign-up" },
  openGraph: {
    title: "Ücretsiz Kayıt Ol — esyaekle",
    description: "15 ücretsiz kredi ile hemen başlayın. Kredi kartı gerekmez.",
    url: "https://esyaekle.com/sign-up",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
