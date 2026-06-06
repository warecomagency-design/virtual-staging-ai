import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-geist)]">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="font-bold text-slate-900">StagingAI</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              Giriş Yap
            </Link>
            <Link href="/sign-up" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Ücretsiz Başla
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            AI destekli sanal sahneleme
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
            Boş odaları saniyeler içinde<br />
            <span className="text-blue-600">yaşanılabilir hale getirin</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10">
            Emlak ilanlarınız için yapay zeka destekli sanal dekorasyon. Fiziksel staginge gerek kalmadan profesyonel görseller üretin.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/sign-up" className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
              Ücretsiz Deneyin
            </Link>
            <Link href="/sign-in" className="text-slate-600 font-medium text-base hover:text-slate-900 transition-colors flex items-center gap-1.5">
              Hesabınız var mı? Giriş yapın
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Before/After showcase */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="grid grid-cols-2 gap-4 rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100">
            <div className="relative bg-slate-100 aspect-[4/3] flex items-center justify-center">
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-semibold text-slate-600 px-2.5 py-1 rounded-full">
                Önce
              </div>
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-slate-200 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-slate-400 text-sm font-medium">Boş oda fotoğrafı</p>
              </div>
            </div>
            <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 aspect-[4/3] flex items-center justify-center">
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-semibold text-blue-600 px-2.5 py-1 rounded-full">
                Sonra
              </div>
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <p className="text-blue-600 text-sm font-medium">AI ile sahnelendi</p>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-slate-400 mt-3">Kendi görselinizi yükleyerek deneyin</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-slate-100 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          {[
            { value: "%95", label: "Daha ucuz" },
            { value: "30sn", label: "Ortalama süre" },
            { value: "4", label: "Dekorasyon stili" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Nasıl çalışır?</h2>
            <p className="text-slate-500">Üç adımda profesyonel sahneleme</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Fotoğrafı yükle",
                desc: "Boş oda fotoğrafınızı sürükleyip bırakın veya cihazınızdan seçin.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                ),
              },
              {
                step: "02",
                title: "Stili seç",
                desc: "Modern, Minimalist, Klasik veya İskandinav stillerinden birini seçin.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                ),
              },
              {
                step: "03",
                title: "İndir ve kullan",
                desc: "Saniyeler içinde hazır. Görselinizi indirin, ilan platformlarına yükleyin.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                ),
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-5xl font-bold text-slate-100 mb-4 leading-none">{item.step}</div>
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {item.icon}
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 text-lg mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3">Neden StagingAI?</h2>
            <p className="text-slate-400">Emlak profesyonelleri için tasarlandı</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Gerçekçi sonuçlar", desc: "Gemini AI ile üretilmiş, profesyonel fotoğraf kalitesinde görseller." },
              { title: "4 dekorasyon stili", desc: "Modern, Minimalist, Klasik ve İskandinav. Her mülke uygun seçenek." },
              { title: "Oda tipi tespiti", desc: "Oturma odası, yatak odası, mutfak — AI otomatik algılar ve uygun mobilyaları ekler." },
              { title: "Geçmiş arşivi", desc: "Tüm sahneleme geçmişiniz kaydedilir. İstediğiniz zaman erişin." },
              { title: "Hızlı üretim", desc: "Ortalama 30 saniyede sonuç. Fiziksel staginge gerek yok." },
              { title: "Kolay paylaşım", desc: "Görselleri tek tıkla indirin ve ilan platformlarına yükleyin." },
            ].map((f) => (
              <div key={f.title} className="bg-slate-800 rounded-2xl p-6">
                <div className="w-2 h-2 bg-blue-500 rounded-full mb-4" />
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Hemen deneyin</h2>
          <p className="text-slate-500 mb-8 text-lg">Ücretsiz hesap oluşturun, ilk görselinizi saniyeler içinde hazırlayın.</p>
          <Link href="/sign-up" className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
            Ücretsiz Başlayın
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-slate-700">StagingAI</span>
          </div>
          <p className="text-xs text-slate-400">© 2026 Warecom Yazılım AŞ</p>
        </div>
      </footer>
    </div>
  );
}
