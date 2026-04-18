import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { useT } from "@/lib/i18n";
import { Cookie } from "lucide-react";

export const Route = createFileRoute("/cookies")({
  component: CookiesPage,
  head: () => ({
    meta: [
      { title: "Politique de cookies — TractorTrade" },
      { name: "description", content: "Gestion des cookies et traceurs sur TractorTrade : finalités, durées et paramétrage conformes à la directive ePrivacy." },
    ],
  }),
});

function CookiesPage() {
  const { lang } = useT();
  const isFr = lang === "fr";

  return (
    <PageLayout>
      <div className="bg-surface-darker text-primary-foreground">
        <div className="container-pro py-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
            <Cookie className="h-4 w-4" /> {isFr ? "Traceurs & cookies" : "Trackers & cookies"}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold mt-3">
            {isFr ? "Politique de cookies" : "Cookie Policy"}
          </h1>
          <p className="mt-3 text-primary-foreground/70 max-w-3xl">
            {isFr
              ? "Conformément à la directive 2002/58/CE (« ePrivacy »), à l'article 82 de la Loi Informatique et Libertés et aux lignes directrices de la CNIL du 17 septembre 2020, TractorTrade vous informe ci-dessous de l'utilisation des cookies et traceurs sur sa Plateforme."
              : "In accordance with Directive 2002/58/EC (\"ePrivacy\") and applicable guidelines, TractorTrade informs you below about the use of cookies and trackers on its Platform."}
          </p>
        </div>
      </div>

      <div className="container-pro py-14 max-w-4xl space-y-10 text-sm text-foreground/85 leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-bold text-primary">{isFr ? "1. Qu'est-ce qu'un cookie ?" : "1. What is a cookie?"}</h2>
          <p className="mt-3">{isFr
            ? "Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, mobile) lors de la consultation d'un site. Il permet notamment d'enregistrer des informations relatives à votre navigation, de mémoriser vos préférences ou de mesurer l'audience d'un site."
            : "A cookie is a small text file placed on your device when visiting a website. It allows information about your browsing to be saved, your preferences to be remembered, or website audience to be measured."}</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-primary">{isFr ? "2. Catégories de cookies utilisés" : "2. Categories of Cookies Used"}</h2>
          <div className="mt-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-xs">
              <thead className="bg-muted">
                <tr className="text-left">
                  <th className="p-3 font-semibold">{isFr ? "Cookie" : "Cookie"}</th>
                  <th className="p-3 font-semibold">{isFr ? "Finalité" : "Purpose"}</th>
                  <th className="p-3 font-semibold">{isFr ? "Durée" : "Duration"}</th>
                  <th className="p-3 font-semibold">{isFr ? "Base légale" : "Legal basis"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COOKIES(isFr).map((c) => (
                  <tr key={c.name}>
                    <td className="p-3 font-mono">{c.name}</td>
                    <td className="p-3">{c.purpose}</td>
                    <td className="p-3">{c.duration}</td>
                    <td className="p-3">{c.basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-primary">{isFr ? "3. Consentement et paramétrage" : "3. Consent and Settings"}</h2>
          <p className="mt-3">{isFr
            ? "Le dépôt des cookies non strictement nécessaires (mesure d'audience non exemptée, marketing, réseaux sociaux) est subordonné à votre consentement préalable, libre, spécifique, éclairé et univoque, recueilli via notre bandeau de gestion des préférences. Vous pouvez à tout moment retirer votre consentement ou modifier vos choix depuis le lien « Préférences cookies » présent en pied de page."
            : "The placement of cookies that are not strictly necessary (non-exempt audience measurement, marketing, social networks) is subject to your prior, free, specific, informed and unequivocal consent, collected via our preferences management banner. You can withdraw your consent or modify your choices at any time from the \"Cookie preferences\" link in the footer."}</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-primary">{isFr ? "4. Cookies tiers" : "4. Third-Party Cookies"}</h2>
          <p className="mt-3">{isFr
            ? "Certains cookies sont déposés par des tiers (Google Analytics, Meta, LinkedIn) que TractorTrade ne maîtrise pas. Nous vous invitons à consulter leurs politiques respectives. Les transferts hors UE sont encadrés par les Clauses Contractuelles Types de la Commission européenne."
            : "Some cookies are placed by third parties (Google Analytics, Meta, LinkedIn) that TractorTrade does not control. We invite you to consult their respective policies. Non-EU transfers are framed by the European Commission's Standard Contractual Clauses."}</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-primary">{isFr ? "5. Conservation" : "5. Retention"}</h2>
          <p className="mt-3">{isFr
            ? "La durée de vie d'un cookie n'excède pas treize (13) mois conformément à la recommandation de la CNIL. Au-delà de cette période, votre consentement vous sera à nouveau demandé."
            : "The lifetime of a cookie does not exceed thirteen (13) months. Beyond this period, your consent will be requested again."}</p>
        </section>
      </div>
    </PageLayout>
  );
}

const COOKIES = (isFr: boolean) => [
  { name: "tt_session", purpose: isFr ? "Authentification de session" : "Session authentication", duration: isFr ? "Session" : "Session", basis: isFr ? "Strictement nécessaire" : "Strictly necessary" },
  { name: "tt_lang", purpose: isFr ? "Mémorisation de la langue" : "Language preference", duration: "12 " + (isFr ? "mois" : "months"), basis: isFr ? "Strictement nécessaire" : "Strictly necessary" },
  { name: "tt_consent", purpose: isFr ? "Stockage des choix de cookies" : "Storage of cookie choices", duration: "13 " + (isFr ? "mois" : "months"), basis: isFr ? "Obligation légale" : "Legal obligation" },
  { name: "_ga", purpose: isFr ? "Mesure d'audience Google Analytics" : "Google Analytics measurement", duration: "13 " + (isFr ? "mois" : "months"), basis: isFr ? "Consentement" : "Consent" },
  { name: "_fbp", purpose: isFr ? "Suivi publicitaire Meta" : "Meta advertising tracking", duration: "3 " + (isFr ? "mois" : "months"), basis: isFr ? "Consentement" : "Consent" },
  { name: "li_sugr", purpose: isFr ? "Suivi LinkedIn Insight" : "LinkedIn Insight tracking", duration: "3 " + (isFr ? "mois" : "months"), basis: isFr ? "Consentement" : "Consent" },
];
