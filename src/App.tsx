import { useMemo, useState } from "react"
import "./index.css"

type Lang = "en" | "tr" | "ar" | "ru"

type Model = {
  code: string
  name: string
  category: string
  usage: string
  desc: string
  image: string
}

type CartItem = {
  code: string
  name: string
  category: string
  qty: number
}

function BirkinLogo() {
  return (
    <img
      src="/birkin-logo.png"
      alt="Birkin Contract Logo"
      className="siteLogo"
    />
  )
}

const models: Model[] = [
  {
    code: "01",
    name: "BIRKIN L01 Lounge Chair",
    category: "Lounge Chair",
    usage: "Lobby / Lounge / Villa / Suite",
    desc: "Soft-lined lounge chair with upholstered body and wooden frame for hospitality and premium residential projects.",
    image: "/model-lounge-chair.png",
  },
  {
    code: "02",
    name: "BIRKIN BS01 Bar Stool",
    category: "Bar Stool",
    usage: "Restaurant / Bar / Cafe",
    desc: "Compact upholstered bar stool with a refined silhouette for restaurant, cafe and bar concepts.",
    image: "/model-bar-stool.png",
  },
  {
    code: "03",
    name: "BIRKIN C03 Dining Chair",
    category: "Dining Chair",
    usage: "Restaurant / Hotel Dining / Cafe",
    desc: "Wooden dining chair with upholstered seat and back for comfortable and elegant dining spaces.",
    image: "/model-dining-chair.png",
  },
]

