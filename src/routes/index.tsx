import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, Sparkles, TrendingUp, ShieldCheck, Zap, Search, ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { CategoryIcon } from "@/components/CategoryIcon";
import { ListingCard } from "@/components/ListingCard";
import { useT } from "@/lib/i18n";
import { CATEGORIES, ALL_CATEGORY_GROUPS, BRANDS, LISTINGS, POSTS } from "@/lib/data";
import heroImg from "@/assets/hero-tractor.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { t, lang } = useT();
  const [tab, setTab] = useState<"popular" | "all">("popular");
  const [partsBrand, setPartsBrand] = useState("");
  const [searchQ, setSearchQ] = useState("");

  const popular = CATEGORIES.filter((c) => c.popular);
  const featured = LISTINGS.filter((l) => l.featured).slice(0, 8);

  return (
    <PageLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Tracteur et moissonneuse au coucher du soleil"
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        <div className="relative container-pro py-16 md:py-28 lg:py-36 text-primary-foreground">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 backdrop-blur border border-primary-foreground/20 text-xs uppercase tracking-wider font-semibold">
              <Sparkles className="h-3 w-3 text-accent" />
              {lang === "fr" ? "Plateforme #1 au Canada" : "#1 Marketplace in Canada"}
            </span>
            <h1 className="mt-5 font-display text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight">
              {t("home.heroTitle")}
            </h1>
            <p className="mt-5 text-base md:text-lg text-primary-foreground/85 max-w-2xl">
              {t("home.heroSubtitle")}
            </p>

            {/* Hero search */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `/listings?q=${encodeURIComponent(searchQ)}`;
              }}
              className="mt-8 bg-background/95 backdrop-blur rounded-2xl shadow-elegant p-3 md:p-4 grid gap-2 md:grid-cols-[1fr_auto] max-w-2xl"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={searchQ}
                  onChange={(e) => setSearchQ(e.target.value)}
                  placeholder={t("search.example")}
                  className="w-full h-12 pl-11 pr-4 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button className="h-12 px-6 rounded-lg bg-gradient-accent text-accent-foreground font-bold text-sm uppercase tracking-wider shadow-elegant hover:opacity-95 transition-smooth">
                {t("search.button")}
              </button>
              <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
                <select className="h-10 px-3 rounded-md border border-input bg-background text-foreground text-xs">
                  <option>{t("search.forSale")}</option>
                  <option>{t("search.forRent")}</option>
                </select>
                <select className="h-10 px-3 rounded-md border border-input bg-background text-foreground text-xs">
                  <option>{t("search.allCategories")}</option>
                  {popular.map((c) => (
                    <option key={c.slug}>{lang === "fr" ? c.nameFr : c.nameEn}</option>
                  ))}
                </select>
                <select className="h-10 px-3 rounded-md border border-input bg-background text-foreground text-xs">
                  <option>{t("search.allManufacturers")}</option>
                  {BRANDS.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
                <select className="h-10 px-3 rounded-md border border-input bg-background text-foreground text-xs">
                  <option>{t("search.allModels")}</option>
                </select>
              </div>
            </form>

            <div className="mt-6 flex flex-wrap gap-3 text-xs">
              {[
                { icon: ShieldCheck, label: lang === "fr" ? "Vendeurs vérifiés" : "Verified sellers" },
                { icon: TrendingUp, label: lang === "fr" ? "Mise à jour quotidienne" : "Daily updates" },
                { icon: Zap, label: lang === "fr" ? "Recherche IA" : "AI-powered search" },
              ].map(({ icon: Icon, label }, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 backdrop-blur">
                  <Icon className="h-3.5 w-3.5 text-accent" /> {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-14 md:py-20">
        <div className="container-pro">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-primary uppercase tracking-tight">
              {lang === "fr"
                ? "Équipements neufs et d'occasion à vendre & à louer"
                : "New & Used Equipment For Sale And For Rent"}
            </h2>
          </div>

          {/* Tabs */}
          <div className="grid grid-cols-2 max-w-3xl mx-auto rounded-lg overflow-hidden bg-surface-dark text-primary-foreground/70 border border-border">
            <button
              onClick={() => setTab("popular")}
              className={`py-4 font-display text-base md:text-lg font-bold uppercase tracking-wider transition-smooth ${
                tab === "popular" ? "bg-gradient-primary text-primary-foreground" : "hover:text-primary-foreground"
              }`}
            >
              {t("home.popular")}
            </button>
            <button
              onClick={() => setTab("all")}
              className={`py-4 font-display text-base md:text-lg font-bold uppercase tracking-wider transition-smooth ${
                tab === "all" ? "bg-gradient-primary text-primary-foreground" : "hover:text-primary-foreground"
              }`}
            >
              {t("home.allCats")}
            </button>
          </div>

          <div className="mt-8 bg-secondary/50 rounded-lg p-6 md:p-10">
            {tab === "popular" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
                {popular.map((c) => (
                  <Link
                    key={c.slug}
                    to="/listings"
                    search={{ category: c.slug } as any}
                    className="group flex flex-col items-center text-center p-3 rounded-lg hover:bg-background hover:shadow-card transition-smooth"
                  >
                    <div className="h-20 w-20 md:h-24 md:w-24 flex items-center justify-center text-foreground group-hover:text-primary transition-smooth">
                      <CategoryIcon slug={c.slug} className="h-full w-full" />
                    </div>
                    <span className="mt-2 text-xs md:text-sm font-semibold leading-tight">
                      {lang === "fr" ? c.nameFr : c.nameEn}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                {ALL_CATEGORY_GROUPS.map((g) => (
                  <div key={g.key}>
                    <h3 className="font-display text-lg font-bold text-muted-foreground uppercase tracking-wider mb-4">
                      {lang === "fr" ? g.nameFr : g.nameEn}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-2 text-sm">
                      {g.items.map((item) => (
                        <Link
                          key={item}
                          to="/listings"
                          className="text-foreground/80 hover:text-primary hover:underline transition-smooth truncate"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="py-14 md:py-20 bg-surface-soft">
        <div className="container-pro">
          <div className="flex items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary">
                {t("home.featured")}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{t("home.featuredSub")}</p>
            </div>
            <Link
              to="/listings"
              className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent transition-smooth"
            >
              {t("cta.viewAll")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link
              to="/listings"
              className="inline-flex items-center gap-1 px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-bold"
            >
              {t("cta.viewAll")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PARTS / DISMANTLED */}
      <section className="py-14 md:py-20">
        <div className="container-pro grid gap-6 md:grid-cols-2">
          <div className="bg-card rounded-lg border border-border p-6 md:p-8 shadow-card">
            <h3 className="font-display text-xl font-bold mb-4">{t("home.partsTitle")}</h3>
            <div className="flex">
              <input
                placeholder={t("home.partsLabel")}
                className="flex-1 h-11 px-3 rounded-l-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button className="px-5 h-11 rounded-r-md bg-gradient-accent text-accent-foreground text-sm font-semibold">
                {t("search.button")}
              </button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {t("home.noPart")}{" "}
              <Link to="/parts" className="underline text-primary font-semibold">
                {t("home.viewByCat")}
              </Link>
            </p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6 md:p-8 shadow-card">
            <h3 className="font-display text-xl font-bold mb-4">{t("home.dismantled")}</h3>
            <div className="grid grid-cols-2 gap-3">
              <select
                value={partsBrand}
                onChange={(e) => setPartsBrand(e.target.value)}
                className="h-11 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option value="">{t("search.allManufacturers")}</option>
                {BRANDS.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
              <select className="h-11 px-3 rounded-md border border-input bg-background text-sm">
                <option>{t("search.allModels")}</option>
              </select>
              <button className="col-span-2 h-11 rounded-md bg-gradient-accent text-accent-foreground text-sm font-semibold">
                {t("search.button")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ATTACHMENTS */}
      <section className="py-14 md:py-20 bg-surface-soft">
        <div className="container-pro">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            {t("home.attachmentsTitle")}
          </h2>
          <div className="space-y-3">
            {[
              t("home.constructionAttachments"),
              t("home.agAttachments"),
              t("home.truckParts"),
            ].map((label) => (
              <details key={label} className="group bg-card border border-border rounded-lg shadow-card">
                <summary className="flex items-center justify-between cursor-pointer p-5 list-none">
                  <span className="font-display text-lg font-bold text-primary">{label}</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground transition-smooth group-open:rotate-90" />
                </summary>
                <div className="px-5 pb-5 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                  {["Buckets", "Forks", "Grapples", "Augers", "Brooms", "Snow Plows", "Trenchers", "Rakes"].map((x) => (
                    <Link key={x} to="/listings" className="hover:text-primary hover:underline">{x}</Link>
                  ))}
                </div>
              </details>
            ))}
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-bold mt-14 mb-6">
            {t("home.rentTitle")}
          </h2>
          <div className="space-y-3">
            {[t("home.rentEquipment"), t("home.rentAttachments")].map((label) => (
              <details key={label} className="group bg-card border border-border rounded-lg shadow-card">
                <summary className="flex items-center justify-between cursor-pointer p-5 list-none">
                  <span className="font-display text-lg font-bold text-primary">{label}</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground transition-smooth group-open:rotate-90" />
                </summary>
                <div className="px-5 pb-5 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                  {popular.slice(0, 8).map((c) => (
                    <Link key={c.slug} to="/listings" className="hover:text-primary hover:underline">
                      {lang === "fr" ? c.nameFr : c.nameEn}
                    </Link>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="py-14 md:py-20">
        <div className="container-pro">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">{t("home.brandsTitle")}</h2>
          <div className="h-1 w-20 bg-gradient-accent rounded-full mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {BRANDS.slice(0, 12).map((b) => (
              <Link
                key={b}
                to="/listings"
                className="group flex items-center justify-center h-20 rounded-lg border border-border bg-card hover:border-accent hover:shadow-glow transition-smooth"
              >
                <span className="font-display text-base font-bold text-foreground group-hover:text-accent transition-smooth text-center px-2">
                  {b}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="py-14 md:py-20 bg-surface-soft">
        <div className="container-pro">
          <div className="flex items-end justify-between mb-8 gap-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold">{t("home.latestNews")}</h2>
            <Link to="/blog" className="text-sm font-semibold text-primary hover:text-accent inline-flex items-center gap-1">
              {t("cta.viewAll")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {POSTS.slice(0, 3).map((p) => (
              <Link
                key={p.id}
                to="/blog"
                className="group bg-card rounded-lg overflow-hidden border border-border shadow-card hover:shadow-elegant transition-smooth"
              >
                <div className="aspect-[16/9] overflow-hidden bg-secondary">
                  <img src={p.image} alt={lang === "fr" ? p.titleFr : p.titleEn} className="h-full w-full object-cover group-hover:scale-105 transition-smooth duration-500" loading="lazy" />
                </div>
                <div className="p-5">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-accent">
                    {t(`blog.categories.${p.category}`)} • {p.readMin} min
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold leading-tight group-hover:text-primary transition-smooth">
                    {lang === "fr" ? p.titleFr : p.titleEn}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {lang === "fr" ? p.excerptFr : p.excerptEn}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="py-14 md:py-20">
        <div className="container-pro">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-primary p-8 md:p-14 text-primary-foreground">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="font-display text-2xl md:text-4xl font-extrabold">
                  {lang === "fr" ? "Prêt à vendre votre équipement ?" : "Ready to sell your equipment?"}
                </h3>
                <p className="mt-2 text-primary-foreground/80 max-w-xl">
                  {lang === "fr"
                    ? "Atteignez des milliers d'acheteurs vérifiés en Amérique du Nord. Publication en moins de 5 minutes."
                    : "Reach thousands of verified buyers across North America. List in under 5 minutes."}
                </p>
              </div>
              <Link
                to="/sell"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-accent text-accent-foreground font-bold text-sm uppercase tracking-wider shadow-glow hover:opacity-95 transition-smooth"
              >
                {t("cta.sell")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-primary-glow/30 blur-3xl" />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
