import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "en";

type Dict = Record<string, string>;

const fr: Dict = {
  // Top bar
  "topbar.login": "Connexion",
  "topbar.dealer": "Espace Pro",
  "topbar.vip": "Portail VIP",
  "topbar.register": "Inscription",
  "topbar.contact": "Contact",
  "topbar.brands": "Marques",

  // Header / search
  "search.placeholder": "Rechercher (mots-clés ou code rapide)",
  "search.button": "Rechercher",
  "search.example": "Ex: Excavatrice moins de 70k",
  "search.forSale": "À vendre",
  "search.forRent": "À louer",
  "search.allCategories": "Toutes catégories",
  "search.allManufacturers": "Tous fabricants",
  "search.allModels": "Tous modèles",

  // CTAs
  "cta.sell": "Vendez votre équipement",
  "cta.financing": "Financement",
  "cta.viewAll": "Voir tout",
  "cta.viewDetails": "Voir la fiche",
  "cta.contactSeller": "Contacter le vendeur",
  "cta.addToWatch": "Ajouter à ma liste",
  "cta.removeFromWatch": "Retirer de ma liste",
  "cta.saveSearch": "Sauvegarder la recherche",
  "cta.calculate": "Calculer une mensualité",
  "cta.applyFilter": "Appliquer",
  "cta.resetFilter": "Réinitialiser",

  // Nav
  "nav.categories": "Catégories",
  "nav.forSale": "À vendre",
  "nav.forRent": "À louer",
  "nav.auctions": "Enchères",
  "nav.parts": "Pièces",
  "nav.market": "Rapport de marché",
  "nav.blog": "Blog",
  "nav.about": "À propos",
  "nav.more": "Plus",

  // Home
  "home.heroTitle": "Équipements neufs et d'occasion à vendre et à louer",
  "home.heroSubtitle": "La référence pour acheteurs et vendeurs de matériel agricole, de chantier et de transport.",
  "home.popular": "Catégories populaires",
  "home.allCats": "Toutes les catégories",
  "home.farmEquipment": "Matériel agricole",
  "home.constructionEquipment": "Matériel de chantier",
  "home.trucksTrailers": "Camions & remorques",
  "home.partsTitle": "Rechercher des pièces",
  "home.partsLabel": "N° de pièce ou mots-clés",
  "home.dismantled": "Machines démantelées",
  "home.attachmentsTitle": "Choisissez une catégorie d'accessoires",
  "home.constructionAttachments": "Accessoires de chantier",
  "home.agAttachments": "Accessoires agricoles",
  "home.truckParts": "Pièces & composants camion",
  "home.rentTitle": "Équipements et accessoires à louer",
  "home.rentEquipment": "Équipements",
  "home.rentAttachments": "Accessoires",
  "home.brandsTitle": "Marques populaires",
  "home.featured": "Annonces en vedette",
  "home.featuredSub": "Sélection mise à jour quotidiennement",
  "home.latestNews": "Actualités & rapports de marché",
  "home.noPart": "Pas de numéro ?",
  "home.viewByCat": "Voir par catégorie ou fabricant",

  // Listing
  "listing.results": "résultats",
  "listing.sortBy": "Trier par",
  "listing.sort.featured": "En vedette",
  "listing.sort.priceAsc": "Prix croissant",
  "listing.sort.priceDesc": "Prix décroissant",
  "listing.sort.newest": "Plus récents",
  "listing.sort.hours": "Heures (croissant)",
  "listing.filters": "Filtres",
  "listing.priceRange": "Fourchette de prix",
  "listing.year": "Année",
  "listing.hours": "Heures",
  "listing.brand": "Marque",
  "listing.location": "Localisation",
  "listing.condition": "État",
  "listing.new": "Neuf",
  "listing.used": "Occasion",
  "listing.featuredBadge": "VEDETTE",
  "listing.auctionBadge": "ENCHÈRE",

  // Detail
  "detail.specs": "Spécifications",
  "detail.description": "Description",
  "detail.seller": "Vendeur",
  "detail.financing": "Financement estimé",
  "detail.month": "/mois",
  "detail.shipping": "Livraison disponible",
  "detail.serial": "N° de série",
  "detail.year": "Année",
  "detail.hours": "Heures",
  "detail.power": "Puissance",
  "detail.transmission": "Transmission",
  "detail.location": "Localisation",
  "detail.relatedTitle": "Annonces similaires",

  // Auctions
  "auctions.title": "Résultats d'enchères",
  "auctions.subtitle": "Base de données des ventes passées pour évaluer les prix de marché.",
  "auctions.salePrice": "Prix de vente",
  "auctions.auctioneer": "Commissaire-priseur",
  "auctions.saleDate": "Date de vente",

  // Market
  "market.title": "Rapport de marché",
  "market.subtitle": "Indice de valeur des équipements (EVI) — tendances mensuelles.",
  "market.retail": "Valeur Retail",
  "market.auction": "Valeur Enchères",
  "market.inventory": "Inventaire",

  // Blog
  "blog.title": "Blog & Actualités",
  "blog.readMore": "Lire l'article",
  "blog.categories.news": "Actualités secteur",
  "blog.categories.howto": "Guides",
  "blog.categories.review": "Tests produits",
  "blog.categories.market": "Rapports de marché",

  // About / Contact
  "about.title": "À propos de TractorTrade",
  "about.intro": "TractorTrade est la place de marché de référence pour acheter, vendre et louer du matériel agricole, de chantier et de transport.",
  "contact.title": "Nous contacter",
  "contact.name": "Nom complet",
  "contact.email": "Adresse e-mail",
  "contact.phone": "Téléphone",
  "contact.message": "Message",
  "contact.send": "Envoyer le message",
  "contact.sent": "Message envoyé. Nous vous répondons sous 24h.",

  // Watch list
  "watch.title": "Ma liste de suivi",
  "watch.empty": "Aucun équipement enregistré pour le moment.",
  "watch.added": "Ajouté à votre liste",
  "watch.removed": "Retiré de votre liste",

  // Footer
  "footer.tagline": "La place de marché des engins agricoles, de chantier et de transport.",
  "footer.explore": "Explorer",
  "footer.company": "Entreprise",
  "footer.legal": "Légal",
  "footer.terms": "Conditions",
  "footer.privacy": "Confidentialité",
  "footer.cookies": "Cookies",
  "footer.rights": "Tous droits réservés.",
  "footer.newsletter": "Recevez les meilleures annonces chaque semaine",
  "footer.subscribe": "S'abonner",
  "footer.emailPlaceholder": "votre@email.com",

  // Misc
  "common.year": "Année",
  "common.hours": "h",
  "common.km": "km",
  "common.contact": "Contact",
  "common.menu": "Menu",
  "common.close": "Fermer",
  "common.search": "Recherche",
  "common.loading": "Chargement...",
  "common.notFound": "Aucun résultat",
};

