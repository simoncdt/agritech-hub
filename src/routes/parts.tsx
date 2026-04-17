import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { useT } from "@/lib/i18n";
import { BRANDS } from "@/lib/data";

export const Route = createFileRoute("/parts")({
  component: PartsPage,
});

function PartsPage() {
  const { t } = useT();
  return (
    <PageLayout>
      <section className="bg-gradient-primary text-primary-foreground py-12 md:py-16">
        <div className="container-pro">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold">{t("nav.parts")}</h1>
        </div>
      </section>
      <div className="container-pro py-10 grid gap-6 md:grid-cols-2">
        <div className="bg-card border border-border rounded-lg shadow-card p-6">
          <h2 className="font-display text-xl font-bold mb-4">{t("home.partsTitle")}</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input className="w-full h-11 pl-10 pr-3 rounded-md border border-input bg-background text-sm" placeholder={t("home.partsLabel")} />
          </div>
          <button className="mt-3 w-full h-11 rounded-md bg-gradient-accent text-accent-foreground text-sm font-bold uppercase tracking-wider">{t("search.button")}</button>
        </div>
        <div className="bg-card border border-border rounded-lg shadow-card p-6">
          <h2 className="font-display text-xl font-bold mb-4">{t("home.dismantled")}</h2>
          <div className="grid grid-cols-2 gap-3">
            <select className="h-11 px-3 rounded-md border border-input bg-background text-sm">
              <option>{t("search.allManufacturers")}</option>
              {BRANDS.map((b) => <option key={b}>{b}</option>)}
            </select>
            <select className="h-11 px-3 rounded-md border border-input bg-background text-sm">
              <option>{t("search.allModels")}</option>
            </select>
          </div>
          <button className="mt-3 w-full h-11 rounded-md bg-gradient-accent text-accent-foreground text-sm font-bold uppercase tracking-wider">{t("search.button")}</button>
        </div>
      </div>
    </PageLayout>
  );
}
