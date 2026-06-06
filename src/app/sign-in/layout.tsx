import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giriş Yap — esyaekle",
  description:
    "esyaekle hesabınıza giriş yapın. AI destekli sanal sahneleme aracıyla boş odaları mobilyalı hale getirin.",
  alternates: { canonical: "https://esyaekle.com/sign-in" },
  openGraph: {
    title: "Giriş Yap — esyaekle",
    description: "Hesabınıza giriş yapın ve sahnelemeye devam edin.",
    url: "https://esyaekle.com/sign-in",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  robots: { index: false, follow: false },
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
