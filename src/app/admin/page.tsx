import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { UserTable } from "./_components/UserTable";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect("/dashboard");
  }

  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Fetch all auth users
  const { data: { users: authUsers } } = await admin.auth.admin.listUsers();

  // Fetch credits and staging counts
  const [{ data: credits }, { data: stagings }] = await Promise.all([
    admin.from("user_credits").select("user_id, balance"),
    admin.from("stagings").select("user_id"),
  ]);

  const creditMap = Object.fromEntries(
    (credits ?? []).map((c) => [c.user_id, c.balance])
  );
  const stagingMap: Record<string, number> = {};
  for (const s of stagings ?? []) {
    stagingMap[s.user_id] = (stagingMap[s.user_id] ?? 0) + 1;
  }

  const rows = authUsers.map((u) => ({
    id: u.id,
    email: u.email ?? "",
    created_at: u.created_at,
    balance: creditMap[u.id] ?? 0,
    staging_count: stagingMap[u.id] ?? 0,
  }));

  // Sort by newest first
  rows.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const totalCredits = rows.reduce((s, u) => s + u.balance, 0);
  const totalStagings = rows.reduce((s, u) => s + u.staging_count, 0);

  return (
    <div className="min-h-screen bg-slate-50 font-[family-name:var(--font-geist)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Paneli</h1>
            <p className="text-sm text-slate-400 mt-0.5">esyaekle.com kullanıcı yönetimi</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Toplam Kullanıcı", value: rows.length },
            { label: "Toplam Sahneleme", value: totalStagings },
            { label: "Dağıtılan Kredi", value: totalCredits },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-200 px-6 py-5">
              <div className="text-3xl font-bold text-slate-900">{s.value}</div>
              <div className="text-sm text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* User table */}
        <UserTable users={rows} />
      </div>
    </div>
  );
}
