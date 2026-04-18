import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Camera, FileText, Tag, MapPin, Sparkles } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { ContactDialog } from "@/components/ContactDialog";
import { useT } from "@/lib/i18n";
import { CATEGORIES, BRANDS } from "@/lib/data";

export const Route = createFileRoute("/sell")({
  component: SellPage,
});

function SellPage() {
  const { t, lang } = useT();
  const [open, setOpen] = useState(false);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");

  const steps = [
    { icon: Camera, t: lang === "fr" ? "Décrivez votre machine" : "Describe your machine", d: lang === "fr" ? "Marque, modèle, année et état général." : "Brand, model, year and overall condition." },
    { icon: FileText, t: lang === "fr" ? "Nous vous contactons" : "We contact you", d: lang === "fr" ? "Notre équipe vous rappelle sous 24h ouvrées." : "Our team calls back within 24 business hours." },
    { icon: Tag, t: lang === "fr" ? "Évaluation gratuite" : "Free valuation", d: lang === "fr" ? "Estimation du prix de marché juste basée sur l'IA." : "AI-based fair market value estimate." },
    { icon: MapPin, t: lang === "fr" ? "Mise en vente" : "List for sale", d: lang === "fr" ? "Visibilité auprès de milliers d'acheteurs vérifiés." : "Visibility to thousands of verified buyers." },
  ];

  return (
    <PageLayout>
      <section className="bg-gradient-primary text-primary-foreground py-16">
        <div className="container-pro max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-xs uppercase tracking-wider font-semibold">
            <Sparkles className="h-3 w-3 text-accent" /> {lang === "fr" ? "Service vendeur" : "Seller service"}
          </span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-extrabold">{t("cta.sell")}</h1>
          <p className="mt-4 text-primary-foreground/85">
            {lang === "fr"
              ? "Confiez-nous votre annonce. Notre équipe gère l'évaluation, la mise en valeur et la mise en relation avec des acheteurs vérifiés."
              : "Let us handle your listing. Our team takes care of valuation, presentation and matching with verified buyers."}
          </p>
        </div>
      </section>

      <div className="container-pro py-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ icon: Icon, t: title, d }, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-6 shadow-card relative">
            <span className="absolute -top-3 left-6 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-accent text-accent-foreground text-xs font-bold shadow-elegant">
              {i + 1}
            </span>
            <Icon className="h-8 w-8 text-accent" />
            <h3 className="mt-3 font-display text-lg font-bold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>

      <div className="container-pro pb-20">
        <form
          onSubmit={(e) => { e.preventDefault(); setOpen(true); }}
          className="bg-card border border-border rounded-lg shadow-elegant p-6 md:p-8 max-w-3xl mx-auto space-y-4"
        >
          <h2 className="font-display text-2xl font-bold">
            {lang === "fr" ? "Demander une évaluation gratuite" : "Request a free valuation"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {lang === "fr" ? "Renseignez votre machine, nous revenons vers vous sous 24h." : "Tell us about your machine, we'll get back within 24h."}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <select required value={category} onChange={(e) => setCategory(e.target.value)} className="h-11 px-3 rounded-md border border-input bg-background text-sm">
              <option value="">{lang === "fr" ? "Catégorie" : "Category"} *</option>
              {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{lang === "fr" ? c.nameFr : c.nameEn}</option>)}
            </select>
            <select required value={brand} onChange={(e) => setBrand(e.target.value)} className="h-11 px-3 rounded-md border border-input bg-background text-sm">
              <option value="">{lang === "fr" ? "Marque" : "Brand"} *</option>
              {BRANDS.map((b) => <option key={b}>{b}</option>)}
            </select>
            <input required value={model} onChange={(e) => setModel(e.target.value)} placeholder={(lang === "fr" ? "Modèle" : "Model") + " *"} className="h-11 px-3 rounded-md border border-input bg-background text-sm" />
            <input required value={year} onChange={(e) => setYear(e.target.value)} placeholder={(lang === "fr" ? "Année" : "Year") + " *"} type="number" min={1980} max={2026} className="h-11 px-3 rounded-md border border-input bg-background text-sm" />
          </div>
          <button className="w-full h-12 rounded-md bg-gradient-accent text-accent-foreground font-bold text-sm uppercase tracking-wider shadow-elegant">
            {lang === "fr" ? "Continuer ma demande" : "Continue my request"}
          </button>
        </form>
      </div>

      <ContactDialog
        open={open}
        onClose={() => setOpen(false)}
        intent="sell"
        vehicle={{ brand, model, year, category, title: `${year} ${brand} ${model}`.trim() }}
      />
    </PageLayout>
  );
}
