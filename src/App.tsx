import { useEffect, useMemo, useState, type SyntheticEvent } from "react";
import "./index.css";

type Lang = "en" | "tr" | "ar" | "ru";

type ProductSection =
  | "Chair"
  | "Armchair"
  | "Dining Table"
  | "Coffee Table"
  | "Bar Stool"
  | "Lounge"
  | "Ottoman"
  | "Outdoor";

type CollectionName = string;
type LocalizedText = Record<Lang, string>;
type Pair = [string, string];

type Product = {
  slug: string;
  code: string;
  name: string;
  category: ProductSection;
  collection: CollectionName;
  usage: LocalizedText;
  desc: LocalizedText;
  image: string;
  gallery?: string[];
};

type CartItem = {
  code: string;
  name: string;
  category: ProductSection;
  qty: number;
};

type SiteContent = {
  nav: string[];
  quote: string;
  clearList: string;
  heroKicker: string;
  heroTitle: string;
  heroText: string;
  heroPrimary: string;
  heroSecondary: string;
  introKicker: string;
  introTitle: string;
  introText: string;
  collectionsKicker: string;
  collectionsTitle: string;
  collectionsText: string;
  productsKicker: string;
  productsTitle: string;
  productsText: string;
  projectsKicker: string;
  projectsTitle: string;
  projectsText: string;
  contractKicker: string;
  contractTitle: string;
  contractText: string;
  materialsKicker: string;
  materialsTitle: string;
  materialsText: string;
  libraryKicker: string;
  libraryTitle: string;
  libraryText: string;
  aboutKicker: string;
  aboutTitle: string;
  aboutText: string;
  contactKicker: string;
  contactTitle: string;
  contactText: string;
  allProducts: string;
  addToQuote: string;
  added: string;
  viewDetails: string;
  backToProducts: string;
  projectOptions: string;
  productSpecsTitle: string;
  productSpecsText: string;
  productCtaKicker: string;
  productCtaTitle: string;
  productCtaText: string;
  productCtaPoints: string[];
  productCtaButton: string;
  quoteKicker: string;
  quoteTitle: string;
  quoteText: string;
  empty: string;
  remove: string;
  whatsapp: string;
  emailQuote: string;
  fillAllFields: string;
  footerText: string;
  rights: string;
  categoryLabels: Record<ProductSection, string>;
  fields: {
    name: string;
    email: string;
    phone: string;
    country: string;
    projectType: string;
    deliveryLocation: string;
    notes: string;
  };
  materials: Pair[];
  productSpecs: Pair[];
  options: string[];
};

const logoImage = "/birkin-logo.png";
const fallbackProductImage = new URL("./assets/hero.png", import.meta.url).href;
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
      en: "A sculptural upholstered armchair with soft rolled forms and warm wooden arm details, designed for refined hospitality interiors.",
      tr: "Yumuşak kıvrımlı döşemesi ve sıcak ahşap kol detayıyla rafine hospitality iç mekânları için tasarlanmış heykelsi berjer modeli.",
      ar: "A sculptural upholstered armchair with soft rolled forms and warm wooden arm details, designed for refined hospitality interiors.",
      ru: "A sculptural upholstered armchair with soft rolled forms and warm wooden arm details, designed for refined hospitality interiors.",
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
];

const productSections: ProductSection[] = [
  "Chair",
  "Armchair",
  "Dining Table",
  "Coffee Table",
  "Bar Stool",
  "Lounge",
  "Ottoman",
  "Outdoor",
];

const modelWords: Record<Lang, { one: string; many: string }> = {
  en: { one: "model", many: "models" },
  tr: { one: "model", many: "model" },
  ar: { one: "model", many: "models" },
  ru: { one: "model", many: "models" },
};

