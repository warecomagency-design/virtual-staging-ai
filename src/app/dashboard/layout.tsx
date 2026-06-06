import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { NavItem } from "./_components/NavItem";
import { MobileNav } from "./_components/MobileNav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const { data: creditsRow } = await supabase
    .from("user_credits")
    .select("balance")
    .eq("user_id", user.id)
    .maybeSingle();

  const balance: number = creditsRow?.balance ?? 0;

  const handleSignOut = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-[family-name:var(--font-geist)]">

      {/* ── Mobile top bar (visible on < lg) ─────────────── */}
      <header className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span className="font-bold text-slate-900">esyaekle</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${balance < 5 ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
            {balance} kredi
          </span>
          <Link
            href="/studio"
            className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1.5 rounded-xl font-bold text-xs hover:bg-blue-700 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Yeni
          </Link>
        </div>
      </header>

      {/* ── Desktop layout ────────────────────────────────── */}
      <div className="flex">
        {/* Sidebar (hidden on mobile) */}
        <aside className="hidden lg:flex w-60 bg-white border-r border-slate-200 flex-col sticky top-0 h-screen shrink-0">
          <div className="px-5 py-5 border-b border-slate-100">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="font-bold text-slate-900">esyaekle</span>
            </Link>
          </div>

          <div className="mx-4 mt-5">
            <div className={`rounded-xl p-4 ${balance < 5 ? "bg-red-50 border border-red-100" : "bg-blue-50"}`}>
              <div className={`text-2xl font-bold ${balance < 5 ? "text-red-600" : "text-blue-700"}`}>{balance}</div>
              <div className={`text-xs mt-0.5 ${balance < 5 ? "text-red-400" : "text-blue-400"}`}>Kalan Kredi</div>
              <Link href="/dashboard/credits" className="mt-2 block text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                Kredi satın al →
              </Link>
            </div>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1">
            <NavItem href="/dashboard" icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            }>Sahnelerim</NavItem>
            <NavItem href="/dashboard/credits" icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }>Kredi Satın Al</NavItem>
            <NavItem href="/dashboard/account" icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }>Hesabım</NavItem>
          </nav>

          <div className="px-4 pb-4">
            <Link href="/studio" className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Yeni Sahne
            </Link>
          </div>

          <div className="px-4 py-4 border-t border-slate-100">
            <p className="text-xs text-slate-400 truncate mb-2">{user.email}</p>
            <form action={handleSignOut}>
              <button type="submit" className="text-xs text-slate-500 hover:text-red-500 transition-colors font-medium">
                Çıkış Yap
              </button>
            </form>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 pb-20 lg:pb-0">
          {children}
        </main>
      </div>

      {/* ── Mobile bottom nav ─────────────────────────────── */}
      <MobileNav handleSignOut={handleSignOut} />
    </div>
  );
}
