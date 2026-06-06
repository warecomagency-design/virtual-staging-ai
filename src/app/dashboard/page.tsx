import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

interface Staging {
  id: string;
  original_url: string;
  staged_url: string;
  style: string;
  room_type: string;
  created_at: string;
}

const STYLE_LABELS: Record<string, string> = {
  modern: "Modern",
  minimalist: "Minimalist",
  classic: "Klasik",
  scandinavian: "İskandinav",
};

const ROOM_LABELS: Record<string, string> = {
  living: "Oturma Odası",
  bedroom: "Yatak Odası",
  dining: "Yemek Odası",
  office: "Çalışma Odası",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const { data: stagings } = await supabase
    .from("stagings")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const handleSignOut = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-[family-name:var(--font-geist)]">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="font-bold text-slate-900">StagingAI</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 hidden sm:block">{user.email}</span>
            <form action={handleSignOut}>
              <button type="submit" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Çıkış Yap
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Sahnelerim</h1>
            <p className="text-slate-500 text-sm mt-0.5">
              {stagings?.length ?? 0} sahneleme
            </p>
          </div>
          <Link
            href="/studio"
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Yeni Sahne
          </Link>
        </div>

        {/* Empty state */}
        {(!stagings || stagings.length === 0) && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Henüz sahneleme yok</h3>
            <p className="text-slate-500 text-sm mb-6">İlk oda fotoğrafınızı yükleyin ve dönüşümü görün.</p>
            <Link href="/studio" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors">
              İlk Sahneyi Oluştur
            </Link>
          </div>
        )}

        {/* Grid */}
        {stagings && stagings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {stagings.map((s: Staging) => (
              <div key={s.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="grid grid-cols-2 divide-x divide-slate-100">
                  <div className="relative">
                    <img src={s.original_url} alt="Önce" className="w-full aspect-[4/3] object-cover" />
                    <span className="absolute top-2 left-2 bg-black/50 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                      ÖNCE
                    </span>
                  </div>
                  <div className="relative">
                    <img src={s.staged_url} alt="Sonra" className="w-full aspect-[4/3] object-cover" />
                    <span className="absolute top-2 left-2 bg-blue-600/90 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                      SONRA
                    </span>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                        {STYLE_LABELS[s.style] ?? s.style}
                      </span>
                      {s.room_type && (
                        <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                          {ROOM_LABELS[s.room_type] ?? s.room_type}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5">
                      {new Date(s.created_at).toLocaleDateString("tr-TR", {
                        day: "numeric", month: "long", year: "numeric",
                      })}
                    </p>
                  </div>
                  <a
                    href={s.staged_url}
                    download
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    title="İndir"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
