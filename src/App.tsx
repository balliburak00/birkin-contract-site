import { useEffect, useMemo, useState } from "react"
import "./index.css"

type Lang = "en" | "tr" | "ar" | "ru"

type ProductSection =
  | "Chair"
  | "Armchair"
  | "Dining Table"
  | "Coffee Table"
  | "Bar Stool"
  | "Lounge"
  | "Ottoman"
  | "Outdoor"

type CollectionName =
  | "Arc Collection"
  | "Loop Collection"
  | "Haven Collection"
  | "Cocoon Collection"
  | "Pure Collection"
  | "Axis Collection"

type LocalizedText = Record<Lang, string>

type Product = {
  slug: string
  code: string
  name: string
  category: ProductSection
  collection: CollectionName
  usage: LocalizedText
  desc: LocalizedText
  image: string
}

type CartItem = {
  code: string
  name: string
  category: ProductSection
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

function updateMetaTag(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"]`)

  if (!tag) {
    tag = document.createElement("meta")
    tag.setAttribute("name", name)
    document.head.appendChild(tag)
  }

  tag.setAttribute("content", content)
}

function updateOgTag(property: string, content: string) {
  let tag = document.querySelector(`meta[property="${property}"]`)

  if (!tag) {
    tag = document.createElement("meta")
    tag.setAttribute("property", property)
    document.head.appendChild(tag)
  }

  tag.setAttribute("content", content)
}

const productSections: ProductSection[] = [
  "Chair",
  "Armchair",
  "Dining Table",
  "Coffee Table",
  "Bar Stool",
  "Lounge",
  "Ottoman",
  "Outdoor",
]

const collections: CollectionName[] = [
  "Arc Collection",
  "Loop Collection",
  "Haven Collection",
  "Cocoon Collection",
  "Pure Collection",
  "Axis Collection",
]

const products: Product[] = [
  {
    slug: "birkin-arc-c01",
    code: "C01",
    name: "BIRKIN ARC C01",
    category: "Chair",
    collection: "Arc Collection",
    usage: {
      en: "Restaurant / Cafe / Hotel Dining / Villa",
      tr: "Restoran / Kafe / Otel Yemek Alanı / Villa",
      ar: "مطعم / مقهى / منطقة طعام فندقية / فيلا",
      ru: "Ресторан / Кафе / Обеденная зона отеля / Вилла",
    },
    desc: {
      en: "A soft curved chair designed for hospitality, restaurant and architectural interiors.",
      tr: "Hospitality, restoran ve mimari iç mekân projeleri için tasarlanmış yumuşak kavisli sandalye modeli.",
      ar: "كرسي بخطوط منحنية ناعمة مصمم لمشاريع الضيافة والمطاعم والمساحات المعمارية الداخلية.",
      ru: "Стул с мягкими изогнутыми линиями, разработанный для hospitality, ресторанов и архитектурных интерьеров.",
    },
    image: "/product-chair-birkin-arc-c01.png",
  },
  {
    slug: "birkin-arc-c01-pad",
    code: "C02",
    name: "BIRKIN ARC C01 PAD",
    category: "Chair",
    collection: "Arc Collection",
    usage: {
      en: "Restaurant / Cafe / Hotel Dining / Villa",
      tr: "Restoran / Kafe / Otel Yemek Alanı / Villa",
      ar: "مطعم / مقهى / منطقة طعام فندقية / فيلا",
      ru: "Ресторан / Кафе / Обеденная зона отеля / Вилла",
    },
    desc: {
      en: "A cushioned version of the BIRKIN ARC chair, designed for longer seating comfort in hospitality and dining projects.",
      tr: "BIRKIN ARC sandalyesinin minderli versiyonu; hospitality ve yemek alanı projelerinde daha uzun süreli oturum konforu için tasarlanmıştır.",
      ar: "نسخة مبطنة من كرسي BIRKIN ARC، مصممة لتوفير راحة جلوس أطول في مشاريع الضيافة ومناطق الطعام.",
      ru: "Версия кресла BIRKIN ARC с мягкой подушкой, созданная для более длительного комфорта в dining и hospitality проектах.",
    },
    image: "/product-chair-birkin-arc-c01-pad.png",
  },
  {
    slug: "birkin-loop-c03",
    code: "C03",
    name: "BIRKIN LOOP C03",
    category: "Chair",
    collection: "Loop Collection",
    usage: {
      en: "Restaurant / Cafe / Hotel Dining / Terrace",
      tr: "Restoran / Kafe / Otel Yemek Alanı / Teras",
      ar: "مطعم / مقهى / منطقة طعام فندقية / تراس",
      ru: "Ресторан / Кафе / Обеденная зона отеля / Терраса",
    },
    desc: {
      en: "A lightweight chair with a rounded metal frame and clean architectural lines, suitable for hospitality dining and cafe projects.",
      tr: "Yuvarlatılmış metal gövdesi ve sade mimari çizgileriyle hospitality, restoran ve kafe projelerine uygun hafif sandalye modeli.",
      ar: "كرسي خفيف بإطار معدني دائري وخطوط معمارية نظيفة، مناسب لمشاريع الضيافة والمطاعم والمقاهي.",
      ru: "Легкий стул с округлым металлическим каркасом и чистыми архитектурными линиями для кафе, ресторанов и hospitality проектов.",
    },
    image: "/product-chair-birkin-loop-c03.png",
  },
  {
    slug: "birkin-loop-c03-pad",
    code: "C04",
    name: "BIRKIN LOOP C03 PAD",
    category: "Chair",
    collection: "Loop Collection",
    usage: {
      en: "Restaurant / Cafe / Hotel Dining / Terrace",
      tr: "Restoran / Kafe / Otel Yemek Alanı / Teras",
      ar: "مطعم / مقهى / منطقة طعام فندقية / تراس",
      ru: "Ресторан / Кафе / Обеденная зона отеля / Терраса",
    },
    desc: {
      en: "A cushioned version of the BIRKIN LOOP chair, offering extra seating comfort with the same rounded architectural frame.",
      tr: "BIRKIN LOOP sandalyesinin minderli versiyonu; aynı yuvarlatılmış mimari gövdeyle ekstra oturum konforu sunar.",
      ar: "نسخة مبطنة من كرسي BIRKIN LOOP، توفر راحة جلوس إضافية مع نفس الإطار المعماري الدائري.",
      ru: "Версия BIRKIN LOOP с мягкой подушкой, обеспечивающая дополнительный комфорт при сохранении округлого архитектурного каркаса.",
    },
    image: "/product-chair-birkin-loop-c03-pad.png",
  },
  {
    slug: "birkin-haven-a01",
    code: "A01",
    name: "BIRKIN HAVEN A01",
    category: "Armchair",
    collection: "Haven Collection",
    usage: {
      en: "Lobby / Lounge / Villa / Hotel Room",
      tr: "Lobi / Lounge / Villa / Otel Odası",
      ar: "لوبي / لاونج / فيلا / غرفة فندقية",
      ru: "Лобби / Лаунж / Вилла / Номер отеля",
    },
    desc: {
      en: "A warm wooden armchair with soft upholstered cushions, designed for lounge, villa and hospitality interiors.",
      tr: "Sıcak ahşap gövdesi ve yumuşak döşemeli minderleriyle lounge, villa ve hospitality iç mekânları için tasarlanmış berjer modeli.",
      ar: "كرسي بذراعين بإطار خشبي دافئ ووسائد منجدة ناعمة، مصمم لمساحات اللاونج والفلل والضيافة.",
      ru: "Кресло с теплым деревянным каркасом и мягкими обитыми подушками для лаунжей, вилл и hospitality интерьеров.",
    },
    image: "/product-armchair-birkin-haven-a01.png",
  },
  {
    slug: "birkin-cocoon-a02",
    code: "A02",
    name: "BIRKIN COCOON A02",
    category: "Armchair",
    collection: "Cocoon Collection",
    usage: {
      en: "Lobby / Lounge / Villa / Hotel Room",
      tr: "Lobi / Lounge / Villa / Otel Odası",
      ar: "لوبي / لاونج / فيلا / غرفة فندقية",
      ru: "Лобби / Лаунж / Вилла / Номер отеля",
    },
    desc: {
      en: "A soft rounded armchair with a cocoon-like form, designed for comfortable lounge, lobby and hospitality interiors.",
      tr: "Koza formuna yakın yumuşak ve yuvarlak hatlı berjer modeli; lounge, lobi ve hospitality iç mekânlarında konforlu oturum için tasarlanmıştır.",
      ar: "كرسي بذراعين ناعم ذو شكل دائري يشبه الشرنقة، مصمم لمساحات اللاونج واللوبي والضيافة المريحة.",
      ru: "Мягкое округлое кресло с формой cocoon, созданное для комфортных lounge, lobby и hospitality интерьеров.",
    },
    image: "/product-armchair-birkin-cocoon-a02.png",
  },
  {
    slug: "birkin-pure-dt01",
    code: "DT01",
    name: "BIRKIN PURE DT01",
    category: "Dining Table",
    collection: "Pure Collection",
    usage: {
      en: "Restaurant / Cafe / Hotel Dining / Villa",
      tr: "Restoran / Kafe / Otel Yemek Alanı / Villa",
      ar: "مطعم / مقهى / منطقة طعام فندقية / فيلا",
      ru: "Ресторан / Кафе / Обеденная зона отеля / Вилла",
    },
    desc: {
      en: "A clean round dining table with a central pedestal base, designed for refined hospitality and dining spaces.",
      tr: "Merkezi ayaklı, sade ve yuvarlak yemek masası; rafine hospitality ve yemek alanları için tasarlanmıştır.",
      ar: "طاولة طعام دائرية نظيفة بقاعدة مركزية، مصممة لمساحات الضيافة والطعام الراقية.",
      ru: "Чистый круглый обеденный стол с центральной опорой, разработанный для refined hospitality и dining пространств.",
    },
    image: "/product-dining-table-birkin-pure-dt01.png",
  },
  {
    slug: "birkin-axis-dt02",
    code: "DT02",
    name: "BIRKIN AXIS DT02",
    category: "Dining Table",
    collection: "Axis Collection",
    usage: {
      en: "Restaurant / Cafe / Hotel Dining / Bistro",
      tr: "Restoran / Kafe / Otel Yemek Alanı / Bistro",
      ar: "مطعم / مقهى / منطقة طعام فندقية / بيسترو",
      ru: "Ресторан / Кафе / Обеденная зона отеля / Бистро",
    },
    desc: {
      en: "A square dining table with a wooden top and central metal pedestal base, designed for restaurants, cafes and hospitality dining areas.",
      tr: "Ahşap tablalı ve merkezi metal ayaklı kare yemek masası; restoran, kafe ve hospitality yemek alanları için tasarlanmıştır.",
      ar: "طاولة طعام مربعة بسطح خشبي وقاعدة معدنية مركزية، مصممة للمطاعم والمقاهي ومساحات الطعام الفندقية.",
      ru: "Квадратный обеденный стол с деревянной столешницей и центральной металлической опорой для ресторанов, кафе и hospitality зон.",
    },
    image: "/product-dining-table-birkin-axis-dt02.png",
  },
  {
    slug: "birkin-haven-l02",
    code: "L02",
    name: "BIRKIN HAVEN L02",
    category: "Lounge",
    collection: "Haven Collection",
    usage: {
      en: "Lobby / Lounge / Villa / Hotel Room",
      tr: "Lobi / Lounge / Villa / Otel Odası",
      ar: "لوبي / لاونج / فيلا / غرفة فندقية",
      ru: "Лобби / Лаунж / Вилла / Номер отеля",
    },
    desc: {
      en: "A two-seat lounge model with a warm wooden frame and soft upholstered cushions, designed for hospitality lounges, villas and hotel interiors.",
      tr: "Sıcak ahşap gövdesi ve yumuşak döşemeli minderleriyle hospitality lounge alanları, villalar ve otel iç mekânları için tasarlanmış ikili oturum modeli.",
      ar: "نموذج لاونج بمقعدين مع إطار خشبي دافئ ووسائد منجدة ناعمة، مصمم للفلل والفنادق ومساحات الضيافة.",
      ru: "Двухместная lounge модель с теплым деревянным каркасом и мягкими подушками для hospitality лаунжей, вилл и отельных интерьеров.",
    },
    image: "/product-lounge-birkin-haven-l02.png",
  },
  {
    slug: "birkin-haven-o01",
    code: "O01",
    name: "BIRKIN HAVEN O01",
    category: "Ottoman",
    collection: "Haven Collection",
    usage: {
      en: "Lobby / Lounge / Villa / Hotel Room",
      tr: "Lobi / Lounge / Villa / Otel Odası",
      ar: "لوبي / لاونج / فيلا / غرفة فندقية",
      ru: "Лобби / Лаунж / Вилла / Номер отеля",
    },
    desc: {
      en: "A soft upholstered ottoman with a warm wooden frame, designed to complement lounge seating in hospitality and residential interiors.",
      tr: "Sıcak ahşap gövdeli, yumuşak döşemeli puf modeli; hospitality ve konut iç mekânlarında lounge oturum gruplarını tamamlamak için tasarlanmıştır.",
      ar: "عثماني منجد ناعم بإطار خشبي دافئ، مصمم ليكمل جلسات اللاونج في مساحات الضيافة والسكن.",
      ru: "Мягкий пуф с теплым деревянным каркасом, созданный для дополнения lounge seating в hospitality и residential интерьерах.",
    },
    image: "/product-ottoman-birkin-haven-o01.png",
  },
  {
    slug: "birkin-cocoon-o02",
    code: "O02",
    name: "BIRKIN COCOON O02",
    category: "Ottoman",
    collection: "Cocoon Collection",
    usage: {
      en: "Lobby / Lounge / Villa / Hotel Room",
      tr: "Lobi / Lounge / Villa / Otel Odası",
      ar: "لوبي / لاونج / فيلا / غرفة فندقية",
      ru: "Лобби / Лаунж / Вилла / Номер отеля",
    },
    desc: {
      en: "A soft rounded ottoman designed to complement the BIRKIN COCOON armchair in lounge, lobby and hospitality interiors.",
      tr: "BIRKIN COCOON berjer ile tamamlayıcı olarak kullanılabilecek, yumuşak yuvarlak hatlı puf modeli.",
      ar: "عثماني ناعم ذو خطوط دائرية، مصمم ليكمل كرسي BIRKIN COCOON في مساحات اللاونج واللوبي والضيافة.",
      ru: "Мягкий округлый пуф, созданный как дополнение к креслу BIRKIN COCOON для lounge, lobby и hospitality интерьеров.",
    },
    image: "/product-ottoman-birkin-cocoon-o02.png",
  },
]

const content = {
  en: {
    nav: ["Home", "Collections", "Products", "Projects", "Contract", "Materials", "Library", "About", "Contact"],
    quote: "Quote List",
    clearList: "Clear List",
    heroKicker: "Custom-Made Contract Furniture",
    heroTitle: "Furniture systems for hospitality spaces.",
    heroText:
      "Collection-based custom-made furniture supply from Türkiye for hotels, restaurants, villas and architectural interiors.",
    heroPrimary: "Explore Collections",
    heroSecondary: "Project Quotation",
    introKicker: "Birkin Contract",
    introTitle: "A quieter, more architectural approach to contract furniture.",
    introText:
      "We organize collection-based product language, project-specific customization, export-suitable packaging and optional third-party inspection for hospitality and architectural projects.",
    collectionsKicker: "Collections",
    collectionsTitle: "Collections designed for project coordination.",
    collectionsText:
      "Each collection groups models with a consistent visual language, making selection easier for architects, procurement teams and investors.",
    productsKicker: "Products",
    productsTitle: "Product index.",
    productsText: "Filter by type, review models and build your quotation list.",
    projectsKicker: "Projects",
    projectsTitle: "Hospitality, villas, restaurants and commercial interiors.",
    projectsText:
      "Birkin Contract supports project-based furniture supply for spaces where visual consistency, durability and delivery coordination matter.",
    contractKicker: "Contract",
    contractTitle: "Custom-made supply from Türkiye.",
    contractText:
      "Custom dimensions, material selection, production coordination, export packaging and optional third-party inspection can be arranged according to project requirements.",
    libraryKicker: "Library",
    libraryTitle: "Documents for project evaluation.",
    libraryText:
      "Access company profile, material directions, export packaging notes and project-based production information.",
    allProducts: "All Products",
    addToQuote: "Add to Quote List",
    added: "Added",
    viewDetails: "View Details",
    backToProducts: "Back to Products",
    productDetailKicker: "Product Detail",
    projectOptions: "Project Options",
    technicalTitle: "Technical Direction",
    technicalSubtitle: "Suggested material and production approach for project-based supply.",
    productSpecsTitle: "Technical Specifications",
    productSpecsText:
      "General technical direction for project-based production. Final specifications may vary according to quantity, project location and requested material standard.",
    productSpecs: [
      ["Frame", "Aluminum, steel or natural wood structure depending on the model and project requirement."],
      ["Seat & Back", "Upholstered seat, loose cushion or molded shell alternatives can be evaluated according to use."],
      ["Foam", "High-density HR foam options suitable for hospitality use and long sitting comfort."],
      ["Fabric", "Indoor, outdoor, UV-resistant and water-repellent fabric alternatives can be selected."],
      ["Finish", "Powder coating, wood stain, lacquer or custom color options according to project needs."],
      ["Usage Areas", "Hotel lobby, restaurant, cafe, villa, lounge, dining area and hospitality interiors."],
      ["Customization", "Dimensions, comfort level, frame color, fabric and surface finish can be adapted for projects."],
      ["Quality", "Internal quality control and optional third-party pre-shipment inspection can be arranged."],
    ],
    technicalBlocks: [
      ["Material Direction", "Frame, upholstery and surface finish can be selected according to indoor, outdoor or hospitality use."],
      ["Production Note", "Prototype or sample review is recommended before mass production for custom-made project orders."],
      ["Customization", "Dimensions, fabric, frame color, wood finish and comfort details can be adapted according to project requirements."],
      ["Export & Quality", "Export-suitable packaging and optional third-party pre-shipment inspection can be arranged upon request."],
    ],
    productCtaKicker: "Project-Based Quotation",
    productCtaTitle: "Interested in this model?",
    productCtaText:
      "Share your quantity, delivery location and project type with us. We can prepare a project-based quotation according to your material and production preferences.",
    productCtaPoints: ["Quantity", "Delivery Location", "Project Type"],
    productCtaButton: "Add This Model to Quote List",
    options: [
      "Custom dimensions according to project requirements",
      "Fabric, frame color and finish alternatives",
      "Sample or prototype review for selected projects",
      "Export-suitable packaging upon request",
      "Optional third-party pre-shipment inspection",
    ],
    categoryLabels: {
      Chair: "Chair",
      Armchair: "Armchair",
      "Dining Table": "Dining Table",
      "Coffee Table": "Coffee Table",
      "Bar Stool": "Bar Stool",
      Lounge: "Lounge",
      Ottoman: "Ottoman",
      Outdoor: "Outdoor",
    } as Record<ProductSection, string>,
    quoteKicker: "Quote List",
    quoteTitle: "Select products and request pricing.",
    quoteText:
      "Add selected products, adjust quantities and send your project details directly to Birkin Contract via WhatsApp or e-mail.",
    empty: "Your quote list is empty. Please add a product first.",
    remove: "Remove",
    whatsapp: "Send Quote Request via WhatsApp",
    emailQuote: "Send Quote Request by E-mail",
    fillAllFields: "Please fill in all required fields before sending your quotation request.",
    fields: {
      name: "Name / Company",
      email: "E-mail",
      phone: "Phone / WhatsApp",
      country: "Country / City",
      projectType: "Project Type",
      deliveryLocation: "Delivery Location",
      notes: "Project notes, dimensions, material preferences",
    },
    materialsKicker: "Materials",
    materialsTitle: "Material directions for project-based production.",
    materialsText:
      "Recommended directions include iroko wood, teak alternatives, outdoor-grade powder coated aluminum, high-density foam and UV-resistant outdoor fabrics.",
    materials: [
      ["Wood", "Iroko, teak and project-based natural wood alternatives."],
      ["Metal", "Outdoor-grade electrostatic powder coating with matte and textured color options."],
      ["Foam", "High-density HR foam options depending on product type and comfort target."],
      ["Fabric", "UV-resistant, water-repellent and mildew-resistant outdoor fabric alternatives."],
    ],
    aboutKicker: "About",
    aboutTitle: "A project partner for architectural furniture needs.",
    aboutText:
      "Birkin Contract is a Türkiye-based custom-made contract furniture supplier for hotels, restaurants, villas, hospitality and architectural projects.",
    contactKicker: "Contact",
    contactTitle: "Tell us about your project.",
    contactText:
      "For accurate pricing, please include product groups, quantities, dimensions, material preferences and delivery location.",
    footerText: "Custom-made contract furniture solutions for hospitality and architectural spaces.",
    rights: "© 2026 Birkin Contract. All rights reserved.",
  },

  tr: {
    nav: ["Ana Sayfa", "Koleksiyonlar", "Ürünler", "Projeler", "Proje Üretimi", "Malzemeler", "Dokümanlar", "Hakkımızda", "İletişim"],
    quote: "Teklif Listesi",
    clearList: "Listeyi Temizle",
    heroKicker: "Özel Üretim Contract Mobilya",
    heroTitle: "Hospitality alanları için mobilya sistemleri.",
    heroText:
      "Türkiye’den otel, restoran, villa ve mimari iç mekân projeleri için koleksiyon bazlı özel üretim mobilya tedariki.",
    heroPrimary: "Koleksiyonları İncele",
    heroSecondary: "Proje Teklifi",
    introKicker: "Birkin Contract",
    introTitle: "Contract mobilyaya daha sakin ve mimari bir yaklaşım.",
    introText:
      "Hospitality ve mimari projeler için koleksiyon bazlı ürün dili, projeye özel özelleştirme, ihracata uygun ambalaj ve opsiyonel üçüncü taraf denetim süreçlerini organize ediyoruz.",
    collectionsKicker: "Koleksiyonlar",
    collectionsTitle: "Proje koordinasyonu için tasarlanmış koleksiyonlar.",
    collectionsText:
      "Her koleksiyon, uyumlu bir görsel dilde modelleri bir araya getirir; mimarlar, satın alma ekipleri ve yatırımcılar için seçim sürecini kolaylaştırır.",
    productsKicker: "Ürünler",
    productsTitle: "Ürün indeksi.",
    productsText: "Ürün tipine göre filtreleyin, modelleri inceleyin ve teklif listenizi oluşturun.",
    projectsKicker: "Projeler",
    projectsTitle: "Hospitality, villa, restoran ve ticari iç mekânlar.",
    projectsText:
      "Birkin Contract; görsel bütünlük, dayanıklılık ve teslimat koordinasyonunun önemli olduğu alanlarda proje bazlı mobilya tedariki sağlar.",
    contractKicker: "Proje Üretimi",
    contractTitle: "Türkiye’den özel üretim tedarik.",
    contractText:
      "Özel ölçü, malzeme seçimi, üretim koordinasyonu, ihracata uygun ambalaj ve opsiyonel üçüncü taraf denetim proje ihtiyacına göre organize edilebilir.",
    libraryKicker: "Dokümanlar",
    libraryTitle: "Proje değerlendirmesi için dokümanlar.",
    libraryText:
      "Company profile, malzeme yönlendirmeleri, ihracat ambalaj notları ve proje bazlı üretim bilgilerine ulaşabilirsiniz.",
    allProducts: "Tüm Ürünler",
    addToQuote: "Teklif Listesine Ekle",
    added: "Eklendi",
    viewDetails: "Detayları İncele",
    backToProducts: "Ürünlere Dön",
    productDetailKicker: "Ürün Detayı",
    projectOptions: "Proje Opsiyonları",
    technicalTitle: "Teknik Yönlendirme",
    technicalSubtitle: "Proje bazlı tedarik için önerilen malzeme ve üretim yaklaşımı.",
    productSpecsTitle: "Teknik Özellikler",
    productSpecsText:
      "Proje bazlı üretim için genel teknik yönlendirmedir. Nihai özellikler adet, proje lokasyonu ve talep edilen malzeme standardına göre değişebilir.",
    productSpecs: [
      ["Gövde", "Modele ve proje ihtiyacına göre alüminyum, çelik veya doğal ahşap taşıyıcı yapı."],
      ["Oturum & Sırt", "Kullanıma göre döşemeli oturum, serbest minder veya form verilmiş gövde alternatifleri değerlendirilebilir."],
      ["Sünger", "Hospitality kullanımına ve uzun süreli oturum konforuna uygun yüksek yoğunluklu HR sünger seçenekleri."],
      ["Kumaş", "İç mekân, dış mekân, UV dayanımlı ve su itici kumaş alternatifleri seçilebilir."],
      ["Yüzey", "Elektrostatik toz boya, ahşap renklendirme, lake veya projeye özel renk seçenekleri."],
      ["Kullanım Alanları", "Otel lobi, restoran, kafe, villa, lounge, yemek alanı ve hospitality iç mekânları."],
      ["Özelleştirme", "Ölçü, konfor seviyesi, gövde rengi, kumaş ve yüzey bitişi projeye göre uyarlanabilir."],
      ["Kalite", "İç kalite kontrol ve talep halinde üçüncü taraf sevkiyat öncesi denetim organize edilebilir."],
    ],
    technicalBlocks: [
      ["Malzeme Yönü", "Gövde, döşeme ve yüzey seçenekleri iç mekân, dış mekân veya hospitality kullanımına göre belirlenebilir."],
      ["Üretim Notu", "Özel üretim proje siparişlerinde seri üretim öncesi numune veya prototip kontrolü önerilir."],
      ["Özelleştirme", "Ölçü, kumaş, gövde rengi, ahşap yüzey ve konfor detayları proje ihtiyacına göre uyarlanabilir."],
      ["İhracat ve Kalite", "Talebe göre ihracata uygun ambalaj ve sevkiyat öncesi üçüncü taraf kalite kontrol organize edilebilir."],
    ],
    productCtaKicker: "Proje Bazlı Teklif",
    productCtaTitle: "Bu modelle ilgileniyor musunuz?",
    productCtaText:
      "Adet, teslimat lokasyonu ve proje tipinizi bizimle paylaşın. Malzeme ve üretim tercihlerinize göre proje bazlı özel teklif hazırlayabiliriz.",
    productCtaPoints: ["Adet", "Teslimat Lokasyonu", "Proje Tipi"],
    productCtaButton: "Bu Modeli Teklif Listesine Ekle",
    options: [
      "Proje ihtiyacına göre özel ölçü çalışması",
      "Kumaş, gövde rengi ve yüzey alternatifleri",
      "Seçili projelerde numune veya prototip değerlendirmesi",
      "Talep halinde ihracata uygun ambalaj",
      "Opsiyonel üçüncü taraf sevkiyat öncesi kalite kontrol",
    ],
    categoryLabels: {
      Chair: "Sandalye",
      Armchair: "Berjer",
      "Dining Table": "Yemek Masası",
      "Coffee Table": "Orta Sehpa",
      "Bar Stool": "Bar Sandalyesi",
      Lounge: "Lounge",
      Ottoman: "Puf",
      Outdoor: "Dış Mekân",
    } as Record<ProductSection, string>,
    quoteKicker: "Teklif Listesi",
    quoteTitle: "Ürünleri seçin, fiyat teklifi talep edin.",
    quoteText:
      "Seçili ürünleri ekleyin, adetleri ayarlayın ve proje bilgilerinizi WhatsApp veya e-mail üzerinden doğrudan Birkin Contract’a gönderin.",
    empty: "Teklif listeniz boş. Lütfen önce bir ürün ekleyin.",
    remove: "Kaldır",
    whatsapp: "WhatsApp’tan Teklif Talebi Gönder",
    emailQuote: "E-mail ile Teklif Talebi Gönder",
    fillAllFields: "Lütfen teklif talebi göndermeden önce tüm alanları doldurun.",
    fields: {
      name: "Ad / Firma",
      email: "E-mail",
      phone: "Telefon / WhatsApp",
      country: "Ülke / Şehir",
      projectType: "Proje Tipi",
      deliveryLocation: "Teslimat Lokasyonu",
      notes: "Proje notları, ölçüler, malzeme tercihleri",
    },
    materialsKicker: "Malzemeler",
    materialsTitle: "Proje bazlı üretim için malzeme yönlendirmeleri.",
    materialsText:
      "Önerilen yönlendirmeler arasında iroko ağacı, teak alternatifleri, dış mekâna uygun elektrostatik toz boyalı alüminyum, yüksek yoğunluklu sünger ve UV dayanımlı outdoor kumaşlar yer alır.",
    materials: [
      ["Ahşap", "Iroko, teak ve projeye özel doğal ahşap alternatifleri."],
      ["Metal", "Dış mekâna uygun elektrostatik toz boya; mat ve dokulu renk seçenekleri."],
      ["Sünger", "Ürün tipi ve konfor hedefine göre yüksek yoğunluklu HR sünger seçenekleri."],
      ["Kumaş", "UV dayanımlı, su itici ve küf dayanımlı dış mekân kumaş alternatifleri."],
    ],
    aboutKicker: "Hakkımızda",
    aboutTitle: "Mimari mobilya ihtiyaçları için proje çözüm partneri.",
    aboutText:
      "Birkin Contract; otel, restoran, villa, hospitality ve mimari projeler için Türkiye merkezli özel üretim contract mobilya tedarikçisidir.",
    contactKicker: "İletişim",
    contactTitle: "Projenizi bize anlatın.",
    contactText:
      "Doğru fiyatlandırma için ürün grupları, adetler, ölçüler, malzeme tercihleri ve teslimat lokasyonunu belirtmenizi rica ederiz.",
    footerText: "Hospitality ve mimari projeler için özel üretim contract mobilya çözümleri.",
    rights: "© 2026 Birkin Contract. Tüm hakları saklıdır.",
  },

  ar: {
    nav: ["الرئيسية", "المجموعات", "المنتجات", "المشاريع", "الإنتاج التعاقدي", "المواد", "المستندات", "من نحن", "اتصال"],
    quote: "قائمة العرض",
    clearList: "مسح القائمة",
    heroKicker: "أثاث تعاقدي مخصص",
    heroTitle: "أنظمة أثاث لمساحات الضيافة.",
    heroText: "توريد أثاث مخصص من تركيا للفنادق والمطاعم والفلل والمشاريع المعمارية.",
    heroPrimary: "استكشف المجموعات",
    heroSecondary: "طلب عرض مشروع",
    introKicker: "Birkin Contract",
    introTitle: "نهج معماري هادئ للأثاث التعاقدي.",
    introText: "ننظم لغة المنتجات حسب المجموعات والتخصيص والتغليف المناسب للتصدير للمشاريع.",
    collectionsKicker: "المجموعات",
    collectionsTitle: "مجموعات مصممة لتنسيق المشاريع.",
    collectionsText: "كل مجموعة تجمع نماذج بلغة بصرية متناسقة لتسهيل اختيار المنتجات.",
    productsKicker: "المنتجات",
    productsTitle: "فهرس المنتجات.",
    productsText: "قم بالتصفية حسب نوع المنتج وأضف النماذج إلى قائمة العرض.",
    projectsKicker: "المشاريع",
    projectsTitle: "الفنادق والفلل والمطاعم والمساحات التجارية.",
    projectsText: "ندعم توريد الأثاث حسب المشروع حيث تكون المتانة والتنسيق مهمة.",
    contractKicker: "الإنتاج التعاقدي",
    contractTitle: "توريد مخصص من تركيا.",
    contractText: "يمكن تنظيم المقاسات الخاصة واختيار المواد وتنسيق الإنتاج والتغليف المناسب للتصدير.",
    libraryKicker: "المستندات",
    libraryTitle: "مستندات لتقييم المشروع.",
    libraryText: "الوصول إلى ملف الشركة ومعلومات المواد والتغليف والإنتاج.",
    allProducts: "كل المنتجات",
    addToQuote: "إضافة إلى قائمة العرض",
    added: "تمت الإضافة",
    viewDetails: "عرض التفاصيل",
    backToProducts: "العودة إلى المنتجات",
    productDetailKicker: "تفاصيل المنتج",
    projectOptions: "خيارات المشروع",
    technicalTitle: "التوجيه الفني",
    technicalSubtitle: "نهج المواد والإنتاج المقترح للتوريد حسب المشروع.",
    productSpecsTitle: "المواصفات الفنية",
    productSpecsText: "توجيه فني عام للإنتاج حسب المشروع. قد تختلف المواصفات النهائية حسب الكمية والموقع والمعايير المطلوبة.",
    productSpecs: [
      ["الهيكل", "هيكل من الألمنيوم أو الفولاذ أو الخشب الطبيعي حسب النموذج ومتطلبات المشروع."],
      ["المقعد والظهر", "خيارات مقعد منجد أو وسادة منفصلة أو هيكل مشكل حسب الاستخدام."],
      ["الإسفنج", "إسفنج عالي الكثافة مناسب لاستخدامات الضيافة وراحة الجلوس الطويلة."],
      ["القماش", "خيارات أقمشة داخلية وخارجية ومقاومة للأشعة فوق البنفسجية وطاردة للماء."],
      ["التشطيب", "طلاء بودرة أو تشطيب خشبي أو لون خاص حسب متطلبات المشروع."],
      ["مجالات الاستخدام", "لوبي فندقي، مطعم، مقهى، فيلا، لاونج ومناطق ضيافة داخلية."],
      ["التخصيص", "يمكن تخصيص المقاسات ومستوى الراحة واللون والقماش والتشطيب حسب المشروع."],
      ["الجودة", "يمكن تنظيم مراقبة جودة داخلية وفحص طرف ثالث قبل الشحن عند الطلب."],
    ],
    technicalBlocks: [
      ["اتجاه المواد", "يمكن اختيار الهيكل والتنجيد والتشطيب حسب الاستخدام."],
      ["ملاحظة الإنتاج", "يوصى بمراجعة عينة أو نموذج أولي قبل الإنتاج الكمي."],
      ["التخصيص", "يمكن تعديل المقاسات والأقمشة والألوان والتشطيبات حسب المشروع."],
      ["التصدير والجودة", "يمكن تنظيم تغليف مناسب للتصدير وفحص طرف ثالث عند الطلب."],
    ],
    productCtaKicker: "عرض سعر حسب المشروع",
    productCtaTitle: "هل أنت مهتم بهذا النموذج؟",
    productCtaText: "شاركنا الكمية وموقع التسليم ونوع المشروع لإعداد عرض سعر.",
    productCtaPoints: ["الكمية", "موقع التسليم", "نوع المشروع"],
    productCtaButton: "إضافة هذا النموذج إلى قائمة العرض",
    options: ["مقاسات مخصصة", "بدائل الأقمشة والتشطيبات", "مراجعة عينة لبعض المشاريع", "تغليف مناسب للتصدير", "فحص جودة اختياري"],
    categoryLabels: {
      Chair: "كرسي",
      Armchair: "كرسي بذراعين",
      "Dining Table": "طاولة طعام",
      "Coffee Table": "طاولة قهوة",
      "Bar Stool": "كرسي بار",
      Lounge: "لاونج",
      Ottoman: "عثماني",
      Outdoor: "خارجي",
    } as Record<ProductSection, string>,
    quoteKicker: "قائمة العرض",
    quoteTitle: "اختر المنتجات واطلب السعر.",
    quoteText: "أضف المنتجات المختارة وأرسل تفاصيل مشروعك عبر واتساب أو البريد الإلكتروني.",
    empty: "قائمة العرض فارغة. يرجى إضافة منتج أولاً.",
    remove: "إزالة",
    whatsapp: "إرسال طلب السعر عبر واتساب",
    emailQuote: "إرسال طلب السعر عبر البريد الإلكتروني",
    fillAllFields: "يرجى تعبئة جميع الحقول قبل إرسال طلب عرض السعر.",
    fields: {
      name: "الاسم / الشركة",
      email: "البريد الإلكتروني",
      phone: "الهاتف / واتساب",
      country: "الدولة / المدينة",
      projectType: "نوع المشروع",
      deliveryLocation: "موقع التسليم",
      notes: "ملاحظات المشروع، المقاسات، تفضيلات المواد",
    },
    materialsKicker: "المواد",
    materialsTitle: "توجيهات المواد للإنتاج حسب المشروع.",
    materialsText: "تشمل الخيارات الخشب الطبيعي والألمنيوم المطلي والإسفنج عالي الكثافة والأقمشة الخارجية.",
    materials: [
      ["الخشب", "إيروكو، تيك وبدائل خشب طبيعية."],
      ["المعدن", "طلاء بودرة كهربائي مناسب للخارج."],
      ["الإسفنج", "خيارات إسفنج عالي الكثافة."],
      ["الأقمشة", "أقمشة مقاومة للأشعة فوق البنفسجية."],
    ],
    aboutKicker: "من نحن",
    aboutTitle: "شريك مشاريع لاحتياجات الأثاث المعماري.",
    aboutText: "Birkin Contract مورد أثاث تعاقدي مخصص من تركيا لمشاريع الضيافة والمعمار.",
    contactKicker: "اتصال",
    contactTitle: "أخبرنا عن مشروعك.",
    contactText: "للحصول على تسعير دقيق، يرجى ذكر المنتجات والكميات والمقاسات وموقع التسليم.",
    footerText: "حلول أثاث تعاقدي مخصصة لمشاريع الضيافة.",
    rights: "© 2026 Birkin Contract. جميع الحقوق محفوظة.",
  },

  ru: {
    nav: ["Главная", "Коллекции", "Продукты", "Проекты", "Контрактное производство", "Материалы", "Документы", "О нас", "Контакты"],
    quote: "Список запроса",
    clearList: "Очистить список",
    heroKicker: "Custom-Made Contract Furniture",
    heroTitle: "Мебельные системы для hospitality пространств.",
    heroText: "Поставка мебели из Турции для отелей, ресторанов, вилл и архитектурных интерьеров.",
    heroPrimary: "Изучить коллекции",
    heroSecondary: "Проектный запрос",
    introKicker: "Birkin Contract",
    introTitle: "Более спокойный и архитектурный подход к contract furniture.",
    introText: "Мы организуем коллекционный язык продуктов, кастомизацию, экспортную упаковку и инспекцию.",
    collectionsKicker: "Коллекции",
    collectionsTitle: "Коллекции для проектной координации.",
    collectionsText: "Каждая коллекция объединяет модели с согласованным визуальным языком.",
    productsKicker: "Продукты",
    productsTitle: "Индекс продуктов.",
    productsText: "Фильтруйте по типу, изучайте модели и создавайте список запроса.",
    projectsKicker: "Проекты",
    projectsTitle: "Отели, виллы, рестораны и коммерческие интерьеры.",
    projectsText: "Birkin Contract поддерживает проектную поставку мебели для hospitality пространств.",
    contractKicker: "Контрактное производство",
    contractTitle: "Индивидуальная поставка из Турции.",
    contractText: "Индивидуальные размеры, материалы, координация производства, экспортная упаковка и инспекция.",
    libraryKicker: "Документы",
    libraryTitle: "Документы для оценки проекта.",
    libraryText: "Профиль компании, материалы, экспортная упаковка и информация о производстве.",
    allProducts: "Все продукты",
    addToQuote: "Добавить в запрос",
    added: "Добавлено",
    viewDetails: "Подробнее",
    backToProducts: "Вернуться к продуктам",
    productDetailKicker: "Детали продукта",
    projectOptions: "Проектные опции",
    technicalTitle: "Техническое направление",
    technicalSubtitle: "Рекомендуемый подход к материалам и производству.",
    productSpecsTitle: "Технические характеристики",
    productSpecsText: "Общее техническое направление для проектного производства. Финальные спецификации могут меняться по проекту.",
    productSpecs: [
      ["Каркас", "Алюминий, сталь или натуральное дерево в зависимости от модели и проекта."],
      ["Сиденье и спинка", "Обивка, свободная подушка или формованный корпус по типу использования."],
      ["Пена", "Высокоплотная HR-пена для hospitality использования и длительного комфорта."],
      ["Ткань", "Indoor, outdoor, UV-resistant и water-repellent варианты тканей."],
      ["Отделка", "Порошковая окраска, отделка дерева, лак или индивидуальный цвет."],
      ["Зоны применения", "Лобби отеля, ресторан, кафе, вилла, lounge, dining area и hospitality interiors."],
      ["Кастомизация", "Размеры, комфорт, цвет каркаса, ткань и отделка адаптируются под проект."],
      ["Качество", "Внутренний контроль качества и инспекция третьей стороной перед отгрузкой по запросу."],
    ],
    technicalBlocks: [
      ["Материалы", "Каркас, обивка и отделка подбираются под проект."],
      ["Производство", "Перед массовым производством рекомендуется образец."],
      ["Кастомизация", "Размеры, ткань, цвет каркаса и отделка адаптируются."],
      ["Экспорт и качество", "Экспортная упаковка и инспекция возможны по запросу."],
    ],
    productCtaKicker: "Проектное предложение",
    productCtaTitle: "Интересует эта модель?",
    productCtaText: "Поделитесь количеством, местом доставки и типом проекта.",
    productCtaPoints: ["Количество", "Место доставки", "Тип проекта"],
    productCtaButton: "Добавить модель в запрос",
    options: ["Индивидуальные размеры", "Варианты ткани и отделки", "Образец для отдельных проектов", "Экспортная упаковка", "Опциональная инспекция"],
    categoryLabels: {
      Chair: "Стул",
      Armchair: "Кресло",
      "Dining Table": "Обеденный стол",
      "Coffee Table": "Журнальный стол",
      "Bar Stool": "Барный стул",
      Lounge: "Лаунж",
      Ottoman: "Пуф",
      Outdoor: "Уличная мебель",
    } as Record<ProductSection, string>,
    quoteKicker: "Список запроса",
    quoteTitle: "Выберите продукты и запросите цену.",
    quoteText: "Добавьте выбранные продукты и отправьте детали проекта через WhatsApp или e-mail.",
    empty: "Список пуст. Сначала добавьте продукт.",
    remove: "Удалить",
    whatsapp: "Отправить запрос через WhatsApp",
    emailQuote: "Отправить запрос по e-mail",
    fillAllFields: "Пожалуйста, заполните все поля перед отправкой запроса.",
    fields: {
      name: "Имя / Компания",
      email: "E-mail",
      phone: "Телефон / WhatsApp",
      country: "Страна / Город",
      projectType: "Тип проекта",
      deliveryLocation: "Место доставки",
      notes: "Заметки, размеры, материалы",
    },
    materialsKicker: "Материалы",
    materialsTitle: "Материальные направления для проектного производства.",
    materialsText: "Рекомендации включают дерево, окрашенный алюминий, HR-пену и outdoor ткани.",
    materials: [
      ["Дерево", "Iroko, teak и древесные альтернативы."],
      ["Металл", "Outdoor powder coating."],
      ["Пена", "Высокоплотная HR-пена."],
      ["Ткань", "UV-resistant outdoor ткани."],
    ],
    aboutKicker: "О нас",
    aboutTitle: "Проектный партнер для архитектурной мебели.",
    aboutText: "Birkin Contract — поставщик custom-made contract furniture из Турции.",
    contactKicker: "Контакты",
    contactTitle: "Расскажите нам о вашем проекте.",
    contactText: "Для точной оценки укажите продукты, количество, размеры, материалы и место доставки.",
    footerText: "Индивидуальные решения contract furniture для hospitality.",
    rights: "© 2026 Birkin Contract. Все права защищены.",
  },
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const savedLang = localStorage.getItem("birkin-language") as Lang | null
    if (savedLang === "en" || savedLang === "tr" || savedLang === "ar" || savedLang === "ru") return savedLang
    return "en"
  })

  const [selectedSection, setSelectedSection] = useState<ProductSection | "All">("All")
  const [heroProductIndex, setHeroProductIndex] = useState(0)
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("birkin-quote-cart")
    if (!savedCart) return []

    try {
      return JSON.parse(savedCart) as CartItem[]
    } catch {
      return []
    }
  })

  const [quoteInfo, setQuoteInfo] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    projectType: "",
    deliveryLocation: "",
    notes: "",
  })

  useEffect(() => {
    localStorage.setItem("birkin-quote-cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeroProductIndex((current) => (current + 1) % products.length)
    }, 2600)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname)
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  const t = content[lang]
  const heroProduct = products[heroProductIndex]

  const activeProductSlug = currentPath.startsWith("/products/")
    ? currentPath.replace("/products/", "").replace("/", "")
    : ""

  const activeProduct = products.find((product) => product.slug === activeProductSlug)

  useEffect(() => {
    const baseTitle =
      "Birkin Contract | Custom-Made Contract Furniture Supplier from Türkiye"

    const baseDescription =
      "Birkin Contract is a Türkiye-based custom-made contract furniture supplier for hotels, restaurants, villas, hospitality and architectural projects."

    if (activeProduct) {
      const title = `${activeProduct.name} | ${activeProduct.collection} | Birkin Contract`
      const description = `${activeProduct.name} is part of ${activeProduct.collection}, designed for hotels, restaurants, villas, hospitality and architectural projects.`
      const productUrl = `https://birkin-contract-site.vercel.app/products/${activeProduct.slug}`
      const productImage = `https://birkin-contract-site.vercel.app${activeProduct.image}`

      document.title = title
      updateMetaTag("description", description)
      updateOgTag("og:title", title)
      updateOgTag("og:description", description)
      updateOgTag("og:url", productUrl)
      updateOgTag("og:image", productImage)
      updateMetaTag("twitter:title", title)
      updateMetaTag("twitter:description", description)
      updateMetaTag("twitter:image", productImage)
    } else {
      document.title = baseTitle
      updateMetaTag("description", baseDescription)
      updateOgTag("og:title", baseTitle)
      updateOgTag("og:description", baseDescription)
      updateOgTag("og:url", "https://birkin-contract-site.vercel.app/")
      updateOgTag("og:image", "https://birkin-contract-site.vercel.app/birkin-logo.png")
      updateMetaTag("twitter:title", "Birkin Contract | Contract Furniture Supplier from Türkiye")
      updateMetaTag("twitter:description", "Project-based custom-made contract furniture solutions for hospitality and architectural spaces.")
      updateMetaTag("twitter:image", "https://birkin-contract-site.vercel.app/birkin-logo.png")
    }
  }, [activeProduct])

  const filteredProducts =
    selectedSection === "All"
      ? products
      : products.filter((product) => product.category === selectedSection)

  const changeLanguage = (newLang: Lang) => {
    setLang(newLang)
    localStorage.setItem("birkin-language", newLang)
  }

  const goTo = (path: string) => {
    window.history.pushState({}, "", path)
    setCurrentPath(window.location.pathname)

    const hash = path.includes("#") ? path.split("#")[1] : ""

    if (hash) {
      setTimeout(() => {
        const target = document.getElementById(hash)
        target?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 120)

      return
    }

    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const addToCart = (product: Product) => {
    setCart((current) => {
      const exists = current.find((item) => item.name === product.name)
      if (exists) return current

      return [
        ...current,
        {
          code: product.code,
          name: product.name,
          category: product.category,
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

  const clearCart = () => {
    setCart([])
    localStorage.removeItem("birkin-quote-cart")
  }

  const isQuoteFormComplete =
    cart.length > 0 &&
    quoteInfo.name.trim() !== "" &&
    quoteInfo.email.trim() !== "" &&
    quoteInfo.phone.trim() !== "" &&
    quoteInfo.country.trim() !== "" &&
    quoteInfo.projectType.trim() !== "" &&
    quoteInfo.deliveryLocation.trim() !== "" &&
    quoteInfo.notes.trim() !== ""

  const selectedProductsText =
    cart.length === 0
      ? "-"
      : cart
          .map(
            (item) =>
              `- ${item.code} / ${item.name} / ${t.categoryLabels[item.category]} x ${item.qty}`
          )
          .join("\n")

  const whatsappQuoteLink = useMemo(() => {
    const message =
      lang === "tr"
        ? `Merhaba Birkin Contract Ekibi,

Aşağıda seçtiğim ürünler için proje bazlı fiyat teklifi almak istiyorum.

Seçilen Ürünler:
${selectedProductsText}

Proje Bilgileri:
Ad / Firma: ${quoteInfo.name}
E-mail: ${quoteInfo.email}
Telefon / WhatsApp: ${quoteInfo.phone}
Ülke / Şehir: ${quoteInfo.country}
Proje Tipi: ${quoteInfo.projectType}
Teslimat Lokasyonu: ${quoteInfo.deliveryLocation}

Notlar:
${quoteInfo.notes}

Lütfen fiyat, üretim süresi ve ihracata uygun ambalaj detaylarını paylaşır mısınız?`
        : `Hello Birkin Contract Team,

I would like to request a project-based quotation for the selected models below.

Selected Products:
${selectedProductsText}

Project Details:
Name / Company: ${quoteInfo.name}
E-mail: ${quoteInfo.email}
Phone / WhatsApp: ${quoteInfo.phone}
Country / City: ${quoteInfo.country}
Project Type: ${quoteInfo.projectType}
Delivery Location: ${quoteInfo.deliveryLocation}

Notes:
${quoteInfo.notes}

Please share pricing, production lead time and export packaging details.`

    return `https://wa.me/905525000320?text=${encodeURIComponent(message)}`
  }, [selectedProductsText, quoteInfo, lang])

  const emailQuoteLink = useMemo(() => {
    const subject =
      lang === "tr"
        ? "Birkin Contract - Proje Bazlı Teklif Talebi"
        : lang === "ar"
          ? "Birkin Contract - طلب عرض سعر حسب المشروع"
          : lang === "ru"
            ? "Birkin Contract - Проектный запрос предложения"
            : "Birkin Contract - Project-Based Quotation Request"

    const body =
      lang === "tr"
        ? `Merhaba Birkin Contract Ekibi,

Aşağıda seçtiğim ürünler için proje bazlı fiyat teklifi almak istiyorum.

Seçilen Ürünler:
${selectedProductsText}

Proje Bilgileri:
Ad / Firma: ${quoteInfo.name}
E-mail: ${quoteInfo.email}
Telefon / WhatsApp: ${quoteInfo.phone}
Ülke / Şehir: ${quoteInfo.country}
Proje Tipi: ${quoteInfo.projectType}
Teslimat Lokasyonu: ${quoteInfo.deliveryLocation}

Notlar:
${quoteInfo.notes}

Lütfen fiyat, üretim süresi, ödeme şartları ve ihracata uygun ambalaj detaylarını paylaşır mısınız?

Teşekkürler.`
        : lang === "ar"
          ? `مرحباً فريق Birkin Contract،

أود طلب عرض سعر حسب المشروع للمنتجات المختارة أدناه.

المنتجات المختارة:
${selectedProductsText}

تفاصيل المشروع:
الاسم / الشركة: ${quoteInfo.name}
البريد الإلكتروني: ${quoteInfo.email}
الهاتف / واتساب: ${quoteInfo.phone}
الدولة / المدينة: ${quoteInfo.country}
نوع المشروع: ${quoteInfo.projectType}
موقع التسليم: ${quoteInfo.deliveryLocation}

ملاحظات:
${quoteInfo.notes}

يرجى مشاركة السعر ومدة الإنتاج وشروط الدفع وتفاصيل التغليف المناسب للتصدير.

شكراً.`
          : lang === "ru"
            ? `Здравствуйте, команда Birkin Contract,

Я хотел(а) бы запросить проектное предложение по выбранным моделям ниже.

Выбранные продукты:
${selectedProductsText}

Детали проекта:
Имя / Компания: ${quoteInfo.name}
E-mail: ${quoteInfo.email}
Телефон / WhatsApp: ${quoteInfo.phone}
Страна / Город: ${quoteInfo.country}
Тип проекта: ${quoteInfo.projectType}
Место доставки: ${quoteInfo.deliveryLocation}

Заметки:
${quoteInfo.notes}

Пожалуйста, отправьте цену, срок производства, условия оплаты и детали экспортной упаковки.

Спасибо.`
            : `Hello Birkin Contract Team,

I would like to request a project-based quotation for the selected models below.

Selected Products:
${selectedProductsText}

Project Details:
Name / Company: ${quoteInfo.name}
E-mail: ${quoteInfo.email}
Phone / WhatsApp: ${quoteInfo.phone}
Country / City: ${quoteInfo.country}
Project Type: ${quoteInfo.projectType}
Delivery Location: ${quoteInfo.deliveryLocation}

Notes:
${quoteInfo.notes}

Please share pricing, production lead time, payment terms and export packaging details.

Thank you.`

    return `mailto:burak@birkin.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }, [selectedProductsText, quoteInfo, lang])

  const handleWhatsappQuote = () => {
    if (cart.length === 0) {
      alert(t.empty)
      return
    }

    if (!isQuoteFormComplete) {
      alert(t.fillAllFields)
      return
    }

    window.open(whatsappQuoteLink, "_blank", "noopener,noreferrer")
  }

  const handleEmailQuote = () => {
    if (cart.length === 0) {
      alert(t.empty)
      return
    }

    if (!isQuoteFormComplete) {
      alert(t.fillAllFields)
      return
    }

    window.location.href = emailQuoteLink
  }

  const Header = () => (
    <header className="navbar editorialNavbar">
      <button type="button" className="brand brandButton" onClick={() => goTo("/")}>
        <BirkinLogo />
      </button>

      <nav>
        <a href="/" onClick={(e) => { e.preventDefault(); goTo("/") }}>{t.nav[0]}</a>
        <a href="/#collections" onClick={(e) => { e.preventDefault(); goTo("/#collections") }}>{t.nav[1]}</a>
        <a href="/#products" onClick={(e) => { e.preventDefault(); goTo("/#products") }}>{t.nav[2]}</a>
        <a href="/#projects" onClick={(e) => { e.preventDefault(); goTo("/#projects") }}>{t.nav[3]}</a>
        <a href="/#contract" onClick={(e) => { e.preventDefault(); goTo("/#contract") }}>{t.nav[4]}</a>
        <a href="/#materials" onClick={(e) => { e.preventDefault(); goTo("/#materials") }}>{t.nav[5]}</a>
        <a href="/#library" onClick={(e) => { e.preventDefault(); goTo("/#library") }}>{t.nav[6]}</a>
        <a href="/#about" onClick={(e) => { e.preventDefault(); goTo("/#about") }}>{t.nav[7]}</a>
        <a href="/#contact" onClick={(e) => { e.preventDefault(); goTo("/#contact") }}>{t.nav[8]}</a>
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

        <button
          type="button"
          className="navBtn"
          onClick={() => goTo("/#quote-list")}
        >
          {t.quote}
        </button>
      </div>
    </header>
  )

  const Footer = () => (
    <>
      <footer className="footer">
        <div>
          <BirkinLogo />
          <p>{t.footerText}</p>
        </div>

        <div className="footerLinks">
          <a href="#collections">{t.nav[1]}</a>
          <a href="#products">{t.nav[2]}</a>
          <a href="#projects">{t.nav[3]}</a>
          <a href="#contract">{t.nav[4]}</a>
          <a href="#materials">{t.nav[5]}</a>
          <a href="#contact">{t.nav[8]}</a>
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
    </>
  )

  if (currentPath.startsWith("/products/")) {
    if (!activeProduct) {
      return (
        <main dir={lang === "ar" ? "rtl" : "ltr"}>
          <Header />

          <section className="section productDetailSection">
            <button type="button" className="secondaryBtn" onClick={() => goTo("/#products")}>
              {t.backToProducts}
            </button>

            <h1 className="notFoundTitle">Product not found.</h1>
          </section>

          <Footer />
        </main>
      )
    }

    const relatedProducts = products
      .filter(
        (product) =>
          product.collection === activeProduct.collection &&
          product.slug !== activeProduct.slug
      )
      .slice(0, 3)

    return (
      <main dir={lang === "ar" ? "rtl" : "ltr"}>
        <Header />

        <section className="productDetailHero editorialProductHero">
          <div className="productDetailImage">
            <img src={activeProduct.image} alt={activeProduct.name} />
          </div>

          <div className="productDetailContent">
            <button type="button" className="secondaryBtn backProductBtn" onClick={() => goTo("/#products")}>
              {t.backToProducts}
            </button>

            <span className="kicker">{activeProduct.collection}</span>

            <div className="productDetailMeta">
              {activeProduct.code} / {t.categoryLabels[activeProduct.category]}
            </div>

            <h1>{activeProduct.name}</h1>

            <p className="productDetailUsage">{activeProduct.usage[lang]}</p>

            <p className="productDetailDesc">{activeProduct.desc[lang]}</p>

            <div className="productDetailOptions">
              <h3>{t.projectOptions}</h3>

              <ul>
                {t.options.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="productDetailActions">
              <button
                type="button"
                className="primaryBtn"
                onClick={() => addToCart(activeProduct)}
              >
                {cart.some((item) => item.name === activeProduct.name)
                  ? `✓ ${t.added}`
                  : t.addToQuote}
              </button>

              <button
                type="button"
                className="secondaryBtn"
                onClick={() => goTo("/#quote-list")}
              >
                {t.quote}
              </button>
            </div>
          </div>
        </section>

        <section className="section technicalDetailSection">
          <div className="sectionHead editorialHead">
            <span className="kicker">{activeProduct.collection}</span>
            <h2>{t.productSpecsTitle}</h2>
            <p>{t.productSpecsText}</p>
          </div>

          <div className="technicalGrid">
            {t.productSpecs.map(([title, text], index) => (
              <div className="technicalCard" key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section materialsSection">
          <div className="sectionHead editorialHead">
            <span className="kicker">{activeProduct.name}</span>
            <h2>{t.technicalTitle}</h2>
            <p>{t.technicalSubtitle}</p>
          </div>

          <div className="technicalGrid">
            {t.technicalBlocks.map(([title, text], index) => (
              <div className="technicalCard" key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section productCtaSection">
          <div className="productCtaBox">
            <div>
              <span className="kicker">{t.productCtaKicker}</span>
              <h2>{t.productCtaTitle}</h2>
              <p>{t.productCtaText}</p>
            </div>

            <div className="productCtaSide">
              <div className="productCtaPoints">
                {t.productCtaPoints.map((point, index) => (
                  <div className="productCtaPoint" key={point}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{point}</strong>
                  </div>
                ))}
              </div>

              <div className="productCtaActions">
                <button
                  type="button"
                  className="primaryBtn"
                  onClick={() => addToCart(activeProduct)}
                >
                  {cart.some((item) => item.name === activeProduct.name)
                    ? `✓ ${t.added}`
                    : t.productCtaButton}
                </button>

                <button
                  type="button"
                  className="secondaryBtn"
                  onClick={() => goTo("/#quote-list")}
                >
                  {t.quote}
                </button>
              </div>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="section modelsSection">
            <div className="sectionHead editorialHead">
              <span className="kicker">{activeProduct.collection}</span>
              <h2>{t.collectionsTitle}</h2>
              <p>{t.collectionsText}</p>
            </div>

            <div className="productEditorialGrid">
              {relatedProducts.map((product) => (
                <article
                  className="productEditorialCard clickableModelCard"
                  key={product.name}
                  onClick={() => goTo(`/products/${product.slug}`)}
                >
                  <div className="productEditorialImage">
                    <img src={product.image} alt={product.name} />
                  </div>

                  <div className="productEditorialInfo">
                    <span>{product.code}</span>
                    <h3>{product.name}</h3>
                    <p>{product.desc[lang]}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <Footer />
      </main>
    )
  }

  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"}>
      <Header />

      <section className="editorialHero">
        <div className="editorialHeroText">
          <span className="kicker">{t.heroKicker}</span>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>

          <div className="heroButtons">
            <a href="#collections" className="primaryBtn">
              {t.heroPrimary}
            </a>
            <a href="#quote-list" className="secondaryBtn">
              {t.heroSecondary}
            </a>
          </div>
        </div>

        <div className="editorialHeroMedia">
          <span className="editorialHeroLabel">{heroProduct.collection}</span>
          <img
            key={heroProduct.name}
            src={heroProduct.image}
            alt={heroProduct.name}
          />
        </div>
      </section>

      <section className="statementBand">
        <span>{t.introKicker}</span>
        <h2>{t.introTitle}</h2>
        <p>{t.introText}</p>
      </section>

      <section id="collections" className="section collectionShowcase">
        <div className="sectionHead editorialHead">
          <span className="kicker">{t.collectionsKicker}</span>
          <h2>{t.collectionsTitle}</h2>
          <p>{t.collectionsText}</p>
        </div>

        <div className="collectionFeatureGrid">
          {collections.map((collection, index) => {
            const collectionItems = products.filter((product) => product.collection === collection)
            const coverProduct = collectionItems[0]

            return (
              <article
                className="collectionFeatureCard"
                key={collection}
                onClick={() => {
                  if (coverProduct) goTo(`/products/${coverProduct.slug}`)
                }}
              >
                <div className="collectionFeatureImage">
                  {coverProduct && <img src={coverProduct.image} alt={collection} />}
                </div>

                <div className="collectionFeatureInfo">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{collection}</h3>
                  <p>{collectionItems.length} models</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section id="products" className="section productIndexSection">
        <div className="sectionHead editorialHead">
          <span className="kicker">{t.productsKicker}</span>
          <h2>{t.productsTitle}</h2>
          <p>{t.productsText}</p>
        </div>

        <div className="typeFilterRow">
          <button
            type="button"
            className={selectedSection === "All" ? "typeFilter active" : "typeFilter"}
            onClick={() => setSelectedSection("All")}
          >
            {t.allProducts}
          </button>

          {productSections.map((section) => (
            <button
              type="button"
              key={section}
              className={selectedSection === section ? "typeFilter active" : "typeFilter"}
              onClick={() => setSelectedSection(section)}
            >
              {t.categoryLabels[section]}
            </button>
          ))}
        </div>

        <div className="productEditorialGrid">
          {filteredProducts.map((product) => (
            <article
              className="productEditorialCard clickableModelCard"
              key={product.name}
              onClick={() => goTo(`/products/${product.slug}`)}
            >
              <div className="productEditorialImage">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="productEditorialInfo">
                <span>
                  {product.code} / {product.collection}
                </span>
                <h3>{product.name}</h3>
                <p>{product.desc[lang]}</p>

                <div className="modelActions">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      goTo(`/products/${product.slug}`)
                    }}
                    className="detailBtn"
                  >
                    {t.viewDetails}
                  </button>

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      addToCart(product)
                    }}
                    className="modelBtn"
                  >
                    {cart.some((item) => item.name === product.name)
                      ? `✓ ${t.added}`
                      : t.addToQuote}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="editorialPanel darkPanel">
        <div>
          <span className="kicker">{t.projectsKicker}</span>
          <h2>{t.projectsTitle}</h2>
        </div>
        <p>{t.projectsText}</p>
      </section>

      <section id="contract" className="editorialPanel lightPanel">
        <div>
          <span className="kicker">{t.contractKicker}</span>
          <h2>{t.contractTitle}</h2>
        </div>
        <p>{t.contractText}</p>
      </section>

      <section id="materials" className="section materialsSection">
        <div className="sectionHead editorialHead">
          <span className="kicker">{t.materialsKicker}</span>
          <h2>{t.materialsTitle}</h2>
          <p>{t.materialsText}</p>
        </div>

        <div className="materialsGrid">
          {t.materials.map(([title, text], index) => (
            <div className="materialCard" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="library" className="section librarySection">
        <div className="libraryBox">
          <div>
            <span className="kicker">{t.libraryKicker}</span>
            <h2>{t.libraryTitle}</h2>
            <p>{t.libraryText}</p>
          </div>

          <a
            href="/birkin-company-profile.pdf"
            target="_blank"
            rel="noreferrer"
            className="primaryBtn"
          >
            Company Profile PDF
          </a>
        </div>
      </section>

      <section id="about" className="editorialPanel lightPanel">
        <div>
          <span className="kicker">{t.aboutKicker}</span>
          <h2>{t.aboutTitle}</h2>
        </div>
        <p>{t.aboutText}</p>
      </section>

      <section id="quote-list" className="section quoteSection">
        <div className="sectionHead editorialHead">
          <span className="kicker">{t.quoteKicker}</span>
          <h2>{t.quoteTitle}</h2>
          <p>{t.quoteText}</p>
        </div>

        <div className="quoteLayout">
          <div className="quoteBox">
            {cart.length === 0 ? (
              <p className="emptyText">{t.empty}</p>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
                  <button
                    type="button"
                    className="removeBtn"
                    onClick={clearCart}
                  >
                    {t.clearList}
                  </button>
                </div>

                <div className="quoteItems">
                  {cart.map((item) => (
                    <div className="quoteItem" key={item.name}>
                      <div>
                        <small>
                          {item.code} / {t.categoryLabels[item.category]}
                        </small>
                        <strong>{item.name}</strong>
                      </div>

                      <div className="qtyControls">
                        <button type="button" onClick={() => decreaseQty(item.name)}>
                          -
                        </button>
                        <span>{item.qty}</span>
                        <button type="button" onClick={() => increaseQty(item.name)}>
                          +
                        </button>
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
              </>
            )}
          </div>

          <div className="quoteForm">
            <input required placeholder={t.fields.name} value={quoteInfo.name} onChange={(e) => setQuoteInfo({ ...quoteInfo, name: e.target.value })} />
            <input required placeholder={t.fields.email} value={quoteInfo.email} onChange={(e) => setQuoteInfo({ ...quoteInfo, email: e.target.value })} />
            <input required placeholder={t.fields.phone} value={quoteInfo.phone} onChange={(e) => setQuoteInfo({ ...quoteInfo, phone: e.target.value })} />
            <input required placeholder={t.fields.country} value={quoteInfo.country} onChange={(e) => setQuoteInfo({ ...quoteInfo, country: e.target.value })} />
            <input required placeholder={t.fields.projectType} value={quoteInfo.projectType} onChange={(e) => setQuoteInfo({ ...quoteInfo, projectType: e.target.value })} />
            <input required placeholder={t.fields.deliveryLocation} value={quoteInfo.deliveryLocation} onChange={(e) => setQuoteInfo({ ...quoteInfo, deliveryLocation: e.target.value })} />
            <textarea required placeholder={t.fields.notes} value={quoteInfo.notes} onChange={(e) => setQuoteInfo({ ...quoteInfo, notes: e.target.value })} />

            <div className="quoteActionButtons">
              <button
                type="button"
                className="whatsappQuoteBtn"
                onClick={handleWhatsappQuote}
                style={{
                  opacity: isQuoteFormComplete ? 1 : 0.55,
                  cursor: isQuoteFormComplete ? "pointer" : "not-allowed",
                }}
              >
                {t.whatsapp}
              </button>

              <button
                type="button"
                className="emailQuoteBtn"
                onClick={handleEmailQuote}
                style={{
                  opacity: isQuoteFormComplete ? 1 : 0.55,
                  cursor: isQuoteFormComplete ? "pointer" : "not-allowed",
                }}
              >
                {t.emailQuote}
              </button>
            </div>
          </div>
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

      <Footer />
    </main>
  )
}
