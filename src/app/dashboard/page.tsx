import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { StagingGrid } from "./_components/StagingGrid";

interface Staging {
  id: string;
  original_url: string;
  staged_url: string;
  style: string;
  room_type: string;
  created_at: string;
}

function thisMonth(stagings: Staging[]) {
  const now = new Date();
  return stagings.filter((s) => {
    const d = new Date(s.created_at);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const [{ data: stagings }, { data: creditsRow }] = await Promise.all([
    supabase.from("stagings").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
    supabase.from("user_credits").select("balance").eq("user_id", user.id).maybeSingle(),
  ]);

  const list: Staging[] = stagings ?? [];
  const monthCount = thisMonth(list);
  const balance: number = creditsRow?.balance ?? 0;

  return (
    <div className="min-h-screen bg-slate-50 font-[family-name:var(--font-geist)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-600 rounded-2xl px-6 py-5 col-span-1">
            <div className="text-3xl font-bold text-white">{balance}</div>
            <div className="text-sm text-blue-100 mt-1">Kalan Kredi</div>
            <div className="text-xs text-blue-200 mt-0.5">Her sahneleme 5 kredi</div>
          </div>
          {[
            { value: list.length, label: "Toplam Sahneleme" },
            { value: monthCount, label: "Bu Ay" },
            { value: [...new Set(list.map((s) => s.style))].length, label: "Kullanılan Stil" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-slate-200 px-6 py-5">
              <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Low credit warning */}
        {balance < 10 && balance >= 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 flex items-center justify-between">
            <p className="text-amber-800 text-sm font-medium">
              {balance === 0 ? "Krediniz tükendi." : `Yalnızca ${balance} krediniz kaldı.`} Yeni sahneleme için kredi satın alın.
            </p>
            <Link href="/dashboard/credits" className="text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 transition-colors px-3 py-1.5 rounded-xl flex-shrink-0 ml-4">
              Kredi Al
            </Link>
          </div>
        )}

        {/* Top bar */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">Sahnelerim</h1>
          <Link
            href="/studio"
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Yeni Sahne
          </Link>
        </div>

        {/* Empty */}
        {list.length === 0 && (
          <div className="text-center py-24 bg-white rounded-2xl border border-slate-200">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Henüz sahneleme yok</h3>
            <p className="text-slate-500 text-sm mb-7 max-w-xs mx-auto">Boş oda fotoğrafınızı yükleyin, 30 saniyede profesyonel görsel hazırlayın.</p>
            <Link href="/studio" className="bg-blue-600 text-white px-7 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors">
              İlk Sahneyi Oluştur
            </Link>
          </div>
        )}

        {/* Grid with lightbox */}
        {list.length > 0 && <StagingGrid stagings={list} />}
      </div>
    </div>
  );
}
