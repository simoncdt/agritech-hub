import tractorImg from "@/assets/cat-tractor.jpg";
import excavatorImg from "@/assets/cat-excavator.jpg";
import harvesterImg from "@/assets/cat-harvester.jpg";
import truckImg from "@/assets/cat-truck.jpg";
import skidImg from "@/assets/cat-skidsteer.jpg";
import dozerImg from "@/assets/cat-dozer.jpg";

export interface Category {
  slug: string;
  nameFr: string;
  nameEn: string;
  group: "farm" | "construction" | "trucks";
  image: string;
  popular?: boolean;
}

export const CATEGORIES: Category[] = [
  { slug: "tractors", nameFr: "Tracteurs", nameEn: "Tractors", group: "farm", image: tractorImg, popular: true },
  { slug: "harvesters", nameFr: "Moissonneuses", nameEn: "Harvesters", group: "farm", image: harvesterImg, popular: true },
  { slug: "hay-forage", nameFr: "Foin & fourrage", nameEn: "Hay and Forage", group: "farm", image: harvesterImg, popular: true },
  { slug: "tillage", nameFr: "Travail du sol", nameEn: "Tillage Equipment", group: "farm", image: tractorImg, popular: true },
  { slug: "planting", nameFr: "Semoirs & planteurs", nameEn: "Planting Equipment", group: "farm", image: tractorImg, popular: true },
  { slug: "lawn-mowers", nameFr: "Tondeuses", nameEn: "Lawn Mowers", group: "farm", image: tractorImg, popular: true },
  { slug: "chemical", nameFr: "Pulvérisateurs", nameEn: "Chemical Applicators", group: "farm", image: tractorImg, popular: true },

  { slug: "excavators", nameFr: "Excavatrices", nameEn: "Excavators", group: "construction", image: excavatorImg, popular: true },
  { slug: "skid-steers", nameFr: "Mini-chargeuses", nameEn: "Skid Steers", group: "construction", image: skidImg, popular: true },
  { slug: "wheel-loaders", nameFr: "Chargeurs", nameEn: "Wheel Loaders", group: "construction", image: skidImg, popular: true },
  { slug: "dozers", nameFr: "Bouteurs", nameEn: "Dozers", group: "construction", image: dozerImg, popular: true },
  { slug: "cranes", nameFr: "Grues", nameEn: "Cranes", group: "construction", image: dozerImg, popular: true },
  { slug: "motor-graders", nameFr: "Niveleuses", nameEn: "Motor Graders", group: "construction", image: dozerImg, popular: true },
  { slug: "loader-backhoes", nameFr: "Tractopelles", nameEn: "Loader Backhoes", group: "construction", image: dozerImg, popular: true },

  { slug: "sleeper-trucks", nameFr: "Camions cabines couchette", nameEn: "Sleeper Trucks", group: "trucks", image: truckImg, popular: true },
  { slug: "day-cab", nameFr: "Camions cabine jour", nameEn: "Day Cab Trucks", group: "trucks", image: truckImg, popular: true },
  { slug: "dump-trucks", nameFr: "Camions-bennes", nameEn: "Dump Trucks", group: "trucks", image: truckImg, popular: true },
  { slug: "box-trucks", nameFr: "Camions fourgon", nameEn: "Box Trucks", group: "trucks", image: truckImg, popular: true },
  { slug: "tow-trucks", nameFr: "Dépanneuses", nameEn: "Tow Trucks", group: "trucks", image: truckImg, popular: true },
  { slug: "tank-trucks", nameFr: "Camions-citernes", nameEn: "Tank Trucks", group: "trucks", image: truckImg, popular: true },
];

