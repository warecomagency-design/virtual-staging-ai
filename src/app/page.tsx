import Link from "next/link";

/* ── Navbar ─────────────────────────────────────────────── */
function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span className="font-bold text-slate-900 text-lg">esyaekle</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-500">
          <a href="#nasil-calisir" className="hover:text-slate-900 transition-colors">Nasıl çalışır?</a>
          <a href="#ozellikler" className="hover:text-slate-900 transition-colors">Özellikler</a>
          <a href="#fiyatlandirma" className="hover:text-slate-900 transition-colors">Fiyatlar</a>
          <a href="#sss" className="hover:text-slate-900 transition-colors">SSS</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/sign-in" className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium">
            Giriş Yap
          </Link>
          <Link href="/sign-up" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm">
            Ücretsiz Başla
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ── Hero ────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="pt-32 pb-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full border border-blue-100">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            Emlakçılar için AI destekli sanal sahneleme
          </span>
        </div>

        {/* Headline — Al Ries: tek acıya sahip ol */}
        <h1 className="text-center text-5xl md:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-6">
          Boş oda fotoğrafları<br />
          <span className="text-blue-600">size müşteri kaybettiriyor</span>
        </h1>

        {/* Subheadline — konumlama: rakibe karşı */}
        <p className="text-center text-xl text-slate-500 max-w-2xl mx-auto mb-4 leading-relaxed">
          Fiziksel staging <strong className="text-slate-700">5.000–15.000 TL</strong> ve 3 gün sürer.
          esyaekle ile aynı profesyonelliği <strong className="text-slate-700">30 saniyede</strong>, herhangi bir maliyet olmadan elde edin.
        </p>

        {/* Social proof line */}
        <p className="text-center text-sm text-slate-400 mb-10">
          Türkiye genelinde 800+ emlakçı tarafından kullanılıyor
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/sign-up"
            className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 text-center"
          >
            Ücretsiz Deneyin — Kredi Kartı Gerekmez
          </Link>
          <a
            href="#nasil-calisir"
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-slate-600 font-medium text-base hover:text-slate-900 transition-colors"
          >
            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Nasıl çalışır?
          </a>
        </div>

        {/* Before/After Visual */}
        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100">
          <div className="grid grid-cols-2">
            {/* Before */}
            <div className="relative">
              <img
                src="/before.jpg"
                alt="Boş oda — önce"
                className="w-full aspect-video object-cover"
              />
              <span className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                ÖNCE
              </span>
              <span className="absolute bottom-4 right-4 bg-red-500/90 text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                Düşük dönüşüm
              </span>
            </div>

            {/* After */}
            <div className="relative border-l border-slate-100">
              <img
                src="/after.png"
                alt="Mobilyalı oda — sonra"
                className="w-full aspect-video object-cover"
              />
              <span className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                SONRA
              </span>
              <span className="absolute bottom-4 right-4 bg-green-500/90 text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                Yüksek dönüşüm
              </span>
            </div>
          </div>

          {/* Divider arrow */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center z-10">
            <div className="w-10 h-10 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Stats bar ───────────────────────────────────────────── */
function StatsBar() {
  return (
    <section className="py-10 bg-slate-900">
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          { value: "%67", label: "Daha az tıklama", sub: "boş oda ilanlarında" },
          { value: "30sn", label: "Ortalama süre", sub: "görsel başına" },
          { value: "%40", label: "Daha hızlı satış", sub: "sahneli ilanlarda" },
          { value: "15K TL", label: "Tasarruf", sub: "fiziksel staginge göre" },
        ].map((s) => (
          <div key={s.label}>
            <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
            <div className="text-sm font-semibold text-slate-300">{s.label}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Problem ─────────────────────────────────────────────── */
function Problem() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Alıcılar boş odaları neden geçiyor?
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Satın alma kararının <strong className="text-slate-700">%90&apos;ı duygusaldır.</strong> Alıcılar kendini o evde görmek ister. Boş oda bunu imkânsız kılar.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "😤",
              title: "Hayal gücü boşluğu",
              desc: "Alıcılar boş odaların potansiyelini göremez. \"Bu oda küçük görünüyor\" deyip geçerler.",
            },
            {
              icon: "💸",
              title: "Pahalı alternatifleri",
              desc: "Fiziksel staging dekoratör + taşıma + kiralama ile 5.000–15.000 TL arası mal olur ve günler sürer.",
            },
            {
              icon: "📉",
              title: "Kayıp dönüşümler",
              desc: "Sahneli ilanlar ortalama %40 daha hızlı satılıyor. Her geçen gün maliyet, siz beklerken rakibiniz satar.",
            },
          ].map((p) => (
            <div key={p.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="font-bold text-slate-900 mb-2">{p.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── How it works ────────────────────────────────────────── */
function HowItWorks() {
  return (
    <section id="nasil-calisir" className="py-20 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">3 adımda profesyonel görsel</h2>
          <p className="text-slate-500">Fotoğraf çekimi bitti mi? 30 saniye sonra sahneli görsel elinizde.</p>
        </div>
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-blue-100" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Fotoğrafı yükle",
                desc: "Boş oda görselini sürükle bırak. PNG, JPG, WEBP desteklenir.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                ),
              },
              {
                step: "2",
                title: "Stil ve oda seç",
                desc: "Modern, Minimalist, Klasik veya İskandinav. Oda tipini belirtin, AI'a özel notunuzu ekleyin.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                ),
              },
              {
                step: "3",
                title: "İndir ve yayınla",
                desc: "Profesyonel görsel saniyeler içinde hazır. İndirin, ilan platformuna yükleyin.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                ),
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="relative inline-flex w-16 h-16 bg-blue-600 rounded-2xl items-center justify-center mb-5 mx-auto">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {item.icon}
                  </svg>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-blue-600 rounded-full text-blue-600 text-xs font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-12">
          <Link href="/sign-up" className="inline-block bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-100">
            Hemen Deneyin — Ücretsiz
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Features ────────────────────────────────────────────── */
function Features() {
  return (
    <section id="ozellikler" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Rakiplerinizin önüne geçin</h2>
          <p className="text-slate-500">Sahneli ilanlar arama sonuçlarında öne çıkar, alıcı ilgisini 3 kat artırır.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: "Kendi promt'unuzu yazın",
              desc: "\"Beyaz koltuk, sarı duvar\" gibi özel yönergeler ekleyin. AI tam istediğinizi üretir.",
              badge: "Yeni",
            },
            {
              title: "4 profesyonel dekor stili",
              desc: "Modern, Minimalist, Klasik, İskandinav. Her ilanın hedef kitlesine uygun stil seçin.",
              badge: null,
            },
            {
              title: "Oda tipi optimizasyonu",
              desc: "Oturma odası, yatak odası, yemek odası, çalışma odası — her oda için özel mobilya seçimi.",
              badge: null,
            },
            {
              title: "Tüm geçmişiniz kayıtlı",
              desc: "Her sahneleme otomatik arşivlenir. Geçmiş görsellere istediğiniz zaman erişin, indirin.",
              badge: null,
            },
            {
              title: "Mimari bütünlük korunur",
              desc: "Duvarlar, pencereler, zemin değişmez. Sadece mobilya ve dekorasyon eklenir.",
              badge: null,
            },
            {
              title: "Yüksek çözünürlük",
              desc: "İlan platformları için yeterli kalitede çıktı. Direkt kullanıma hazır, ek düzenleme gerekmez.",
              badge: null,
            },
          ].map((f) => (
            <div key={f.title} className="relative bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
              {f.badge && (
                <span className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider">
                  {f.badge}
                </span>
              )}
              <div className="w-2 h-2 bg-blue-500 rounded-full mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ────────────────────────────────────────── */
function Testimonials() {
  return (
    <section className="py-20 px-6 bg-slate-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">Emlakçılar ne diyor?</h2>
          <p className="text-slate-400">Türkiye genelinde aktif emlak profesyonellerinden</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "Artık her ilan için dekoratör tutmak zorunda değilim. Fotoğraf çekimi biter bitmez görseller hazır oluyor. İlana bakan sayısı ikiye katlandı.",
              name: "Mehmet Y.",
              role: "Emlak Danışmanı, İstanbul",
            },
            {
              quote: "Müşterilerim boş evi beğenmiyordu. esyaekle ile aynı evi sahneli olarak gösterince reaksiyon tamamen değişti. Satış süresi yarıya indi.",
              name: "Selin K.",
              role: "Gayrimenkul Uzmanı, Ankara",
            },
            {
              quote: "Kendi notumu yazabilmek harika. 'Açık mutfak, sanayi stili' dediğimde tam istediğim görsel geliyor. Müşteri sunumlarım çok daha güçlü oldu.",
              name: "Can D.",
              role: "Ofis Direktörü, İzmir",
            },
          ].map((t) => (
            <div key={t.name} className="bg-slate-800 rounded-2xl p-6">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-slate-500 text-xs mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ─────────────────────────────────────────────────── */
function FAQ() {
  const items = [
    {
      q: "Gerçekçi mi görünüyor?",
      a: "Evet. Gemini 2.5 Flash Image modeli mimari yapıyı olduğu gibi koruyarak gerçekçi mobilya ve dekorasyon ekler. Aydınlatma, gölge ve perspektif orijinal fotoğrafla uyumlu üretilir.",
    },
    {
      q: "Kendi stilimi nasıl belirtirim?",
      a: "Studio sayfasındaki \"Özel not\" alanına istediğiniz her şeyi yazabilirsiniz. Örneğin: 'Beyaz duvarlar, koyu ahşap zemin, minimalist Türk halısı.' AI bu notları dikkate alır.",
    },
    {
      q: "Görsellerimi kimse görebilir mi?",
      a: "Hayır. Yüklediğiniz ve oluşturulan görseller yalnızca sizin hesabınıza bağlı. Başka kullanıcılar göremez.",
    },
    {
      q: "Hangi ilan platformlarında kullanılabilir?",
      a: "Sahibinden, Hürriyet Emlak, Zingat gibi tüm Türkiye ilan platformlarında kullanılabilecek çözünürlükte çıktı üretilir.",
    },
    {
      q: "Ücretli mi?",
      a: "Kayıt olunca 15 ücretsiz kredi (3 sahneleme) verilir. Daha fazlası için kredi paketi satın alabilirsiniz.",
    },
  ];

  return (
    <section id="sss" className="py-20 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Sık sorulan sorular</h2>
        </div>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.q} className="border border-slate-100 rounded-2xl p-6 bg-slate-50">
              <h3 className="font-bold text-slate-900 mb-2">{item.q}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Pricing ─────────────────────────────────────────────── */
function Pricing() {
  const packages = [
    { key: "baslangic", name: "Başlangıç", price: 49, credits: 150, stagings: 30, popular: false },
    { key: "pro", name: "Pro", price: 99, credits: 200, stagings: 40, popular: true },
    { key: "plus", name: "Plus", price: 120, credits: 350, stagings: 70, popular: false },
  ];

  return (
    <section id="fiyatlandirma" className="py-20 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Kredi Paketleri</h2>
          <p className="text-slate-500">Tek seferlik ödeme. Her sahneleme 5 kredi harcar.</p>
        </div>
        <p className="text-center text-sm text-blue-600 font-semibold mb-10">
          Kayıt olunca 15 ücretsiz kredi — kredi kartı gerekmez
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {packages.map((pkg) => (
            <div
              key={pkg.key}
              className={`relative bg-white rounded-2xl border p-7 flex flex-col ${
                pkg.popular
                  ? "border-blue-500 shadow-lg shadow-blue-100 scale-[1.02]"
                  : "border-slate-200"
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  En Popüler
                </span>
              )}
              <div className="mb-5">
                <h3 className="font-bold text-slate-900 text-lg mb-1">{pkg.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900">{pkg.price}</span>
                  <span className="text-slate-500 font-medium">TL</span>
                </div>
              </div>
              <div className="space-y-2.5 mb-7 flex-1">
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>{pkg.credits} kredi</strong></span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{pkg.stagings} sahneleme hakkı</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Süresi dolmaz</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Tüm stiller & oda tipleri</span>
                </div>
              </div>
              <Link
                href={`/sign-up?plan=${pkg.key}`}
                className={`w-full py-3 rounded-xl font-bold text-sm text-center transition-colors ${
                  pkg.popular
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                }`}
              >
                Satın Al
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-slate-400 mt-6">
          Güvenli ödeme · Stripe ile şifrelenir · Türk Lirası
        </p>
      </div>
    </section>
  );
}

/* ── Final CTA ───────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="py-24 px-6 bg-blue-600">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
          Rakipleriniz çoktan başladı.<br />Sıra sizde.
        </h2>
        <p className="text-blue-100 mb-10 text-lg">
          Ücretsiz hesap oluşturun. İlk görselinizi 30 saniyede hazırlayın.
        </p>
        <Link
          href="/sign-up"
          className="inline-block bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-xl"
        >
          Ücretsiz Başlayın
        </Link>
        <p className="text-blue-200 text-sm mt-4">Kredi kartı gerekmez · Anında erişim</p>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span className="text-sm font-bold text-white">esyaekle</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-500">
          <a href="#nasil-calisir" className="hover:text-slate-300 transition-colors">Nasıl çalışır?</a>
          <a href="#sss" className="hover:text-slate-300 transition-colors">SSS</a>
          <Link href="/sign-up" className="hover:text-slate-300 transition-colors">Kayıt Ol</Link>
        </div>
        <p className="text-xs text-slate-600">© 2026 Warecom Yazılım AŞ</p>
      </div>
    </footer>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist)]">
      <Navbar />
      <Hero />
      <StatsBar />
      <Problem />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
