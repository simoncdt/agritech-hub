import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calendar, Clock, MapPin, Gavel, Search, X } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { ContactDialog } from "@/components/ContactDialog";
import { useT } from "@/lib/i18n";
import { AUCTIONS, formatPrice } from "@/lib/data";

export const Route = createFileRoute("/auctions")({
  component: AuctionsPage,
  head: () => ({
    meta: [
      { title: "Résultats d'enchères — TractorTrade" },
      { name: "description", content: "Base de données des ventes aux enchères passées d'engins agricoles et de chantier." },
    ],
  }),
});

function AuctionsPage() {
  const { t, lang } = useT();
  const [q, setQ] = useState("");
  const [auctioneer, setAuctioneer] = useState("");
  const [yearMin, setYearMin] = useState(2010);
  const [priceMax, setPriceMax] = useState(800000);
  const [sort, setSort] = useState<"date" | "priceDesc" | "priceAsc">("date");
  const [dialogFor, setDialogFor] = useState<typeof AUCTIONS[number] | null>(null);

  const auctioneers = Array.from(new Set(AUCTIONS.map((a) => a.auctioneer)));

  const filtered = useMemo(() => {
    let res = AUCTIONS.filter((a) => {
      if (q && !a.title.toLowerCase().includes(q.toLowerCase())) return false;
      if (auctioneer && a.auctioneer !== auctioneer) return false;
      if (a.year < yearMin) return false;
      if (a.salePrice > priceMax) return false;
      return true;
    });
    res = [...res].sort((a, b) => {
      if (sort === "priceDesc") return b.salePrice - a.salePrice;
      if (sort === "priceAsc") return a.salePrice - b.salePrice;
      return b.saleDate.localeCompare(a.saleDate);
    });
    return res;
  }, [q, auctioneer, yearMin, priceMax, sort]);

  const reset = () => { setQ(""); setAuctioneer(""); setYearMin(2010); setPriceMax(800000); };
  const activeCount = (q ? 1 : 0) + (auctioneer ? 1 : 0) + (yearMin > 2010 ? 1 : 0) + (priceMax < 800000 ? 1 : 0);

  return (
    <PageLayout>
      <section className="bg-gradient-primary text-primary-foreground py-12 md:py-16">
        <div className="container-pro">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-xs uppercase tracking-wider font-semibold">
            <Gavel className="h-3 w-3 text-accent" /> Auctions
          </div>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-extrabold">{t("auctions.title")}</h1>
          <p className="mt-3 text-primary-foreground/80 max-w-2xl">{t("auctions.subtitle")}</p>
        </div>
      </section>

      <div className="container-pro py-10">
        {/* Filters */}
        <div className="bg-card border border-border rounded-lg shadow-card p-4 md:p-5 mb-6">
          <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto_auto]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={lang === "fr" ? "Rechercher un équipement..." : "Search equipment..."}
                className="w-full h-11 pl-9 pr-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <select value={auctioneer} onChange={(e) => setAuctioneer(e.target.value)} className="h-11 px-3 rounded-md border border-input bg-background text-sm">
              <option value="">{lang === "fr" ? "Tous commissaires" : "All auctioneers"}</option>
              {auctioneers.map((a) => <option key={a}>{a}</option>)}
            </select>
            <div className="flex items-center gap-2 px-3 h-11 rounded-md border border-input bg-background text-xs">
              <span className="text-muted-foreground">{lang === "fr" ? "Année ≥" : "Year ≥"}</span>
              <input type="number" min={2000} max={2026} value={yearMin} onChange={(e) => setYearMin(Number(e.target.value))} className="w-16 bg-transparent font-semibold focus:outline-none" />
            </div>
            <div className="flex items-center gap-2 px-3 h-11 rounded-md border border-input bg-background text-xs">
              <span className="text-muted-foreground">{lang === "fr" ? "Prix ≤" : "Price ≤"}</span>
              <input type="number" min={0} step={10000} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="w-24 bg-transparent font-semibold focus:outline-none" />
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="h-11 px-3 rounded-md border border-input bg-background text-sm">
              <option value="date">{lang === "fr" ? "Plus récents" : "Most recent"}</option>
              <option value="priceDesc">{lang === "fr" ? "Prix ↓" : "Price ↓"}</option>
              <option value="priceAsc">{lang === "fr" ? "Prix ↑" : "Price ↑"}</option>
            </select>
          </div>
          {activeCount > 0 && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground">{filtered.length} {t("listing.results")} •</span>
              <button onClick={reset} className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-accent">
                <X className="h-3 w-3" /> {t("cta.resetFilter")}
              </button>
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-soft text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-3">Equipment</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">Year</th>
                  <th className="text-left px-4 py-3 hidden lg:table-cell">Hours</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">{t("auctions.saleDate")}</th>
                  <th className="text-left px-4 py-3 hidden lg:table-cell">{t("auctions.auctioneer")}</th>
                  <th className="text-right px-4 py-3">{t("auctions.salePrice")}</th>
                  <th className="px-4 py-3 w-px"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((a) => (
                  <tr key={a.id} className="hover:bg-secondary/40 transition-smooth">
                    <td className="px-4 py-3">
                      <Link to="/listings/$id" params={{ id: a.id.replace("auc-", "lst-") }} className="flex items-center gap-3 group">
                        <img src={a.image} alt={a.title} className="h-12 w-16 rounded object-cover" loading="lazy" />
                        <div>
                          <p className="font-semibold text-foreground group-hover:text-primary transition-smooth">{a.title}</p>
                          <p className="text-xs text-muted-foreground inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{a.location}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell"><span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3 text-muted-foreground" />{a.year}</span></td>
                    <td className="px-4 py-3 hidden lg:table-cell"><span className="inline-flex items-center gap-1"><Clock className="h-3 w-3 text-muted-foreground" />{a.hours.toLocaleString()}</span></td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{a.saleDate}</td>
                    <td className="px-4 py-3 hidden lg:table-cell"><span className="text-xs font-semibold text-foreground">{a.auctioneer}</span></td>
                    <td className="px-4 py-3 text-right font-display font-extrabold text-primary text-base">{formatPrice(a.salePrice)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setDialogFor(a)}
                        className="inline-flex items-center gap-1 px-3 h-9 rounded-md bg-gradient-accent text-accent-foreground text-xs font-bold uppercase tracking-wider shadow-elegant hover:opacity-95 transition-smooth"
                      >
                        <Gavel className="h-3.5 w-3.5" />
                        {lang === "fr" ? "Participer" : "Bid"}
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="px-4 py-16 text-center text-muted-foreground text-sm">{t("common.notFound")}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ContactDialog
        open={dialogFor !== null}
        onClose={() => setDialogFor(null)}
        intent="auction"
        vehicle={dialogFor ? { id: dialogFor.id, title: dialogFor.title, year: dialogFor.year, price: dialogFor.salePrice } : undefined}
      />
    </PageLayout>
  );
}