export const ALL_CATEGORY_GROUPS = [
  {
    key: "farm",
    nameFr: "Matériel agricole",
    nameEn: "Farm Equipment",
    items: [
      "Less than 40 HP", "40 HP to 99 HP", "100 HP to 174 HP", "175 HP to 299 HP", "300 HP or Greater",
      "Harvesters", "Hay and Forage Equipment", "Lawn Mowers", "Tillage Equipment", "Planting Equipment",
      "Chemical", "Motorsports", "Grain Handling / Storage", "Dismantled Farm Equipment",
      "Ag Trailers", "ATVs", "Chemical Applicators", "Harvest Equipment", "Irrigation Equipment",
      "Livestock Equipment", "Manure Handling", "Motorcycles", "Other Equipment", "Outdoor Power",
      "Precision Ag", "Snowmobiles", "Specialty Crop Equipment", "Tillage Equipment",
      "Turf Equipment", "Utility Vehicles", "Other Items",
    ],
  },
  {
    key: "construction",
    nameFr: "Matériel de chantier",
    nameEn: "Construction Equipment",
    items: [
      "Aggregate Equipment", "Air Compressors", "Asphalt / Pavers / Concrete Equipment",
      "Boring Machines", "Compactors", "Crawler Carriers", "Crawler Loaders", "Drills",
      "Dumpers", "Heaters", "Light Towers", "Miscellaneous Equipment", "Off-Highway Trucks",
      "Oilfield Equipment", "Pipelayers", "Power Systems", "Pumps", "Scrap Processing",
      "Demolition Equipment", "Scrapers", "Skip Loaders", "Straw Blowers / Hydroseeders",
      "Vacuum Excavators", "Sweepers / Broom Equipment", "Telehandlers", "Trenchers / Cable Plows",
      "Water Equipment", "Dismantled Construction Equipment",
    ],
  },
  {
    key: "trucks",
    nameFr: "Camions & remorques",
    nameEn: "Trucks & Trailers",
    items: [
      "Ambulances", "Attenuator Trucks", "Beverage Trucks", "Car Hauler Trucks", "Chipper Trucks",
      "Curtain Side Trucks", "Dump - Transfer Trucks", "Expeditor Trucks", "Farm Trucks / Grain Trucks",
      "Fire Trucks", "Flatbed Trucks", "Flatbed-Dump Trucks", "Forestry Bucket Trucks",
      "Fuel Trucks / Lube Trucks", "Garbage Trucks", "Glider Kit Trucks", "Grapple Trucks",
      "Hooklift Trucks", "Hot Shot Trucks", "Landscape Trucks", "Logging Trucks",
      "Miscellaneous Trucks", "Mixer Trucks / Concrete Trucks", "Passenger Bus", "Pickup Trucks",
      "Plow Trucks / Spreader Trucks", "Recycling Trucks", "Reefer / Refrigerated",
      "RV Haulers / Toter Trucks", "Service Trucks / Mechanic Trucks", "Shuttle Bus",
      "Stake Trucks", "Stone Slinger Trucks", "SUV", "Sweeper Trucks", "Truck Bodies Only",
      "Vans", "Winch / Oil Field Trucks", "Yard Spotter Trucks", "Other Items", "Dismantled Trucks",
    ],
  },
];

export const BRANDS = [
  "John Deere", "Caterpillar", "Kubota", "Case IH", "New Holland", "International",
  "Komatsu", "Massey Ferguson", "Volvo", "Ford", "Freightliner", "Peterbilt", "Mack", "Hitachi",
];

export interface Listing {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  hours: number;
  price: number;
  currency: "CAD" | "USD" | "EUR";
  category: string;
  condition: "new" | "used";
  location: string;
  country: "CA" | "US" | "FR";
  image: string;
  images: string[];
  featured?: boolean;
  auction?: boolean;
  description: string;
  seller: { name: string; phone: string; rating: number; sales: number };
  specs: { label: string; value: string }[];
}

const baseImages = [tractorImg, excavatorImg, harvesterImg, truckImg, skidImg, dozerImg];

const titles = [
  { brand: "John Deere", model: "8R 410", cat: "tractors", img: tractorImg, year: 2022, hours: 1820, price: 385000, condition: "used" as const },
  { brand: "Caterpillar", model: "336 GC", cat: "excavators", img: excavatorImg, year: 2021, hours: 2350, price: 245000, condition: "used" as const },
  { brand: "Case IH", model: "Axial-Flow 8250", cat: "harvesters", img: harvesterImg, year: 2023, hours: 540, price: 612000, condition: "used" as const },
  { brand: "Peterbilt", model: "579 EPIQ", cat: "sleeper-trucks", img: truckImg, year: 2024, hours: 12500, price: 178000, condition: "used" as const },
  { brand: "Caterpillar", model: "262D3", cat: "skid-steers", img: skidImg, year: 2023, hours: 980, price: 67500, condition: "used" as const },
  { brand: "Caterpillar", model: "D6 XE", cat: "dozers", img: dozerImg, year: 2022, hours: 3100, price: 425000, condition: "used" as const },
  { brand: "New Holland", model: "T7.270", cat: "tractors", img: tractorImg, year: 2024, hours: 0, price: 295000, condition: "new" as const },
  { brand: "Komatsu", model: "PC210LC-11", cat: "excavators", img: excavatorImg, year: 2020, hours: 4200, price: 142000, condition: "used" as const },
  { brand: "Kubota", model: "M7-172", cat: "tractors", img: tractorImg, year: 2023, hours: 620, price: 168000, condition: "used" as const },
  { brand: "Freightliner", model: "Cascadia 126", cat: "sleeper-trucks", img: truckImg, year: 2022, hours: 285000, price: 92000, condition: "used" as const },
  { brand: "John Deere", model: "S780", cat: "harvesters", img: harvesterImg, year: 2021, hours: 1340, price: 489000, condition: "used" as const },
  { brand: "Caterpillar", model: "950M", cat: "wheel-loaders", img: skidImg, year: 2023, hours: 1100, price: 312000, condition: "used" as const },
];

