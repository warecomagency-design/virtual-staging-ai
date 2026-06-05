"use client";

import { useState, useRef } from "react";

const STYLES = [
  { id: "modern", label: "Modern" },
  { id: "minimalist", label: "Minimalist" },
  { id: "classic", label: "Klasik" },
  { id: "scandinavian", label: "İskandinav" },
];

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [style, setStyle] = useState("modern");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setResult(null);
      setError(null);
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

    try {
      const res = await fetch("/api/stage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, style }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Bir hata oluştu");
      setResult(data.image);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Virtual Staging AI</h1>
            <p className="text-xs text-slate-500">Boş odaları tek tıkla yaşanılabilir hale getirin</p>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-5">

        {/* Upload */}
        <div
          className={`border-2 border-dashed rounded-2xl transition-all cursor-pointer bg-white overflow-hidden ${
            dragging ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-300"
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onClick={() => inputRef.current?.click()}
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
              <img src={image} alt="Yüklenen oda" className="w-full max-h-72 object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 bg-black/60 px-3 py-1.5 rounded-full">
                  Görseli değiştir
                </span>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center space-y-3">
              <div className="flex justify-center">
                <svg className="w-12 h-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-slate-600">Oda fotoğrafını sürükleyin veya tıklayın</p>
                <p className="text-sm text-slate-400 mt-1">PNG, JPG, WEBP</p>
              </div>
            </div>
          )}
        </div>

        {/* Style */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Dekorasyon stili</p>
          <div className="grid grid-cols-4 gap-2">
            {STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  style === s.id
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleStage}
          disabled={!image || loading}
          className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sahne oluşturuluyor...
            </span>
          ) : (
            "Sahneyi Oluştur"
          )}
        </button>

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Sonuç</h2>
              <a
                href={result}
                download="staged-room.png"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                İndir
              </a>
            </div>
            <div className="grid grid-cols-2 divide-x divide-slate-100">
              <div className="p-4">
                <p className="text-xs font-medium text-slate-400 mb-2 uppercase tracking-wide">Önce</p>
                <img src={image!} alt="Önce" className="w-full rounded-xl object-cover" />
              </div>
              <div className="p-4">
                <p className="text-xs font-medium text-slate-400 mb-2 uppercase tracking-wide">Sonra</p>
                <img src={result} alt="Sonra" className="w-full rounded-xl object-cover" />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
