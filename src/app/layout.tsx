import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "esyaekle — AI ile Sanal Ev Dekorasyonu",
    template: "%s | esyaekle",
  },
  description:
    "Boş oda fotoğraflarını saniyeler içinde mobilyalı ve yaşanabilir hale getirin. Emlakçılar için AI destekli sanal sahneleme aracı. Ücretsiz deneyin.",
  keywords: [
    "sanal sahneleme",
    "virtual staging",
    "emlak fotoğrafı",
    "AI dekorasyon",
    "boş oda mobilya",
    "emlakçı araçları",
    "ev dekorasyonu yapay zeka",
    "esyaekle",
  ],
  authors: [{ name: "esyaekle" }],
  creator: "esyaekle",
  metadataBase: new URL("https://esyaekle.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://esyaekle.com",
    siteName: "esyaekle",
    title: "esyaekle — AI ile Sanal Ev Dekorasyonu",
    description:
      "Boş oda fotoğraflarını saniyeler içinde mobilyalı ve yaşanabilir hale getirin. Emlakçılar için AI destekli sanal sahneleme aracı.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "esyaekle — AI Sanal Sahneleme",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "esyaekle — AI ile Sanal Ev Dekorasyonu",
    description:
      "Boş oda fotoğraflarını saniyeler içinde mobilyalı hale getirin. Emlakçılar için.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={geist.variable}>
      <body className="min-h-screen bg-slate-50 antialiased">{children}</body>
    </html>
  );
}