const cities = [
  { city: "Calgary, AB", country: "CA" as const },
  { city: "Montréal, QC", country: "CA" as const },
  { city: "Toronto, ON", country: "CA" as const },
  { city: "Saskatoon, SK", country: "CA" as const },
  { city: "Dallas, TX", country: "US" as const },
  { city: "Lyon, FR", country: "FR" as const },
  { city: "Edmonton, AB", country: "CA" as const },
  { city: "Winnipeg, MB", country: "CA" as const },
];

const sellers = [
  { name: "Prairie Farm Equipment", phone: "+1 (306) 555-0142", rating: 4.8, sales: 234 },
  { name: "Heavy Iron Brokers", phone: "+1 (403) 555-0188", rating: 4.9, sales: 412 },
  { name: "Maritimes Truck Sales", phone: "+1 (902) 555-0199", rating: 4.6, sales: 156 },
  { name: "Midwest Ag Co.", phone: "+1 (701) 555-0177", rating: 4.7, sales: 298 },
];

export const LISTINGS: Listing[] = titles.flatMap((t, i) => {
  const variants = 2;
  return Array.from({ length: variants }, (_, v) => {
    const idx = i * variants + v;
    const loc = cities[idx % cities.length];
    const seller = sellers[idx % sellers.length];
    return {
      id: `lst-${idx + 1}`,
      title: `${t.year} ${t.brand} ${t.model}`,
      brand: t.brand,
      model: t.model,
      year: t.year - v,
      hours: t.hours + v * 230,
      price: Math.round(t.price * (1 - v * 0.07)),
      currency: "CAD" as const,
      category: t.cat,
      condition: t.condition,
      location: loc.city,
      country: loc.country,
      image: t.img,
      images: [t.img, ...baseImages.filter((b) => b !== t.img).slice(0, 3)],
      featured: idx % 5 === 0,
      auction: idx % 7 === 0,
      description:
        "Machine maintenue par concessionnaire agréé. Inspection complète, dossier d'entretien disponible. Rapport d'inspection 100 points fourni avec la vente. Prêt à travailler. Livraison disponible partout en Amérique du Nord.",
      seller,
      specs: [
        { label: "Puissance / Power", value: t.cat === "tractors" ? "270 HP" : t.cat === "excavators" ? "229 HP" : t.cat === "harvesters" ? "473 HP" : "455 HP" },
        { label: "Transmission", value: "PowerShift 18F/6R" },
        { label: "PTO", value: "1000 RPM" },
        { label: "Hydraulique", value: "Load-sensing 220 L/min" },
        { label: "Cabine", value: "Climatisée Premium" },
        { label: "Pneus / Tracks", value: "Goodyear 480/80R46" },
      ],
    };
  });
});

