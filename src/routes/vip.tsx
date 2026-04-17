import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/vip")({ component: VipPage });

function VipPage() {
  const { t, lang } = useT();
  return (
    <PageLayout>
      <section className="bg-gradient-primary text-primary-foreground py-16">
        <div className="container-pro max-w-3xl">
          <span className="inline-flex px-3 py-1 rounded-full bg-warning text-foreground text-xs font-bold uppercase tracking-wider">VIP</span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-extrabold">{t("topbar.vip")}</h1>
          <p className="mt-3 text-primary-foreground/85">
            {lang === "fr"
              ? "Évaluation gratuite et précise de la valeur marchande de vos machines."
              : "Free, accurate market value estimation for your machines."}
          </p>
        </div>
      </section>
      <div className="container-pro py-10 text-muted-foreground">
        {lang === "fr" ? "Portail VIP — démo." : "VIP Portal — demo."}
      </div>
    </PageLayout>
  );
}
