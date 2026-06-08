"use client";

import { useState } from "react";

interface UserRow {
  id: string;
  email: string;
  created_at: string;
  balance: number;
  staging_count: number;
}

export function UserTable({ users }: { users: UserRow[] }) {
  const [rows, setRows] = useState<UserRow[]>(users);
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = rows.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const addCredits = async (userId: string) => {
    const amount = parseInt(amounts[userId] || "0", 10);
    if (!amount || amount <= 0) return;
    setLoading(userId);
    try {
      const res = await fetch("/api/admin/add-credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, amount }),
      });
      if (!res.ok) throw new Error();
      setRows((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, balance: u.balance + amount } : u
        )
      );
      setAmounts((prev) => ({ ...prev, [userId]: "" }));
    } catch {
      alert("Hata oluştu");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="E-posta ile ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3.5 font-semibold text-slate-600">Kullanıcı</th>
                <th className="text-center px-4 py-3.5 font-semibold text-slate-600">Kredi</th>
                <th className="text-center px-4 py-3.5 font-semibold text-slate-600">Sahneleme</th>
                <th className="text-left px-4 py-3.5 font-semibold text-slate-600">Kayıt Tarihi</th>
                <th className="text-right px-5 py-3.5 font-semibold text-slate-600">Kredi Yükle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-slate-400 text-sm">
                    Kullanıcı bulunamadı
                  </td>
                </tr>
              )}
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <span className="font-medium text-slate-800">{u.email}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`font-bold ${u.balance < 5 ? "text-red-500" : "text-blue-600"}`}>
                      {u.balance}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center text-slate-600">{u.staging_count}</td>
                  <td className="px-4 py-4 text-slate-400 text-xs">
                    {new Date(u.created_at).toLocaleDateString("tr-TR", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {/* Quick buttons */}
                      {[15, 50, 100].map((n) => (
                        <button
                          key={n}
                          onClick={async () => {
                            setLoading(u.id + "-" + n);
                            try {
                              const res = await fetch("/api/admin/add-credits", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ userId: u.id, amount: n }),
                              });
                              if (!res.ok) throw new Error();
                              setRows((prev) =>
                                prev.map((r) =>
                                  r.id === u.id ? { ...r, balance: r.balance + n } : r
                                )
                              );
                            } catch {
                              alert("Hata oluştu");
                            } finally {
                              setLoading(null);
                            }
                          }}
                          disabled={loading !== null}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-blue-100 hover:text-blue-700 text-slate-600 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
                        >
                          +{n}
                        </button>
                      ))}
                      {/* Custom amount */}
                      <input
                        type="number"
                        min="1"
                        placeholder="Özel"
                        value={amounts[u.id] || ""}
                        onChange={(e) => setAmounts((prev) => ({ ...prev, [u.id]: e.target.value }))}
                        className="w-16 px-2 py-1 border border-slate-200 rounded-lg text-xs text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => addCredits(u.id)}
                        disabled={!amounts[u.id] || loading !== null}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 disabled:opacity-40 transition-colors"
                      >
                        {loading === u.id ? "..." : "Yükle"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-xs text-slate-400 text-right">{filtered.length} kullanıcı</p>
    </div>
  );
}
