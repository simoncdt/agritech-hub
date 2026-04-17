import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Youtube, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { useT } from "@/lib/i18n";

export function Footer() {
  const { t } = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-darker text-primary-foreground mt-24">
      <div className="container-pro py-14 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-4">
          <Logo light />
          <p className="text-sm text-primary-foreground/70 max-w-sm">{t("footer.tagline")}</p>
          <div className="flex items-center gap-3 pt-2">
            {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-accent transition-smooth"
                aria-label="social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="pt-4 max-w-sm"
          >
            <p className="text-xs uppercase tracking-wider text-primary-foreground/60 mb-2">
              {t("footer.newsletter")}
            </p>
            <div className="flex">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/50" />
                <input
                  type="email"
                  placeholder={t("footer.emailPlaceholder")}
                  className="w-full h-10 pl-9 pr-3 rounded-l-md bg-primary-foreground/10 border border-primary-foreground/20 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <button className="px-4 h-10 rounded-r-md bg-gradient-accent text-accent-foreground font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-smooth">
                {t("footer.subscribe")}
              </button>
            </div>
          </form>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-wider text-primary-foreground mb-4">
            {t("footer.explore")}
          </h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/listings" className="hover:text-accent transition-smooth">{t("nav.forSale")}</Link></li>
            <li><Link to="/auctions" className="hover:text-accent transition-smooth">{t("nav.auctions")}</Link></li>
            <li><Link to="/parts" className="hover:text-accent transition-smooth">{t("nav.parts")}</Link></li>
            <li><Link to="/market-report" className="hover:text-accent transition-smooth">{t("nav.market")}</Link></li>
            <li><Link to="/blog" className="hover:text-accent transition-smooth">{t("nav.blog")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-wider text-primary-foreground mb-4">
            {t("footer.company")}
          </h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/about" className="hover:text-accent transition-smooth">{t("nav.about")}</Link></li>
            <li><Link to="/contact" className="hover:text-accent transition-smooth">{t("topbar.contact")}</Link></li>
            <li><Link to="/sell" className="hover:text-accent transition-smooth">{t("cta.sell")}</Link></li>
            <li><Link to="/dealer" className="hover:text-accent transition-smooth">{t("topbar.dealer")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-wider text-primary-foreground mb-4">
            {t("footer.legal")}
          </h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><a href="#" className="hover:text-accent transition-smooth">{t("footer.terms")}</a></li>
            <li><a href="#" className="hover:text-accent transition-smooth">{t("footer.privacy")}</a></li>
            <li><a href="#" className="hover:text-accent transition-smooth">{t("footer.cookies")}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-pro py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/50">
          <p>© {year} TractorTrade. {t("footer.rights")}</p>
          <p>Made with ❤ for the heavy iron community.</p>
        </div>
      </div>
    </footer>
  );
}