const content = {
  en: {
    nav: ["About", "Models", "Quote List", "Profile", "Process", "Contact"],
    quote: "Request a Quote",
    heroKicker: "Contract Furniture / Custom-Made Production",
    heroTitle: "Furniture shaped around your project.",
    heroText:
      "Custom-made contract furniture solutions for hotels, restaurants, villas and architectural spaces.",
    heroPrimary: "Build Quote List",
    heroSecondary: "Download Profile",
    heroStats: [
      ["Hospitality", "Hotels, resorts and premium restaurants"],
      ["Custom-Made", "Dimensions, finishes and project-specific details"],
      ["Türkiye Supply", "Production coordination and export support"],
    ],
    aboutKicker: "About Birkin Contract",
    aboutTitle: "A project partner for architectural furniture needs.",
    aboutText:
      "Birkin Contract provides project-based contract furniture solutions for hospitality and commercial interiors. We support architects, interior designers, procurement teams and investors with sourcing, custom-made production coordination and project follow-up.",
    productKicker: "Scope",
    productTitle: "Furniture categories we coordinate.",
    products: [
      "Dining Chairs",
      "Dining Tables",
      "Bar Stools",
      "Lounge Seating",
      "Outdoor Furniture",
      "Banquette Seating",
      "Sunbeds",
      "Custom Pieces",
    ],
    modelsKicker: "Selected Models",
    modelsTitle: "Reference pieces for hospitality projects.",
    addToQuote: "Add to Quote List",
    added: "Added",
    quoteKicker: "Quote List",
    quoteTitle: "Select models and request pricing via WhatsApp.",
    quoteText:
      "Add reference models, adjust quantities and send your project details directly to Birkin Contract.",
    empty: "Your quote list is empty. Please add a model first.",
    remove: "Remove",
    whatsapp: "Send Quote Request via WhatsApp",
    fields: {
      name: "Name / Company",
      email: "E-mail",
      phone: "Phone / WhatsApp",
      country: "Country / City",
      projectType: "Project Type",
      deliveryLocation: "Delivery Location",
      notes: "Project notes, dimensions, material preferences",
    },
    profileKicker: "Company Profile",
    profileTitle: "Download Birkin Contract company profile.",
    profileText:
      "Review our profile to understand our project-based approach, product scope and cooperation model.",
    profileButton: "Download Company Profile PDF",
    processKicker: "Process",
    processTitle: "From brief to delivery.",
    process: [
      "Project Brief",
      "Technical Review",
      "Material Selection",
      "Quotation",
      "Production",
      "Delivery",
    ],
    contactKicker: "Contact",
    contactTitle: "Tell us about your project.",
    contactText:
      "For accurate pricing, please include product groups, quantities, dimensions, material preferences and delivery location.",
    footerText:
      "Custom-made contract furniture solutions for hospitality and architectural spaces.",
    rights: "© 2026 Birkin Contract. All rights reserved.",
  },

  tr: {
    nav: ["Hakkımızda", "Modeller", "Teklif Listesi", "Profil", "Süreç", "İletişim"],
    quote: "Teklif Al",
    heroKicker: "Contract Mobilya / Özel Üretim",
    heroTitle: "Projenize göre şekillenen mobilya çözümleri.",
    heroText:
      "Otel, restoran, villa ve mimari projeler için özel üretim contract mobilya çözümleri.",
    heroPrimary: "Teklif Listesi Oluştur",
    heroSecondary: "Profili İndir",
    heroStats: [
      ["Hospitality", "Oteller, resortlar ve premium restoranlar"],
      ["Özel Üretim", "Ölçü, malzeme ve projeye özel detaylar"],
      ["Türkiye Tedarik", "Üretim koordinasyonu ve ihracat desteği"],
    ],
    aboutKicker: "Birkin Contract Hakkında",
    aboutTitle: "Mimari mobilya ihtiyaçları için proje çözüm partneri.",
    aboutText:
      "Birkin Contract; hospitality ve ticari iç mekân projeleri için proje bazlı contract mobilya çözümleri sunar. Mimarlar, iç mimarlar, satın alma ekipleri ve yatırımcılar için tedarik, özel üretim koordinasyonu ve proje takibi sağlar.",
    productKicker: "Kapsam",
    productTitle: "Koordinasyonunu sağladığımız mobilya kategorileri.",
    products: [
      "Yemek Sandalyeleri",
      "Yemek Masaları",
      "Bar Sandalyeleri",
      "Lounge Oturma",
      "Dış Mekân Mobilyaları",
      "Banket Oturma",
      "Şezlonglar",
      "Özel Üretim Ürünler",
    ],
    modelsKicker: "Seçili Modeller",
    modelsTitle: "Hospitality projeleri için referans ürünler.",
    addToQuote: "Teklif Listesine Ekle",
    added: "Eklendi",
    quoteKicker: "Teklif Listesi",
    quoteTitle: "Modelleri seçin, WhatsApp üzerinden fiyat talep edin.",
    quoteText:
      "Referans modelleri ekleyin, adetleri ayarlayın ve proje bilgilerinizi doğrudan Birkin Contract’a gönderin.",
    empty: "Teklif listeniz boş. Lütfen önce bir model ekleyin.",
    remove: "Kaldır",
    whatsapp: "WhatsApp’tan Teklif Talebi Gönder",
    fields: {
      name: "Ad / Firma",
      email: "E-mail",
      phone: "Telefon / WhatsApp",
      country: "Ülke / Şehir",
      projectType: "Proje Tipi",
      deliveryLocation: "Teslimat Lokasyonu",
      notes: "Proje notları, ölçüler, malzeme tercihleri",
    },
    profileKicker: "Company Profile",
    profileTitle: "Birkin Contract şirket profilini indirin.",
    profileText:
      "Proje bazlı çalışma yaklaşımımızı, ürün kapsamımızı ve iş birliği modelimizi inceleyebilirsiniz.",
    profileButton: "Company Profile PDF İndir",
    processKicker: "Süreç",
    processTitle: "Brief aşamasından teslimata kadar.",
    process: [
      "Proje Briefi",
      "Teknik İnceleme",
      "Malzeme Seçimi",
      "Teklif",
      "Üretim",
      "Teslimat",
    ],
    contactKicker: "İletişim",
    contactTitle: "Projenizi bize anlatın.",
    contactText:
      "Doğru fiyatlandırma için ürün grupları, adetler, ölçüler, malzeme tercihleri ve teslimat lokasyonunu belirtmenizi rica ederiz.",
    footerText:
      "Hospitality ve mimari projeler için özel üretim contract mobilya çözümleri.",
    rights: "© 2026 Birkin Contract. Tüm hakları saklıdır.",
  },

  ar: {
    nav: ["من نحن", "النماذج", "قائمة العرض", "الملف", "العملية", "اتصال"],
    quote: "طلب عرض سعر",
    heroKicker: "أثاث تعاقدي / إنتاج مخصص",
    heroTitle: "حلول أثاث تتشكل حسب مشروعك.",
    heroText:
      "حلول أثاث تعاقدي مخصصة للفنادق والمطاعم والفلل والمساحات المعمارية.",
    heroPrimary: "إنشاء قائمة عرض",
    heroSecondary: "تحميل الملف",
    heroStats: [
      ["الضيافة", "فنادق، منتجعات ومطاعم راقية"],
      ["إنتاج مخصص", "مقاسات، تشطيبات وتفاصيل حسب المشروع"],
      ["توريد من تركيا", "تنسيق الإنتاج ودعم التصدير"],
    ],
    aboutKicker: "عن Birkin Contract",
    aboutTitle: "شريك مشاريع لاحتياجات الأثاث المعماري.",
    aboutText:
      "تقدم Birkin Contract حلول أثاث تعاقدي قائمة على المشاريع لمساحات الضيافة والمساحات التجارية. ندعم المعماريين ومصممي الديكور وفرق المشتريات والمستثمرين في التوريد وتنسيق الإنتاج والمتابعة.",
    productKicker: "النطاق",
    productTitle: "فئات الأثاث التي نقوم بتنسيقها.",
    products: [
      "كراسي طعام",
      "طاولات طعام",
      "كراسي بار",
      "جلسات Lounge",
      "أثاث خارجي",
      "جلسات بنش",
      "كراسي استلقاء",
      "قطع مخصصة",
    ],
    modelsKicker: "نماذج مختارة",
    modelsTitle: "قطع مرجعية لمشاريع الضيافة.",
    addToQuote: "إضافة إلى قائمة العرض",
    added: "تمت الإضافة",
    quoteKicker: "قائمة العرض",
    quoteTitle: "اختر النماذج واطلب السعر عبر واتساب.",
    quoteText:
      "أضف النماذج المرجعية، عدّل الكميات وأرسل تفاصيل مشروعك مباشرة إلى Birkin Contract.",
    empty: "قائمة العرض فارغة. يرجى إضافة نموذج أولاً.",
    remove: "إزالة",
    whatsapp: "إرسال طلب السعر عبر واتساب",
    fields: {
      name: "الاسم / الشركة",
      email: "البريد الإلكتروني",
      phone: "الهاتف / واتساب",
      country: "الدولة / المدينة",
      projectType: "نوع المشروع",
      deliveryLocation: "موقع التسليم",
      notes: "ملاحظات المشروع، المقاسات، تفضيلات المواد",
    },
    profileKicker: "ملف الشركة",
    profileTitle: "تحميل ملف شركة Birkin Contract.",
    profileText:
      "اطلع على ملفنا لفهم نهجنا في العمل حسب المشروع ونطاق المنتجات ونموذج التعاون.",
    profileButton: "تحميل ملف الشركة PDF",
    processKicker: "العملية",
    processTitle: "من المتطلبات إلى التسليم.",
    process: [
      "متطلبات المشروع",
      "مراجعة فنية",
      "اختيار المواد",
      "عرض السعر",
      "الإنتاج",
      "التسليم",
    ],
    contactKicker: "اتصال",
    contactTitle: "أخبرنا عن مشروعك.",
    contactText:
      "للحصول على تسعير دقيق، يرجى ذكر مجموعات المنتجات والكميات والمقاسات وتفضيلات المواد وموقع التسليم.",
    footerText:
      "حلول أثاث تعاقدي مخصصة لمشاريع الضيافة والمساحات المعمارية.",
    rights: "© 2026 Birkin Contract. جميع الحقوق محفوظة.",
  },

  ru: {
    nav: ["О нас", "Модели", "Запрос", "Профиль", "Процесс", "Контакты"],
    quote: "Запросить предложение",
    heroKicker: "Contract Furniture / Индивидуальное производство",
    heroTitle: "Мебельные решения, созданные вокруг вашего проекта.",
    heroText:
      "Индивидуальные решения contract furniture для отелей, ресторанов, вилл и архитектурных пространств.",
    heroPrimary: "Собрать запрос",
    heroSecondary: "Скачать профиль",
    heroStats: [
      ["Hospitality", "Отели, курорты и премиальные рестораны"],
      ["На заказ", "Размеры, материалы и детали под проект"],
      ["Поставка из Турции", "Координация производства и экспорт"],
    ],
    aboutKicker: "О Birkin Contract",
    aboutTitle: "Проектный партнер для архитектурной мебели.",
    aboutText:
      "Birkin Contract предлагает проектные решения contract furniture для hospitality и коммерческих интерьеров. Мы поддерживаем архитекторов, дизайнеров, закупочные команды и инвесторов в подборе мебели, координации производства и сопровождении проекта.",
    productKicker: "Объем",
    productTitle: "Категории мебели, которые мы координируем.",
    products: [
      "Обеденные стулья",
      "Обеденные столы",
      "Барные стулья",
      "Lounge seating",
      "Уличная мебель",
      "Банкетки",
      "Шезлонги",
      "Индивидуальные изделия",
    ],
    modelsKicker: "Выбранные модели",
    modelsTitle: "Референсные изделия для hospitality проектов.",
    addToQuote: "Добавить в запрос",
    added: "Добавлено",
    quoteKicker: "Список запроса",
    quoteTitle: "Выберите модели и запросите цену через WhatsApp.",
    quoteText:
      "Добавьте референсные модели, настройте количество и отправьте детали проекта напрямую в Birkin Contract.",
    empty: "Список пуст. Сначала добавьте модель.",
    remove: "Удалить",
    whatsapp: "Отправить запрос через WhatsApp",
    fields: {
      name: "Имя / Компания",
      email: "E-mail",
      phone: "Телефон / WhatsApp",
      country: "Страна / Город",
      projectType: "Тип проекта",
      deliveryLocation: "Место доставки",
      notes: "Заметки, размеры, предпочтения по материалам",
    },
    profileKicker: "Профиль компании",
    profileTitle: "Скачать профиль компании Birkin Contract.",
    profileText:
      "Ознакомьтесь с нашим проектным подходом, объемом продукции и моделью сотрудничества.",
    profileButton: "Скачать Company Profile PDF",
    processKicker: "Процесс",
    processTitle: "От брифа до поставки.",
    process: [
      "Бриф проекта",
      "Технический анализ",
      "Выбор материалов",
      "Предложение",
      "Производство",
      "Поставка",
    ],
    contactKicker: "Контакты",
    contactTitle: "Расскажите нам о вашем проекте.",
    contactText:
      "Для точной оценки укажите группы продуктов, количество, размеры, материалы и место доставки.",
    footerText:
      "Индивидуальные решения contract furniture для hospitality и архитектурных пространств.",
    rights: "© 2026 Birkin Contract. Все права защищены.",
  },
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const savedLang = localStorage.getItem("birkin-language") as Lang | null
    if (savedLang === "en" || savedLang === "tr" || savedLang === "ar" || savedLang === "ru") {
      return savedLang
    }
    return "en"
  })

  const t = content[lang]

  const [cart, setCart] = useState<CartItem[]>([])
  const [quoteInfo, setQuoteInfo] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    projectType: "",
    deliveryLocation: "",
    notes: "",
  })

  const changeLanguage = (newLang: Lang) => {
    setLang(newLang)
    localStorage.setItem("birkin-language", newLang)
  }

  const addToCart = (model: Model) => {
    setCart((current) => {
      const exists = current.find((item) => item.name === model.name)
      if (exists) return current
      return [
        ...current,
        {
          code: model.code,
          name: model.name,
          category: model.category,
          qty: 1,
        },
      ]
    })
  }

  const increaseQty = (name: string) => {
    setCart((current) =>
      current.map((item) =>
        item.name === name ? { ...item, qty: item.qty + 1 } : item
      )
    )
  }

  const decreaseQty = (name: string) => {
    setCart((current) =>
      current
        .map((item) =>
          item.name === name ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    )
  }

  const removeFromCart = (name: string) => {
    setCart((current) => current.filter((item) => item.name !== name))
  }

  const whatsappQuoteLink = useMemo(() => {
    const selectedModels =
      cart.length === 0
        ? "-"
        : cart
            .map(
              (item) =>
                `- ${item.code} / ${item.name} / ${item.category} x ${item.qty}`
            )
            .join("\n")

    const message = `Merhaba, Birkin Contract web sitesi üzerinden fiyat teklifi almak istiyorum.

Seçilen Modeller:
${selectedModels}

Proje Bilgileri:
Ad / Firma: ${quoteInfo.name}
E-mail: ${quoteInfo.email}
Telefon / WhatsApp: ${quoteInfo.phone}
Ülke / Şehir: ${quoteInfo.country}
Proje Tipi: ${quoteInfo.projectType}
Teslimat Lokasyonu: ${quoteInfo.deliveryLocation}

Notlar:
${quoteInfo.notes}`

    return `https://wa.me/905525000320?text=${encodeURIComponent(message)}`
  }, [cart, quoteInfo])

  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"}>
      <header className="navbar">
        <a href="#" className="brand">
          <BirkinLogo />
        </a>

        <nav>
          <a href="#about">{t.nav[0]}</a>
          <a href="#models">{t.nav[1]}</a>
          <a href="#quote-list">{t.nav[2]}</a>
          <a href="#profile">{t.nav[3]}</a>
          <a href="#process">{t.nav[4]}</a>
          <a href="#contact">{t.nav[5]}</a>
        </nav>

        <div className="navActions">
          {(["en", "tr", "ar", "ru"] as Lang[]).map((item) => (
            <button
              key={item}
              className={lang === item ? "langBtn active" : "langBtn"}
              onClick={() => changeLanguage(item)}
              type="button"
            >
              {item.toUpperCase()}
            </button>
          ))}

          <a href="#quote-list" className="navBtn">
            {t.quote}
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="heroContent">
          <span className="kicker">{t.heroKicker}</span>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>

          <div className="heroButtons">
            <a href="#models" className="primaryBtn">
              {t.heroPrimary}
            </a>
            <a href="/birkin-company-profile.pdf" target="_blank" rel="noreferrer" className="secondaryBtn">
              {t.heroSecondary}
            </a>
          </div>

          <div className="heroStats">
            {t.heroStats.map(([title, text]) => (
              <div key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="heroVisual">
          <div className="editorialFrame">
            <span className="frameLabel">BIRKIN / 2026</span>

            <img
              src="/model-lounge-chair.png"
              alt="Birkin Lounge Chair"
              className="heroProduct mainProduct"
            />

            <img
              src="/model-bar-stool.png"
              alt="Birkin Bar Stool"
              className="heroProduct sideProduct"
            />

            <div className="visualLine"></div>
            <div className="visualCircle"></div>
          </div>
        </div>
      </section>

      <section id="about" className="section splitSection">
        <div>
          <span className="kicker">{t.aboutKicker}</span>
          <h2>{t.aboutTitle}</h2>
        </div>

        <div>
          <p>{t.aboutText}</p>
        </div>
      </section>

      <section className="section productScope">
        <span className="kicker">{t.productKicker}</span>
        <h2>{t.productTitle}</h2>

        <div className="productGrid">
          {t.products.map((item, index) => (
            <div className="productPill" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="models" className="section modelsSection">
        <div className="sectionHead">
          <span className="kicker">{t.modelsKicker}</span>
          <h2>{t.modelsTitle}</h2>
        </div>

        <div className="modelGrid">
          {models.map((model) => {
            const isAdded = cart.some((item) => item.name === model.name)

            return (
              <article className="modelCard" key={model.name}>
                <div className="modelTop">
                  <span>{model.code}</span>
                  <small>{model.category}</small>
                </div>

                <div className="modelImageWrap">
                  <img src={model.image} alt={model.name} />
                </div>

                <div className="modelBody">
                  <p className="modelUsage">{model.usage}</p>
                  <h3>{model.name}</h3>
                  <p>{model.desc}</p>

                  <button
                    type="button"
                    onClick={() => addToCart(model)}
                    className="modelBtn"
                  >
                    {isAdded ? `✓ ${t.added}` : t.addToQuote}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section id="quote-list" className="section quoteSection">
        <div className="sectionHead">
          <span className="kicker">{t.quoteKicker}</span>
          <h2>{t.quoteTitle}</h2>
          <p>{t.quoteText}</p>
        </div>

        <div className="quoteLayout">
          <div className="quoteBox">
            {cart.length === 0 ? (
              <p className="emptyText">{t.empty}</p>
            ) : (
              <div className="quoteItems">
                {cart.map((item) => (
                  <div className="quoteItem" key={item.name}>
                    <div>
                      <small>{item.code} / {item.category}</small>
                      <strong>{item.name}</strong>
                    </div>

                    <div className="qtyControls">
                      <button type="button" onClick={() => decreaseQty(item.name)}>-</button>
                      <span>{item.qty}</span>
                      <button type="button" onClick={() => increaseQty(item.name)}>+</button>
                    </div>

                    <button
                      type="button"
                      className="removeBtn"
                      onClick={() => removeFromCart(item.name)}
                    >
                      {t.remove}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="quoteForm">
            <input
              placeholder={t.fields.name}
              value={quoteInfo.name}
              onChange={(e) => setQuoteInfo({ ...quoteInfo, name: e.target.value })}
            />

            <input
              placeholder={t.fields.email}
              value={quoteInfo.email}
              onChange={(e) => setQuoteInfo({ ...quoteInfo, email: e.target.value })}
            />

            <input
              placeholder={t.fields.phone}
              value={quoteInfo.phone}
              onChange={(e) => setQuoteInfo({ ...quoteInfo, phone: e.target.value })}
            />

            <input
              placeholder={t.fields.country}
              value={quoteInfo.country}
              onChange={(e) => setQuoteInfo({ ...quoteInfo, country: e.target.value })}
            />

            <input
              placeholder={t.fields.projectType}
              value={quoteInfo.projectType}
              onChange={(e) => setQuoteInfo({ ...quoteInfo, projectType: e.target.value })}
            />

            <input
              placeholder={t.fields.deliveryLocation}
              value={quoteInfo.deliveryLocation}
              onChange={(e) => setQuoteInfo({ ...quoteInfo, deliveryLocation: e.target.value })}
            />

            <textarea
              placeholder={t.fields.notes}
              value={quoteInfo.notes}
              onChange={(e) => setQuoteInfo({ ...quoteInfo, notes: e.target.value })}
            />

            <a
              href={whatsappQuoteLink}
              target="_blank"
              rel="noreferrer"
              className="whatsappQuoteBtn"
            >
              {t.whatsapp}
            </a>
          </div>
        </div>
      </section>

      <section id="profile" className="section profileSection">
        <div>
          <span className="kicker">{t.profileKicker}</span>
          <h2>{t.profileTitle}</h2>
          <p>{t.profileText}</p>
        </div>

        <a
          href="/birkin-company-profile.pdf"
          target="_blank"
          rel="noreferrer"
          className="primaryBtn"
        >
          {t.profileButton}
        </a>
      </section>

      <section id="process" className="section processSection">
        <span className="kicker">{t.processKicker}</span>
        <h2>{t.processTitle}</h2>

        <div className="processGrid">
          {t.process.map((step, index) => (
            <div className="processItem" key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section contactSection">
        <div>
          <span className="kicker">{t.contactKicker}</span>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactText}</p>
        </div>

        <div className="contactCard">
          <span>burak@birkin.com</span>
          <span>+90 552 500 03 20</span>
          <span>Türkiye</span>
        </div>
      </section>

      <footer className="footer">
        <div>
          <BirkinLogo />
          <p>{t.footerText}</p>
        </div>

        <div className="footerLinks">
          <a href="#about">{t.nav[0]}</a>
          <a href="#models">{t.nav[1]}</a>
          <a href="#quote-list">{t.nav[2]}</a>
          <a href="#profile">{t.nav[3]}</a>
          <a href="#process">{t.nav[4]}</a>
          <a href="#contact">{t.nav[5]}</a>
        </div>

        <div className="footerBottom">
          <span>{t.rights}</span>
          <span>Crafted for Spaces</span>
        </div>
      </footer>

      <a
        href="https://wa.me/905525000320"
        target="_blank"
        rel="noreferrer"
        className="floatingWhatsapp"
      >
        WhatsApp
      </a>
    </main>
  )
}
