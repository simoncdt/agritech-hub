import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { useT } from "@/lib/i18n";
import { Building2 } from "lucide-react";

export const Route = createFileRoute("/legal")({
  component: LegalPage,
  head: () => ({
    meta: [
      { title: "Mentions légales — TractorTrade" },
      { name: "description", content: "Mentions légales de TractorTrade Inc. : éditeur, hébergeur, directeur de la publication." },
    ],
  }),
});

function LegalPage() {
  const { lang } = useT();
  const isFr = lang === "fr";

  return (
    <PageLayout>
      <div className="bg-surface-darker text-primary-foreground">
        <div className="container-pro py-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
            <Building2 className="h-4 w-4" /> {isFr ? "Information légale" : "Legal information"}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold mt-3">
            {isFr ? "Mentions légales" : "Legal Notice"}
          </h1>
        </div>
      </div>

      <div className="container-pro py-14 max-w-3xl space-y-8 text-sm text-foreground/85 leading-relaxed">
        <Block title={isFr ? "Éditeur du site" : "Site Publisher"}>
          <p><strong>TractorTrade Inc.</strong></p>
          <p>{isFr ? "Société constituée selon les lois du Canada" : "Corporation incorporated under the laws of Canada"}</p>
          <p>1200 boulevard Saint-Laurent, Montréal (QC) H2X 2S5, Canada</p>
          <p>NEQ : 1175489320 — {isFr ? "Numéro d'entreprise" : "Business Number"} : 887654321 RC0001</p>
          <p>{isFr ? "Capital social" : "Share capital"} : 2 500 000 CAD</p>
          <p>TPS : 887654321 RT0001 — TVQ : 1234567890 TQ0001 — {isFr ? "TVA intracommunautaire" : "EU VAT"} : FR98765432198</p>
        </Block>

        <Block title={isFr ? "Direction de la publication" : "Publication Director"}>
          <p>{isFr ? "Directeur de la publication" : "Publication Director"} : M. Jean-Philippe Marchand, {isFr ? "Président-Directeur Général" : "Chief Executive Officer"}</p>
          <p>{isFr ? "Responsable éditorial" : "Editorial Manager"} : Mme Sarah Lemieux</p>
          <p>Contact : legal@tractortrade.com — +1 (514) 555-0188</p>
        </Block>

        <Block title={isFr ? "Hébergement" : "Hosting"}>
          <p>Cloudflare, Inc.</p>
          <p>101 Townsend Street, San Francisco, CA 94107, {isFr ? "États-Unis" : "United States"}</p>
          <p>{isFr ? "Téléphone" : "Phone"} : +1 (650) 319-8930</p>
        </Block>

        <Block title={isFr ? "Propriété intellectuelle" : "Intellectual Property"}>
          <p>{isFr
            ? "L'ensemble des contenus (textes, images, logos, marques, vidéos, bases de données) figurant sur le site tractortrade.com est protégé par les législations canadienne, européenne et internationale sur la propriété intellectuelle. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation écrite préalable est strictement interdite et constitue une contrefaçon sanctionnée par les articles 27 et suivants de la Loi sur le droit d'auteur (L.R.C. 1985, ch. C-42) et les articles L.335-2 et suivants du Code de la propriété intellectuelle français."
            : "All content (texts, images, logos, trademarks, videos, databases) appearing on the tractortrade.com website is protected by Canadian, European and international intellectual property laws. Any reproduction, representation, modification or exploitation, in whole or in part, without prior written authorization is strictly prohibited."}</p>
        </Block>

        <Block title={isFr ? "Médiation de la consommation" : "Consumer Mediation"}>
          <p>{isFr
            ? "Conformément à l'article L.612-1 du Code de la consommation, l'Utilisateur consommateur peut recourir gratuitement au service de médiation MEDICYS (73 boulevard de Clichy, 75009 Paris — www.medicys.fr). Pour les Utilisateurs québécois, l'Office de la protection du consommateur peut être saisi (www.opc.gouv.qc.ca)."
            : "In accordance with applicable consumer law, consumer Users may use the MEDICYS mediation service free of charge. For Québec Users, the Office de la protection du consommateur can be contacted (www.opc.gouv.qc.ca)."}</p>
        </Block>

        <Block title={isFr ? "Signalement de contenus" : "Content Reporting"}>
          <p>{isFr
            ? "Conformément à l'article 6 de la LCEN (loi n° 2004-575), tout contenu manifestement illicite peut être signalé à abuse@tractortrade.com. Le signalement doit comporter l'identification précise du contenu visé, les motifs de droit et de fait justifiant le retrait, ainsi que les coordonnées du déclarant."
            : "Any manifestly unlawful content may be reported to abuse@tractortrade.com. The report must include precise identification of the targeted content, the legal and factual grounds justifying removal, and the reporter's contact information."}</p>
        </Block>
      </div>
    </PageLayout>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-border bg-card shadow-card p-6">
      <h2 className="font-display text-lg font-bold text-primary mb-3">{title}</h2>
      <div className="space-y-1.5">{children}</div>
    </section>
  );
}
