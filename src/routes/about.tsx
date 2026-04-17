import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Users, Globe2, Award } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "À propos — TractorTrade" },
      { name: "description", content: "TractorTrade : la place de marché de référence pour le matériel agricole, de chantier et de transport." },
    ],
  }),
});

function AboutPage() {
  const { t, lang } = useT();
  const stats = [
    { icon: Users, value: "120k+", label: lang === "fr" ? "Utilisateurs actifs" : "Active users" },
    { icon: Globe2, value: "45", label: lang === "fr" ? "Pays desservis" : "Countries served" },
    { icon: ShieldCheck, value: "98%", label: lang === "fr" ? "Vendeurs vérifiés" : "Verified sellers" },
    { icon: Award, value: "15 ans", label: lang === "fr" ? "D'expérience secteur" : "Industry experience" },
  ];

  return (
    <PageLayout>
      <section className="bg-gradient-primary text-primary-foreground py-16 md:py-24">
        <div className="container-pro max-w-3xl">
          <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-tight">{t("about.title")}</h1>
          <p className="mt-5 text-lg text-primary-foreground/85">{t("about.intro")}</p>
        </div>
      </section>
      <div className="container-pro py-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={label} className="bg-card border border-border rounded-lg p-6 shadow-card text-center">
            <Icon className="h-8 w-8 mx-auto text-accent" />
            <p className="mt-3 font-display text-3xl font-extrabold text-primary">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
      <div className="container-pro pb-20 max-w-3xl prose prose-slate">
        <p className="text-foreground/80 leading-relaxed">
          {lang === "fr"
            ? "TractorTrade combine annonces à vendre, résultats d'enchères et données de marché en une seule plateforme. Notre mission : connecter acheteurs et vendeurs de matériel lourd en Amérique du Nord avec transparence, rapidité et confiance. Les données sont actualisées quotidiennement et chaque vendeur est vérifié avant publication."
            : "TractorTrade combines for-sale listings, auction results, and market data in a single platform. Our mission: connect heavy equipment buyers and sellers across North America with transparency, speed and trust. Data is refreshed daily and every seller is verified before publishing."}
        </p>
      </div>
    </PageLayout>
  );
}
