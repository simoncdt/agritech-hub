import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { useT } from "@/lib/i18n";
import { BRANDS } from "@/lib/data";

export const Route = createFileRoute("/brands")({
  component: BrandsPage,
});

function BrandsPage() {
  const { t } = useT();
  return (
    <PageLayout>
      <section className="bg-gradient-primary text-primary-foreground py-12 md:py-16">
        <div className="container-pro">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold">{t("home.brandsTitle")}</h1>
        </div>
      </section>
      <div className="container-pro py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {BRANDS.map((b) => (
          <Link key={b} to="/listings" className="group flex items-center justify-center h-24 rounded-lg border border-border bg-card hover:border-accent hover:shadow-glow transition-smooth">
            <span className="font-display text-lg font-bold text-foreground group-hover:text-accent text-center px-3">{b}</span>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}
