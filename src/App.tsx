import { useEffect, useMemo, useState, type SyntheticEvent } from "react"
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

type CollectionName = string
type LocalizedText = Record<Lang, string>
type Pair = [string, string]

type ProductDimension = {
  label: LocalizedText
  cm: string
  inch: string
}

type Product = {
  slug: string
  code: string
  name: string
  category: ProductSection
  collection: CollectionName
  usage: LocalizedText
  desc: LocalizedText
  image: string
  gallery?: string[]
  dimensions?: ProductDimension[]
}

type CartItem = {
  code: string
  name: string
  category: ProductSection
  qty: number
}

type QuoteField =
  | "name"
  | "email"
  | "phone"
  | "country"
  | "projectType"
  | "deliveryLocation"
  | "notes"

type SiteContent = {
  nav: string[]
  quote: string
  clearList: string
  heroKicker: string
  heroTitle: string
  heroText: string
  heroPrimary: string
  heroSecondary: string
  introKicker: string
  introTitle: string
  introText: string
  collectionsKicker: string
  collectionsTitle: string
  collectionsText: string
  productsKicker: string
  productsTitle: string
  productsText: string
  projectsKicker: string
  projectsTitle: string
  projectsText: string
  contractKicker: string
  contractTitle: string
  contractText: string
  libraryKicker: string
  libraryTitle: string
  libraryText: string
  allProducts: string
  addToQuote: string
  added: string
  viewDetails: string
  backToProducts: string
  projectOptions: string
  productSpecsTitle: string
  productSpecsText: string
  productSpecs: Pair[]
  categoryLabels: Record<ProductSection, string>
  quoteKicker: string
  quoteTitle: string
  quoteText: string
  empty: string
  remove: string
  whatsapp: string
  emailQuote: string
  fillAllFields: string
  fields: Record<QuoteField, string>
  materialsKicker: string
  materialsTitle: string
  materialsText: string
  materials: Pair[]
  productCtaKicker: string
  productCtaTitle: string
  productCtaText: string
  productCtaPoints: string[]
  productCtaButton: string
  options: string[]
  aboutKicker: string
  aboutTitle: string
  aboutText: string
  contactKicker: string
  contactTitle: string
  contactText: string
  footerText: string
  rights: string
}

const logoImage = "/birkin-logo.png"
const fallbackProductImage = "/product-chair-birkin-sera-c05-render.png"

function BirkinLogo() {
  const [logoFailed, setLogoFailed] = useState(false)

  if (logoFailed) {
    return <span className="textLogo">Birkin Contract</span>
  }

  return (
    <img
      src={logoImage}
      alt="Birkin Contract Logo"
      className="siteLogo"
      onError={() => setLogoFailed(true)}
    />
  )
}

function IntroOverlay() {
  return (
    <div className="introOverlay">
      <BirkinLogo />
    </div>
  )
}

function handleImageFallback(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget

  if (image.dataset.fallbackApplied === "true") {
    image.style.display = "none"
    return
  }

  image.dataset.fallbackApplied = "true"
  image.src = fallbackProductImage
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

function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path
  return `${window.location.origin}${path.startsWith("/") ? path : `/${path}`}`
}

const products: Product[] = [
  {
    slug: "birkin-sera-c05",
    code: "C05",
    name: "BIRKIN SÉRA C05",
    category: "Armchair",
    collection: "SÉRA Collection",
    usage: {
      en: "Restaurant / Hotel Room / Villa / Lounge",
      tr: "Restoran / Otel Odası / Villa / Lounge",
      ar: "Restaurant / Hotel Room / Villa / Lounge",
      ru: "Restaurant / Hotel Room / Villa / Lounge",
    },
    desc: {
      en: "A refined upholstered armchair with soft curved upholstery and warm wooden arm details, designed for hospitality interiors.",
      tr: "Yumuşak kıvrımlı döşemesi ve sıcak ahşap kol detayıyla rafine hospitality iç mekânları için tasarlanmış heykelsi berjer modeli.",
      ar: "A refined upholstered armchair with soft curved upholstery and warm wooden arm details, designed for hospitality interiors.",
      ru: "A refined upholstered armchair with soft curved upholstery and warm wooden arm details, designed for hospitality interiors.",
    },
    image: "/product-chair-birkin-sera-c05-render.png",
    gallery: [
      "/product-chair-birkin-sera-c05-render.png",
      "/product-chair-birkin-sera-c05-front.png",
      "/product-chair-birkin-sera-c05-back.png",
      "/product-chair-birkin-sera-c05-left.png",
      "/product-chair-birkin-sera-c05-right.png",
    ],
  },
]

