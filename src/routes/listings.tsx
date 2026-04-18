import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X, Check } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { ListingCard } from "@/components/ListingCard";
import { useT } from "@/lib/i18n";
import { LISTINGS, BRANDS, CATEGORIES, formatPrice } from "@/lib/data";

export const Route = createFileRoute("/listings")({
  component: ListingsPage,
  validateSearch: (search: Record<string, unknown>) => ({
    q: (search.q as string) || "",
    category: (search.category as string) || "",
    brand: (search.brand as string) || "",
    type: (search.type as string) || "sale",
  }),
});

type SortKey = "featured" | "priceAsc" | "priceDesc" | "newest" | "hours";

function ListingsPage() {
  const { t, lang } = useT();
  const initial = Route.useSearch();

  const [q, setQ] = useState(initial.q);
  const [category, setCategory] = useState(initial.category);
  const [brands, setBrands] = useState<string[]>(initial.brand ? [initial.brand] : []);
  const [condition, setCondition] = useState<"all" | "new" | "used">("all");
  const [yearMin, setYearMin] = useState(2010);
  const [priceMax, setPriceMax] = useState(700000);
  const [hoursMax, setHoursMax] = useState(15000);
  const [country, setCountry] = useState<"all" | "CA" | "US" | "FR">("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [openFilters, setOpenFilters] = useState(false);

  const toggleBrand = (b: string) =>
    setBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));

  const filtered = useMemo(() => {
    let res = LISTINGS.filter((l) => {
      if (q && !`${l.title} ${l.brand} ${l.model}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (category && l.category !== category) return false;
      if (brands.length && !brands.includes(l.brand)) return false;
      if (condition !== "all" && l.condition !== condition) return false;
      if (country !== "all" && l.country !== country) return false;
      if (l.year < yearMin) return false;
      if (l.price > priceMax) return false;
      if (l.hours > hoursMax) return false;
      return true;
    });
    res = [...res].sort((a, b) => {
      switch (sort) {
        case "priceAsc": return a.price - b.price;
        case "priceDesc": return b.price - a.price;
        case "newest": return b.year - a.year;
        case "hours": return a.hours - b.hours;
        default: return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });
    return res;
  }, [q, category, brands, condition, country, yearMin, priceMax, hoursMax, sort]);

  const reset = () => {
    setQ(""); setCategory(""); setBrands([]); setCondition("all");
    setYearMin(2010); setPriceMax(700000); setHoursMax(15000); setCountry("all");
  };

  // Build active chips
  const chips: { label: string; onRemove: () => void }[] = [];
  if (q) chips.push({ label: `"${q}"`, onRemove: () => setQ("") });
  if (category) {
    const c = CATEGORIES.find((x) => x.slug === category);
    if (c) chips.push({ label: lang === "fr" ? c.nameFr : c.nameEn, onRemove: () => setCategory("") });
  }
  brands.forEach((b) => chips.push({ label: b, onRemove: () => toggleBrand(b) }));
  if (condition !== "all") chips.push({ label: condition === "new" ? t("listing.new") : t("listing.used"), onRemove: () => setCondition("all") });
  if (country !== "all") chips.push({ label: country, onRemove: () => setCountry("all") });
  if (yearMin > 2010) chips.push({ label: `${t("listing.year")} ≥ ${yearMin}`, onRemove: () => setYearMin(2010) });
  if (priceMax < 700000) chips.push({ label: `≤ ${formatPrice(priceMax)}`, onRemove: () => setPriceMax(700000) });
  if (hoursMax < 15000) chips.push({ label: `≤ ${hoursMax.toLocaleString()}h`, onRemove: () => setHoursMax(15000) });

  const Filters = () => (
    <aside className="space-y-6">
      <div>
        <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-3">{t("common.search")}</h4>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("search.placeholder")}
          className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-3">{t("listing.condition")}</h4>
        <div className="grid grid-cols-3 rounded-md border border-input overflow-hidden">
          {(["all", "new", "used"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCondition(c)}
              className={`py-2 text-xs font-semibold transition-smooth ${
                condition === c ? "bg-primary text-primary-foreground" : "bg-background hover:bg-secondary"
              }`}
            >
              {c === "all" ? (lang === "fr" ? "Tous" : "All") : c === "new" ? t("listing.new") : t("listing.used")}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-3 flex items-center justify-between">
          {t("listing.brand")} {brands.length > 0 && <span className="text-xs text-accent">{brands.length}</span>}
        </h4>
        <div className="max-h-52 overflow-y-auto pr-1 space-y-1">
          {BRANDS.map((b) => {
            const active = brands.includes(b);
            return (
              <button
                key={b}
                onClick={() => toggleBrand(b)}
                className={`w-full flex items-center justify-between gap-2 px-3 h-9 rounded-md text-sm transition-smooth ${
                  active ? "bg-primary/10 text-primary font-semibold" : "hover:bg-secondary"
                }`}
              >
                <span>{b}</span>
                <span className={`h-4 w-4 rounded border inline-flex items-center justify-center ${
                  active ? "bg-primary border-primary text-primary-foreground" : "border-input"
                }`}>
                  {active && <Check className="h-3 w-3" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-3">{t("nav.categories")}</h4>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
          <option value="">{t("search.allCategories")}</option>
          {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{lang === "fr" ? c.nameFr : c.nameEn}</option>)}
        </select>
      </div>

      <div>
        <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-3">{lang === "fr" ? "Pays" : "Country"}</h4>
        <div className="grid grid-cols-4 rounded-md border border-input overflow-hidden text-xs">
          {(["all", "CA", "US", "FR"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCountry(c)}
              className={`py-2 font-semibold transition-smooth ${
                country === c ? "bg-primary text-primary-foreground" : "bg-background hover:bg-secondary"
              }`}
            >
              {c === "all" ? (lang === "fr" ? "Tous" : "All") : c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-3 flex items-center justify-between">
          {t("listing.year")} <span className="text-xs text-accent font-bold">≥ {yearMin}</span>
        </h4>
        <input type="range" min={2010} max={2026} value={yearMin} onChange={(e) => setYearMin(Number(e.target.value))} className="w-full accent-accent" />
      </div>
      <div>
        <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-3 flex items-center justify-between">
          {t("listing.priceRange")} <span className="text-xs text-accent font-bold">≤ {formatPrice(priceMax)}</span>
        </h4>
        <input type="range" min={20000} max={1000000} step={5000} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="w-full accent-accent" />
      </div>
      <div>
        <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-3 flex items-center justify-between">
          {t("listing.hours")} <span className="text-xs text-accent font-bold">≤ {hoursMax.toLocaleString()}h</span>
        </h4>
        <input type="range" min={0} max={20000} step={500} value={hoursMax} onChange={(e) => setHoursMax(Number(e.target.value))} className="w-full accent-accent" />
      </div>

      <button onClick={reset} className="w-full h-10 rounded-md border border-input bg-background text-sm font-semibold hover:bg-secondary transition-smooth">
        {t("cta.resetFilter")}
      </button>
    </aside>
  );

  return (
    <PageLayout>
      <div className="container-pro py-6">
        <nav className="text-xs text-muted-foreground mb-3">
          <Link to="/" className="hover:text-primary">{lang === "fr" ? "Accueil" : "Home"}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-semibold">{t("nav.forSale")}</span>
        </nav>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-primary">
              {category ? CATEGORIES.find((c) => c.slug === category)?.[lang === "fr" ? "nameFr" : "nameEn"] : t("nav.forSale")}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">{filtered.length} {t("listing.results")}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setOpenFilters(true)} className="lg:hidden inline-flex items-center gap-2 px-4 h-10 rounded-md border border-input bg-background text-sm font-semibold">
              <SlidersHorizontal className="h-4 w-4" /> {t("listing.filters")}
              {chips.length > 0 && <span className="h-5 min-w-5 px-1 inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground text-[10px] font-bold">{chips.length}</span>}
            </button>
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="h-10 px-3 rounded-md border border-input bg-background text-sm">
              <option value="featured">{t("listing.sort.featured")}</option>
              <option value="priceAsc">{t("listing.sort.priceAsc")}</option>
              <option value="priceDesc">{t("listing.sort.priceDesc")}</option>
              <option value="newest">{t("listing.sort.newest")}</option>
              <option value="hours">{t("listing.sort.hours")}</option>
            </select>
          </div>
        </div>

        {/* Active filter chips */}
        {chips.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {chips.map((c, i) => (
              <button
                key={i}
                onClick={c.onRemove}
                className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-smooth"
              >
                {c.label} <X className="h-3 w-3" />
              </button>
            ))}
            <button onClick={reset} className="text-xs font-semibold text-muted-foreground hover:text-primary underline">
              {t("cta.resetFilter")}
            </button>
          </div>
        )}

        <div className="mt-6 grid lg:grid-cols-[280px_1fr] gap-8">
          <div className="hidden lg:block bg-card border border-border rounded-lg p-5 shadow-card sticky top-32 self-start max-h-[calc(100vh-8rem)] overflow-auto">
            <Filters />
          </div>

          {openFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setOpenFilters(false)} />
              <div className="absolute inset-y-0 right-0 w-[88%] max-w-sm bg-background overflow-auto p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold">{t("listing.filters")}</h3>
                  <button onClick={() => setOpenFilters(false)} className="h-9 w-9 inline-flex items-center justify-center rounded hover:bg-secondary">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <Filters />
                <button onClick={() => setOpenFilters(false)} className="mt-4 w-full h-11 rounded-md bg-gradient-primary text-primary-foreground font-bold text-sm uppercase tracking-wider shadow-elegant">
                  {lang === "fr" ? `Voir ${filtered.length} résultats` : `View ${filtered.length} results`}
                </button>
              </div>
            </div>
          )}

          <div>
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">{t("common.notFound")}</p>
                <button onClick={reset} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent">
                  <X className="h-4 w-4" /> {t("cta.resetFilter")}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((l) => <ListingCard key={l.id} listing={l} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