const heroTrustBadges: Record<Lang, string[]> = {
  en: ["Custom production", "Export packaging", "Project quotation", "Optional inspection"],
  tr: ["Özel üretim", "İhracat ambalajı", "Proje bazlı teklif", "Opsiyonel kalite kontrol"],
  ar: ["Custom production", "Export packaging", "Project quotation", "Optional inspection"],
  ru: ["Custom production", "Export packaging", "Project quotation", "Optional inspection"],
};

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
};

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
  introText: "We organize collection-based product language, project-specific customization, export-suitable packaging and optional third-party inspection.",
  collectionsKicker: "Collections",
  collectionsTitle: "Collections designed for project coordination.",
  collectionsText: "Each collection groups models with a consistent visual language, making selection easier for architects and procurement teams.",
  productsKicker: "Products",
  productsTitle: "Product index.",
  productsText: "Filter by type, review models and build your quotation list.",
  projectsKicker: "Projects",
  projectsTitle: "Hospitality, villas, restaurants and commercial interiors.",
  projectsText: "Birkin Contract supports project-based furniture supply for spaces where visual consistency, durability and delivery coordination matter.",
  contractKicker: "Contract",
  contractTitle: "Custom-made supply from Türkiye.",
  contractText: "Custom dimensions, material selection, production coordination, export packaging and optional inspection can be arranged according to project requirements.",
  materialsKicker: "Materials",
  materialsTitle: "Material directions for project-based production.",
  materialsText: "Recommended directions include wood, metal finishes, high-density foam and hospitality-grade fabrics.",
  libraryKicker: "Library",
  libraryTitle: "Documents for project evaluation.",
  libraryText: "Company profile and catalogue documents will be added soon.",
  aboutKicker: "About",
  aboutTitle: "A project partner for architectural furniture needs.",
  aboutText: "Birkin Contract is a Türkiye-based custom-made contract furniture supplier for hotels, restaurants, villas and architectural projects.",
  contactKicker: "Contact",
  contactTitle: "Tell us about your project.",
  contactText: "For accurate pricing, please include product groups, quantities, dimensions, material preferences and delivery location.",
  allProducts: "All Products",
  addToQuote: "Add to Quote List",
  added: "Added",
  viewDetails: "View Details",
  backToProducts: "Back to Products",
  projectOptions: "Project Options",
  productSpecsTitle: "Technical Specifications",
  productSpecsText: "General technical direction for project-based production. Final specifications may vary according to quantity and requested material standard.",
  productCtaKicker: "Project-Based Quotation",
  productCtaTitle: "Interested in this model?",
  productCtaText: "Share your quantity, delivery location and project type with us.",
  productCtaPoints: ["Quantity", "Delivery Location", "Project Type"],
  productCtaButton: "Add This Model to Quote List",
  quoteKicker: "Quote List",
  quoteTitle: "Select products and request pricing.",
  quoteText: "Add selected products, adjust quantities and send your project details directly via WhatsApp or e-mail.",
  empty: "Your quote list is empty. Please add a product first.",
  remove: "Remove",
  whatsapp: "Send Quote Request via WhatsApp",
  emailQuote: "Send Quote Request by E-mail",
  fillAllFields: "Please fill in all required fields before sending your quotation request.",
  footerText: "Custom-made contract furniture solutions for hospitality and architectural spaces.",
  rights: "© 2026 Birkin Contract. All rights reserved.",
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
  fields: {
    name: "Name / Company",
    email: "E-mail",
    phone: "Phone / WhatsApp",
    country: "Country / City",
    projectType: "Project Type",
    deliveryLocation: "Delivery Location",
    notes: "Project notes, dimensions, material preferences",
  },
  materials: [
    ["Wood", "Natural wood alternatives according to project requirements."],
    ["Metal", "Powder coated metal finishes with matte and textured color options."],
    ["Foam", "High-density foam options depending on product type and comfort target."],
    ["Fabric", "Hospitality-grade fabric alternatives for project-based production."],
  ],
  productSpecs: [
    ["Material Direction", "Frame, upholstery and surface finish can be selected according to project use."],
    ["Production Note", "Prototype or sample review is recommended before mass production."],
    ["Customization", "Dimensions, fabric, frame color, wood finish and comfort details can be adapted."],
    ["Export & Quality", "Export-suitable packaging and optional third-party inspection can be arranged."],
  ],
  options: [
    "Custom dimensions",
    "Fabric and finish alternatives",
    "Sample review for selected projects",
    "Export-suitable packaging",
    "Optional third-party inspection",
  ],
};

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
  introText: "Koleksiyon bazlı ürün dili, projeye özel özelleştirme, ihracata uygun ambalaj ve opsiyonel kalite kontrol süreçlerini organize ediyoruz.",
  collectionsKicker: "Koleksiyonlar",
  collectionsTitle: "Proje koordinasyonu için tasarlanmış koleksiyonlar.",
  collectionsText: "Her koleksiyon, uyumlu bir görsel dilde modelleri bir araya getirir.",
  productsKicker: "Ürünler",
  productsTitle: "Ürün indeksi.",
  productsText: "Ürün tipine göre filtreleyin, modelleri inceleyin ve teklif listenizi oluşturun.",
  projectsKicker: "Projeler",
  projectsTitle: "Hospitality, villa, restoran ve ticari iç mekânlar.",
  projectsText: "Birkin Contract; görsel bütünlük, dayanıklılık ve teslimat koordinasyonunun önemli olduğu alanlarda proje bazlı mobilya tedariki sağlar.",
  contractKicker: "Proje Üretimi",
  contractTitle: "Türkiye’den özel üretim tedarik.",
  contractText: "Özel ölçü, malzeme seçimi, üretim koordinasyonu, ihracata uygun ambalaj ve opsiyonel denetim proje ihtiyacına göre organize edilebilir.",
  materialsKicker: "Malzemeler",
  materialsTitle: "Proje bazlı üretim için malzeme yönlendirmeleri.",
  materialsText: "Ahşap, metal yüzey, yüksek yoğunluklu sünger ve hospitality kullanımına uygun kumaş alternatifleri.",
  libraryKicker: "Dokümanlar",
  libraryTitle: "Proje değerlendirmesi için dokümanlar.",
  libraryText: "Company profile ve katalog dokümanları yakında eklenecektir.",
  aboutKicker: "Hakkımızda",
  aboutTitle: "Mimari mobilya ihtiyaçları için proje çözüm partneri.",
  aboutText: "Birkin Contract; otel, restoran, villa ve mimari projeler için Türkiye merkezli özel üretim kontrat mobilya tedarikçisidir.",
  contactKicker: "İletişim",
  contactTitle: "Projenizi bize anlatın.",
  contactText: "Doğru fiyatlandırma için ürün grupları, adetler, ölçüler, malzeme tercihleri ve teslimat lokasyonunu belirtmenizi rica ederiz.",
  allProducts: "Tüm Ürünler",
  addToQuote: "Teklif Listesine Ekle",
  added: "Eklendi",
  viewDetails: "Detayları İncele",
  backToProducts: "Ürünlere Dön",
  projectOptions: "Proje Opsiyonları",
  productSpecsTitle: "Teknik Özellikler",
  productSpecsText: "Proje bazlı üretim için genel teknik yönlendirmedir. Nihai özellikler adet ve talep edilen malzeme standardına göre değişebilir.",
  productCtaKicker: "Proje Bazlı Teklif",
  productCtaTitle: "Bu modelle ilgileniyor musunuz?",
  productCtaText: "Adet, teslimat lokasyonu ve proje tipinizi bizimle paylaşın.",
  productCtaPoints: ["Adet", "Teslimat Lokasyonu", "Proje Tipi"],
  productCtaButton: "Bu Modeli Teklif Listesine Ekle",
  quoteKicker: "Teklif Listesi",
  quoteTitle: "Ürünleri seçin, fiyat teklifi talep edin.",
  quoteText: "Seçili ürünleri ekleyin, adetleri ayarlayın ve proje bilgilerinizi WhatsApp veya e-mail üzerinden gönderin.",
  empty: "Teklif listeniz boş. Lütfen önce bir ürün ekleyin.",
  remove: "Kaldır",
  whatsapp: "WhatsApp’tan Teklif Talebi Gönder",
  emailQuote: "E-mail ile Teklif Talebi Gönder",
  fillAllFields: "Lütfen teklif talebi göndermeden önce gerekli alanları doldurun.",
  footerText: "Hospitality ve mimari projeler için özel üretim kontrat mobilya çözümleri.",
  rights: "© 2026 Birkin Contract. Tüm hakları saklıdır.",
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
  fields: {
    name: "Ad / Firma",
    email: "E-mail",
    phone: "Telefon / WhatsApp",
    country: "Ülke / Şehir",
    projectType: "Proje Tipi",
    deliveryLocation: "Teslimat Lokasyonu",
    notes: "Proje notları, ölçüler, malzeme tercihleri",
  },
  materials: [
    ["Ahşap", "Proje ihtiyacına göre doğal ahşap alternatifleri."],
    ["Metal", "Mat ve dokulu renk seçenekleriyle toz boya yüzeyler."],
    ["Sünger", "Ürün tipi ve konfor hedefine göre yüksek yoğunluklu sünger."],
    ["Kumaş", "Proje bazlı üretime uygun hospitality kumaş alternatifleri."],
  ],
  productSpecs: [
    ["Malzeme Yönü", "Gövde, döşeme ve yüzey seçenekleri proje kullanımına göre belirlenebilir."],
    ["Üretim Notu", "Seri üretim öncesi numune veya prototip kontrolü önerilir."],
    ["Özelleştirme", "Ölçü, kumaş, gövde rengi, ahşap yüzey ve konfor detayları uyarlanabilir."],
    ["İhracat ve Kalite", "İhracata uygun ambalaj ve opsiyonel kalite kontrol organize edilebilir."],
  ],
  options: [
    "Özel ölçü",
    "Kumaş ve yüzey alternatifleri",
    "Seçili projelerde numune",
    "İhracata uygun ambalaj",
    "Opsiyonel kalite kontrol",
  ],
};