const productSections: ProductSection[] = ["Armchair"]
const collections = Array.from(new Set(products.map((product) => product.collection)))

const modelWords: Record<Lang, { one: string; many: string }> = {
  en: { one: "model", many: "models" },
  tr: { one: "model", many: "model" },
  ar: { one: "model", many: "models" },
  ru: { one: "model", many: "models" },
}

const heroTrustBadges: Record<Lang, string[]> = {
  en: ["Custom production", "Export packaging", "Project quotation", "Optional inspection"],
  tr: ["Özel üretim", "İhracat ambalajı", "Proje bazlı teklif", "Opsiyonel kalite kontrol"],
  ar: ["Custom production", "Export packaging", "Project quotation", "Optional inspection"],
  ru: ["Custom production", "Export packaging", "Project quotation", "Optional inspection"],
}

const projectAreas: Record<Lang, Pair[]> = {
  en: [
    ["Hotel & Lobby", "Consistent furniture language for lobby, room and lounge areas."],
    ["Restaurant & Cafe", "Durable seating and dining models for repeated commercial use."],
    ["Villa & Residence", "Custom dimensions, fabrics and finishes for private projects."],
    ["Outdoor & Terrace", "Material directions for sun, humidity and export conditions."],
  ],
  tr: [
    ["Otel & Lobi", "Lobi, oda ve lounge alanları için bütünlüklü mobilya dili."],
    ["Restoran & Kafe", "Yoğun ticari kullanıma uygun oturum ve yemek grupları."],
    ["Villa & Konut", "Özel projeler için ölçü, kumaş ve yüzey uyarlamaları."],
    ["Dış Mekân & Teras", "Güneş, nem ve ihracat koşullarına uygun malzeme yönlendirmesi."],
  ],
  ar: [
    ["Hotel & Lobby", "Consistent furniture language for lobby, room and lounge areas."],
    ["Restaurant & Cafe", "Durable seating and dining models for repeated commercial use."],
    ["Villa & Residence", "Custom dimensions, fabrics and finishes for private projects."],
    ["Outdoor & Terrace", "Material directions for sun, humidity and export conditions."],
  ],
  ru: [
    ["Hotel & Lobby", "Consistent furniture language for lobby, room and lounge areas."],
    ["Restaurant & Cafe", "Durable seating and dining models for repeated commercial use."],
    ["Villa & Residence", "Custom dimensions, fabrics and finishes for private projects."],
    ["Outdoor & Terrace", "Material directions for sun, humidity and export conditions."],
  ],
}

