import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, MapPin, Clock, Calendar, ShoppingCart, Gavel } from "lucide-react";
import { useT } from "@/lib/i18n";
import { useWatch } from "@/lib/watchlist";
import { ContactDialog } from "@/components/ContactDialog";
import { formatPrice, type Listing } from "@/lib/data";

export function ListingCard({ listing }: { listing: Listing }) {
  const { t, lang } = useT();
  const { has, toggle } = useWatch();
  const saved = has(listing.id);
  const [dialog, setDialog] = useState(false);

  const isAuction = !!listing.auction;

  return (
    <>
      <article className="group relative bg-card rounded-lg overflow-hidden border border-border shadow-card hover:shadow-elegant transition-smooth flex flex-col">
        <Link to="/listings/$id" params={{ id: listing.id }} className="block relative aspect-[4/3] overflow-hidden bg-secondary">
          <img
            src={listing.image}
            alt={listing.title}
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-105 transition-smooth duration-500"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {listing.featured && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-gradient-accent text-accent-foreground shadow-elegant">
                {t("listing.featuredBadge")}
              </span>
            )}
            {isAuction && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-foreground text-background">
                {t("listing.auctionBadge")}
              </span>
            )}
            {listing.condition === "new" && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-success text-primary-foreground">
                {t("listing.new").toUpperCase()}
              </span>
            )}
          </div>
        </Link>

        <button
          onClick={() => toggle(listing.id)}
          aria-label={saved ? t("cta.removeFromWatch") : t("cta.addToWatch")}
          className={`absolute top-2 right-2 h-9 w-9 inline-flex items-center justify-center rounded-full backdrop-blur-md border transition-smooth ${
            saved
              ? "bg-accent text-accent-foreground border-accent shadow-glow"
              : "bg-background/80 text-foreground border-border hover:bg-background"
          }`}
        >
          <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
        </button>

        <div className="p-4 flex flex-col flex-1">
          <Link to="/listings/$id" params={{ id: listing.id }} className="hover:text-primary transition-smooth">
            <h3 className="font-display font-bold text-lg leading-tight line-clamp-2">{listing.title}</h3>
          </Link>
          <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{listing.brand}</p>

          <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{listing.year}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{listing.hours.toLocaleString()}h</span>
            </div>
            <div className="flex items-center gap-1 truncate">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{listing.location}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border flex items-end justify-between gap-2">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">CAD</p>
              <p className="font-display text-2xl font-extrabold text-primary leading-none">
                {formatPrice(listing.price)}
              </p>
            </div>
            <Link
              to="/listings/$id"
              params={{ id: listing.id }}
              className="inline-flex items-center px-2.5 py-1.5 rounded-md border border-input text-xs font-semibold hover:bg-secondary transition-smooth"
            >
              {t("cta.viewDetails")}
            </Link>
          </div>

          <button
            onClick={() => setDialog(true)}
            className="mt-2 inline-flex items-center justify-center gap-1.5 h-10 rounded-md bg-gradient-primary text-primary-foreground text-xs font-bold uppercase tracking-wider shadow-elegant hover:opacity-95 transition-smooth"
          >
            {isAuction ? <Gavel className="h-3.5 w-3.5" /> : <ShoppingCart className="h-3.5 w-3.5" />}
            {isAuction
              ? (lang === "fr" ? "Participer" : "Bid")
              : (lang === "fr" ? "Acheter" : "Buy")}
          </button>
        </div>
      </article>

      <ContactDialog
        open={dialog}
        onClose={() => setDialog(false)}
        intent={isAuction ? "auction" : "buy"}
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
    </>
  );
}
