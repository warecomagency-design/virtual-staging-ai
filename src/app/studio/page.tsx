"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const STYLES = [
  { id: "modern", label: "Modern", desc: "Temiz çizgiler, nötr tonlar" },
  { id: "minimalist", label: "Minimalist", desc: "Sade, ferah, az eşya" },
  { id: "classic", label: "Klasik", desc: "Zengin dokular, koyu ahşap" },
  { id: "scandinavian", label: "İskandinav", desc: "Doğal ahşap, sıcak tekstil" },
];

const ROOMS = [
  { id: "living", label: "Oturma Odası", icon: "🛋️" },
  { id: "bedroom", label: "Yatak Odası", icon: "🛏️" },
  { id: "dining", label: "Yemek Odası", icon: "🍽️" },
  { id: "office", label: "Çalışma Odası", icon: "💻" },
];

export default function StudioPage() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [style, setStyle] = useState("modern");
  const [roomType, setRoomType] = useState("living");
  const [customPrompt, setCustomPrompt] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setResult(null);
      setError(null);
      setSaved(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleStage = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setSaved(false);

    try {
      const res = await fetch("/api/stage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, style, roomType, customPrompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Bir hata oluştu");
      setResult(data.image);
      if (data.saved) setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const step = image ? (result ? 3 : 2) : 1;

  return (
    <div className="min-h-screen bg-slate-50 font-[family-name:var(--font-geist)]">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3.5 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="h-5 w-px bg-slate-200" />
            <span className="font-bold text-slate-900 text-sm">Yeni Sahne</span>
          </div>

          {/* Step indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs">
            {["Yükle", "Ayarla", "Hazır"].map((label, i) => {
              const s = i + 1;
              const active = step === s;
              const done = step > s;
              return (
                <div key={label} className="flex items-center gap-2">
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition-all ${
                    done ? "bg-green-100 text-green-700" :
                    active ? "bg-blue-100 text-blue-700" :
                    "bg-slate-100 text-slate-400"
                  }`}>
                    {done ? (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span>{s}</span>
                    )}
                    {label}
                  </div>
                  {i < 2 && <div className="w-4 h-px bg-slate-200" />}
                </div>
              );
            })}
          </div>

          {saved && (
            <span className="text-xs text-green-600 flex items-center gap-1 font-semibold bg-green-50 px-2.5 py-1 rounded-full">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Arşive kaydedildi
            </span>
          )}
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">

        {/* Upload */}
        <div
          className={`border-2 border-dashed rounded-2xl transition-all cursor-pointer bg-white overflow-hidden ${
            dragging ? "border-blue-500 bg-blue-50 scale-[0.99]" :
            image ? "border-slate-200" :
            "border-slate-200 hover:border-blue-300 hover:bg-slate-50/50"
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onClick={() => !image && inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          {image ? (
            <div className="relative group">
              <img src={image} alt="Yüklenen oda" className="w-full max-h-64 object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                <button
                  onClick={() => inputRef.current?.click()}
                  className="opacity-0 group-hover:opacity-100 bg-white text-slate-800 text-sm font-semibold px-4 py-2 rounded-xl shadow-lg transition-all"
                >
                  Görseli değiştir
                </button>
              </div>
              <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Yüklendi
              </div>
            </div>
          ) : (
            <div className="py-14 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p className="font-semibold text-slate-700 mb-1">Oda fotoğrafını buraya sürükleyin</p>
              <p className="text-sm text-slate-400 mb-4">veya tıklayarak seçin</p>
              <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">PNG · JPG · WEBP</span>
            </div>
          )}
        </div>

        {/* Room type */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-sm font-semibold text-slate-800 mb-3">Oda tipi</p>
          <div className="grid grid-cols-4 gap-2">
            {ROOMS.map((r) => (
              <button
                key={r.id}
                onClick={() => setRoomType(r.id)}
                className={`py-3 rounded-xl border text-xs font-medium transition-all flex flex-col items-center gap-1 ${
                  roomType === r.id
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:bg-slate-50"
                }`}
              >
                <span className="text-base">{r.icon}</span>
                <span>{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Style */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-sm font-semibold text-slate-800 mb-3">Dekorasyon stili</p>
          <div className="grid grid-cols-2 gap-2">
            {STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`py-3 px-4 rounded-xl border text-left transition-all ${
                  style === s.id
                    ? "bg-blue-600 border-blue-600"
                    : "bg-white border-slate-200 hover:border-blue-200 hover:bg-blue-50/30"
                }`}
              >
                <p className={`text-sm font-semibold ${style === s.id ? "text-white" : "text-slate-800"}`}>
                  {s.label}
                </p>
                <p className={`text-xs mt-0.5 ${style === s.id ? "text-blue-100" : "text-slate-400"}`}>
                  {s.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Advanced / Custom prompt */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full px-5 py-4 flex items-center justify-between text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Özel not ekle
              <span className="text-xs font-normal text-slate-400">(isteğe bağlı)</span>
            </div>
            <svg
              className={`w-4 h-4 text-slate-400 transition-transform ${showAdvanced ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showAdvanced && (
            <div className="px-5 pb-5 border-t border-slate-100">
              <p className="text-xs text-slate-500 mt-3 mb-2">
                AI&apos;a özel yönergeler verin. Renk, eşya, atmosfer, kısıtlama belirtebilirsiniz.
              </p>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder={`Örnekler:\n"Beyaz duvarlar, koyu ahşap zemin"\n"Türk halısı ve antika aksesuar ekle"\n"Kırmızı aksan renk kullan, modern Türk tarzı"`}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none leading-relaxed"
              />
              {customPrompt && (
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-blue-600 font-medium">Özel not aktif</p>
                  <button
                    onClick={() => setCustomPrompt("")}
                    className="text-xs text-slate-400 hover:text-red-500 transition-colors"
                  >
                    Temizle
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* CTA button */}
        <button
          onClick={handleStage}
          disabled={!image || loading}
          className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-base hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-md shadow-blue-100"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2.5">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              AI sahneyi oluşturuyor…
            </span>
          ) : (
            "Sahneyi Oluştur"
          )}
        </button>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm flex gap-3">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <h2 className="font-bold text-slate-900">Sahne hazır</h2>
              </div>
              <div className="flex items-center gap-2">
                {saved && (
                  <span className="text-xs text-green-700 font-medium bg-green-50 border border-green-100 px-2.5 py-1 rounded-lg">
                    Arşive kaydedildi
                  </span>
                )}
                <a
                  href={result}
                  download="staged-room.png"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  İndir
                </a>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="px-3.5 py-1.5 text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                >
                  Arşiv
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-slate-100">
              <div className="p-4">
                <p className="text-xs font-semibold text-slate-400 mb-2.5 uppercase tracking-widest">Önce</p>
                <img src={image!} alt="Önce" className="w-full rounded-xl object-cover" />
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold text-slate-400 mb-2.5 uppercase tracking-widest">Sonra</p>
                <img src={result} alt="Sonra" className="w-full rounded-xl object-cover" />
              </div>
            </div>
            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100">
              <button
                onClick={() => {
                  setResult(null);
                  setSaved(false);
                }}
                className="text-sm text-slate-500 hover:text-slate-800 font-medium transition-colors"
              >
                + Yeni sahne oluştur
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