const enContent: SiteContent = {
  nav: ["Home", "Collections", "Products", "Projects", "Contract", "Materials", "Library", "About", "Contact"],
  quote: "Quote List",
  clearList: "Clear List",
  heroKicker: "Custom-Made Contract Furniture",
  heroTitle: "Custom-made furniture from Türkiye for hospitality projects.",
  heroText: "Collection-based furniture supply for hotels, restaurants, villas and architectural interiors.",
  heroPrimary: "Explore Collections",
  heroSecondary: "Project Quotation",
  introKicker: "Birkin Contract",
  introTitle: "A quieter, more architectural approach to contract furniture.",
  introText: "We organize project-specific customization, export-suitable packaging and optional third-party inspection for hospitality and architectural projects.",
  collectionsKicker: "Collections",
  collectionsTitle: "Collections designed for project coordination.",
  collectionsText: "Each collection groups models with a consistent visual language.",
  productsKicker: "Products",
  productsTitle: "Product index.",
  productsText: "Review models and build your quotation list.",
  projectsKicker: "Projects",
  projectsTitle: "Hospitality, villas, restaurants and commercial interiors.",
  projectsText: "Birkin Contract supports project-based furniture supply for spaces where visual consistency, durability and delivery coordination matter.",
  contractKicker: "Contract",
  contractTitle: "Custom-made supply from Türkiye.",
  contractText: "Custom dimensions, material selection, production coordination, export packaging and optional third-party inspection can be arranged according to project requirements.",
  libraryKicker: "Library",
  libraryTitle: "Documents for project evaluation.",
  libraryText: "Access company profile, material directions, export packaging notes and project-based production information.",
  allProducts: "All Products",
  addToQuote: "Add to Quote List",
  added: "Added",
  viewDetails: "View Details",
  backToProducts: "Back to Products",
  projectOptions: "Project Options",
  productSpecsTitle: "Technical Specifications",
  productSpecsText: "General technical direction for project-based production. Final specifications may vary according to quantity, project location and requested material standard.",
  productSpecs: [
    ["Material Direction", "Frame, upholstery and surface finish can be selected according to indoor, outdoor or hospitality use."],
    ["Production Note", "Prototype or sample review is recommended before mass production for custom-made project orders."],
    ["Customization", "Dimensions, fabric, frame color, wood finish and comfort details can be adapted according to project requirements."],
    ["Export & Quality", "Export-suitable packaging and optional third-party pre-shipment inspection can be arranged upon request."],
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
  },
  quoteKicker: "Quote List",
  quoteTitle: "Select products and request pricing.",
  quoteText: "Add selected products, adjust quantities and send your project details directly to Birkin Contract via WhatsApp or e-mail.",
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
  materialsText: "Recommended directions include natural wood, powder coated metal, high-density foam and hospitality-grade upholstery alternatives.",
  materials: [
    ["Wood", "Iroko, teak and project-based natural wood alternatives."],
    ["Metal", "Outdoor-grade electrostatic powder coating with matte and textured color options."],
    ["Foam", "High-density HR foam options depending on product type and comfort target."],
    ["Fabric", "UV-resistant, water-repellent and mildew-resistant outdoor fabric alternatives."],
  ],
  productCtaKicker: "Project-Based Quotation",
  productCtaTitle: "Interested in this model?",
  productCtaText: "Share your quantity, delivery location and project type with us. We can prepare a project-based quotation according to your material and production preferences.",
  productCtaPoints: ["Quantity", "Delivery Location", "Project Type"],
  productCtaButton: "Add This Model to Quote List",
  options: [
    "Custom dimensions according to project requirements",
    "Fabric, frame color and finish alternatives",
    "Sample or prototype review for selected projects",
    "Export-suitable packaging upon request",
    "Optional third-party pre-shipment inspection",
  ],
  aboutKicker: "About",
  aboutTitle: "A project partner for architectural furniture needs.",
  aboutText: "Birkin Contract is a Türkiye-based custom-made contract furniture supplier for hotels, restaurants, villas, hospitality and architectural projects.",
  contactKicker: "Contact",
  contactTitle: "Tell us about your project.",
  contactText: "For accurate pricing, please include product groups, quantities, dimensions, material preferences and delivery location.",
  footerText: "Custom-made contract furniture solutions for hospitality and architectural spaces.",
  rights: "© 2026 Birkin Contract. All rights reserved.",
}