const en: Dict = {
  "topbar.login": "Login",
  "topbar.dealer": "Dealer Portal",
  "topbar.vip": "VIP Portal",
  "topbar.register": "Register",
  "topbar.contact": "Contact Us",
  "topbar.brands": "Global Brands",

  "search.placeholder": "Search (ex: Keywords or Quick Find Code)",
  "search.button": "Search",
  "search.example": "Ex: Excavators Under 70k",
  "search.forSale": "For Sale",
  "search.forRent": "For Rent",
  "search.allCategories": "All Categories",
  "search.allManufacturers": "All Manufacturers",
  "search.allModels": "All Models",

  "cta.sell": "Sell Your Equipment",
  "cta.financing": "Get Financing",
  "cta.viewAll": "View all",
  "cta.viewDetails": "View details",
  "cta.contactSeller": "Contact seller",
  "cta.addToWatch": "Add to Watch List",
  "cta.removeFromWatch": "Remove from Watch List",
  "cta.saveSearch": "Save this search",
  "cta.calculate": "Calculate payment",
  "cta.applyFilter": "Apply",
  "cta.resetFilter": "Reset",

  "nav.categories": "Categories",
  "nav.forSale": "For Sale",
  "nav.forRent": "For Rent",
  "nav.auctions": "Auctions",
  "nav.parts": "Parts",
  "nav.market": "Market Report",
  "nav.blog": "Blog",
  "nav.about": "About",
  "nav.more": "More",

  "home.heroTitle": "New & used equipment for sale and for rent",
  "home.heroSubtitle": "The destination for buyers and sellers of farm, construction and transport equipment.",
  "home.popular": "Popular Categories",
  "home.allCats": "All Categories",
  "home.farmEquipment": "Farm Equipment",
  "home.constructionEquipment": "Construction Equipment",
  "home.trucksTrailers": "Trucks & Trailers",
  "home.partsTitle": "Search for Parts",
  "home.partsLabel": "Part # or Keywords",
  "home.dismantled": "Search Dismantled Machines",
  "home.attachmentsTitle": "Pick an attachment category",
  "home.constructionAttachments": "Construction Attachments",
  "home.agAttachments": "Ag Components and Attachments",
  "home.truckParts": "Truck Parts and Components",
  "home.rentTitle": "Equipment and Attachments For Rent",
  "home.rentEquipment": "Equipment",
  "home.rentAttachments": "Attachments",
  "home.brandsTitle": "Popular Brands",
  "home.featured": "Featured Listings",
  "home.featuredSub": "Hand-picked, updated daily",
  "home.latestNews": "News & Market Reports",
  "home.noPart": "No Part Number?",
  "home.viewByCat": "View By Category Or Manufacturer",

  "listing.results": "results",
  "listing.sortBy": "Sort by",
  "listing.sort.featured": "Featured",
  "listing.sort.priceAsc": "Price: low to high",
  "listing.sort.priceDesc": "Price: high to low",
  "listing.sort.newest": "Newest",
  "listing.sort.hours": "Hours: low to high",
  "listing.filters": "Filters",
  "listing.priceRange": "Price range",
  "listing.year": "Year",
  "listing.hours": "Hours",
  "listing.brand": "Brand",
  "listing.location": "Location",
  "listing.condition": "Condition",
  "listing.new": "New",
  "listing.used": "Used",
  "listing.featuredBadge": "FEATURED",
  "listing.auctionBadge": "AUCTION",

  "detail.specs": "Specifications",
  "detail.description": "Description",
  "detail.seller": "Seller",
  "detail.financing": "Estimated financing",
  "detail.month": "/mo",
  "detail.shipping": "Shipping available",
  "detail.serial": "Serial #",
  "detail.year": "Year",
  "detail.hours": "Hours",
  "detail.power": "Power",
  "detail.transmission": "Transmission",
  "detail.location": "Location",
  "detail.relatedTitle": "Related listings",

  "auctions.title": "Auction Results",
  "auctions.subtitle": "Past sales database to gauge fair market prices.",
  "auctions.salePrice": "Sale price",
  "auctions.auctioneer": "Auctioneer",
  "auctions.saleDate": "Sale date",

  "market.title": "Market Report",
  "market.subtitle": "Equipment Value Index (EVI) — monthly trends.",
  "market.retail": "Retail Value",
  "market.auction": "Auction Value",
  "market.inventory": "Inventory",

  "blog.title": "Blog & News",
  "blog.readMore": "Read article",
  "blog.categories.news": "Industry News",
  "blog.categories.howto": "How-To & Tips",
  "blog.categories.review": "Product Reviews",
  "blog.categories.market": "Market Reports",

  "about.title": "About TractorTrade",
  "about.intro": "TractorTrade is the leading marketplace to buy, sell and rent farm, construction and transport equipment.",
  "contact.title": "Contact us",
  "contact.name": "Full name",
  "contact.email": "Email address",
  "contact.phone": "Phone",
  "contact.message": "Message",
  "contact.send": "Send message",
  "contact.sent": "Message sent. We'll reply within 24h.",

  "watch.title": "My Watch List",
  "watch.empty": "No saved equipment yet.",
  "watch.added": "Added to your watch list",
  "watch.removed": "Removed from your watch list",

  "footer.tagline": "The marketplace for farm, construction and transport equipment.",
  "footer.explore": "Explore",
  "footer.company": "Company",
  "footer.legal": "Legal",
  "footer.terms": "Terms",
  "footer.privacy": "Privacy",
  "footer.cookies": "Cookies",
  "footer.rights": "All rights reserved.",
  "footer.newsletter": "Get the best listings every week",
  "footer.subscribe": "Subscribe",
  "footer.emailPlaceholder": "your@email.com",

  "common.year": "Year",
  "common.hours": "h",
  "common.km": "km",
  "common.contact": "Contact",
  "common.menu": "Menu",
  "common.close": "Close",
  "common.search": "Search",
  "common.loading": "Loading...",
  "common.notFound": "No results",
};

const dicts: Record<Lang, Dict> = { fr, en };

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = "tt.lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored === "fr" || stored === "en") setLangState(stored);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  };

  const t = (key: string) => dicts[lang][key] ?? key;

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useT() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useT must be used within I18nProvider");
  return ctx;
}
