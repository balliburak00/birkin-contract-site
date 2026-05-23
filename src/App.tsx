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
    heroTitle: "Project furniture shaped by collections, materials and contract needs.",
    heroText:
      "Türkiye-based contract furniture supply for hotels, restaurants, villas, hospitality and architectural projects.",
    heroPrimary: "Explore Collections",
    heroSecondary: "View Products",
    collectionsKicker: "Collections",
    collectionsTitle: "A collection-based product language.",
    collectionsText:
      "Birkin Contract presents products through a clean collection structure, helping architects and procurement teams select coordinated models for hospitality projects.",
    productsKicker: "Products",
    productsTitle: "Products by type.",
    productsText: "Filter models by product type and add selected pieces to your quote list.",
    projectsKicker: "Projects",
    projectsTitle: "Furniture supply for hospitality and architectural spaces.",
    projectsText:
      "We support restaurants, hotels, villas, residences and premium commercial interiors with project-based furniture solutions.",
    contractKicker: "Contract",
    contractTitle: "A contract furniture partner from Türkiye.",
    contractText:
      "Custom dimensions, material selection, production coordination, export packaging and optional third-party inspection can be arranged according to project requirements.",
    libraryKicker: "Library",
    libraryTitle: "Documents for project evaluation.",
    libraryText:
      "Access company profile, material directions, export packaging notes and project-based production information.",
    selectedSection: "Selected Type",
    allProducts: "All Products",
    emptyCategory: "No products added to this section yet.",
    addToQuote: "Add to Quote List",
    added: "Added",
    viewDetails: "View Details",
    backToProducts: "Back to Products",
    productDetailKicker: "Product Detail",
    projectOptions: "Project Options",
    technicalTitle: "Technical Direction",
    technicalSubtitle: "Suggested material and production approach for project-based supply.",
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
    quoteTitle: "Select products and request pricing via WhatsApp.",
    quoteText:
      "Add selected products, adjust quantities and send your project details directly to Birkin Contract.",
    empty: "Your quote list is empty. Please add a product first.",
    remove: "Remove",
    whatsapp: "Send Quote Request via WhatsApp",
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
    nav: ["Ana Sayfa", "Koleksiyonlar", "Ürünler", "Projeler", "Contract", "Malzemeler", "Library", "Hakkımızda", "İletişim"],
    quote: "Teklif Listesi",
    clearList: "Listeyi Temizle",
    heroKicker: "Özel Üretim Contract Mobilya",
    heroTitle: "Koleksiyon, malzeme ve proje ihtiyacına göre şekillenen mobilya.",
    heroText:
      "Türkiye merkezli; otel, restoran, villa, hospitality ve mimari projeler için contract mobilya tedariki.",
    heroPrimary: "Koleksiyonları İncele",
    heroSecondary: "Ürünleri İncele",
    collectionsKicker: "Koleksiyonlar",
    collectionsTitle: "Koleksiyon bazlı ürün dili.",
    collectionsText:
      "Birkin Contract ürünleri koleksiyon yapısıyla sunar; mimarların ve satın alma ekiplerinin hospitality projeleri için uyumlu modeller seçmesini kolaylaştırır.",
    productsKicker: "Ürünler",
    productsTitle: "Ürün tipine göre modeller.",
    productsText: "Modelleri ürün tipine göre filtreleyin ve seçili parçaları teklif listenize ekleyin.",
    projectsKicker: "Projeler",
    projectsTitle: "Hospitality ve mimari alanlar için mobilya tedariki.",
    projectsText:
      "Restoran, otel, villa, residence ve premium ticari iç mekân projelerinde proje bazlı mobilya çözümleri sunuyoruz.",
    contractKicker: "Contract",
    contractTitle: "Türkiye’den contract mobilya çözüm partneri.",
    contractText:
      "Özel ölçü, malzeme seçimi, üretim koordinasyonu, ihracata uygun ambalaj ve opsiyonel üçüncü taraf denetim proje ihtiyacına göre organize edilebilir.",
    libraryKicker: "Library",
    libraryTitle: "Proje değerlendirmesi için dokümanlar.",
    libraryText:
      "Company profile, malzeme yönlendirmeleri, ihracat ambalaj notları ve proje bazlı üretim bilgilerine ulaşabilirsiniz.",
    selectedSection: "Seçilen Tip",
    allProducts: "Tüm Ürünler",
    emptyCategory: "Bu bölüme henüz ürün eklenmedi.",
    addToQuote: "Teklif Listesine Ekle",
    added: "Eklendi",
    viewDetails: "Detayları İncele",
    backToProducts: "Ürünlere Dön",
    productDetailKicker: "Ürün Detayı",
    projectOptions: "Proje Opsiyonları",
    technicalTitle: "Teknik Yönlendirme",
    technicalSubtitle: "Proje bazlı tedarik için önerilen malzeme ve üretim yaklaşımı.",
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
    quoteTitle: "Ürünleri seçin, WhatsApp üzerinden fiyat talep edin.",
    quoteText:
      "Seçili ürünleri ekleyin, adetleri ayarlayın ve proje bilgilerinizi doğrudan Birkin Contract’a gönderin.",
    empty: "Teklif listeniz boş. Lütfen önce bir ürün ekleyin.",
    remove: "Kaldır",
    whatsapp: "WhatsApp’tan Teklif Talebi Gönder",
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
    nav: ["الرئيسية", "المجموعات", "المنتجات", "المشاريع", "العقود", "المواد", "المكتبة", "من نحن", "اتصال"],
    quote: "قائمة العرض",
    clearList: "مسح القائمة",
    heroKicker: "أثاث تعاقدي مخصص",
    heroTitle: "أثاث يتشكل حسب المجموعات والمواد واحتياجات المشروع.",
    heroText: "توريد أثاث تعاقدي من تركيا للفنادق والمطاعم والفلل ومشاريع الضيافة.",
    heroPrimary: "استكشف المجموعات",
    heroSecondary: "عرض المنتجات",
    collectionsKicker: "المجموعات",
    collectionsTitle: "لغة منتجات قائمة على المجموعات.",
    collectionsText: "تعرض Birkin Contract المنتجات من خلال هيكل مجموعات واضح لاختيار نماذج متناسقة للمشاريع.",
    productsKicker: "المنتجات",
    productsTitle: "المنتجات حسب النوع.",
    productsText: "قم بتصفية النماذج حسب نوع المنتج وإضافتها إلى قائمة العرض.",
    projectsKicker: "المشاريع",
    projectsTitle: "توريد أثاث لمساحات الضيافة والمعمار.",
    projectsText: "ندعم المطاعم والفنادق والفلل والمشاريع التجارية الراقية بحلول أثاث حسب المشروع.",
    contractKicker: "العقود",
    contractTitle: "شريك أثاث تعاقدي من تركيا.",
    contractText: "يمكن تنظيم المقاسات الخاصة واختيار المواد وتنسيق الإنتاج والتغليف المناسب للتصدير حسب المشروع.",
    libraryKicker: "المكتبة",
    libraryTitle: "مستندات لتقييم المشروع.",
    libraryText: "الوصول إلى ملف الشركة ومعلومات المواد والتغليف والإنتاج حسب المشروع.",
    selectedSection: "النوع المختار",
    allProducts: "كل المنتجات",
    emptyCategory: "لم تتم إضافة منتجات إلى هذا القسم بعد.",
    addToQuote: "إضافة إلى قائمة العرض",
    added: "تمت الإضافة",
    viewDetails: "عرض التفاصيل",
    backToProducts: "العودة إلى المنتجات",
    productDetailKicker: "تفاصيل المنتج",
    projectOptions: "خيارات المشروع",
    technicalTitle: "التوجيه الفني",
    technicalSubtitle: "نهج المواد والإنتاج المقترح للتوريد حسب المشروع.",
    technicalBlocks: [
      ["اتجاه المواد", "يمكن اختيار الهيكل والتنجيد والتشطيب حسب الاستخدام الداخلي أو الخارجي أو مشاريع الضيافة."],
      ["ملاحظة الإنتاج", "يوصى بمراجعة عينة أو نموذج أولي قبل الإنتاج الكمي للطلبات المخصصة."],
      ["التخصيص", "يمكن تعديل المقاسات والأقمشة وألوان الهيكل وتشطيبات الخشب وتفاصيل الراحة حسب المشروع."],
      ["التصدير والجودة", "يمكن تنظيم تغليف مناسب للتصدير وفحص طرف ثالث قبل الشحن عند الطلب."],
    ],
    productCtaKicker: "عرض سعر حسب المشروع",
    productCtaTitle: "هل أنت مهتم بهذا النموذج؟",
    productCtaText: "شاركنا الكمية وموقع التسليم ونوع المشروع لإعداد عرض سعر حسب المشروع.",
    productCtaPoints: ["الكمية", "موقع التسليم", "نوع المشروع"],
    productCtaButton: "إضافة هذا النموذج إلى قائمة العرض",
    options: ["مقاسات مخصصة حسب متطلبات المشروع", "بدائل الأقمشة وألوان الإطار والتشطيبات", "مراجعة عينة أو نموذج أولي لبعض المشاريع", "تغليف مناسب للتصدير عند الطلب", "فحص جودة اختياري من طرف ثالث قبل الشحن"],
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
    quoteTitle: "اختر المنتجات واطلب السعر عبر واتساب.",
    quoteText: "أضف المنتجات المختارة وأرسل تفاصيل مشروعك مباشرة.",
    empty: "قائمة العرض فارغة. يرجى إضافة منتج أولاً.",
    remove: "إزالة",
    whatsapp: "إرسال طلب السعر عبر واتساب",
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
    materialsText: "تشمل الخيارات الخشب الطبيعي، الألمنيوم المطلي، الإسفنج عالي الكثافة والأقمشة الخارجية.",
    materials: [
      ["الخشب", "إيروكو، تيك وبدائل خشب طبيعية حسب المشروع."],
      ["المعدن", "طلاء بودرة كهربائي مناسب للخارج مع خيارات ألوان."],
      ["الإسفنج", "خيارات إسفنج HR عالي الكثافة."],
      ["الأقمشة", "أقمشة مقاومة للأشعة فوق البنفسجية وطاردة للماء."],
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
    nav: ["Главная", "Коллекции", "Продукты", "Проекты", "Contract", "Материалы", "Библиотека", "О нас", "Контакты"],
    quote: "Список запроса",
    clearList: "Очистить список",
    heroKicker: "Custom-Made Contract Furniture",
    heroTitle: "Мебель, сформированная коллекциями, материалами и проектными задачами.",
    heroText: "Поставка contract furniture из Турции для отелей, ресторанов, вилл и hospitality проектов.",
    heroPrimary: "Изучить коллекции",
    heroSecondary: "Посмотреть продукты",
    collectionsKicker: "Коллекции",
    collectionsTitle: "Коллекционный язык продуктов.",
    collectionsText: "Birkin Contract представляет продукты через коллекции, чтобы упростить выбор согласованных моделей.",
    productsKicker: "Продукты",
    productsTitle: "Продукты по типу.",
    productsText: "Фильтруйте модели по типу продукта и добавляйте выбранные позиции в запрос.",
    projectsKicker: "Проекты",
    projectsTitle: "Поставка мебели для hospitality и архитектурных пространств.",
    projectsText: "Мы поддерживаем рестораны, отели, виллы и премиальные коммерческие интерьеры проектными решениями.",
    contractKicker: "Contract",
    contractTitle: "Партнер contract furniture из Турции.",
    contractText: "Индивидуальные размеры, выбор материалов, координация производства, экспортная упаковка и инспекция доступны по проекту.",
    libraryKicker: "Библиотека",
    libraryTitle: "Документы для оценки проекта.",
    libraryText: "Профиль компании, материалы, экспортная упаковка и информация о проектном производстве.",
    selectedSection: "Выбранный тип",
    allProducts: "Все продукты",
    emptyCategory: "В этот раздел пока не добавлены продукты.",
    addToQuote: "Добавить в запрос",
    added: "Добавлено",
    viewDetails: "Подробнее",
    backToProducts: "Вернуться к продуктам",
    productDetailKicker: "Детали продукта",
    projectOptions: "Проектные опции",
    technicalTitle: "Техническое направление",
    technicalSubtitle: "Рекомендуемый подход к материалам и производству для проектной поставки.",
    technicalBlocks: [
      ["Материалы", "Каркас, обивка и отделка подбираются под indoor, outdoor или hospitality использование."],
      ["Производство", "Перед массовым производством рекомендуется образец или прототип."],
      ["Кастомизация", "Размеры, ткань, цвет каркаса, отделка дерева и комфорт могут быть адаптированы под проект."],
      ["Экспорт и качество", "Экспортная упаковка и независимая инспекция перед отгрузкой могут быть организованы по запросу."],
    ],
    productCtaKicker: "Проектное предложение",
    productCtaTitle: "Интересует эта модель?",
    productCtaText: "Поделитесь количеством, местом доставки и типом проекта для подготовки предложения.",
    productCtaPoints: ["Количество", "Место доставки", "Тип проекта"],
    productCtaButton: "Добавить модель в запрос",
    options: ["Индивидуальные размеры под требования проекта", "Варианты ткани, цвета каркаса и отделки", "Образец или прототип для отдельных проектов", "Экспортная упаковка по запросу", "Опциональная независимая инспекция перед отгрузкой"],
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
    quoteTitle: "Выберите продукты и запросите цену через WhatsApp.",
    quoteText: "Добавьте выбранные продукты и отправьте детали проекта.",
    empty: "Список пуст. Сначала добавьте продукт.",
    remove: "Удалить",
    whatsapp: "Отправить запрос через WhatsApp",
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
    materialsText: "Рекомендации включают натуральное дерево, окрашенный алюминий, HR-пену и outdoor ткани.",
    materials: [
      ["Дерево", "Iroko, teak и проектные древесные альтернативы."],
      ["Металл", "Outdoor powder coating с разными цветами."],
      ["Пена", "Высокоплотная HR-пена."],
      ["Ткань", "UV-resistant и water-repellent ткани."],
    ],
    aboutKicker: "О нас",
    aboutTitle: "Проектный партнер для архитектурной мебели.",
    aboutText: "Birkin Contract — поставщик custom-made contract furniture из Турции для hospitality и архитектурных проектов.",
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
  const [selectedCollection, setSelectedCollection] = useState<CollectionName | "All">("All")
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

  const collectionProducts =
    selectedCollection === "All"
      ? products
      : products.filter((product) => product.collection === selectedCollection)

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

  const whatsappQuoteLink = useMemo(() => {
    const selectedProducts =
      cart.length === 0
        ? "-"
        : cart
            .map(
              (item) =>
                `- ${item.code} / ${item.name} / ${t.categoryLabels[item.category]} x ${item.qty}`
            )
            .join("\n")

    const message =
      lang === "tr"
        ? `Merhaba Birkin Contract Ekibi,

Aşağıda seçtiğim ürünler için proje bazlı fiyat teklifi almak istiyorum.

Seçilen Ürünler:
${selectedProducts}

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
${selectedProducts}

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
  }, [cart, quoteInfo, t, lang])

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

  const Header = () => (
    <header className="navbar">
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

        <section className="productDetailHero">
          <div className="productDetailImage">
            <img src={activeProduct.image} alt={activeProduct.name} />
          </div>

          <div className="productDetailContent">
            <button type="button" className="secondaryBtn backProductBtn" onClick={() => goTo("/#products")}>
              {t.backToProducts}
            </button>

            <span className="kicker">{t.productDetailKicker}</span>

            <div className="productDetailMeta">
              {activeProduct.code} / {activeProduct.collection}
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
          <div className="sectionHead">
            <span className="kicker">{activeProduct.collection}</span>
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
            <div className="sectionHead">
              <span className="kicker">{activeProduct.collection}</span>
              <h2>{t.collectionsTitle}</h2>
            </div>

            <div className="modelGrid">
              {relatedProducts.map((product) => (
                <article
                  className="modelCard clickableModelCard"
                  key={product.name}
                  onClick={() => goTo(`/products/${product.slug}`)}
                >
                  <div className="modelTop">
                    <span>{product.code}</span>
                    <small>{product.collection}</small>
                  </div>

                  <div className="modelImageWrap">
                    <img src={product.image} alt={product.name} />
                  </div>

                  <div className="modelBody">
                    <p className="modelUsage">{product.usage[lang]}</p>
                    <h3>{product.name}</h3>
                    <p>{product.desc[lang]}</p>

                    <button type="button" className="detailBtn">
                      {t.viewDetails}
                    </button>
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

  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"}>
      <Header />

      <section className="hero">
        <div className="heroContent">
          <span className="kicker">{t.heroKicker}</span>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>

          <div className="heroButtons">
            <a href="#collections" className="primaryBtn">
              {t.heroPrimary}
            </a>
            <a href="#products" className="secondaryBtn">
              {t.heroSecondary}
            </a>
          </div>
        </div>

        <div className="heroVisual">
          <div className="editorialFrame">
            <span className="frameLabel">BIRKIN / CONTRACT</span>

            <img
              key={heroProduct.name}
              src={heroProduct.image}
              alt={heroProduct.name}
              className="heroProduct mainProduct"
            />

            <div className="visualLine"></div>
            <div className="visualCircle"></div>
          </div>
        </div>
      </section>

      <section id="collections" className="section modelsSection">
        <div className="sectionHead">
          <span className="kicker">{t.collectionsKicker}</span>
          <h2>{t.collectionsTitle}</h2>
          <p>{t.collectionsText}</p>
        </div>

        <div className="categoryGrid">
          <button
            type="button"
            className={selectedCollection === "All" ? "categoryCard active" : "categoryCard"}
            onClick={() => setSelectedCollection("All")}
          >
            <span>00</span>
            <strong>{t.allProducts}</strong>
          </button>

          {collections.map((collection, index) => (
            <button
              type="button"
              key={collection}
              className={selectedCollection === collection ? "categoryCard active" : "categoryCard"}
              onClick={() => setSelectedCollection(collection)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{collection}</strong>
            </button>
          ))}
        </div>

        <div className="modelGrid">
          {collectionProducts.map((product) => (
            <article
              className="modelCard clickableModelCard"
              key={product.name}
              onClick={() => goTo(`/products/${product.slug}`)}
            >
              <div className="modelTop">
                <span>{product.code}</span>
                <small>{product.collection}</small>
              </div>

              <div className="modelImageWrap">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="modelBody">
                <p className="modelUsage">{product.usage[lang]}</p>
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

      <section id="products" className="section modelsSection">
        <div className="sectionHead">
          <span className="kicker">{t.productsKicker}</span>
          <h2>{t.productsTitle}</h2>
          <p>{t.productsText}</p>
        </div>

        <div className="categoryGrid">
          <button
            type="button"
            className={selectedSection === "All" ? "categoryCard active" : "categoryCard"}
            onClick={() => setSelectedSection("All")}
          >
            <span>00</span>
            <strong>{t.allProducts}</strong>
          </button>

          {productSections.map((section, index) => (
            <button
              type="button"
              key={section}
              className={selectedSection === section ? "categoryCard active" : "categoryCard"}
              onClick={() => setSelectedSection(section)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{t.categoryLabels[section]}</strong>
            </button>
          ))}
        </div>

        <div className="modelGrid">
          {filteredProducts.map((product) => (
            <article
              className="modelCard clickableModelCard"
              key={product.name}
              onClick={() => goTo(`/products/${product.slug}`)}
            >
              <div className="modelTop">
                <span>{product.code}</span>
                <small>{t.categoryLabels[product.category]}</small>
              </div>

              <div className="modelImageWrap">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="modelBody">
                <p className="modelUsage">{product.collection}</p>
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

      <section id="projects" className="section splitSection">
        <div>
          <span className="kicker">{t.projectsKicker}</span>
          <h2>{t.projectsTitle}</h2>
        </div>
        <div>
          <p>{t.projectsText}</p>
        </div>
      </section>

      <section id="contract" className="section splitSection">
        <div>
          <span className="kicker">{t.contractKicker}</span>
          <h2>{t.contractTitle}</h2>
        </div>
        <div>
          <p>{t.contractText}</p>
        </div>
      </section>

      <section id="materials" className="section materialsSection">
        <div className="sectionHead">
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

      <section id="library" className="section profileSection">
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
