import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/dealer")({ component: DealerPage });

function DealerPage() {
  const { t, lang } = useT();
  return (
    <PageLayout>
      <section className="bg-gradient-primary text-primary-foreground py-12">
        <div className="container-pro">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold">{t("topbar.dealer")}</h1>
          <p className="mt-3 text-primary-foreground/80 max-w-2xl">
            {lang === "fr" ? "Gérez votre inventaire, vos prix et vos leads en temps réel." : "Manage your inventory, prices and leads in real time."}
          </p>
        </div>
      </section>
      <div className="container-pro py-10 text-muted-foreground">
        {lang === "fr" ? "Espace concessionnaire — bientôt disponible." : "Dealer portal — coming soon."}
      </div>
    </PageLayout>
  );
}
