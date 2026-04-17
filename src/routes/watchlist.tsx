import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { ListingCard } from "@/components/ListingCard";
import { useT } from "@/lib/i18n";
import { useWatch } from "@/lib/watchlist";
import { LISTINGS } from "@/lib/data";

export const Route = createFileRoute("/watchlist")({
  component: WatchlistPage,
});

function WatchlistPage() {
  const { t } = useT();
  const { ids, clear } = useWatch();
  const items = LISTINGS.filter((l) => ids.includes(l.id));

  return (
    <PageLayout>
      <div className="container-pro py-10">
        <div className="flex items-end justify-between gap-3 mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-primary">{t("watch.title")}</h1>
            <p className="text-sm text-muted-foreground mt-1">{items.length} {t("listing.results")}</p>
          </div>
          {items.length > 0 && (
            <button onClick={clear} className="px-4 h-10 rounded-md border border-input text-sm font-semibold hover:bg-secondary transition-smooth">
              {t("cta.resetFilter")}
            </button>
          )}
        </div>
        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
              <Heart className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="mt-4 text-muted-foreground">{t("watch.empty")}</p>
            <Link to="/listings" className="mt-6 inline-flex px-5 py-2.5 rounded-md bg-gradient-primary text-primary-foreground text-sm font-bold">
              {t("nav.forSale")}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {items.map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
