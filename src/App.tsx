import { useMemo, useState } from "react"
import "./index.css"

type Lang = "en" | "tr" | "ar" | "ru"

function BirkinLogo() {
  return (
    <svg
      className="siteLogo"
      viewBox="0 0 520 120"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Birkin Contract Logo"
    >
      <text
        x="0"
        y="52"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="40"
        fontWeight="800"
        fill="#E682D2"
        letterSpacing="2"
      >
        BIRKIN CONTRACT
      </text>

      <text
        x="125"
        y="88"
        fontFamily="Brush Script MT, Segoe Script, cursive"
        fontSize="34"
        fill="#7A22FF"
      >
        Crafted for Spaces
      </text>
    </svg>
  )
}

const content = {
  en: {
    nav: ["About", "Services", "Products", "Profile", "Process", "Contact"],
    requestQuote: "Request a Quote",
    tag: "Tailored Furniture Solutions",
    heroTitle:
      "Custom-made contract furniture for hospitality and commercial projects.",
    heroText:
      "Birkin Contract provides project-based furniture sourcing and custom-made production coordination for hotels, restaurants, cafés, villas and commercial interiors.",
    productGroups: "Product Groups",
    stats: [
      ["Hotels", "Rooms, lobby, restaurant & outdoor areas"],
      ["Restaurants", "Dining, bar, banquette & terrace furniture"],
      ["Villas", "Custom indoor & outdoor furniture pieces"],
    ],
    visualSmall: "Project-Based Supply",
    visualTitle: "Contract Furniture",
    visualSteps: ["Brief", "Quotation", "Production"],
    cardTitle: "Hospitality & Commercial Projects",
    cardText:
      "Tables, chairs, bar stools, lounge seating, outdoor furniture, banquette seating and custom-made furniture solutions.",
    cardList: [
      "Custom measurements",
      "Material and finish alternatives",
      "Production coordination",
      "Domestic and international supply",
    ],
    aboutSmall: "About Birkin Contract",
    aboutTitle: "A project partner for contract furniture needs.",
    aboutText:
      "Birkin Contract is a project-based contract furniture partner providing custom-made furniture solutions for hospitality and commercial spaces. We support architects, interior designers, procurement teams and investors with furniture sourcing, production coordination and tailored manufacturing solutions.",
    servicesSmall: "Services",
    servicesTitle: "Designed for project-based work.",
    services: [
      [
        "Custom-Made Production",
        "Furniture solutions according to project dimensions, materials, concept and budget.",
      ],
      [
        "Contract Furniture Supply",
        "Project-based supply for hotels, restaurants, cafés, villas and commercial interiors.",
      ],
      [
        "Production Coordination",
        "Supplier coordination, sample approval, quality control and delivery follow-up.",
      ],
    ],
    productsSmall: "Product Groups",
    productsTitle: "Furniture categories for commercial projects.",
    products: [
      "Dining Tables",
      "Chairs",
      "Bar Stools",
      "Outdoor Furniture",
      "Lounge Seating",
      "Banquette Seating",
      "Sunbeds",
      "Custom Pieces",
    ],
    profileSmall: "Company Profile",
    profileTitle: "Download Birkin Contract company profile.",
    profileText:
      "Review our company profile to understand our project-based contract furniture approach, service scope, product groups and cooperation model for hospitality and commercial projects.",
    profileButton: "Download Company Profile PDF",
    processSmall: "Our Process",
    processTitle: "From brief to delivery.",
    process: [
      "Project Brief",
      "Technical Review",
      "Material Selection",
      "Quotation",
      "Production",
      "Delivery",
    ],
    seoSmall: "Contract Furniture from Türkiye",
    seoTitle:
      "Custom furniture solutions for hotels, restaurants and commercial spaces.",
    seoText:
      "Birkin Contract provides custom-made contract furniture solutions from Türkiye for hospitality and commercial projects. Our product groups include hotel furniture, restaurant furniture, café furniture, outdoor furniture, lounge seating, bar stools, dining tables and bespoke furniture pieces.",
    formSmall: "Request a Quote",
    formTitle: "Tell us about your project.",
    formText:
      "Share your project details and we will prepare a project-based response. For accurate pricing, please include product groups, quantities, dimensions, material preferences and delivery location.",
    checklist: [
      "Project type",
      "Product groups",
      "Quantity & dimensions",
      "Material preference",
      "Delivery location",
    ],
    placeholders: {
      name: "Name / Company",
      email: "Email",
      phone: "Phone / WhatsApp",
      country: "Country / City",
      projectType: "Project Type",
      productGroup: "Product Group",
      quantity: "Estimated Quantity",
      deliveryDate: "Target Delivery Date",
      deliveryLocation: "Delivery Location",
      message:
        "Dimensions, materials, finishes, reference images or project notes",
    },
    projectOptions: [
      "Hotel / Resort",
      "Restaurant / Cafe",
      "Villa / Residence",
      "Office / Commercial Space",
      "Outdoor / Terrace / Beach Club",
    ],
    productOptions: [
      "Tables",
      "Chairs",
      "Bar Stools",
      "Lounge Seating",
      "Outdoor Furniture",
      "Banquette Seating",
      "Custom-Made Pieces",
    ],
    send: "Send Project Inquiry",
    quickLinks: "Quick Links",
    footerProducts: "Product Groups",
    contact: "Contact",
    footerText:
      "Birkin Contract provides custom-made contract furniture solutions for hospitality and commercial projects.",
    rights: "© 2026 Birkin Contract. All rights reserved.",
    footerSlogan: "Tailored Furniture Solutions",
  },

  tr: {
    nav: ["Hakkımızda", "Hizmetler", "Ürünler", "Profil", "Süreç", "İletişim"],
    requestQuote: "Teklif Al",
    tag: "Proje Bazlı Mobilya Çözümleri",
    heroTitle:
      "Hospitality ve ticari projeler için özel üretim contract mobilya çözümleri.",
    heroText:
      "Birkin Contract; otel, restoran, kafe, villa ve ticari iç mekân projeleri için proje bazlı mobilya tedariki ve özel üretim koordinasyonu sağlar.",
    productGroups: "Ürün Grupları",
    stats: [
      ["Oteller", "Oda, lobi, restoran ve dış mekân alanları"],
      ["Restoranlar", "Yemek alanı, bar, banket ve teras mobilyaları"],
      ["Villalar", "İç ve dış mekân özel üretim mobilyalar"],
    ],
    visualSmall: "Proje Bazlı Tedarik",
    visualTitle: "Contract Mobilya",
    visualSteps: ["Brief", "Teklif", "Üretim"],
    cardTitle: "Hospitality ve Ticari Projeler",
    cardText:
      "Masa, sandalye, bar sandalyesi, lounge oturma, dış mekân mobilyaları, banket oturma ve özel üretim mobilya çözümleri.",
    cardList: [
      "Özel ölçü üretim",
      "Malzeme ve yüzey alternatifleri",
      "Üretim koordinasyonu",
      "Yurt içi ve yurt dışı proje tedariki",
    ],
    aboutSmall: "Birkin Contract Hakkında",
    aboutTitle: "Contract mobilya ihtiyaçları için proje çözüm partneri.",
    aboutText:
      "Birkin Contract; hospitality ve ticari alanlar için özel üretim mobilya çözümleri sunan proje bazlı bir contract mobilya partneridir. Mimarlar, iç mimarlar, satın alma ekipleri ve yatırımcılar için mobilya tedariki, üretim koordinasyonu ve özel üretim çözümleri sağlar.",
    servicesSmall: "Hizmetler",
    servicesTitle: "Proje bazlı çalışma için tasarlandı.",
    services: [
      [
        "Özel Üretim",
        "Proje ölçüsü, malzeme, konsept ve bütçeye göre mobilya çözümleri.",
      ],
      [
        "Contract Mobilya Tedariki",
        "Otel, restoran, kafe, villa ve ticari iç mekânlar için proje bazlı tedarik.",
      ],
      [
        "Üretim Koordinasyonu",
        "Tedarikçi koordinasyonu, numune onayı, kalite kontrol ve teslimat takibi.",
      ],
    ],
    productsSmall: "Ürün Grupları",
    productsTitle: "Ticari projeler için mobilya kategorileri.",
    products: [
      "Yemek Masaları",
      "Sandalyeler",
      "Bar Sandalyeleri",
      "Dış Mekân Mobilyaları",
      "Lounge Oturma",
      "Banket Oturma",
      "Şezlonglar",
      "Özel Üretim Ürünler",
    ],
    profileSmall: "Company Profile",
    profileTitle: "Birkin Contract şirket profilini indirin.",
    profileText:
      "Şirket profilimizde proje bazlı contract mobilya yaklaşımımızı, hizmet kapsamımızı, ürün gruplarımızı ve hospitality/ticari projeler için iş birliği modelimizi inceleyebilirsiniz.",
    profileButton: "Company Profile PDF İndir",
    processSmall: "Süreç",
    processTitle: "Brief aşamasından teslimata kadar.",
    process: [
      "Proje Briefi",
      "Teknik İnceleme",
      "Malzeme Seçimi",
      "Teklif",
      "Üretim",
      "Teslimat",
    ],
    seoSmall: "Türkiye’den Contract Mobilya",
    seoTitle:
      "Otel, restoran ve ticari alanlar için özel üretim mobilya çözümleri.",
    seoText:
      "Birkin Contract; Türkiye’den hospitality ve ticari projeler için özel üretim contract mobilya çözümleri sunar. Ürün gruplarımız otel mobilyaları, restoran mobilyaları, kafe mobilyaları, dış mekân mobilyaları, lounge oturma, bar sandalyeleri, yemek masaları ve özel üretim mobilya parçalarını kapsar.",
    formSmall: "Teklif Talebi",
    formTitle: "Projenizi bize anlatın.",
    formText:
      "Proje detaylarınızı paylaşın, size proje bazlı bir dönüş hazırlayalım. Doğru fiyatlandırma için ürün grupları, adetler, ölçüler, malzeme tercihleri ve teslimat lokasyonunu belirtmenizi rica ederiz.",
    checklist: [
      "Proje tipi",
      "Ürün grupları",
      "Adet ve ölçüler",
      "Malzeme tercihi",
      "Teslimat lokasyonu",
    ],
    placeholders: {
      name: "Ad / Firma",
      email: "E-posta",
      phone: "Telefon / WhatsApp",
      country: "Ülke / Şehir",
      projectType: "Proje Tipi",
      productGroup: "Ürün Grubu",
      quantity: "Tahmini Adet",
      deliveryDate: "Hedef Teslim Tarihi",
      deliveryLocation: "Teslimat Lokasyonu",
      message:
        "Ölçüler, malzemeler, yüzey bitişleri, referans görseller veya proje notları",
    },
    projectOptions: [
      "Otel / Resort",
      "Restoran / Kafe",
      "Villa / Residence",
      "Ofis / Ticari Alan",
      "Dış Mekân / Teras / Beach Club",
    ],
    productOptions: [
      "Masalar",
      "Sandalyeler",
      "Bar Sandalyeleri",
      "Lounge Oturma",
      "Dış Mekân Mobilyaları",
      "Banket Oturma",
      "Özel Üretim Ürünler",
    ],
    send: "Proje Talebi Gönder",
    quickLinks: "Hızlı Linkler",
    footerProducts: "Ürün Grupları",
    contact: "İletişim",
    footerText:
      "Birkin Contract, hospitality ve ticari projeler için özel üretim contract mobilya çözümleri sunar.",
    rights: "© 2026 Birkin Contract. Tüm hakları saklıdır.",
    footerSlogan: "Proje Bazlı Mobilya Çözümleri",
  },

  ar: {
    nav: ["من نحن", "الخدمات", "المنتجات", "الملف", "العملية", "اتصال"],
    requestQuote: "طلب عرض سعر",
    tag: "حلول أثاث مخصصة للمشاريع",
    heroTitle:
      "أثاث تعاقدي مخصص لمشاريع الضيافة والمساحات التجارية.",
    heroText:
      "تقدم Birkin Contract حلول توريد وتنسيق إنتاج أثاث مخصص للمشاريع الفندقية والمطاعم والمقاهي والفلل والمساحات التجارية.",
    productGroups: "مجموعات المنتجات",
    stats: [
      ["الفنادق", "الغرف، اللوبي، المطاعم والمساحات الخارجية"],
      ["المطاعم", "أثاث الطعام، البار، الجلسات والتراسات"],
      ["الفلل", "قطع أثاث مخصصة للداخل والخارج"],
    ],
    visualSmall: "توريد حسب المشروع",
    visualTitle: "أثاث تعاقدي",
    visualSteps: ["المتطلبات", "عرض السعر", "الإنتاج"],
    cardTitle: "مشاريع الضيافة والمساحات التجارية",
    cardText:
      "طاولات، كراسي، كراسي بار، جلسات lounge، أثاث خارجي، جلسات بنش وقطع أثاث مخصصة.",
    cardList: [
      "قياسات مخصصة",
      "خيارات المواد والتشطيبات",
      "تنسيق الإنتاج",
      "توريد محلي ودولي للمشاريع",
    ],
    aboutSmall: "عن Birkin Contract",
    aboutTitle: "شريك مشاريع لاحتياجات الأثاث التعاقدي.",
    aboutText:
      "Birkin Contract هي شريك أثاث تعاقدي قائم على المشاريع، تقدم حلول أثاث مخصصة لمساحات الضيافة والمساحات التجارية. ندعم المعماريين ومصممي الديكور وفرق المشتريات والمستثمرين في التوريد وتنسيق الإنتاج والحلول المخصصة.",
    servicesSmall: "الخدمات",
    servicesTitle: "مصممة للعمل حسب المشروع.",
    services: [
      [
        "إنتاج مخصص",
        "حلول أثاث حسب المقاسات والمواد والمفهوم والميزانية.",
      ],
      [
        "توريد أثاث تعاقدي",
        "توريد حسب المشروع للفنادق والمطاعم والمقاهي والفلل والمساحات التجارية.",
      ],
      [
        "تنسيق الإنتاج",
        "تنسيق الموردين، اعتماد العينات، مراقبة الجودة ومتابعة التسليم.",
      ],
    ],
    productsSmall: "مجموعات المنتجات",
    productsTitle: "فئات أثاث للمشاريع التجارية.",
    products: [
      "طاولات طعام",
      "كراسي",
      "كراسي بار",
      "أثاث خارجي",
      "جلسات Lounge",
      "جلسات بنش",
      "كراسي استلقاء",
      "قطع مخصصة",
    ],
    profileSmall: "ملف الشركة",
    profileTitle: "تحميل ملف شركة Birkin Contract.",
    profileText:
      "يمكنك الاطلاع على ملف الشركة لفهم نهجنا في الأثاث التعاقدي حسب المشروع، نطاق خدماتنا، مجموعات المنتجات ونموذج التعاون لمشاريع الضيافة والمساحات التجارية.",
    profileButton: "تحميل ملف الشركة PDF",
    processSmall: "العملية",
    processTitle: "من المتطلبات إلى التسليم.",
    process: [
      "متطلبات المشروع",
      "مراجعة فنية",
      "اختيار المواد",
      "عرض السعر",
      "الإنتاج",
      "التسليم",
    ],
    seoSmall: "أثاث تعاقدي من تركيا",
    seoTitle:
      "حلول أثاث مخصصة للفنادق والمطاعم والمساحات التجارية.",
    seoText:
      "تقدم Birkin Contract حلول أثاث تعاقدي مخصص من تركيا لمشاريع الضيافة والمساحات التجارية. تشمل مجموعاتنا أثاث الفنادق، أثاث المطاعم، أثاث المقاهي، الأثاث الخارجي، جلسات lounge، كراسي البار، طاولات الطعام وقطع الأثاث المخصصة.",
    formSmall: "طلب عرض سعر",
    formTitle: "أخبرنا عن مشروعك.",
    formText:
      "شارك تفاصيل مشروعك وسنقوم بإعداد رد مناسب حسب المشروع. للحصول على تسعير دقيق، يرجى إضافة مجموعات المنتجات، الكميات، المقاسات، تفضيلات المواد وموقع التسليم.",
    checklist: [
      "نوع المشروع",
      "مجموعات المنتجات",
      "الكميات والمقاسات",
      "تفضيل المواد",
      "موقع التسليم",
    ],
    placeholders: {
      name: "الاسم / الشركة",
      email: "البريد الإلكتروني",
      phone: "الهاتف / واتساب",
      country: "الدولة / المدينة",
      projectType: "نوع المشروع",
      productGroup: "مجموعة المنتجات",
      quantity: "الكمية المتوقعة",
      deliveryDate: "تاريخ التسليم المستهدف",
      deliveryLocation: "موقع التسليم",
      message:
        "المقاسات، المواد، التشطيبات، الصور المرجعية أو ملاحظات المشروع",
    },
    projectOptions: [
      "فندق / منتجع",
      "مطعم / مقهى",
      "فيلا / ريزيدنس",
      "مكتب / مساحة تجارية",
      "خارجي / تراس / Beach Club",
    ],
    productOptions: [
      "طاولات",
      "كراسي",
      "كراسي بار",
      "جلسات Lounge",
      "أثاث خارجي",
      "جلسات بنش",
      "قطع مخصصة",
    ],
    send: "إرسال طلب المشروع",
    quickLinks: "روابط سريعة",
    footerProducts: "مجموعات المنتجات",
    contact: "اتصال",
    footerText:
      "تقدم Birkin Contract حلول أثاث تعاقدي مخصص لمشاريع الضيافة والمساحات التجارية.",
    rights: "© 2026 Birkin Contract. جميع الحقوق محفوظة.",
    footerSlogan: "حلول أثاث مخصصة للمشاريع",
  },

  ru: {
    nav: ["О нас", "Услуги", "Продукты", "Профиль", "Процесс", "Контакты"],
    requestQuote: "Запросить предложение",
    tag: "Индивидуальные мебельные решения",
    heroTitle:
      "Мебель contract-класса на заказ для гостиничных и коммерческих проектов.",
    heroText:
      "Birkin Contract предлагает проектное снабжение мебелью и координацию индивидуального производства для отелей, ресторанов, кафе, вилл и коммерческих интерьеров.",
    productGroups: "Группы продуктов",
    stats: [
      ["Отели", "Номера, лобби, рестораны и наружные зоны"],
      ["Рестораны", "Обеденные зоны, бар, банкетки и террасы"],
      ["Виллы", "Индивидуальная мебель для интерьера и экстерьера"],
    ],
    visualSmall: "Поставка под проект",
    visualTitle: "Contract Furniture",
    visualSteps: ["Бриф", "Предложение", "Производство"],
    cardTitle: "Гостиничные и коммерческие проекты",
    cardText:
      "Столы, стулья, барные стулья, lounge-зоны, уличная мебель, банкетки и индивидуальные мебельные решения.",
    cardList: [
      "Индивидуальные размеры",
      "Варианты материалов и отделки",
      "Координация производства",
      "Поставка для локальных и международных проектов",
    ],
    aboutSmall: "О Birkin Contract",
    aboutTitle: "Проектный партнер для contract furniture.",
    aboutText:
      "Birkin Contract — проектный партнер по contract furniture, предлагающий индивидуальные мебельные решения для гостиничных и коммерческих пространств. Мы поддерживаем архитекторов, дизайнеров интерьера, закупочные команды и инвесторов в подборе мебели, координации производства и индивидуальных решениях.",
    servicesSmall: "Услуги",
    servicesTitle: "Создано для проектной работы.",
    services: [
      [
        "Индивидуальное производство",
        "Мебельные решения в соответствии с размерами, материалами, концепцией и бюджетом проекта.",
      ],
      [
        "Поставка contract furniture",
        "Проектная поставка для отелей, ресторанов, кафе, вилл и коммерческих интерьеров.",
      ],
      [
        "Координация производства",
        "Координация поставщиков, утверждение образцов, контроль качества и сопровождение доставки.",
      ],
    ],
    productsSmall: "Группы продуктов",
    productsTitle: "Категории мебели для коммерческих проектов.",
    products: [
      "Обеденные столы",
      "Стулья",
      "Барные стулья",
      "Уличная мебель",
      "Lounge seating",
      "Банкетки",
      "Шезлонги",
      "Индивидуальные изделия",
    ],
    profileSmall: "Профиль компании",
    profileTitle: "Скачать профиль компании Birkin Contract.",
    profileText:
      "Ознакомьтесь с профилем компании, чтобы понять наш проектный подход к contract furniture, объем услуг, группы продуктов и модель сотрудничества для гостиничных и коммерческих проектов.",
    profileButton: "Скачать Company Profile PDF",
    processSmall: "Процесс",
    processTitle: "От брифа до поставки.",
    process: [
      "Бриф проекта",
      "Технический анализ",
      "Выбор материалов",
      "Предложение",
      "Производство",
      "Поставка",
    ],
    seoSmall: "Contract Furniture из Турции",
    seoTitle:
      "Индивидуальные мебельные решения для отелей, ресторанов и коммерческих пространств.",
    seoText:
      "Birkin Contract предлагает индивидуальные решения contract furniture из Турции для гостиничных и коммерческих проектов. Наши группы продуктов включают мебель для отелей, ресторанов, кафе, уличную мебель, lounge seating, барные стулья, обеденные столы и индивидуальные изделия.",
    formSmall: "Запрос предложения",
    formTitle: "Расскажите нам о вашем проекте.",
    formText:
      "Поделитесь деталями проекта, и мы подготовим проектное предложение. Для точной оценки укажите группы продуктов, количество, размеры, предпочтения по материалам и место доставки.",
    checklist: [
      "Тип проекта",
      "Группы продуктов",
      "Количество и размеры",
      "Предпочтения по материалам",
      "Место доставки",
    ],
    placeholders: {
      name: "Имя / Компания",
      email: "E-mail",
      phone: "Телефон / WhatsApp",
      country: "Страна / Город",
      projectType: "Тип проекта",
      productGroup: "Группа продуктов",
      quantity: "Ориентировочное количество",
      deliveryDate: "Желаемая дата поставки",
      deliveryLocation: "Место доставки",
      message:
        "Размеры, материалы, отделки, референсы или заметки по проекту",
    },
    projectOptions: [
      "Отель / Курорт",
      "Ресторан / Кафе",
      "Вилла / Резиденция",
      "Офис / Коммерческое пространство",
      "Outdoor / Терраса / Beach Club",
    ],
    productOptions: [
      "Столы",
      "Стулья",
      "Барные стулья",
      "Lounge seating",
      "Уличная мебель",
      "Банкетки",
      "Индивидуальные изделия",
    ],
    send: "Отправить запрос",
    quickLinks: "Быстрые ссылки",
    footerProducts: "Группы продуктов",
    contact: "Контакты",
    footerText:
      "Birkin Contract предлагает индивидуальные решения contract furniture для гостиничных и коммерческих проектов.",
    rights: "© 2026 Birkin Contract. Все права защищены.",
    footerSlogan: "Индивидуальные мебельные решения",
  },
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const savedLang = localStorage.getItem("birkin-language") as Lang | null

    if (
      savedLang === "en" ||
      savedLang === "tr" ||
      savedLang === "ar" ||
      savedLang === "ru"
    ) {
      return savedLang
    }

    return "en"
  })

  const changeLanguage = (newLang: Lang) => {
    setLang(newLang)
    localStorage.setItem("birkin-language", newLang)
  }

  const t = content[lang]

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    projectType: "",
    productGroup: "",
    quantity: "",
    deliveryDate: "",
    deliveryLocation: "",
    message: "",
  })

  const mailLink = useMemo(() => {
    const subject = encodeURIComponent(
      lang === "tr"
        ? "Proje Talebi - Birkin Contract"
        : lang === "ar"
        ? "طلب مشروع - Birkin Contract"
        : lang === "ru"
        ? "Запрос проекта - Birkin Contract"
        : "Project Inquiry - Birkin Contract"
    )

    const body = encodeURIComponent(
      `Name / Company: ${form.name}
Email: ${form.email}
Phone / WhatsApp: ${form.phone}
Country / City: ${form.country}

Project Type: ${form.projectType}
Product Group: ${form.productGroup}
Estimated Quantity: ${form.quantity}
Target Delivery Date: ${form.deliveryDate}
Delivery Location: ${form.deliveryLocation}

Project Notes:
${form.message}`
    )

    return `mailto:burak@birkin.com?subject=${subject}&body=${body}`
  }, [form, lang])

  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"}>
      <header className="navbar">
        <div className="brand">
          <BirkinLogo />
        </div>

        <nav>
          <a href="#about">{t.nav[0]}</a>
          <a href="#services">{t.nav[1]}</a>
          <a href="#products">{t.nav[2]}</a>
          <a href="#company-profile">{t.nav[3]}</a>
          <a href="#process">{t.nav[4]}</a>
          <a href="#contact">{t.nav[5]}</a>
        </nav>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {(["en", "tr", "ar", "ru"] as Lang[]).map((item) => (
            <button
              key={item}
              onClick={() => changeLanguage(item)}
              style={{
                border: "1px solid rgba(255,255,255,0.18)",
                background: lang === item ? "#e682d2" : "transparent",
                color: lang === item ? "#0a0a0a" : "#ffffff",
                borderRadius: "999px",
                padding: "10px 12px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {item.toUpperCase()}
            </button>
          ))}

          <a href="#contact" className="navBtn">
            {t.requestQuote}
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="heroText">
          <span className="tag">{t.tag}</span>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>

          <div className="buttons">
            <a href="#contact" className="primaryBtn">
              {t.requestQuote}
            </a>
            <a href="#products" className="secondaryBtn">
              {t.productGroups}
            </a>
          </div>

          <div className="heroStats">
            {t.stats.map(([title, text]) => (
              <div key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="heroCard">
          <div className="premiumVisual">
            <div className="visualTop">
              <span>{t.visualSmall}</span>
              <strong>{t.visualTitle}</strong>
            </div>

            <div className="visualCenter">
              <div className="chairShape"></div>
              <div className="tableShape"></div>
              <div className="sofaShape"></div>
            </div>

            <div className="visualBottom">
              {t.visualSteps.map((step, index) => (
                <div key={step}>
                  <strong>0{index + 1}</strong>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <h3>{t.cardTitle}</h3>
          <p>{t.cardText}</p>

          <ul>
            {t.cardList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="about" className="section">
        <span className="smallTitle">{t.aboutSmall}</span>
        <h2>{t.aboutTitle}</h2>
        <p>{t.aboutText}</p>
      </section>

      <section id="services" className="section darkSection">
        <span className="smallTitle">{t.servicesSmall}</span>
        <h2>{t.servicesTitle}</h2>

        <div className="grid">
          {t.services.map(([title, text]) => (
            <div className="card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="products" className="section">
        <span className="smallTitle">{t.productsSmall}</span>
        <h2>{t.productsTitle}</h2>

        <div className="productGrid">
          {t.products.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      </section>

      <section id="company-profile" className="section seoBox">
        <span className="smallTitle">{t.profileSmall}</span>
        <h2>{t.profileTitle}</h2>
        <p>{t.profileText}</p>

        <div className="buttons">
          <a
            href="/birkin-company-profile.pdf"
            className="primaryBtn"
            target="_blank"
            rel="noreferrer"
          >
            {t.profileButton}
          </a>

          <a href="#contact" className="secondaryBtn">
            {t.requestQuote}
          </a>
        </div>
      </section>

      <section id="process" className="section darkSection">
        <span className="smallTitle">{t.processSmall}</span>
        <h2>{t.processTitle}</h2>

        <div className="processGrid">
          {t.process.map((step, index) => (
            <div key={step}>
              <strong>0{index + 1}</strong>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section seoBox">
        <span className="smallTitle">{t.seoSmall}</span>
        <h2>{t.seoTitle}</h2>
        <p>{t.seoText}</p>
      </section>

      <section id="contact" className="section contact">
        <div>
          <span className="smallTitle">{t.formSmall}</span>
          <h2>{t.formTitle}</h2>
          <p>{t.formText}</p>

          <div className="quoteChecklist">
            {t.checklist.map((item) => (
              <div key={item}>✓ {item}</div>
            ))}
          </div>

          <p className="contactInfo">Mail: burak@birkin.com</p>
          <p className="contactInfo">Phone / WhatsApp: +90 552 500 03 20</p>
          <p className="contactInfo">Location: Türkiye</p>
        </div>

        <form className="form">
          <div className="formRow">
            <input
              placeholder={t.placeholders.name}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder={t.placeholders.email}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="formRow">
            <input
              placeholder={t.placeholders.phone}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input
              placeholder={t.placeholders.country}
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />
          </div>

          <select
            value={form.projectType}
            onChange={(e) =>
              setForm({ ...form, projectType: e.target.value })
            }
          >
            <option value="" disabled>
              {t.placeholders.projectType}
            </option>
            {t.projectOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={form.productGroup}
            onChange={(e) =>
              setForm({ ...form, productGroup: e.target.value })
            }
          >
            <option value="" disabled>
              {t.placeholders.productGroup}
            </option>
            {t.productOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <div className="formRow">
            <input
              placeholder={t.placeholders.quantity}
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />

            <input
              placeholder={t.placeholders.deliveryDate}
              value={form.deliveryDate}
              onChange={(e) =>
                setForm({ ...form, deliveryDate: e.target.value })
              }
            />
          </div>

          <input
            placeholder={t.placeholders.deliveryLocation}
            value={form.deliveryLocation}
            onChange={(e) =>
              setForm({ ...form, deliveryLocation: e.target.value })
            }
          />

          <textarea
            placeholder={t.placeholders.message}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          ></textarea>

          <a href={mailLink} className="primaryBtn">
            {t.send}
          </a>
        </form>
      </section>

      <footer className="footer">
        <div className="footerGrid">
          <div>
            <BirkinLogo />
            <p className="footerText">{t.footerText}</p>
          </div>

          <div>
            <h4>{t.quickLinks}</h4>
            <a href="#about">{t.nav[0]}</a>
            <a href="#services">{t.nav[1]}</a>
            <a href="#products">{t.nav[2]}</a>
            <a href="#company-profile">{t.nav[3]}</a>
            <a href="#process">{t.nav[4]}</a>
          </div>

          <div>
            <h4>{t.footerProducts}</h4>
            {t.products.slice(0, 4).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div>
            <h4>{t.contact}</h4>
            <span>burak@birkin.com</span>
            <span>+90 552 500 03 20</span>
            <span>Türkiye</span>
          </div>
        </div>

        <div className="footerBottom">
          <span>{t.rights}</span>
          <span>{t.footerSlogan}</span>
        </div>
      </footer>

      <a
        href="https://wa.me/905525000320"
        className="whatsappBtn"
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>
    </main>
  )
}
