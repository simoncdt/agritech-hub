import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Phone, Mail, MapPin, Calendar, Clock, Truck, Calculator, Share2, ChevronRight, Star, ShoppingCart, Gavel } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { ListingCard } from "@/components/ListingCard";
import { ContactDialog, type ContactIntent } from "@/components/ContactDialog";
import { useT } from "@/lib/i18n";
import { useWatch } from "@/lib/watchlist";
import { LISTINGS, formatPrice } from "@/lib/data";

export const Route = createFileRoute("/listings/$id")({
  component: DetailPage,
  loader: ({ params }) => {
    const listing = LISTINGS.find((l) => l.id === params.id);
    if (!listing) throw notFound();
    return { listing };
  },
  notFoundComponent: () => (
    <PageLayout>
      <div className="container-pro py-20 text-center">
        <h1 className="font-display text-3xl font-bold">404</h1>
        <p className="mt-2 text-muted-foreground">Listing not found.</p>
        <Link to="/listings" className="mt-6 inline-block text-primary font-semibold underline">Back to listings</Link>
      </div>
    </PageLayout>
  ),
});

function DetailPage() {
  const { listing } = Route.useLoaderData();
  const { t, lang } = useT();
  const { has, toggle } = useWatch();
  const saved = has(listing.id);
  const [activeImg, setActiveImg] = useState(0);
  const [months, setMonths] = useState(60);
  const [dialog, setDialog] = useState<ContactIntent | null>(null);

  const monthly = Math.round((listing.price * 1.08) / months);
  const related = LISTINGS.filter((l) => l.category === listing.category && l.id !== listing.id).slice(0, 4);
  const isAuction = !!listing.auction;

  return (
    <PageLayout>
      <div className="container-pro py-6">
        <nav className="text-xs text-muted-foreground mb-4 flex flex-wrap items-center gap-1">
          <Link to="/" className="hover:text-primary">{lang === "fr" ? "Accueil" : "Home"}</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/listings" className="hover:text-primary">{t("nav.forSale")}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-semibold truncate">{listing.title}</span>
        </nav>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          <div>
            <div className="bg-card rounded-lg overflow-hidden border border-border shadow-card">
              <div className="aspect-[16/10] bg-secondary relative">
                <img src={listing.images[activeImg]} alt={listing.title} className="h-full w-full object-cover" />
                <div className="absolute top-3 left-3 flex gap-2">
                  {listing.featured && (
                    <span className="px-2 py-1 rounded text-[10px] font-bold tracking-wider bg-gradient-accent text-accent-foreground">
                      {t("listing.featuredBadge")}
                    </span>
                  )}
                  {isAuction && (
                    <span className="px-2 py-1 rounded text-[10px] font-bold tracking-wider bg-foreground text-background">
                      {t("listing.auctionBadge")}
                    </span>
                  )}
                  {listing.condition === "new" && (
                    <span className="px-2 py-1 rounded text-[10px] font-bold tracking-wider bg-success text-primary-foreground">
                      {t("listing.new").toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-1 p-1">
                {listing.images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`aspect-[4/3] overflow-hidden rounded transition-smooth ${
                      activeImg === i ? "ring-2 ring-accent" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground leading-tight">{listing.title}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {listing.location}</span>
                  <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" /> {listing.year}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {listing.hours.toLocaleString()} h</span>
                  <span className="inline-flex items-center gap-1 text-success"><Truck className="h-4 w-4" /> {t("detail.shipping")}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggle(listing.id)}
                  className={`inline-flex items-center gap-1.5 px-3 h-10 rounded-md border text-sm font-semibold transition-smooth ${
                    saved ? "bg-accent text-accent-foreground border-accent" : "bg-background border-input hover:bg-secondary"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
                  {saved ? t("cta.removeFromWatch") : t("cta.addToWatch")}
                </button>
                <button className="inline-flex items-center justify-center h-10 w-10 rounded-md border border-input hover:bg-secondary">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <section className="mt-8 bg-card border border-border rounded-lg shadow-card overflow-hidden">
              <h2 className="px-6 py-4 font-display text-lg font-bold border-b border-border bg-surface-soft">
                {t("detail.specs")}
              </h2>
              <dl className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
                <div className="divide-y divide-border">
                  {listing.specs.slice(0, 3).map((s: { label: string; value: string }) => (
                    <div key={s.label} className="px-6 py-4 flex justify-between gap-4">
                      <dt className="text-sm text-muted-foreground">{s.label}</dt>
                      <dd className="text-sm font-semibold text-foreground">{s.value}</dd>
                    </div>
                  ))}
                </div>
                <div className="divide-y divide-border">
                  {listing.specs.slice(3).map((s: { label: string; value: string }) => (
                    <div key={s.label} className="px-6 py-4 flex justify-between gap-4">
                      <dt className="text-sm text-muted-foreground">{s.label}</dt>
                      <dd className="text-sm font-semibold text-foreground">{s.value}</dd>
                    </div>
                  ))}
                  <div className="px-6 py-4 flex justify-between gap-4">
                    <dt className="text-sm text-muted-foreground">{t("detail.serial")}</dt>
                    <dd className="text-sm font-semibold text-foreground font-mono">SN-{listing.id.toUpperCase()}-2X4</dd>
                  </div>
                </div>
              </dl>
            </section>

            <section className="mt-6 bg-card border border-border rounded-lg shadow-card p-6">
              <h2 className="font-display text-lg font-bold mb-3">{t("detail.description")}</h2>
              <p className="text-sm text-foreground/80 leading-relaxed">{listing.description}</p>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-32 self-start">
            <div className="bg-card border border-border rounded-lg shadow-elegant p-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">CAD</p>
              <p className="font-display text-4xl font-extrabold text-primary">{formatPrice(listing.price)}</p>
              <div className="mt-4 grid gap-2">
                {isAuction ? (
                  <button
                    onClick={() => setDialog("auction")}
                    className="inline-flex items-center justify-center gap-2 h-12 rounded-md bg-gradient-primary text-primary-foreground font-bold text-sm uppercase tracking-wider shadow-elegant hover:opacity-95 transition-smooth"
                  >
                    <Gavel className="h-4 w-4" /> {lang === "fr" ? "Participer à l'enchère" : "Bid on auction"}
                  </button>
                ) : (
                  <button
                    onClick={() => setDialog("buy")}
                    className="inline-flex items-center justify-center gap-2 h-12 rounded-md bg-gradient-primary text-primary-foreground font-bold text-sm uppercase tracking-wider shadow-elegant hover:opacity-95 transition-smooth"
                  >
                    <ShoppingCart className="h-4 w-4" /> {lang === "fr" ? "Acheter cet équipement" : "Buy this equipment"}
                  </button>
                )}
                <button
                  onClick={() => setDialog("info")}
                  className="inline-flex items-center justify-center gap-2 h-11 rounded-md bg-gradient-accent text-accent-foreground font-bold text-sm uppercase tracking-wider shadow-elegant hover:opacity-95 transition-smooth"
                >
                  <Mail className="h-4 w-4" /> {t("cta.contactSeller")}
                </button>
                <a href={`tel:${listing.seller.phone}`} className="inline-flex items-center justify-center gap-2 h-10 rounded-md border border-input bg-background font-semibold text-xs hover:bg-secondary transition-smooth">
                  <Phone className="h-3.5 w-3.5" /> {listing.seller.phone}
                </a>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg shadow-card p-6">
              <h3 className="font-display text-base font-bold flex items-center gap-2"><Calculator className="h-4 w-4 text-accent" /> {t("detail.financing")}</h3>
              <p className="mt-3 font-display text-3xl font-extrabold text-foreground">
                {formatPrice(monthly)}<span className="text-sm font-medium text-muted-foreground">{t("detail.month")}</span>
              </p>
              <input
                type="range" min={24} max={84} step={6} value={months} onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full mt-3 accent-accent"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>24 mo</span><span className="font-semibold text-foreground">{months} mo</span><span>84 mo</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg shadow-card p-6">
              <h3 className="font-display text-base font-bold mb-3">{t("detail.seller")}</h3>
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                  {listing.seller.name.split(" ").map((w: string) => w[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <p className="font-semibold text-sm">{listing.seller.name}</p>
                  <p className="text-xs text-muted-foreground inline-flex items-center gap-1 mt-0.5">
                    <Star className="h-3 w-3 fill-warning text-warning" /> {listing.seller.rating} • {listing.seller.sales} {lang === "fr" ? "ventes" : "sales"}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold mb-6">{t("detail.relatedTitle")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((l) => <ListingCard key={l.id} listing={l} />)}
            </div>
          </section>
        )}
      </div>

      <ContactDialog
        open={dialog !== null}
        onClose={() => setDialog(null)}
        intent={dialog ?? "info"}
        vehicle={{
          id: listing.id,
          title: listing.title,
          brand: listing.brand,
          model: listing.model,
          year: listing.year,
          price: listing.price,
          category: listing.category,
        }}
      />
    </PageLayout>
  );
}
