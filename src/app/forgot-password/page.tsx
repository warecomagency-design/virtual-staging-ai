"use client";

import { useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });

    setLoading(false);
    if (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } else {
      setSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 font-[family-name:var(--font-geist)]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="font-bold text-slate-900">esyaekle</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Şifremi Unuttum</h1>
          <p className="text-slate-500 text-sm mt-1">
            E-postanıza sıfırlama bağlantısı gönderilecek
          </p>
        </div>

        {sent ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="font-bold text-slate-900 mb-2">Mail gönderildi</h2>
            <p className="text-slate-500 text-sm">
              <strong>{email}</strong> adresine şifre sıfırlama bağlantısı gönderdik. Gelen kutunuzu kontrol edin.
            </p>
            <Link href="/sign-in" className="mt-5 block text-sm text-blue-600 font-medium hover:underline">
              Giriş sayfasına dön
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">E-posta</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@email.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? "Gönderiliyor..." : "Sıfırlama Maili Gönder"}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-slate-500 mt-4">
          <Link href="/sign-in" className="text-blue-600 font-medium hover:underline">
            Giriş sayfasına dön
          </Link>
        </p>
      </div>
    </div>
  );
}