export function formatPrice(amount: number, currency: string = "CAD") {
  return new Intl.NumberFormat("fr-CA", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

export interface AuctionResult {
  id: string;
  title: string;
  year: number;
  brand: string;
  model: string;
  hours: number;
  saleDate: string;
  salePrice: number;
  auctioneer: string;
  location: string;
  image: string;
}

export const AUCTIONS: AuctionResult[] = LISTINGS.slice(0, 12).map((l, i) => ({
  id: `auc-${i + 1}`,
  title: l.title,
  year: l.year,
  brand: l.brand,
  model: l.model,
  hours: l.hours,
  saleDate: new Date(2026, (i % 4) + 1, 5 + i).toLocaleDateString("fr-CA"),
  salePrice: Math.round(l.price * 0.78),
  auctioneer: ["Ritchie Bros.", "AllStar Auctions", "Michener Allen", "J.J. Kane"][i % 4],
  location: l.location,
  image: l.image,
}));

export interface BlogPost {
  id: string;
  titleFr: string;
  titleEn: string;
  excerptFr: string;
  excerptEn: string;
  category: "news" | "howto" | "review" | "market";
  date: string;
  image: string;
  readMin: number;
}

export const POSTS: BlogPost[] = [
  {
    id: "p1",
    titleFr: "Rapport de marché — Tracteurs d'occasion T1 2026",
    titleEn: "Market Report — Used Tractors Q1 2026",
    excerptFr: "Les valeurs retail des tracteurs 175-299 HP progressent de 4,2% sur le trimestre, portées par la demande canadienne.",
    excerptEn: "Retail values for 175-299 HP tractors are up 4.2% quarter-over-quarter, driven by Canadian demand.",
    category: "market",
    date: "2026-04-10",
    image: harvesterImg,
    readMin: 6,
  },
  {
    id: "p2",
    titleFr: "Comment évaluer une moissonneuse-batteuse d'occasion",
    titleEn: "How to evaluate a used combine harvester",
    excerptFr: "8 points de contrôle critiques avant l'achat : du rotor au système de battage en passant par les capteurs.",
    excerptEn: "8 critical inspection points before buying: from rotor to threshing system and sensors.",
    category: "howto",
    date: "2026-04-04",
    image: harvesterImg,
    readMin: 8,
  },
  {
    id: "p3",
    titleFr: "Test : Caterpillar 262D3 — la mini-chargeuse polyvalente",
    titleEn: "Review: Caterpillar 262D3 — the versatile skid steer",
    excerptFr: "Confort cabine, hydraulique haut débit et fiabilité : notre verdict après 200h d'essai.",
    excerptEn: "Cab comfort, high-flow hydraulics and reliability: our verdict after 200h of testing.",
    category: "review",
    date: "2026-03-28",
    image: skidImg,
    readMin: 10,
  },
  {
    id: "p4",
    titleFr: "John Deere lance sa nouvelle gamme 9RX 2026",
    titleEn: "John Deere launches the new 9RX 2026 lineup",
    excerptFr: "Plus de puissance, AutoTrac amélioré et cabine repensée : les nouveautés à connaître.",
    excerptEn: "More power, improved AutoTrac and a redesigned cab: what you need to know.",
    category: "news",
    date: "2026-03-22",
    image: tractorImg,
    readMin: 5,
  },
  {
    id: "p5",
    titleFr: "Indice EVI mars 2026 : l'inventaire repart à la hausse",
    titleEn: "EVI Index March 2026: inventory bouncing back",
    excerptFr: "Sandhills EVI : +7,79% mois sur mois sur le matériel de chantier lourd d'occasion.",
    excerptEn: "Sandhills EVI: +7.79% month-over-month on used heavy construction equipment.",
    category: "market",
    date: "2026-03-15",
    image: excavatorImg,
    readMin: 7,
  },
  {
    id: "p6",
    titleFr: "Financement : 5 erreurs à éviter à l'achat",
    titleEn: "Financing: 5 mistakes to avoid when buying",
    excerptFr: "Taux fixe vs variable, ballon, garantie résiduelle... le guide pour optimiser votre financement.",
    excerptEn: "Fixed vs variable rate, balloon, residual guarantee... the guide to optimize your financing.",
    category: "howto",
    date: "2026-03-08",
    image: tractorImg,
    readMin: 6,
  },
];

export const MARKET_DATA = [
  { month: "Oct", retail: 100, auction: 78, inventory: 100 },
  { month: "Nov", retail: 101.2, auction: 79.4, inventory: 102.1 },
  { month: "Dec", retail: 102.5, auction: 80.8, inventory: 104.6 },
  { month: "Jan", retail: 103.1, auction: 81.0, inventory: 106.8 },
  { month: "Feb", retail: 104.4, auction: 82.7, inventory: 108.5 },
  { month: "Mar", retail: 105.6, auction: 84.2, inventory: 110.7 },
  { month: "Apr", retail: 106.8, auction: 85.6, inventory: 111.2 },
];
