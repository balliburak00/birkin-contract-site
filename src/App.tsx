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

type LocalizedText = Record<Lang, string>

type Product = {
  slug: string
  code: string
  name: string
  category: ProductSection
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

const products: Product[] = [
  {
    slug: "birkin-arc-c01",
    code: "C01",
    name: "BIRKIN ARC C01",
    category: "Chair",
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
    nav: ["About", "Products", "Quote List", "Profile", "Materials", "Process", "FAQ", "Contact"],
    quote: "Request a Quote",
    heroKicker: "Contract Furniture / Custom-Made Production",
    heroTitle: "Furniture shaped around your project.",
    heroText:
      "Türkiye-based custom-made contract furniture supply for hotels, restaurants, villas, hospitality and architectural projects.",
    heroPrimary: "View Products",
    heroSecondary: "Download Profile",
    heroStats: [
      ["Hospitality", "Hotels, resorts and premium restaurants"],
      ["Custom-Made", "Dimensions, finishes and project-specific details"],
      ["Türkiye Supply", "Production coordination and export support"],
    ],
    aboutKicker: "About Birkin Contract",
    aboutTitle: "A project partner for architectural furniture needs.",
    aboutText:
      "Birkin Contract is a Türkiye-based custom-made contract furniture supplier for hotels, restaurants, villas, hospitality and architectural projects. We support architects, interior designers, procurement teams and investors with material selection, project-based production coordination, export packaging and quality control follow-up.",
    productKicker: "Products",
    productTitle: "Explore product sections.",
    productIntro: "Select a product section to view available models for your project.",
    selectedSection: "Selected Section",
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
    materialsKicker: "Materials & Standards",
    materialsTitle: "Project-based material and production standards.",
    materialsText:
      "We offer material options according to indoor, outdoor and hospitality usage needs. Our standard recommendations include iroko wood, outdoor-grade powder coated aluminum frames, high-density foam and UV-resistant outdoor fabric alternatives.",
    materials: [
      ["Wood Options", "Iroko, teak and project-based natural wood alternatives."],
      ["Metal Finish", "Outdoor-grade electrostatic powder coating with matte and textured color options."],
      ["Foam & Comfort", "High-density HR foam options depending on chair, armchair, lounge and ottoman models."],
      ["Outdoor Fabrics", "UV-resistant, water-repellent and mildew-resistant outdoor fabric alternatives."],
      ["Quality Assurance", "Project-based internal quality control and optional third-party pre-shipment inspection can be arranged upon request."],
      ["Customization Options", "Dimensions, frame colors, fabric alternatives, wood finishes and comfort details can be customized according to project requirements."],
      ["Export Packaging", "Products can be packed with export-suitable protective materials according to product type, destination and shipping method."],
      ["Sample & Prototype", "For selected projects, sample production or prototype review can be arranged before mass production."],
    ],
    processKicker: "Process",
    processTitle: "From brief to delivery.",
    process: ["Project Brief", "Technical Review", "Material Selection", "Quotation", "Sample / Approval", "Production", "Quality Control", "Delivery"],
    faqKicker: "FAQ",
    faqTitle: "Frequently asked questions.",
    faqText: "Key information about custom-made furniture production, export packaging, samples and project-based supply.",
    faqs: [
      ["Do you produce custom-made furniture?", "Yes. Birkin Contract works on project-based custom-made contract furniture supply for hotels, restaurants, villas and architectural projects."],
      ["Can product dimensions, fabrics and finishes be customized?", "Yes. Dimensions, frame colors, fabric alternatives, wood finishes and comfort details can be customized according to project requirements."],
      ["Can you arrange samples before mass production?", "For selected projects, sample production or prototype review can be arranged before bulk production."],
      ["Do you support export packaging?", "Yes. Products can be packed with export-suitable protective materials according to product type, destination and shipping method."],
      ["Can third-party inspection be arranged?", "Upon request, third-party pre-shipment inspection by internationally recognized inspection companies can be arranged at additional cost."],
      ["Which project types do you work with?", "We support hotels, restaurants, cafes, villas, residences, hospitality areas and architectural interiors."],
    ],
    contactKicker: "Contact",
    contactTitle: "Tell us about your project.",
    contactText:
      "For accurate pricing, please include product groups, quantities, dimensions, material preferences and delivery location.",
    footerText: "Custom-made contract furniture solutions for hospitality and architectural spaces.",
    rights: "© 2026 Birkin Contract. All rights reserved.",
  },

  tr: {
    nav: ["Hakkımızda", "Ürünler", "Teklif Listesi", "Profil", "Malzemeler", "Süreç", "SSS", "İletişim"],
    quote: "Teklif Al",
    heroKicker: "Contract Mobilya / Özel Üretim",
    heroTitle: "Projenize göre şekillenen mobilya çözümleri.",
    heroText:
      "Türkiye merkezli; otel, restoran, villa, hospitality ve mimari projeler için özel üretim contract mobilya tedariki.",
    heroPrimary: "Ürünleri İncele",
    heroSecondary: "Profili İndir",
    heroStats: [
      ["Hospitality", "Oteller, resortlar ve premium restoranlar"],
      ["Özel Üretim", "Ölçü, malzeme ve projeye özel detaylar"],
      ["Türkiye Tedarik", "Üretim koordinasyonu ve ihracat desteği"],
    ],
    aboutKicker: "Birkin Contract Hakkında",
    aboutTitle: "Mimari mobilya ihtiyaçları için proje çözüm partneri.",
    aboutText:
      "Birkin Contract; otel, restoran, villa, hospitality ve mimari projeler için Türkiye merkezli özel üretim contract mobilya tedarikçisidir. Mimarlar, iç mimarlar, satın alma ekipleri ve yatırımcılar için malzeme seçimi, proje bazlı üretim koordinasyonu, ihracata uygun ambalaj ve kalite kontrol takibi sağlar.",
    productKicker: "Ürünler",
    productTitle: "Ürün bölümlerini inceleyin.",
    productIntro: "Projeniz için mevcut modelleri görmek üzere bir ürün bölümü seçin.",
    selectedSection: "Seçilen Bölüm",
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
    profileText: "Proje bazlı çalışma yaklaşımımızı, ürün kapsamımızı ve iş birliği modelimizi inceleyebilirsiniz.",
    profileButton: "Company Profile PDF İndir",
    materialsKicker: "Malzeme ve Standartlar",
    materialsTitle: "Projeye göre malzeme ve üretim standartları.",
    materialsText:
      "İç mekân, dış mekân ve hospitality kullanım ihtiyaçlarına göre proje bazlı malzeme seçenekleri sunuyoruz. Standart önerilerimiz arasında iroko ağacı, dış mekân kullanıma uygun elektrostatik toz boyalı alüminyum gövde, yüksek yoğunluklu sünger ve UV dayanımlı outdoor kumaş alternatifleri yer alır.",
    materials: [
      ["Ahşap Seçenekleri", "Iroko, teak ve projeye özel doğal ahşap alternatifleri."],
      ["Metal Yüzey", "Dış mekâna uygun elektrostatik toz boya; mat ve dokulu renk seçenekleri."],
      ["Sünger ve Konfor", "Sandalye, berjer, lounge ve puf modellerine göre yüksek yoğunluklu HR sünger seçenekleri."],
      ["Outdoor Kumaşlar", "UV dayanımlı, su itici ve küf dayanımlı dış mekân kumaş alternatifleri."],
      ["Kalite Güvencesi", "Proje bazlı iç kalite kontrol yapılır. Talep edilmesi halinde sevkiyat öncesi üçüncü taraf kalite kontrol organize edilebilir."],
      ["Özelleştirme Seçenekleri", "Ölçüler, gövde renkleri, kumaş alternatifleri, ahşap yüzeyler ve konfor detayları proje ihtiyacına göre özelleştirilebilir."],
      ["İhracata Uygun Ambalaj", "Ürünler; ürün tipi, teslimat ülkesi ve taşıma yöntemine göre ihracata uygun koruyucu ambalaj malzemeleriyle paketlenebilir."],
      ["Numune ve Prototip", "Seçili projelerde seri üretim öncesi numune üretimi veya prototip değerlendirmesi organize edilebilir."],
    ],
    processKicker: "Süreç",
    processTitle: "Brief aşamasından teslimata kadar.",
    process: ["Proje Briefi", "Teknik İnceleme", "Malzeme Seçimi", "Teklif", "Numune / Onay", "Üretim", "Kalite Kontrol", "Teslimat"],
    faqKicker: "SSS",
    faqTitle: "Sık sorulan sorular.",
    faqText: "Özel üretim mobilya, ihracata uygun ambalaj, numune ve proje bazlı tedarik süreci hakkında temel bilgiler.",
    faqs: [
      ["Özel üretim mobilya yapıyor musunuz?", "Evet. Birkin Contract; otel, restoran, villa ve mimari projeler için proje bazlı özel üretim contract mobilya tedariki sağlar."],
      ["Ürün ölçüsü, kumaşı ve yüzeyi özelleştirilebilir mi?", "Evet. Ölçüler, gövde renkleri, kumaş alternatifleri, ahşap yüzeyler ve konfor detayları proje ihtiyacına göre özelleştirilebilir."],
      ["Seri üretim öncesi numune yapılabilir mi?", "Seçili projelerde seri üretim öncesi numune üretimi veya prototip değerlendirmesi organize edilebilir."],
      ["İhracata uygun ambalaj desteği var mı?", "Evet. Ürünler; ürün tipi, teslimat ülkesi ve taşıma yöntemine göre ihracata uygun koruyucu ambalaj malzemeleriyle paketlenebilir."],
      ["Üçüncü taraf kalite kontrol yapılabilir mi?", "Talep edilmesi halinde, ek maliyet karşılığında uluslararası tanınan denetim firmalarıyla sevkiyat öncesi üçüncü taraf kalite kontrol organize edilebilir."],
      ["Hangi projelerle çalışıyorsunuz?", "Otel, restoran, kafe, villa, residence, hospitality alanları ve mimari iç mekân projeleriyle çalışıyoruz."],
    ],
    contactKicker: "İletişim",
    contactTitle: "Projenizi bize anlatın.",
    contactText: "Doğru fiyatlandırma için ürün grupları, adetler, ölçüler, malzeme tercihleri ve teslimat lokasyonunu belirtmenizi rica ederiz.",
    footerText: "Hospitality ve mimari projeler için özel üretim contract mobilya çözümleri.",
    rights: "© 2026 Birkin Contract. Tüm hakları saklıdır.",
  },

  ar: {
    nav: ["من نحن", "المنتجات", "قائمة العرض", "الملف", "المواد", "العملية", "الأسئلة", "اتصال"],
    quote: "طلب عرض سعر",
    heroKicker: "أثاث تعاقدي / إنتاج مخصص",
    heroTitle: "حلول أثاث تتشكل حسب مشروعك.",
    heroText: "توريد أثاث تعاقدي مخصص من تركيا للفنادق والمطاعم والفلل ومشاريع الضيافة والمساحات المعمارية.",
    heroPrimary: "عرض المنتجات",
    heroSecondary: "تحميل الملف",
    heroStats: [["الضيافة", "فنادق، منتجعات ومطاعم راقية"], ["إنتاج مخصص", "مقاسات، تشطيبات وتفاصيل حسب المشروع"], ["توريد من تركيا", "تنسيق الإنتاج ودعم التصدير"]],
    aboutKicker: "عن Birkin Contract",
    aboutTitle: "شريك مشاريع لاحتياجات الأثاث المعماري.",
    aboutText: "Birkin Contract هي مورد أثاث تعاقدي مخصص من تركيا للفنادق والمطاعم والفلل ومشاريع الضيافة والمساحات المعمارية.",
    productKicker: "المنتجات",
    productTitle: "استكشف أقسام المنتجات.",
    productIntro: "اختر قسم المنتج لعرض النماذج المتاحة لمشروعك.",
    selectedSection: "القسم المختار",
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
    quoteText: "أضف المنتجات المختارة، عدّل الكميات وأرسل تفاصيل مشروعك مباشرة إلى Birkin Contract.",
    empty: "قائمة العرض فارغة. يرجى إضافة منتج أولاً.",
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
    profileText: "اطلع على ملفنا لفهم نهجنا في العمل حسب المشروع ونطاق المنتجات ونموذج التعاون.",
    profileButton: "تحميل ملف الشركة PDF",
    materialsKicker: "المواد والمعايير",
    materialsTitle: "معايير مواد وإنتاج حسب المشروع.",
    materialsText: "نقدم خيارات مواد حسب احتياجات الاستخدام الداخلي والخارجي ومشاريع الضيافة.",
    materials: [
      ["خيارات الخشب", "إيروكو، تيك وبدائل خشب طبيعية حسب المشروع."],
      ["تشطيب المعدن", "طلاء بودرة كهربائي مناسب للخارج مع خيارات ألوان."],
      ["الإسفنج والراحة", "خيارات إسفنج HR عالي الكثافة."],
      ["أقمشة خارجية", "خيارات أقمشة مقاومة للأشعة فوق البنفسجية وطاردة للماء."],
      ["ضمان الجودة", "يمكن تنظيم فحص طرف ثالث قبل الشحن عند الطلب."],
      ["خيارات التخصيص", "يمكن تخصيص المقاسات والألوان والأقمشة والتشطيبات."],
      ["تغليف مناسب للتصدير", "تغليف مناسب حسب نوع المنتج ووجهة التسليم."],
      ["عينة ونموذج أولي", "يمكن تنظيم إنتاج عينة قبل الإنتاج الكمي."],
    ],
    processKicker: "العملية",
    processTitle: "من المتطلبات إلى التسليم.",
    process: ["متطلبات المشروع", "مراجعة فنية", "اختيار المواد", "عرض السعر", "العينة / الموافقة", "الإنتاج", "مراقبة الجودة", "التسليم"],
    faqKicker: "الأسئلة الشائعة",
    faqTitle: "أسئلة شائعة.",
    faqText: "معلومات أساسية حول الإنتاج المخصص والتصدير.",
    faqs: [
      ["هل تنتجون أثاثاً مخصصاً؟", "نعم. تقدم Birkin Contract توريد أثاث تعاقدي مخصص حسب المشروع."],
      ["هل يمكن تخصيص المقاسات والأقمشة؟", "نعم. يمكن التخصيص حسب متطلبات المشروع."],
      ["هل يمكن إنتاج عينة؟", "يمكن تنظيم عينة لبعض المشاريع."],
      ["هل توفرون تغليفاً للتصدير؟", "نعم. يمكن التغليف المناسب للتصدير."],
      ["هل يمكن فحص جودة من طرف ثالث؟", "يمكن تنظيم ذلك عند الطلب بتكلفة إضافية."],
      ["ما أنواع المشاريع؟", "فنادق، مطاعم، مقاهي، فلل ومساحات ضيافة."],
    ],
    contactKicker: "اتصال",
    contactTitle: "أخبرنا عن مشروعك.",
    contactText: "للحصول على تسعير دقيق، يرجى ذكر مجموعات المنتجات والكميات والمقاسات.",
    footerText: "حلول أثاث تعاقدي مخصصة لمشاريع الضيافة.",
    rights: "© 2026 Birkin Contract. جميع الحقوق محفوظة.",
  },

  ru: {
    nav: ["О нас", "Продукты", "Запрос", "Профиль", "Материалы", "Процесс", "FAQ", "Контакты"],
    quote: "Запросить предложение",
    heroKicker: "Contract Furniture / Индивидуальное производство",
    heroTitle: "Мебельные решения, созданные вокруг вашего проекта.",
    heroText: "Поставка custom-made contract furniture из Турции для отелей, ресторанов, вилл, hospitality и архитектурных проектов.",
    heroPrimary: "Посмотреть продукты",
    heroSecondary: "Скачать профиль",
    heroStats: [["Hospitality", "Отели, курорты и премиальные рестораны"], ["На заказ", "Размеры, материалы и детали под проект"], ["Поставка из Турции", "Координация производства и экспорт"]],
    aboutKicker: "О Birkin Contract",
    aboutTitle: "Проектный партнер для архитектурной мебели.",
    aboutText: "Birkin Contract — поставщик custom-made contract furniture из Турции для отелей, ресторанов, вилл, hospitality и архитектурных проектов.",
    productKicker: "Продукты",
    productTitle: "Изучите разделы продуктов.",
    productIntro: "Выберите раздел, чтобы увидеть доступные модели для вашего проекта.",
    selectedSection: "Выбранный раздел",
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
    quoteText: "Добавьте выбранные продукты и отправьте детали проекта в Birkin Contract.",
    empty: "Список пуст. Сначала добавьте продукт.",
    remove: "Удалить",
    whatsapp: "Отправить запрос через WhatsApp",
    fields: {
      name: "Имя / Компания",
      email: "E-mail",
      phone: "Телефон / WhatsApp",
      country: "Страна / Город",
      projectType: "Тип проекта",
      deliveryLocation: "Место доставки",
      notes: "Заметки, размеры, материалы",
    },
    profileKicker: "Профиль компании",
    profileTitle: "Скачать профиль компании Birkin Contract.",
    profileText: "Ознакомьтесь с проектным подходом и моделью сотрудничества.",
    profileButton: "Скачать Company Profile PDF",
    materialsKicker: "Материалы и стандарты",
    materialsTitle: "Материалы и производственные стандарты под проект.",
    materialsText: "Мы предлагаем варианты материалов для indoor, outdoor и hospitality проектов.",
    materials: [
      ["Варианты дерева", "Iroko, teak и проектные древесные альтернативы."],
      ["Металлическая отделка", "Outdoor powder coating с разными цветами."],
      ["Пена и комфорт", "Высокоплотная HR-пена."],
      ["Outdoor ткани", "UV-resistant и water-repellent ткани."],
      ["Контроль качества", "Независимая инспекция возможна по запросу."],
      ["Кастомизация", "Размеры, цвета, ткани и отделки под проект."],
      ["Экспортная упаковка", "Защитная упаковка для экспорта."],
      ["Образец", "Образец или прототип перед производством."],
    ],
    processKicker: "Процесс",
    processTitle: "От брифа до поставки.",
    process: ["Бриф проекта", "Технический анализ", "Выбор материалов", "Предложение", "Образец / Подтверждение", "Производство", "Контроль качества", "Поставка"],
    faqKicker: "FAQ",
    faqTitle: "Часто задаваемые вопросы.",
    faqText: "Основная информация о custom-made производстве и экспорте.",
    faqs: [
      ["Вы производите мебель на заказ?", "Да. Birkin Contract работает с проектными поставками."],
      ["Можно ли адаптировать размеры и ткани?", "Да. Можно адаптировать под проект."],
      ["Можно ли изготовить образец?", "Для отдельных проектов возможно."],
      ["Вы поддерживаете экспортную упаковку?", "Да. Экспортная упаковка возможна."],
      ["Можно ли организовать инспекцию?", "Да, по запросу и за дополнительную стоимость."],
      ["С какими проектами вы работаете?", "Отели, рестораны, кафе, виллы и hospitality зоны."],
    ],
    contactKicker: "Контакты",
    contactTitle: "Расскажите нам о вашем проекте.",
    contactText: "Для точной оценки укажите группы продуктов, количество, размеры и место доставки.",
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
      const title = `${activeProduct.name} | ${activeProduct.category} | Birkin Contract`
      const description = `${activeProduct.name} is a ${activeProduct.category.toLowerCase()} designed for hotels, restaurants, villas, hospitality and architectural projects. Türkiye-based custom-made contract furniture supply by Birkin Contract.`
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

    const message = `Merhaba, Birkin Contract web sitesi üzerinden fiyat teklifi almak istiyorum.

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
${quoteInfo.notes}`

    return `https://wa.me/905525000320?text=${encodeURIComponent(message)}`
  }, [cart, quoteInfo, t])

  const Header = () => (
    <header className="navbar">
      <button type="button" className="brand brandButton" onClick={() => goTo("/")}>
        <BirkinLogo />
      </button>

      <nav>
        <a href="/#about" onClick={() => setCurrentPath("/")}>{t.nav[0]}</a>
        <a href="/#products" onClick={() => setCurrentPath("/")}>{t.nav[1]}</a>
        <a href="/#quote-list" onClick={() => setCurrentPath("/")}>{t.nav[2]}</a>
        <a href="/#profile" onClick={() => setCurrentPath("/")}>{t.nav[3]}</a>
        <a href="/#materials" onClick={() => setCurrentPath("/")}>{t.nav[4]}</a>
        <a href="/#process" onClick={() => setCurrentPath("/")}>{t.nav[5]}</a>
        <a href="/#faq" onClick={() => setCurrentPath("/")}>{t.nav[6]}</a>
        <a href="/#contact" onClick={() => setCurrentPath("/")}>{t.nav[7]}</a>
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

        <a href="/#quote-list" className="navBtn" onClick={() => setCurrentPath("/")}>
          {t.quote}
        </a>
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
          product.category === activeProduct.category &&
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

              <a href="/#quote-list" className="secondaryBtn" onClick={() => setCurrentPath("/")}>
                {t.quote}
              </a>
            </div>
          </div>
        </section>

        <section className="section technicalDetailSection">
          <div className="sectionHead">
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

        {relatedProducts.length > 0 && (
          <section className="section modelsSection">
            <div className="sectionHead">
              <span className="kicker">{t.categoryLabels[activeProduct.category]}</span>
              <h2>{t.productTitle}</h2>
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
                    <small>{t.categoryLabels[product.category]}</small>
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

        <footer className="footer">
          <div>
            <BirkinLogo />
            <p>{t.footerText}</p>
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

  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"}>
      <Header />

      <section className="hero">
        <div className="heroContent">
          <span className="kicker">{t.heroKicker}</span>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>

          <div className="heroButtons">
            <a href="#products" className="primaryBtn">
              {t.heroPrimary}
            </a>
            <a
              href="/birkin-company-profile.pdf"
              target="_blank"
              rel="noreferrer"
              className="secondaryBtn"
            >
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
            <span className="frameLabel">BIRKIN / PRODUCTS</span>

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

      <section id="about" className="section splitSection">
        <div>
          <span className="kicker">{t.aboutKicker}</span>
          <h2>{t.aboutTitle}</h2>
        </div>

        <div>
          <p>{t.aboutText}</p>
        </div>
      </section>

      <section id="products" className="section modelsSection">
        <div className="sectionHead">
          <span className="kicker">{t.productKicker}</span>
          <h2>{t.productTitle}</h2>
          <p>{t.productIntro}</p>
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

        <div className="productCategoryBlock">
          <div className="categoryHeader">
            <span>{t.selectedSection}</span>
            <h2>
              {selectedSection === "All"
                ? t.allProducts
                : t.categoryLabels[selectedSection]}
            </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="emptyCategoryBox">{t.emptyCategory}</div>
          ) : (
            <div className="modelGrid">
              {filteredProducts.map((product) => {
                const isAdded = cart.some((item) => item.name === product.name)

                return (
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
                          {isAdded ? `✓ ${t.added}` : t.addToQuote}
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
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
              onChange={(e) =>
                setQuoteInfo({ ...quoteInfo, deliveryLocation: e.target.value })
              }
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

      <section id="faq" className="section faqSection">
        <div className="sectionHead">
          <span className="kicker">{t.faqKicker}</span>
          <h2>{t.faqTitle}</h2>
          <p>{t.faqText}</p>
        </div>

        <div className="faqGrid">
          {t.faqs.map(([question, answer], index) => (
            <div className="faqCard" key={question}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{question}</h3>
              <p>{answer}</p>
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
          <a href="#products">{t.nav[1]}</a>
          <a href="#quote-list">{t.nav[2]}</a>
          <a href="#profile">{t.nav[3]}</a>
          <a href="#materials">{t.nav[4]}</a>
          <a href="#process">{t.nav[5]}</a>
          <a href="#faq">{t.nav[6]}</a>
          <a href="#contact">{t.nav[7]}</a>
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
