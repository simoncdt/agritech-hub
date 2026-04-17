import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — TractorTrade" },
      { name: "description", content: "Contactez l'équipe TractorTrade. Réponse sous 24h." },
    ],
  }),
});

function ContactPage() {
  const { t } = useT();
  const [sent, setSent] = useState(false);

  return (
    <PageLayout>
      <section className="bg-gradient-primary text-primary-foreground py-12 md:py-16">
        <div className="container-pro">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold">{t("contact.title")}</h1>
        </div>
      </section>
      <div className="container-pro py-12 grid lg:grid-cols-[1fr_360px] gap-10">
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="bg-card border border-border rounded-lg shadow-card p-6 md:p-8 space-y-4"
        >
          {sent && (
            <div className="flex items-center gap-2 p-3 rounded-md bg-success/10 text-success text-sm">
              <CheckCircle2 className="h-4 w-4" /> {t("contact.sent")}
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{t("contact.name")}</span>
              <input required className="mt-1 w-full h-11 px-3 rounded-md border border-input bg-background text-sm" />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{t("contact.email")}</span>
              <input required type="email" className="mt-1 w-full h-11 px-3 rounded-md border border-input bg-background text-sm" />
            </label>
          </div>
          <label className="block">
            <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{t("contact.phone")}</span>
            <input className="mt-1 w-full h-11 px-3 rounded-md border border-input bg-background text-sm" />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{t("contact.message")}</span>
            <textarea required rows={6} className="mt-1 w-full px-3 py-2 rounded-md border border-input bg-background text-sm" />
          </label>
          <button className="h-11 px-6 rounded-md bg-gradient-accent text-accent-foreground font-bold text-sm uppercase tracking-wider shadow-elegant hover:opacity-95 transition-smooth">
            {t("contact.send")}
          </button>
        </form>
        <aside className="space-y-4">
          {[
            { icon: Mail, label: "Email", value: "support@tractortrade.com" },
            { icon: Phone, label: "Phone", value: "+1 (888) 555-0123" },
            { icon: MapPin, label: "Address", value: "100 Industrial Park, Calgary, AB, Canada" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-card border border-border rounded-lg p-5 shadow-card">
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 inline-flex items-center justify-center rounded-md bg-gradient-primary text-primary-foreground">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="text-sm font-semibold">{value}</p>
                </div>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </PageLayout>
  );
}
