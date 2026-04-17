import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { useT } from "@/lib/i18n";
import { POSTS } from "@/lib/data";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "Blog & Actualités — TractorTrade" },
      { name: "description", content: "Actualités, rapports de marché, guides et tests produits sur les engins agricoles et de chantier." },
    ],
  }),
});

function BlogPage() {
  const { t, lang } = useT();
  const [cat, setCat] = useState<"all" | "news" | "howto" | "review" | "market">("all");
  const filtered = cat === "all" ? POSTS : POSTS.filter((p) => p.category === cat);

  return (
    <PageLayout>
      <section className="bg-gradient-primary text-primary-foreground py-12 md:py-16">
        <div className="container-pro">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold">{t("blog.title")}</h1>
        </div>
      </section>

      <div className="container-pro py-10">
        <div className="flex flex-wrap gap-2 mb-8">
          {(["all", "news", "howto", "review", "market"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 h-9 rounded-full text-xs font-semibold uppercase tracking-wider transition-smooth ${
                cat === c
                  ? "bg-gradient-primary text-primary-foreground shadow-elegant"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
              }`}
            >
              {c === "all" ? (lang === "fr" ? "Tous" : "All") : t(`blog.categories.${c}`)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <article key={p.id} className="group bg-card border border-border rounded-lg shadow-card hover:shadow-elegant transition-smooth overflow-hidden">
              <div className="aspect-[16/9] overflow-hidden bg-secondary">
                <img src={p.image} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-smooth duration-500" loading="lazy" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="px-2 py-0.5 rounded bg-accent/10 text-accent font-bold uppercase tracking-wider">{t(`blog.categories.${p.category}`)}</span>
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{p.date}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{p.readMin} min</span>
                </div>
                <h2 className="mt-3 font-display text-xl font-bold leading-tight group-hover:text-primary transition-smooth">
                  {lang === "fr" ? p.titleFr : p.titleEn}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{lang === "fr" ? p.excerptFr : p.excerptEn}</p>
                <Link to="/blog" className="mt-4 inline-block text-sm font-bold text-primary hover:text-accent transition-smooth">
                  {t("blog.readMore")} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
