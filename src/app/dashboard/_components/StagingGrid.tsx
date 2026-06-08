"use client";

import { useState, useEffect, useCallback } from "react";

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

function Lightbox({
  staging,
  onClose,
}: {
  staging: Staging;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"before" | "after">("after");

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setTab("before");
      if (e.key === "ArrowRight") setTab("after");
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-800">
              {ROOM_LABELS[staging.room_type] ?? staging.room_type}
            </span>
            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
              {STYLE_LABELS[staging.style] ?? staging.style}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-100">
          {(["after", "before"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                tab === t
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              {t === "after" ? "AI Sonrası" : "Orijinal"}
            </button>
          ))}
        </div>

        {/* Image */}
        <div className="relative bg-slate-900 flex items-center justify-center" style={{ minHeight: 400 }}>
          <img
            key={tab}
            src={tab === "after" ? staging.staged_url : staging.original_url}
            alt={tab === "after" ? "AI sahnelenmiş görsel" : "Orijinal boş oda"}
            className="max-h-[70vh] w-full object-contain"
          />

          {/* Arrow hints */}
          <button
            onClick={() => setTab("before")}
            className={`absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-opacity ${tab === "before" ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setTab("after")}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-opacity ${tab === "after" ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            {new Date(staging.created_at).toLocaleDateString("tr-TR", {
              day: "numeric", month: "long", year: "numeric",
            })}
          </p>
          <a
            href={staging.staged_url}
            download
            className="flex items-center gap-1.5 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            İndir
          </a>
        </div>
      </div>
    </div>
  );
}

export function StagingGrid({ stagings }: { stagings: Staging[] }) {
  const [selected, setSelected] = useState<Staging | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stagings.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
            onClick={() => setSelected(s)}
          >
            <div className="grid grid-cols-2 divide-x divide-slate-100">
              <div className="relative overflow-hidden">
                <img
                  src={s.original_url}
                  alt="Önce"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded tracking-widest">
                  ÖNCE
                </span>
              </div>
              <div className="relative overflow-hidden">
                <img
                  src={s.staged_url}
                  alt="Sonra"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-blue-600/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded tracking-widest">
                  SONRA
                </span>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                  <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    {STYLE_LABELS[s.style] ?? s.style}
                  </span>
                  {s.room_type && (
                    <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                      {ROOM_LABELS[s.room_type] ?? s.room_type}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400">
                  {new Date(s.created_at).toLocaleDateString("tr-TR", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex-shrink-0 ml-2 p-2 text-slate-300 group-hover:text-blue-500 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <Lightbox staging={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
