import Link from "next/link";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ credits?: string }>;
}) {
  const { credits } = await searchParams;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 font-[family-name:var(--font-geist)]">
      <div className="w-full max-w-md text-center bg-white rounded-2xl border border-slate-200 p-10 shadow-sm">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Ödeme Başarılı!</h1>
        {credits && (
          <p className="text-slate-500 mb-6">
            <span className="font-bold text-blue-600 text-2xl">{credits} kredi</span>
            <br />hesabınıza eklendi.
          </p>
        )}
        <p className="text-slate-400 text-sm mb-8">
          Her sahneleme 5 kredi harcar. Dilediğiniz zaman yeni kredi satın alabilirsiniz.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/studio"
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Studio&apos;ya Git — Sahne Oluştur
          </Link>
          <Link
            href="/dashboard"
            className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
