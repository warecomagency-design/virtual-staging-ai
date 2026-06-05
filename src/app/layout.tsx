import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Virtual Staging AI",
  description: "Boş odaları tek tıkla yaşanılabilir hale getirin",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={geist.variable}>
      <body className="min-h-screen bg-slate-50 antialiased">{children}</body>
    </html>
  );
}
