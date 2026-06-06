"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PACKAGES = [
  { key: "baslangic", name: "Başlangıç", price: 49, credits: 50, stagings: 10, popular: false },
  { key: "pro", name: "Pro", price: 99, credits: 150, stagings: 30, popular: true },
  { key: "plus", name: "Plus", price: 120, credits: 200, stagings: 40, popular: false },
];

export default function CreditsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBuy = async (key: string) => {
    setLoading(key);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceKey: key }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ödeme başlatılamadı");
      router.push(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-[family-name:var(--font-geist)]">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Kredi Paketleri</h1>
          <p className="text-slate-500 text-sm">Her sahneleme 5 kredi harcar. Krediler süresi dolmaz.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.key}
              className={`relative bg-white rounded-2xl border p-7 flex flex-col ${
                pkg.popular
                  ? "border-blue-500 shadow-lg shadow-blue-100 scale-[1.02]"
                  : "border-slate-200"
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  En Popüler
                </span>
              )}
              <div className="mb-5">
                <h3 className="font-bold text-slate-900 text-lg mb-1">{pkg.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900">{pkg.price}</span>
                  <span className="text-slate-500 font-medium">TL</span>
                </div>
              </div>
              <div className="space-y-2.5 mb-7 flex-1">
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>{pkg.credits} kredi</strong></span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{pkg.stagings} sahneleme hakkı</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Süresi dolmaz</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Tüm stiller & oda tipleri</span>
                </div>
              </div>
              <button
                onClick={() => handleBuy(pkg.key)}
                disabled={loading !== null}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
                  pkg.popular
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                }`}
              >
                {loading === pkg.key ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Yönlendiriliyor…
                  </span>
                ) : (
                  "Satın Al"
                )}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 mt-8">
          Güvenli ödeme · Stripe ile şifrelenir · Türk Lirası
        </p>
      </div>
    </div>
  );
}
