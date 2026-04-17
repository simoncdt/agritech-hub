import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Clock, MapPin, Gavel } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
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
  const { t } = useT();

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
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {AUCTIONS.map((a) => (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