const trContent: SiteContent = {
  ...enContent,
  nav: ["Ana Sayfa", "Koleksiyonlar", "Ürünler", "Projeler", "Proje Üretimi", "Malzemeler", "Dokümanlar", "Hakkımızda", "İletişim"],
  quote: "Teklif Listesi",
  clearList: "Listeyi Temizle",
  heroKicker: "Özel Üretim Kontrat Mobilya",
  heroTitle: "Hospitality projeleri için Türkiye’den özel üretim mobilya.",
  heroText: "Otel, restoran, villa ve mimari iç mekân projeleri için koleksiyon bazlı özel üretim mobilya tedariki.",
  heroPrimary: "Koleksiyonları İncele",
  heroSecondary: "Proje Teklifi",
  introTitle: "Kontrat mobilyaya daha sakin ve mimari bir yaklaşım.",
  introText: "Hospitality ve mimari projeler için projeye özel özelleştirme, ihracata uygun ambalaj ve opsiyonel üçüncü taraf denetim süreçlerini organize ediyoruz.",
  collectionsKicker: "Koleksiyonlar",
  collectionsTitle: "Proje koordinasyonu için tasarlanmış koleksiyonlar.",
  collectionsText: "Her koleksiyon, uyumlu bir görsel dilde modelleri bir araya getirir.",
  productsKicker: "Ürünler",
  productsTitle: "Ürün indeksi.",
  productsText: "Modelleri inceleyin ve teklif listenizi oluşturun.",
  projectsKicker: "Projeler",
  projectsTitle: "Hospitality, villa, restoran ve ticari iç mekânlar.",
  projectsText: "Birkin Contract; görsel bütünlük, dayanıklılık ve teslimat koordinasyonunun önemli olduğu alanlarda proje bazlı mobilya tedariki sağlar.",
  contractKicker: "Proje Üretimi",
  contractTitle: "Türkiye’den özel üretim tedarik.",
  contractText: "Özel ölçü, malzeme seçimi, üretim koordinasyonu, ihracata uygun ambalaj ve opsiyonel üçüncü taraf denetim proje ihtiyacına göre organize edilebilir.",
  libraryKicker: "Dokümanlar",
  libraryTitle: "Proje değerlendirmesi için dokümanlar.",
  libraryText: "Company profile, malzeme yönlendirmeleri, ihracat ambalaj notları ve proje bazlı üretim bilgilerine ulaşabilirsiniz.",
  allProducts: "Tüm Ürünler",
  addToQuote: "Teklif Listesine Ekle",
  added: "Eklendi",
  viewDetails: "Detayları İncele",
  backToProducts: "Ürünlere Dön",
  projectOptions: "Proje Opsiyonları",
  productSpecsTitle: "Teknik Özellikler",
  productSpecsText: "Proje bazlı üretim için genel teknik yönlendirmedir. Nihai özellikler adet, proje lokasyonu ve talep edilen malzeme standardına göre değişebilir.",
  productSpecs: [
    ["Malzeme Yönü", "Gövde, döşeme ve yüzey seçenekleri iç mekân, dış mekân veya hospitality kullanımına göre belirlenebilir."],
    ["Üretim Notu", "Özel üretim proje siparişlerinde seri üretim öncesi numune veya prototip kontrolü önerilir."],
    ["Özelleştirme", "Ölçü, kumaş, gövde rengi, ahşap yüzey ve konfor detayları proje ihtiyacına göre uyarlanabilir."],
    ["İhracat ve Kalite", "Talebe göre ihracata uygun ambalaj ve sevkiyat öncesi üçüncü taraf kalite kontrol organize edilebilir."],
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
  },
  quoteKicker: "Teklif Listesi",
  quoteTitle: "Ürünleri seçin, fiyat teklifi talep edin.",
  quoteText: "Seçili ürünleri ekleyin, adetleri ayarlayın ve proje bilgilerinizi WhatsApp veya e-mail üzerinden doğrudan Birkin Contract’a gönderin.",
  empty: "Teklif listeniz boş. Lütfen önce bir ürün ekleyin.",
  remove: "Kaldır",
  whatsapp: "WhatsApp’tan Teklif Talebi Gönder",
  emailQuote: "E-mail ile Teklif Talebi Gönder",
  fillAllFields: "Lütfen teklif talebi göndermeden önce gerekli alanları doldurun.",
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
  materialsText: "Önerilen yönlendirmeler arasında doğal ahşap, elektrostatik toz boyalı metal, yüksek yoğunluklu sünger ve hospitality kullanımına uygun döşeme alternatifleri yer alır.",
  materials: [
    ["Ahşap", "Iroko, teak ve projeye özel doğal ahşap alternatifleri."],
    ["Metal", "Dış mekâna uygun elektrostatik toz boya; mat ve dokulu renk seçenekleri."],
    ["Sünger", "Ürün tipi ve konfor hedefine göre yüksek yoğunluklu HR sünger seçenekleri."],
    ["Kumaş", "UV dayanımlı, su itici ve küf dayanımlı dış mekân kumaş alternatifleri."],
  ],
  productCtaKicker: "Proje Bazlı Teklif",
  productCtaTitle: "Bu modelle ilgileniyor musunuz?",
  productCtaText: "Adet, teslimat lokasyonu ve proje tipinizi bizimle paylaşın. Malzeme ve üretim tercihlerinize göre proje bazlı özel teklif hazırlayabiliriz.",
  productCtaPoints: ["Adet", "Teslimat Lokasyonu", "Proje Tipi"],
  productCtaButton: "Bu Modeli Teklif Listesine Ekle",
  options: [
    "Proje ihtiyacına göre özel ölçü çalışması",
    "Kumaş, gövde rengi ve yüzey alternatifleri",
    "Seçili projelerde numune veya prototip değerlendirmesi",
    "Talep halinde ihracata uygun ambalaj",
    "Opsiyonel üçüncü taraf sevkiyat öncesi kalite kontrol",
  ],
  aboutKicker: "Hakkımızda",
  aboutTitle: "Mimari mobilya ihtiyaçları için proje çözüm partneri.",
  aboutText: "Birkin Contract; otel, restoran, villa, hospitality ve mimari projeler için Türkiye merkezli özel üretim kontrat mobilya tedarikçisidir.",
  contactKicker: "İletişim",
  contactTitle: "Projenizi bize anlatın.",
  contactText: "Doğru fiyatlandırma için ürün grupları, adetler, ölçüler, malzeme tercihleri ve teslimat lokasyonunu belirtmenizi rica ederiz.",
  footerText: "Hospitality ve mimari projeler için özel üretim kontrat mobilya çözümleri.",
  rights: "© 2026 Birkin Contract. Tüm hakları saklıdır.",
}

