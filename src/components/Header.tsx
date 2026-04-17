import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Menu, X, Heart, ChevronDown, Phone, User, Globe2 } from "lucide-react";
import { Logo } from "./Logo";
import { LangSwitcher } from "./LangSwitcher";
import { useT } from "@/lib/i18n";
import { useWatch } from "@/lib/watchlist";

const navLinks = [
  { to: "/categories" as const, key: "nav.categories" },
  { to: "/listings" as const, key: "nav.forSale" },
  { to: "/listings?type=rent" as const, key: "nav.forRent", search: { type: "rent" as const } },
  { to: "/auctions" as const, key: "nav.auctions" },
  { to: "/parts" as const, key: "nav.parts" },
  { to: "/market-report" as const, key: "nav.market" },
  { to: "/blog" as const, key: "nav.blog" },
];

export function Header() {
  const { t, lang } = useT();
  const { ids } = useWatch();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      {/* Top utility bar */}
      <div className="bg-gradient-primary text-primary-foreground">
        <div className="container-pro flex items-center justify-between gap-4 h-9 text-xs">
          <div className="flex items-center gap-4 overflow-hidden">
            <Link to="/login" className="hover:text-accent transition-smooth flex items-center gap-1">
              <User className="h-3 w-3" /> {t("topbar.login")}
            </Link>
            <span className="opacity-30">/</span>
            <Link to="/dealer" className="hover:text-accent transition-smooth hidden sm:inline">
              {t("topbar.dealer")}
            </Link>
            <span className="opacity-30 hidden sm:inline">/</span>
            <Link to="/vip" className="hover:text-accent transition-smooth hidden md:inline">
              {t("topbar.vip")}
            </Link>
            <span className="opacity-30 hidden md:inline">/</span>
            <Link to="/register" className="hover:text-accent transition-smooth font-semibold">
              {t("topbar.register")}
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/contact" className="hidden md:flex items-center gap-1 hover:text-accent transition-smooth">
              <Phone className="h-3 w-3" /> {t("topbar.contact")}
            </Link>
            <LangSwitcher variant="dark" />
            <Link to="/brands" className="hidden lg:flex items-center gap-1 hover:text-accent transition-smooth">
              <Globe2 className="h-3 w-3" /> {t("topbar.brands")}
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container-pro flex items-center gap-4 lg:gap-8 py-3 lg:py-4">
        <Logo />

        {/* Desktop search */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = `/listings?q=${encodeURIComponent(search)}`;
          }}
          className="hidden md:flex flex-1 max-w-3xl"
        >
          <div className="relative flex w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("search.placeholder")}
              className="w-full h-12 pl-11 pr-4 rounded-l-full border border-r-0 border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
            />
            <button
              type="submit"
              className="px-6 h-12 rounded-r-full bg-gradient-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-smooth shadow-elegant"
            >
              {t("search.button")}
            </button>
          </div>
        </form>

        {/* Watchlist + mobile menu */}
        <div className="flex items-center gap-2 ml-auto">
          <Link
            to="/watchlist"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary transition-smooth"
            aria-label="Watch list"
          >
            <Heart className="h-5 w-5" />
            {ids.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-5 min-w-5 px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold inline-flex items-center justify-center">
                {ids.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-secondary transition-smooth"
            aria-label={t("common.menu")}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = `/listings?q=${encodeURIComponent(search)}`;
        }}
        className="md:hidden container-pro pb-3"
      >
        <div className="relative flex w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("search.placeholder")}
            className="w-full h-11 pl-11 pr-4 rounded-l-full border border-r-0 border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            className="px-5 h-11 rounded-r-full bg-gradient-accent text-accent-foreground font-semibold text-sm shadow-elegant"
            aria-label={t("search.button")}
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </form>

      {/* Action row + nav */}
      <div className="bg-surface-soft border-t border-border">
        <div className="container-pro flex items-center gap-3 lg:gap-6 h-12 overflow-x-auto">
          <Link
            to="/sell"
            className="shrink-0 inline-flex items-center gap-1.5 px-4 h-8 rounded-md bg-gradient-accent text-accent-foreground text-xs font-bold uppercase tracking-wider shadow-elegant hover:opacity-95 transition-smooth"
          >
            {t("cta.sell")}
          </Link>

          <nav className="hidden lg:flex items-center gap-1 ml-2">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to as any}
                className="px-3 py-1.5 rounded-md text-sm font-medium text-foreground hover:bg-secondary hover:text-primary transition-smooth"
                activeProps={{ className: "px-3 py-1.5 rounded-md text-sm font-bold text-primary bg-secondary" }}
              >
                {t(l.key)}
              </Link>
            ))}
            <Link
              to="/about"
              className="px-3 py-1.5 rounded-md text-sm font-medium text-foreground hover:bg-secondary hover:text-primary transition-smooth"
            >
              {t("nav.about")}
            </Link>
          </nav>

          <div className="lg:hidden flex-1" />
          <span className="hidden lg:inline-flex ml-auto text-xs text-muted-foreground">
            {lang === "fr" ? "Mises à jour quotidiennes" : "Updated daily"}
          </span>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-background animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="container-pro py-3 flex flex-col">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to as any}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-3 border-b border-border text-sm font-semibold"
              >
                {t(l.key)}
                <ChevronDown className="h-4 w-4 -rotate-90 text-muted-foreground" />
              </Link>
            ))}
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-3 border-b border-border text-sm font-semibold"
            >
              {t("nav.about")}
              <ChevronDown className="h-4 w-4 -rotate-90 text-muted-foreground" />
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-3 text-sm font-semibold"
            >
              {t("topbar.contact")}
              <ChevronDown className="h-4 w-4 -rotate-90 text-muted-foreground" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
