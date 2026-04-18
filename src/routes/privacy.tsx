import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { useT } from "@/lib/i18n";
import { Shield, Lock, FileCheck, Mail } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — TractorTrade" },
      { name: "description", content: "Politique de confidentialité TractorTrade : collecte, traitement et protection de vos données personnelles conformément au RGPD et à la Loi 25." },
    ],
  }),
});

const LAST_UPDATED = "18 avril 2026";

function PrivacyPage() {
  const { lang } = useT();
  const isFr = lang === "fr";

  return (
    <PageLayout>
      <div className="bg-surface-darker text-primary-foreground">
        <div className="container-pro py-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
            <Shield className="h-4 w-4" /> {isFr ? "Document légal" : "Legal document"}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold mt-3">
            {isFr ? "Politique de confidentialité" : "Privacy Policy"}
          </h1>
          <p className="mt-3 text-primary-foreground/70 max-w-3xl">
            {isFr
              ? "TractorTrade Inc. (« TractorTrade », « nous », « notre ») s'engage à protéger la vie privée de ses utilisateurs. Le présent document décrit, conformément au Règlement (UE) 2016/679 (RGPD), à la Loi sur la protection des renseignements personnels dans le secteur privé du Québec (Loi 25) et à la Loi sur la protection des renseignements personnels et les documents électroniques (LPRPDE), les pratiques relatives à la collecte, à l'utilisation, à la conservation et à la communication des renseignements personnels."
              : "TractorTrade Inc. (\"TractorTrade\", \"we\", \"our\") is committed to protecting the privacy of its users. This document describes, in accordance with Regulation (EU) 2016/679 (GDPR), Quebec's Act respecting the protection of personal information in the private sector (Law 25) and PIPEDA, the practices relating to the collection, use, retention and disclosure of personal information."}
          </p>
          <p className="mt-4 text-xs text-primary-foreground/60">
            {isFr ? "Dernière mise à jour" : "Last updated"} : {LAST_UPDATED} · {isFr ? "Version" : "Version"} 2.4
          </p>
        </div>
      </div>

      <div className="container-pro py-14 grid lg:grid-cols-[260px_1fr] gap-10">
        <aside className="lg:sticky lg:top-24 self-start">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">{isFr ? "Sommaire" : "Contents"}</p>
          <nav className="text-sm space-y-2">
            {SECTIONS(isFr).map((s) => (
              <a key={s.id} href={`#${s.id}`} className="block text-foreground/80 hover:text-primary transition-smooth">
                {s.n}. {s.title}
              </a>
            ))}
          </nav>
          <div className="mt-8 rounded-lg border border-border bg-card p-4 shadow-card">
            <Lock className="h-5 w-5 text-primary" />
            <p className="text-xs font-semibold mt-2">{isFr ? "Délégué à la protection des données" : "Data Protection Officer"}</p>
            <p className="text-xs text-muted-foreground mt-1">privacy@tractortrade.com</p>
          </div>
        </aside>

        <article className="prose-legal max-w-none space-y-10">
          {SECTIONS(isFr).map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="font-display text-2xl font-bold text-primary">{s.n}. {s.title}</h2>
              <div className="mt-3 text-sm text-foreground/85 leading-relaxed space-y-3">{s.body}</div>
            </section>
          ))}

          <section className="rounded-lg border border-border bg-muted/30 p-6 mt-12">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold">{isFr ? "Exercer vos droits" : "Exercise your rights"}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {isFr
                    ? "Pour toute demande d'accès, de rectification, d'effacement, de portabilité, d'opposition ou de limitation, écrivez à privacy@tractortrade.com. Une réponse vous sera fournie dans un délai maximal de 30 jours conformément à la réglementation applicable."
                    : "For any access, rectification, erasure, portability, objection or restriction request, write to privacy@tractortrade.com. A response will be provided within a maximum of 30 days in accordance with applicable regulations."}
                </p>
                <Link to="/contact" className="inline-block mt-3 text-sm font-semibold text-primary underline">
                  {isFr ? "Nous contacter" : "Contact us"} →
                </Link>
              </div>
            </div>
          </section>

          <p className="text-xs text-muted-foreground border-t border-border pt-6 flex items-center gap-2">
            <FileCheck className="h-3.5 w-3.5" />
            {isFr
              ? "Document juridiquement opposable — TractorTrade Inc., 1200 boulevard Saint-Laurent, Montréal (QC) H2X 2S5, Canada. NEQ 1175489320. Reg. EU FR-987654321."
              : "Legally binding document — TractorTrade Inc., 1200 boulevard Saint-Laurent, Montréal (QC) H2X 2S5, Canada. NEQ 1175489320. EU Reg. FR-987654321."}
          </p>
        </article>
      </div>
    </PageLayout>
  );
}

