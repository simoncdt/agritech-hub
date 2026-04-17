import { createFileRoute } from "@tanstack/react-router";
import { Camera, FileText, Tag, MapPin, CheckCircle2 } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/sell")({
  component: SellPage,
});

function SellPage() {
  const { t, lang } = useT();
  const steps = [
    { icon: Camera, t: lang === "fr" ? "Photographiez votre machine" : "Photograph your machine", d: lang === "fr" ? "Jusqu'à 40 photos haute résolution + vidéos." : "Up to 40 high-res photos + videos." },
    { icon: FileText, t: lang === "fr" ? "Renseignez les détails" : "Fill in details", d: lang === "fr" ? "Marque, modèle, état, n° de série, description." : "Brand, model, condition, serial #, description." },
    { icon: Tag, t: lang === "fr" ? "Fixez votre prix" : "Set your price", d: lang === "fr" ? "Notre IA suggère un prix de marché juste." : "Our AI suggests a fair market price." },
    { icon: MapPin, t: lang === "fr" ? "Publiez & vendez" : "Publish & sell", d: lang === "fr" ? "Visibilité immédiate auprès de milliers d'acheteurs." : "Instant visibility to thousands of buyers." },
  ];

  return (
    <PageLayout>
      <section className="bg-gradient-primary text-primary-foreground py-16">
        <div className="container-pro max-w-3xl">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold">{t("cta.sell")}</h1>
          <p className="mt-4 text-primary-foreground/85">
            {lang === "fr"
              ? "Atteignez des milliers d'acheteurs vérifiés en Amérique du Nord. Publication en moins de 5 minutes."
              : "Reach thousands of verified buyers across North America. List in under 5 minutes."}
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
        <form className="bg-card border border-border rounded-lg shadow-card p-6 md:p-8 max-w-3xl mx-auto space-y-4" onSubmit={(e) => { e.preventDefault(); alert(lang === "fr" ? "Annonce publiée (démo)" : "Listing published (demo)"); }}>
          <h2 className="font-display text-2xl font-bold">{lang === "fr" ? "Publier mon annonce" : "Publish my listing"}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input placeholder={lang === "fr" ? "Marque" : "Brand"} className="h-11 px-3 rounded-md border border-input bg-background text-sm" />
            <input placeholder={lang === "fr" ? "Modèle" : "Model"} className="h-11 px-3 rounded-md border border-input bg-background text-sm" />
            <input placeholder={lang === "fr" ? "Année" : "Year"} type="number" className="h-11 px-3 rounded-md border border-input bg-background text-sm" />
            <input placeholder={lang === "fr" ? "Heures" : "Hours"} type="number" className="h-11 px-3 rounded-md border border-input bg-background text-sm" />
            <input placeholder={lang === "fr" ? "Prix demandé (CAD)" : "Asking price (CAD)"} type="number" className="h-11 px-3 rounded-md border border-input bg-background text-sm" />
            <input placeholder={t("detail.serial")} className="h-11 px-3 rounded-md border border-input bg-background text-sm" />
          </div>
          <textarea placeholder={t("detail.description")} rows={5} className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm" />
          <div className="border-2 border-dashed border-border rounded-md p-8 text-center text-sm text-muted-foreground">
            <Camera className="h-8 w-8 mx-auto mb-2" />
            {lang === "fr" ? "Glissez vos photos ici (jusqu'à 40)" : "Drop your photos here (up to 40)"}
          </div>
          <button className="w-full h-12 rounded-md bg-gradient-accent text-accent-foreground font-bold text-sm uppercase tracking-wider shadow-elegant inline-flex items-center justify-center gap-2">
            <CheckCircle2 className="h-4 w-4" /> {lang === "fr" ? "Publier" : "Publish"}
          </button>
        </form>
      </div>
    </PageLayout>
  );
}