const content: Record<Lang, SiteContent> = {
  en: enContent,
  tr: trContent,
  ar: enContent,
  ru: enContent,
};

function BirkinLogo() {
  return <img src={logoImage} alt="Birkin Contract Logo" className="siteLogo" />;
}

function handleImageFallback(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  if (image.dataset.fallbackApplied === "true") return;
  image.dataset.fallbackApplied = "true";
  image.src = fallbackProductImage;
}

function updateMetaTag(name: string, value: string) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", value);
}

function updateOgTag(property: string, value: string) {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", value);
}

function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${window.location.origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const savedLang = localStorage.getItem("birkin-language") as Lang | null;
    if (savedLang === "en" || savedLang === "tr" || savedLang === "ar" || savedLang === "ru") return savedLang;
    return "en";
  });

  const [selectedSection, setSelectedSection] = useState<ProductSection | "All">("All");
  const [heroProductIndex, setHeroProductIndex] = useState(0);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("birkin-quote-cart") || "[]") as CartItem[];
    } catch {
      return [];
    }
  });

  const [quoteInfo, setQuoteInfo] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    projectType: "",
    deliveryLocation: "",
    notes: "",
  });

  const t = content[lang];
  const heroProduct = products[heroProductIndex] || products[0];
  const quoteCount = cart.reduce((total, item) => total + item.qty, 0);

  const activeProductSlug = currentPath.startsWith("/products/")
    ? currentPath.replace("/products/", "").replace("/", "")
    : "";

  const activeProduct = products.find((product) => product.slug === activeProductSlug);
  const productGallery = activeProduct?.gallery?.length ? activeProduct.gallery : activeProduct ? [activeProduct.image] : [];
  const activeGalleryImage =
    selectedGalleryImage && productGallery.includes(selectedGalleryImage)
      ? selectedGalleryImage
      : productGallery[0];

  const filteredProducts =
    selectedSection === "All"
      ? products
      : products.filter((product) => product.category === selectedSection);

  const isQuoteFormComplete =
    cart.length > 0 &&
    quoteInfo.name.trim() !== "" &&
    quoteInfo.email.trim() !== "" &&
    quoteInfo.phone.trim() !== "" &&
    quoteInfo.country.trim() !== "" &&
    quoteInfo.projectType.trim() !== "" &&
    quoteInfo.deliveryLocation.trim() !== "";

  const selectedProductsText =
    cart.length === 0
      ? "-"
      : cart
          .map((item) => `- ${item.code} / ${item.name} / ${t.categoryLabels[item.category]} x ${item.qty}`)
          .join("\n");

  const whatsappQuoteLink = useMemo(() => {
    const message = `Hello Birkin Contract Team,

I would like to request a project-based quotation.

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
${quoteInfo.notes || "-"}`;

    return `https://wa.me/905525000320?text=${encodeURIComponent(message)}`;
  }, [selectedProductsText, quoteInfo]);

  const emailQuoteLink = useMemo(() => {
    const body = `Hello Birkin Contract Team,

I would like to request a project-based quotation.

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
${quoteInfo.notes || "-"}`;

    return `mailto:burak@birkin.com?subject=${encodeURIComponent("Birkin Contract - Project-Based Quotation Request")}&body=${encodeURIComponent(body)}`;
  }, [selectedProductsText, quoteInfo]);

  useEffect(() => {
    localStorage.setItem("birkin-quote-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentPath, lang]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeroProductIndex((current) => (current + 1) % products.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    setSelectedGalleryImage("");
  }, [currentPath]);

  useEffect(() => {
    const baseTitle = "Birkin Contract | Custom-Made Contract Furniture Supplier from Türkiye";
    const baseDescription =
      "Birkin Contract is a Türkiye-based custom-made contract furniture supplier for hotels, restaurants, villas, hospitality and architectural projects.";

    if (activeProduct) {
      const title = `${activeProduct.name} | ${activeProduct.collection} | Birkin Contract`;
      const description = `${activeProduct.name} is designed for hotels, restaurants, villas, hospitality and architectural projects.`;

      document.title = title;
      updateMetaTag("description", description);
      updateOgTag("og:title", title);
      updateOgTag("og:description", description);
      updateOgTag("og:url", `${window.location.origin}/products/${activeProduct.slug}`);
      updateOgTag("og:image", absoluteUrl(activeProduct.image));
      updateMetaTag("twitter:title", title);
      updateMetaTag("twitter:description", description);
      updateMetaTag("twitter:image", absoluteUrl(activeProduct.image));
    } else {
      document.title = baseTitle;
      updateMetaTag("description", baseDescription);
      updateOgTag("og:title", baseTitle);
      updateOgTag("og:description", baseDescription);
      updateOgTag("og:url", window.location.origin);
      updateOgTag("og:image", absoluteUrl(fallbackProductImage));
    }
  }, [activeProduct]);

  const changeLanguage = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("birkin-language", newLang);
  };

  const goTo = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(window.location.pathname);

    const hash = path.includes("#") ? path.split("#")[1] : "";

    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (product: Product) => {
    setCart((current) => {
      if (current.some((item) => item.name === product.name)) return current;
      return [...current, { code: product.code, name: product.name, category: product.category, qty: 1 }];
    });
  };

  const increaseQty = (name: string) => {
    setCart((current) =>
      current.map((item) => (item.name === name ? { ...item, qty: item.qty + 1 } : item)),
    );
  };

  const decreaseQty = (name: string) => {
    setCart((current) =>
      current
        .map((item) => (item.name === name ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const removeFromCart = (name: string) => {
    setCart((current) => current.filter((item) => item.name !== name));
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleWhatsappQuote = () => {
    if (!isQuoteFormComplete) {
      alert(cart.length === 0 ? t.empty : t.fillAllFields);
      return;
    }

    window.open(whatsappQuoteLink, "_blank", "noopener,noreferrer");
  };

  const handleEmailQuote = () => {
    if (!isQuoteFormComplete) {
      alert(cart.length === 0 ? t.empty : t.fillAllFields);
      return;
    }

    window.location.href = emailQuoteLink;
  };

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
    ];

    return (
      <header className={menuOpen ? "navbar editorialNavbar menuOpen" : "navbar editorialNavbar"}>
        <button type="button" className="brand brandButton" aria-label="Birkin Contract home" onClick={() => goTo("/")}>
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
                event.preventDefault();
                goTo(path);
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
    );
  };

  const Footer = () => {
    const footerLinks: Pair[] = [
      [t.nav[2], "/#products"],
      [t.nav[3], "/#projects"],
      [t.nav[5], "/#materials"],
      [t.nav[8], "/#contact"],
    ];

    return (
      <>
        <footer className="footer">
          <div>
            <BirkinLogo />
            <p>{t.footerText}</p>
          </div>

          <div className="footerLinks">
            {footerLinks.map(([label, path]) => (
              <a
                key={path}
                href={path}
                onClick={(event) => {
                  event.preventDefault();
                  goTo(path);
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

        <a href="https://wa.me/905525000320" target="_blank" rel="noreferrer" className="floatingWhatsapp">
          WhatsApp
        </a>
      </>
    );
  };

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
      );
    }

    return (
      <main dir={lang === "ar" ? "rtl" : "ltr"}>
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
                    className={activeGalleryImage === image ? "productGalleryThumb active" : "productGalleryThumb"}
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

            <div className="productDetailActions">
              <button type="button" className="primaryBtn" onClick={() => addToCart(activeProduct)}>
                {cart.some((item) => item.name === activeProduct.name) ? `✓ ${t.added}` : t.addToQuote}
              </button>
              <button type="button" className="secondaryBtn" onClick={() => goTo("/#quote-list")}>
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

        <Footer />
      </main>
    );
  }

  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"}>
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
            <a href="#collections" className="primaryBtn" onClick={(event) => { event.preventDefault(); goTo("/#collections"); }}>
              {t.heroPrimary}
            </a>
            <a href="#quote-list" className="secondaryBtn" onClick={(event) => { event.preventDefault(); goTo("/#quote-list"); }}>
              {t.heroSecondary}
            </a>
          </div>
        </div>

        <div className="editorialHeroMedia">
          <span className="editorialHeroLabel">{heroProduct.collection}</span>
          <img src={heroProduct.image} alt={heroProduct.name} loading="eager" decoding="async" onError={handleImageFallback} />
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
          <article className="collectionFeatureCard" onClick={() => goTo(`/products/${products[0].slug}`)}>
            <div className="collectionFeatureImage">
              <img src={products[0].image} alt={products[0].collection} loading="lazy" onError={handleImageFallback} />
            </div>
            <div className="collectionFeatureInfo">
              <span>01</span>
              <h3>{products[0].collection}</h3>
              <p>1 {modelWords[lang].one}</p>
            </div>
          </article>
        </div>
      </section>

      <section id="products" className="section productIndexSection">
        <div className="sectionHead editorialHead">
          <span className="kicker">{t.productsKicker}</span>
          <h2>{t.productsTitle}</h2>
          <p>{t.productsText}</p>
        </div>

        <div className="typeFilterRow">
          <button type="button" className={selectedSection === "All" ? "typeFilter active" : "typeFilter"} onClick={() => setSelectedSection("All")}>
            {t.allProducts}
          </button>

          {productSections.map((section) => (
            <button type="button" key={section} className={selectedSection === section ? "typeFilter active" : "typeFilter"} onClick={() => setSelectedSection(section)}>
              {t.categoryLabels[section]}
            </button>
          ))}
        </div>

        <div className="productEditorialGrid">
          {filteredProducts.map((product) => (
            <article className="productEditorialCard clickableModelCard" key={product.name} onClick={() => goTo(`/products/${product.slug}`)}>
              <div className="productEditorialImage">
                <img src={product.image} alt={product.name} loading="lazy" onError={handleImageFallback} />
              </div>

              <div className="productEditorialInfo">
                <span>{product.code} / {product.collection}</span>
                <h3>{product.name}</h3>
                <p>{product.desc[lang]}</p>

                <div className="productMetaChips">
                  <span>{t.categoryLabels[product.category]}</span>
                  <span>{product.usage[lang]}</span>
                </div>

                <div className="modelActions">
                  <button type="button" onClick={(event) => { event.stopPropagation(); goTo(`/products/${product.slug}`); }} className="detailBtn">
                    {t.viewDetails}
                  </button>

                  <button type="button" onClick={(event) => { event.stopPropagation(); addToCart(product); }} className="modelBtn">
                    {cart.some((item) => item.name === product.name) ? `✓ ${t.added}` : t.addToQuote}
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
                  <span>{quoteCount} {quoteCount === 1 ? modelWords[lang].one : modelWords[lang].many}</span>
                  <button type="button" className="removeBtn" onClick={clearCart}>{t.clearList}</button>
                </div>

                <div className="quoteItems">
                  {cart.map((item) => (
                    <div className="quoteItem" key={item.name}>
                      <div>
                        <small>{item.code} / {t.categoryLabels[item.category]}</small>
                        <strong>{item.name}</strong>
                      </div>

                      <div className="qtyControls">
                        <button type="button" onClick={() => decreaseQty(item.name)}>-</button>
                        <span>{item.qty}</span>
                        <button type="button" onClick={() => increaseQty(item.name)}>+</button>
                      </div>

                      <button type="button" className="removeBtn" onClick={() => removeFromCart(item.name)}>{t.remove}</button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="quoteForm">
            <input required aria-label={t.fields.name} placeholder={t.fields.name} value={quoteInfo.name} onChange={(event) => setQuoteInfo({ ...quoteInfo, name: event.target.value })} />
            <input required aria-label={t.fields.email} placeholder={t.fields.email} value={quoteInfo.email} onChange={(event) => setQuoteInfo({ ...quoteInfo, email: event.target.value })} />
            <input required aria-label={t.fields.phone} placeholder={t.fields.phone} value={quoteInfo.phone} onChange={(event) => setQuoteInfo({ ...quoteInfo, phone: event.target.value })} />
            <input required aria-label={t.fields.country} placeholder={t.fields.country} value={quoteInfo.country} onChange={(event) => setQuoteInfo({ ...quoteInfo, country: event.target.value })} />
            <input required aria-label={t.fields.projectType} placeholder={t.fields.projectType} value={quoteInfo.projectType} onChange={(event) => setQuoteInfo({ ...quoteInfo, projectType: event.target.value })} />
            <input required aria-label={t.fields.deliveryLocation} placeholder={t.fields.deliveryLocation} value={quoteInfo.deliveryLocation} onChange={(event) => setQuoteInfo({ ...quoteInfo, deliveryLocation: event.target.value })} />
            <textarea aria-label={t.fields.notes} placeholder={t.fields.notes} value={quoteInfo.notes} onChange={(event) => setQuoteInfo({ ...quoteInfo, notes: event.target.value })} />

            <div className="quoteActionButtons">
              <button type="button" className="whatsappQuoteBtn" onClick={handleWhatsappQuote} disabled={!isQuoteFormComplete}>{t.whatsapp}</button>
              <button type="button" className="emailQuoteBtn" onClick={handleEmailQuote} disabled={!isQuoteFormComplete}>{t.emailQuote}</button>
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
  );
}