const content: Record<Lang, SiteContent> = {
  en: enContent,
  tr: trContent,
  ar: enContent,
  ru: enContent,
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const savedLang = localStorage.getItem("birkin-language") as Lang | null
    if (savedLang === "en" || savedLang === "tr" || savedLang === "ar" || savedLang === "ru") return savedLang
    return "tr"
  })

  const [selectedSection, setSelectedSection] = useState<ProductSection | "All">("All")
  const [heroProductIndex, setHeroProductIndex] = useState(0)
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [selectedGalleryImage, setSelectedGalleryImage] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

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
    const timer = window.setTimeout(() => setShowIntro(false), 1500)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    localStorage.setItem("birkin-quote-cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
  }, [lang])

  useEffect(() => {
    setMenuOpen(false)
  }, [currentPath, lang])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeroProductIndex((current) => (current + 1) % products.length)
    }, 3200)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname)
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  useEffect(() => {
    setSelectedGalleryImage("")
  }, [currentPath])

  const t = content[lang]
  const heroProduct = products[heroProductIndex] ?? products[0]
  const quoteCount = cart.reduce((total, item) => total + item.qty, 0)

  const activeProductSlug = currentPath.startsWith("/products/")
    ? currentPath.split("/products/")[1]?.split("/")[0] ?? ""
    : ""

  const activeProduct = products.find((product) => product.slug === activeProductSlug)

  const productGallery =
    activeProduct?.gallery && activeProduct.gallery.length > 0
      ? activeProduct.gallery
      : activeProduct
        ? [activeProduct.image]
        : []

  const activeGalleryImage =
    selectedGalleryImage && productGallery.includes(selectedGalleryImage)
      ? selectedGalleryImage
      : productGallery[0] ?? fallbackProductImage

  useEffect(() => {
    const baseTitle = "Birkin Contract | Custom-Made Contract Furniture Supplier from Türkiye"
    const baseDescription = "Birkin Contract is a Türkiye-based custom-made contract furniture supplier for hotels, restaurants, villas, hospitality and architectural projects."

    if (activeProduct) {
      const title = `${activeProduct.name} | ${activeProduct.collection} | Birkin Contract`
      const description = `${activeProduct.name} is part of ${activeProduct.collection}, designed for hospitality and architectural projects.`
      const productUrl = `${window.location.origin}/products/${activeProduct.slug}`
      const productImage = absoluteUrl(activeProduct.image)

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
      updateOgTag("og:url", window.location.origin)
      updateOgTag("og:image", absoluteUrl(logoImage))
      updateMetaTag("twitter:title", "Birkin Contract | Contract Furniture Supplier from Türkiye")
      updateMetaTag("twitter:description", "Project-based custom-made contract furniture solutions for hospitality and architectural spaces.")
      updateMetaTag("twitter:image", absoluteUrl(logoImage))
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
    quoteInfo.deliveryLocation.trim() !== ""

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
${quoteInfo.notes || "-"}

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
${quoteInfo.notes || "-"}

Please share pricing, production lead time and export packaging details.`

    return `https://wa.me/905525000320?text=${encodeURIComponent(message)}`
  }, [selectedProductsText, quoteInfo, lang])

  const emailQuoteLink = useMemo(() => {
    const subject =
      lang === "tr"
        ? "Birkin Contract - Proje Bazlı Teklif Talebi"
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
${quoteInfo.notes || "-"}

Lütfen fiyat, üretim süresi, ödeme şartları ve ihracata uygun ambalaj detaylarını paylaşır mısınız?

Teşekkürler.`
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
${quoteInfo.notes || "-"}

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

  const Header = () => {
    const navLinks: Pair[] = [
      [t.nav[0], "/"],
      [t.nav[1], "/#collections"],
      [t.nav[2], "/#products"],
      [t.nav[3], "/#projects"],
      [t.nav[4], "/#contract"],
      [t.nav[5], "/#materials"],
      [t.nav[6], "/#library"],
      [t.nav[7], "/#about"],
      [t.nav[8], "/#contact"],
    ]

    return (
      <header className={menuOpen ? "navbar editorialNavbar menuOpen" : "navbar editorialNavbar"}>
        <button
          type="button"
          className="brand brandButton"
          aria-label="Birkin Contract home"
          onClick={() => goTo("/")}
        >
          <BirkinLogo />
        </button>

        <button
          type="button"
          className="menuButton"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={menuOpen ? "mainNav open" : "mainNav"} aria-label="Main navigation">
          {navLinks.map(([label, path]) => (
            <a
              key={path}
              href={path}
              onClick={(event) => {
                event.preventDefault()
                goTo(path)
              }}
            >
              {label}
            </a>
          ))}
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

          <button type="button" className="navBtn quoteNavBtn" onClick={() => goTo("/#quote-list")}>
            {t.quote}
            {quoteCount > 0 && <span className="quoteBadge">{quoteCount}</span>}
          </button>
        </div>
      </header>
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
          {[
            [t.nav[1], "/#collections"],
            [t.nav[2], "/#products"],
            [t.nav[3], "/#projects"],
            [t.nav[4], "/#contract"],
            [t.nav[5], "/#materials"],
            [t.nav[8], "/#contact"],
          ].map(([label, path]) => (
            <a
              key={path}
              href={path}
              onClick={(event) => {
                event.preventDefault()
                goTo(path)
              }}
            >
              {label}
            </a>
          ))}
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
          {showIntro && <IntroOverlay />}
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
        {showIntro && <IntroOverlay />}
        <Header />

        <section className="productDetailHero editorialProductHero">
          <div className="productDetailGallery">
            <div className="productDetailImage">
              <img src={activeGalleryImage} alt={activeProduct.name} onError={handleImageFallback} />
            </div>

            {productGallery.length > 1 && (
              <div className="productGalleryThumbs">
                {productGallery.map((image) => (
                  <button
                    type="button"
                    key={image}
                    className={
                      activeGalleryImage === image
                        ? "productGalleryThumb active"
                        : "productGalleryThumb"
                    }
                    onClick={() => setSelectedGalleryImage(image)}
                  >
                    <img src={image} alt={activeProduct.name} onError={handleImageFallback} />
                  </button>
                ))}
              </div>
            )}
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

            {activeProduct.dimensions && activeProduct.dimensions.length > 0 && (
              <div className="dimensionBox">
                <h3>{lang === "tr" ? "Ürün Ölçüleri" : "Product Dimensions"}</h3>

                <div className="dimensionTable">
                  <div className="dimensionRow dimensionHead">
                    <span>{lang === "tr" ? "Boyut" : "Dimension"}</span>
                    <span>CM</span>
                    <span>INC</span>
                  </div>

                  {activeProduct.dimensions.map((item) => (
                    <div className="dimensionRow" key={item.label[lang]}>
                      <span>{item.label[lang]}</span>
                      <span>{item.cm}</span>
                      <span>{item.inch}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                    <img src={product.image} alt={product.name} loading="lazy" onError={handleImageFallback} />
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
      {showIntro && <IntroOverlay />}
      <Header />

      <section className="editorialHero upgradedHero">
        <div className="editorialHeroText">
          <span className="kicker">{t.heroKicker}</span>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>

          <div className="heroTrustRow">
            {heroTrustBadges[lang].map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>

          <div className="heroButtons">
            <a
              href="#collections"
              className="primaryBtn"
              onClick={(event) => {
                event.preventDefault()
                goTo("/#collections")
              }}
            >
              {t.heroPrimary}
            </a>
            <a
              href="#quote-list"
              className="secondaryBtn"
              onClick={(event) => {
                event.preventDefault()
                goTo("/#quote-list")
              }}
            >
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
            loading="eager"
            decoding="async"
            onError={handleImageFallback}
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
            const modelWord =
              collectionItems.length === 1 ? modelWords[lang].one : modelWords[lang].many

            return (
              <article
                className="collectionFeatureCard"
                key={collection}
                onClick={() => {
                  if (coverProduct) goTo(`/products/${coverProduct.slug}`)
                }}
              >
                <div className="collectionFeatureImage">
                  {coverProduct && (
                    <img src={coverProduct.image} alt={collection} loading="lazy" onError={handleImageFallback} />
                  )}
                </div>

                <div className="collectionFeatureInfo">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{collection}</h3>
                  <p>
                    {collectionItems.length} {modelWord}
                  </p>
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
                <img src={product.image} alt={product.name} loading="lazy" onError={handleImageFallback} />
              </div>

              <div className="productEditorialInfo">
                <span>
                  {product.code} / {product.collection}
                </span>
                <h3>{product.name}</h3>
                <p>{product.desc[lang]}</p>

                <div className="productMetaChips">
                  <span>{t.categoryLabels[product.category]}</span>
                  <span>{product.usage[lang]}</span>
                </div>

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

      <section id="projects" className="section projectApplicationsSection">
        <div className="sectionHead editorialHead">
          <span className="kicker">{t.projectsKicker}</span>
          <h2>{t.projectsTitle}</h2>
          <p>{t.projectsText}</p>
        </div>

        <div className="projectApplicationsGrid">
          {projectAreas[lang].map(([title, text], index) => (
            <article className="projectApplicationCard" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
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
                <div className="quoteToolbar">
                  <span>
                    {quoteCount} {quoteCount === 1 ? modelWords[lang].one : modelWords[lang].many}
                  </span>
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
            <input required aria-label={t.fields.name} placeholder={t.fields.name} value={quoteInfo.name} onChange={(e) => setQuoteInfo({ ...quoteInfo, name: e.target.value })} />
            <input required aria-label={t.fields.email} placeholder={t.fields.email} value={quoteInfo.email} onChange={(e) => setQuoteInfo({ ...quoteInfo, email: e.target.value })} />
            <input required aria-label={t.fields.phone} placeholder={t.fields.phone} value={quoteInfo.phone} onChange={(e) => setQuoteInfo({ ...quoteInfo, phone: e.target.value })} />
            <input required aria-label={t.fields.country} placeholder={t.fields.country} value={quoteInfo.country} onChange={(e) => setQuoteInfo({ ...quoteInfo, country: e.target.value })} />
            <input required aria-label={t.fields.projectType} placeholder={t.fields.projectType} value={quoteInfo.projectType} onChange={(e) => setQuoteInfo({ ...quoteInfo, projectType: e.target.value })} />
            <input required aria-label={t.fields.deliveryLocation} placeholder={t.fields.deliveryLocation} value={quoteInfo.deliveryLocation} onChange={(e) => setQuoteInfo({ ...quoteInfo, deliveryLocation: e.target.value })} />
            <textarea aria-label={t.fields.notes} placeholder={t.fields.notes} value={quoteInfo.notes} onChange={(e) => setQuoteInfo({ ...quoteInfo, notes: e.target.value })} />

            <div className="quoteActionButtons">
              <button
                type="button"
                className="whatsappQuoteBtn"
                onClick={handleWhatsappQuote}
                disabled={!isQuoteFormComplete}
              >
                {t.whatsapp}
              </button>

              <button
                type="button"
                className="emailQuoteBtn"
                onClick={handleEmailQuote}
                disabled={!isQuoteFormComplete}
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
          <a href="mailto:burak@birkin.com">burak@birkin.com</a>
          <a href="tel:+905525000320">+90 552 500 03 20</a>
          <span>Türkiye</span>
        </div>
      </section>

      <Footer />
    </main>
  )
}
