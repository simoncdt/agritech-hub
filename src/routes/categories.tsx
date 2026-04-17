import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { CategoryIcon } from "@/components/CategoryIcon";
import { useT } from "@/lib/i18n";
import { CATEGORIES, ALL_CATEGORY_GROUPS } from "@/lib/data";

export const Route = createFileRoute("/categories")({
  component: CategoriesPage,
});

function CategoriesPage() {
  const { t, lang } = useT();
  const grouped = (group: string) => CATEGORIES.filter((c) => c.group === group);

  return (
    <PageLayout>
      <section className="bg-gradient-primary text-primary-foreground py-12 md:py-16">
        <div className="container-pro">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold">{t("nav.categories")}</h1>
        </div>
      </section>
      <div className="container-pro py-12 space-y-12">
        {[
          { key: "farm", title: t("home.farmEquipment") },
          { key: "construction", title: t("home.constructionEquipment") },
          { key: "trucks", title: t("home.trucksTrailers") },
        ].map((g) => (
          <section key={g.key}>
            <h2 className="font-display text-2xl font-bold mb-6 pb-3 border-b border-border">{g.title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {grouped(g.key).map((c) => (
                <Link
                  key={c.slug}
                  to="/listings"
                  search={{ category: c.slug } as any}
                  className="group bg-card border border-border rounded-lg p-5 text-center hover:border-accent hover:shadow-glow transition-smooth"
                >
                  <CategoryIcon slug={c.slug} className="h-16 w-16 mx-auto text-foreground group-hover:text-accent transition-smooth" />
                  <p className="mt-3 text-sm font-semibold">{lang === "fr" ? c.nameFr : c.nameEn}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
        <section>
          <h2 className="font-display text-2xl font-bold mb-6 pb-3 border-b border-border">{t("home.allCats")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {ALL_CATEGORY_GROUPS.map((g) => (
              <div key={g.key}>
                <h3 className="font-display text-base font-bold text-primary uppercase tracking-wider mb-3">
                  {lang === "fr" ? g.nameFr : g.nameEn}
                </h3>
                <ul className="space-y-1.5 text-sm">
                  {g.items.slice(0, 18).map((i) => (
                    <li key={i}><Link to="/listings" className="text-foreground/80 hover:text-primary hover:underline">{i}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