function SECTIONS(isFr: boolean) {
  return [
    {
      id: "responsable",
      n: 1,
      title: isFr ? "Responsable du traitement" : "Data Controller",
      body: (
        <>
          <p>{isFr
            ? "Le responsable du traitement des données collectées via la plateforme tractortrade.com est TractorTrade Inc., société constituée selon les lois du Canada, dont le siège social est situé au 1200 boulevard Saint-Laurent, Montréal (Québec) H2X 2S5, immatriculée sous le NEQ 1175489320."
            : "The data controller for information collected through tractortrade.com is TractorTrade Inc., a corporation incorporated under the laws of Canada, headquartered at 1200 boulevard Saint-Laurent, Montréal (Québec) H2X 2S5, registered under NEQ 1175489320."}</p>
          <p>{isFr
            ? "Pour toute question relative à la protection des données, vous pouvez contacter notre Délégué à la protection des données (DPD) à l'adresse privacy@tractortrade.com ou par courrier à l'attention du Service Conformité."
            : "For any data protection question, you can contact our Data Protection Officer (DPO) at privacy@tractortrade.com or by mail to the Compliance Department."}</p>
        </>
      ),
    },
    {
      id: "donnees",
      n: 2,
      title: isFr ? "Données collectées" : "Data Collected",
      body: (
        <>
          <p>{isFr ? "Nous collectons les catégories de données suivantes :" : "We collect the following categories of data:"}</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>{isFr ? "Données d'identification" : "Identification data"}</strong> : {isFr ? "nom, prénom, raison sociale, numéro d'entreprise." : "first name, last name, company name, business number."}</li>
            <li><strong>{isFr ? "Données de contact" : "Contact data"}</strong> : {isFr ? "adresse postale, courriel, numéro de téléphone." : "postal address, email, phone number."}</li>
            <li><strong>{isFr ? "Données transactionnelles" : "Transactional data"}</strong> : {isFr ? "annonces consultées, demandes de contact, historique d'enchères." : "listings viewed, contact requests, auction history."}</li>
            <li><strong>{isFr ? "Données techniques" : "Technical data"}</strong> : {isFr ? "adresse IP, identifiants de session, type de navigateur, système d'exploitation." : "IP address, session identifiers, browser type, operating system."}</li>
            <li><strong>{isFr ? "Données de géolocalisation" : "Geolocation data"}</strong> : {isFr ? "approximative, déduite de l'adresse IP." : "approximate, inferred from IP address."}</li>
          </ul>
        </>
      ),
    },
    {
      id: "finalites",
      n: 3,
      title: isFr ? "Finalités et bases légales" : "Purposes and Legal Bases",
      body: (
        <>
          <p>{isFr ? "Vos données sont traitées pour les finalités suivantes :" : "Your data is processed for the following purposes:"}</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>{isFr ? "Exécution du contrat de service (art. 6.1.b RGPD)" : "Performance of the service contract (Art. 6.1.b GDPR)"} : {isFr ? "création de compte, mise en relation acheteurs/vendeurs." : "account creation, buyer/seller matching."}</li>
            <li>{isFr ? "Obligation légale (art. 6.1.c RGPD)" : "Legal obligation (Art. 6.1.c GDPR)"} : {isFr ? "lutte contre la fraude, conservation comptable." : "fraud prevention, accounting retention."}</li>
            <li>{isFr ? "Intérêt légitime (art. 6.1.f RGPD)" : "Legitimate interest (Art. 6.1.f GDPR)"} : {isFr ? "amélioration du service, sécurité de la plateforme." : "service improvement, platform security."}</li>
            <li>{isFr ? "Consentement (art. 6.1.a RGPD)" : "Consent (Art. 6.1.a GDPR)"} : {isFr ? "communications marketing, cookies non essentiels." : "marketing communications, non-essential cookies."}</li>
          </ul>
        </>
      ),
    },
    {
      id: "conservation",
      n: 4,
      title: isFr ? "Durée de conservation" : "Retention Period",
      body: (
        <>
          <p>{isFr
            ? "Les données de compte sont conservées pendant toute la durée de la relation contractuelle, puis archivées 5 ans à des fins probatoires conformément à l'article 2925 du Code civil du Québec et à l'article L.110-4 du Code de commerce français. Les données de facturation sont conservées 10 ans (art. L.123-22 C. com.). Les cookies expirent au maximum 13 mois après leur dépôt."
            : "Account data is retained for the entire duration of the contractual relationship, then archived for 5 years for evidentiary purposes in accordance with applicable law. Billing data is retained for 10 years. Cookies expire at most 13 months after they are placed."}</p>
        </>
      ),
    },
    {
      id: "destinataires",
      n: 5,
      title: isFr ? "Destinataires et sous-traitants" : "Recipients and Processors",
      body: (
        <>
          <p>{isFr
            ? "Vos données peuvent être communiquées à : (i) nos employés habilités, (ii) nos sous-traitants techniques (hébergement, paiement, courriel transactionnel) liés par des accords de traitement de données conformes à l'article 28 RGPD, (iii) les autorités compétentes sur réquisition légale. Aucune donnée n'est cédée ni vendue à des tiers à des fins commerciales."
            : "Your data may be disclosed to: (i) our authorized employees, (ii) our technical processors (hosting, payment, transactional email) bound by data processing agreements compliant with Article 28 GDPR, (iii) competent authorities upon legal requisition. No data is sold or transferred to third parties for commercial purposes."}</p>
        </>
      ),
    },
    {
      id: "transferts",
      n: 6,
      title: isFr ? "Transferts internationaux" : "International Transfers",
      body: (
        <p>{isFr
          ? "Certains sous-traitants étant établis hors de l'Espace économique européen (notamment au Canada et aux États-Unis), les transferts sont encadrés par les Clauses Contractuelles Types adoptées par la Commission européenne (Décision 2021/914) et, le cas échéant, par les certifications Data Privacy Framework."
          : "Since some processors are established outside the European Economic Area (notably in Canada and the United States), transfers are framed by the Standard Contractual Clauses adopted by the European Commission (Decision 2021/914) and, where applicable, by Data Privacy Framework certifications."}</p>
      ),
    },
    {
      id: "droits",
      n: 7,
      title: isFr ? "Vos droits" : "Your Rights",
      body: (
        <>
          <p>{isFr ? "Conformément à la réglementation, vous disposez des droits suivants :" : "In accordance with the regulations, you have the following rights:"}</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>{isFr ? "Droit d'accès, de rectification et d'effacement (art. 15-17 RGPD)." : "Right of access, rectification and erasure (Art. 15-17 GDPR)."}</li>
            <li>{isFr ? "Droit à la limitation et à la portabilité (art. 18-20 RGPD)." : "Right to restriction and portability (Art. 18-20 GDPR)."}</li>
            <li>{isFr ? "Droit d'opposition au traitement (art. 21 RGPD)." : "Right to object to processing (Art. 21 GDPR)."}</li>
            <li>{isFr ? "Droit de retirer votre consentement à tout moment." : "Right to withdraw consent at any time."}</li>
            <li>{isFr ? "Droit de définir des directives post-mortem (art. 85 Loi Informatique et Libertés)." : "Right to set post-mortem directives."}</li>
            <li>{isFr ? "Droit d'introduire une réclamation auprès de la CNIL (France) ou de la CAI (Québec)." : "Right to lodge a complaint with the CNIL (France) or the CAI (Québec)."}</li>
          </ul>
        </>
      ),
    },
    {
      id: "securite",
      n: 8,
      title: isFr ? "Sécurité" : "Security",
      body: (
        <p>{isFr
          ? "TractorTrade met en œuvre des mesures techniques et organisationnelles appropriées (chiffrement TLS 1.3, hachage bcrypt, segmentation réseau, journalisation, audits annuels ISO 27001) afin de garantir un niveau de sécurité adapté au risque, conformément à l'article 32 RGPD."
          : "TractorTrade implements appropriate technical and organizational measures (TLS 1.3 encryption, bcrypt hashing, network segmentation, logging, annual ISO 27001 audits) to ensure a level of security appropriate to the risk, in accordance with Article 32 GDPR."}</p>
      ),
    },
    {
      id: "modifications",
      n: 9,
      title: isFr ? "Modifications" : "Modifications",
      body: (
        <p>{isFr
          ? "La présente politique peut être modifiée à tout moment. Toute modification substantielle fera l'objet d'une notification par courriel ou par bandeau d'information sur la plateforme au moins 30 jours avant son entrée en vigueur."
          : "This policy may be modified at any time. Any substantial modification will be notified by email or information banner on the platform at least 30 days before its entry into force."}</p>
      ),
    },
  ];
}
