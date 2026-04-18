import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { useT } from "@/lib/i18n";
import { Scale } from "lucide-react";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Conditions Générales d'Utilisation — TractorTrade" },
      { name: "description", content: "Conditions Générales d'Utilisation de la plateforme TractorTrade : droits, obligations et responsabilités des utilisateurs." },
    ],
  }),
});

const LAST_UPDATED = "18 avril 2026";

function TermsPage() {
  const { lang } = useT();
  const isFr = lang === "fr";

  const sections = isFr ? FR_SECTIONS : EN_SECTIONS;

  return (
    <PageLayout>
      <div className="bg-surface-darker text-primary-foreground">
        <div className="container-pro py-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
            <Scale className="h-4 w-4" /> {isFr ? "Document contractuel" : "Contractual document"}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold mt-3">
            {isFr ? "Conditions Générales d'Utilisation" : "Terms of Service"}
          </h1>
          <p className="mt-3 text-primary-foreground/70 max-w-3xl">
            {isFr
              ? "Les présentes Conditions Générales d'Utilisation (« CGU ») régissent l'accès et l'utilisation de la plateforme TractorTrade. En accédant au Service, l'Utilisateur reconnaît avoir lu, compris et accepté l'intégralité des présentes CGU sans réserve."
              : "These Terms of Service (\"Terms\") govern access to and use of the TractorTrade platform. By accessing the Service, the User acknowledges having read, understood and accepted these Terms in their entirety without reservation."}
          </p>
          <p className="mt-4 text-xs text-primary-foreground/60">
            {isFr ? "En vigueur au" : "Effective as of"} : {LAST_UPDATED}
          </p>
        </div>
      </div>

      <div className="container-pro py-14 max-w-4xl">
        <div className="space-y-10 text-sm text-foreground/85 leading-relaxed">
          {sections.map((s, i) => (
            <section key={i} id={`art-${i + 1}`} className="scroll-mt-24">
              <h2 className="font-display text-xl font-bold text-primary">
                {isFr ? "Article" : "Article"} {i + 1} — {s.title}
              </h2>
              <div className="mt-3 space-y-3">{s.body}</div>
            </section>
          ))}

          <section className="rounded-lg border border-border bg-muted/30 p-6">
            <h3 className="font-display font-bold text-primary">{isFr ? "Droit applicable et juridiction" : "Governing Law and Jurisdiction"}</h3>
            <p className="mt-2">{isFr
              ? "Les présentes CGU sont régies par le droit québécois et, à titre subsidiaire, par les lois fédérales canadiennes applicables. Tout litige relatif à leur formation, interprétation ou exécution relèvera de la compétence exclusive des tribunaux du district judiciaire de Montréal, Québec, sous réserve des dispositions impératives de protection du consommateur."
              : "These Terms are governed by Québec law and, subsidiarily, by applicable Canadian federal laws. Any dispute relating to their formation, interpretation or execution shall fall under the exclusive jurisdiction of the courts of the judicial district of Montréal, Québec, subject to mandatory consumer protection provisions."}</p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}

const FR_SECTIONS = [
  { title: "Objet", body: <p>Les présentes CGU ont pour objet de définir les modalités et conditions dans lesquelles TractorTrade Inc. met à disposition des Utilisateurs une place de marché en ligne dédiée à la mise en relation d'acheteurs et de vendeurs d'engins agricoles, de construction et de manutention, ainsi que les services connexes (enchères, évaluation, financement, pièces détachées).</p> },
  { title: "Définitions", body: <ul className="list-disc pl-5 space-y-1"><li><strong>Plateforme</strong> : le site tractortrade.com et ses applications.</li><li><strong>Utilisateur</strong> : toute personne physique ou morale accédant au Service.</li><li><strong>Vendeur</strong> : Utilisateur publiant une annonce.</li><li><strong>Acheteur</strong> : Utilisateur soumettant une demande d'achat ou une enchère.</li><li><strong>Annonce</strong> : offre de vente publiée par un Vendeur.</li></ul> },
  { title: "Acceptation et modification", body: <p>L'utilisation du Service emporte acceptation pleine et entière des présentes CGU. TractorTrade se réserve le droit de modifier les CGU à tout moment ; les Utilisateurs seront informés par notification 30 jours avant l'entrée en vigueur des nouvelles dispositions. La poursuite de l'utilisation du Service vaut acceptation des modifications.</p> },
  { title: "Inscription et compte utilisateur", body: <p>L'inscription est gratuite et requiert la fourniture d'informations exactes, complètes et à jour. L'Utilisateur s'engage à préserver la confidentialité de ses identifiants. Toute action effectuée depuis un compte est réputée l'avoir été par son titulaire. TractorTrade se réserve le droit de suspendre ou supprimer tout compte en cas de manquement aux présentes.</p> },
  { title: "Rôle d'intermédiaire", body: <p>TractorTrade agit exclusivement en qualité d'intermédiaire technique au sens de la directive 2000/31/CE et de la Loi concernant le cadre juridique des technologies de l'information (Québec, RLRQ c. C-1.1). TractorTrade n'est partie à aucune transaction conclue entre Utilisateurs et ne saurait être tenue responsable des manquements contractuels, vices cachés ou défauts de conformité affectant les biens vendus.</p> },
  { title: "Obligations du Vendeur", body: <p>Le Vendeur garantit qu'il dispose de tous les droits nécessaires sur les biens proposés, que les annonces sont exactes, complètes et conformes à la réglementation applicable (notamment en matière d'homologation, d'émissions et de sécurité). Toute annonce frauduleuse, trompeuse ou contraire aux bonnes mœurs sera retirée sans préavis.</p> },
  { title: "Obligations de l'Acheteur", body: <p>L'Acheteur s'engage à n'utiliser la Plateforme que pour des intentions d'achat sérieuses. Toute enchère est ferme et engageante. L'Acheteur reconnaît qu'il lui appartient de vérifier l'état du bien préalablement à toute conclusion de vente.</p> },
  { title: "Tarifs et paiement", body: <p>L'inscription et la consultation sont gratuites. Les services premium (mise en avant, abonnement Pro, enchères) font l'objet d'une tarification disponible sur la Plateforme. Les prix sont indiqués hors taxes ; les taxes applicables (TPS, TVQ, TVA) sont ajoutées lors de la facturation.</p> },
  { title: "Propriété intellectuelle", body: <p>L'ensemble des éléments de la Plateforme (marques, logos, codes, bases de données, contenus éditoriaux) est protégé par les lois sur la propriété intellectuelle et demeure la propriété exclusive de TractorTrade ou de ses concédants. Toute reproduction, représentation ou extraction substantielle est interdite sans autorisation écrite préalable.</p> },
  { title: "Responsabilité", body: <p>La responsabilité de TractorTrade ne pourra être engagée qu'en cas de faute prouvée et dans la limite des dommages directs, prévisibles et personnels subis. En toute hypothèse, sa responsabilité totale envers un Utilisateur ne pourra excéder le montant des sommes effectivement versées par cet Utilisateur au cours des douze (12) derniers mois.</p> },
  { title: "Force majeure", body: <p>TractorTrade ne saurait être tenue responsable de tout manquement résultant d'un cas de force majeure au sens de l'article 1470 du Code civil du Québec, incluant notamment les pannes des réseaux de télécommunications, attaques informatiques, conflits sociaux, décisions des autorités publiques.</p> },
  { title: "Résiliation", body: <p>L'Utilisateur peut clôturer son compte à tout moment depuis son espace personnel. TractorTrade peut résilier de plein droit tout compte en cas de violation grave des présentes, moyennant préavis de 15 jours, sauf en cas de fraude où la résiliation est immédiate.</p> },
];

const EN_SECTIONS = [
  { title: "Purpose", body: <p>These Terms govern the conditions under which TractorTrade Inc. provides Users with an online marketplace dedicated to connecting buyers and sellers of agricultural, construction and material handling equipment, along with related services (auctions, valuation, financing, parts).</p> },
  { title: "Definitions", body: <ul className="list-disc pl-5 space-y-1"><li><strong>Platform</strong>: tractortrade.com and its applications.</li><li><strong>User</strong>: any individual or legal entity accessing the Service.</li><li><strong>Seller</strong>: User publishing a listing.</li><li><strong>Buyer</strong>: User submitting a purchase request or bid.</li><li><strong>Listing</strong>: sale offer published by a Seller.</li></ul> },
  { title: "Acceptance and Modifications", body: <p>Using the Service constitutes full and unconditional acceptance of these Terms. TractorTrade reserves the right to modify these Terms at any time; Users will be notified 30 days before new provisions take effect. Continued use of the Service constitutes acceptance of the modifications.</p> },
  { title: "Registration and User Account", body: <p>Registration is free and requires the provision of accurate, complete and up-to-date information. The User agrees to maintain the confidentiality of their credentials. Any action taken from an account is deemed to have been taken by its holder.</p> },
  { title: "Intermediary Role", body: <p>TractorTrade acts exclusively as a technical intermediary. TractorTrade is not a party to any transaction concluded between Users and cannot be held liable for contractual breaches, hidden defects or non-conformities affecting the goods sold.</p> },
  { title: "Seller Obligations", body: <p>The Seller warrants that they have all necessary rights to the goods offered and that the listings are accurate, complete and compliant with applicable regulations (notably regarding homologation, emissions and safety).</p> },
  { title: "Buyer Obligations", body: <p>The Buyer agrees to use the Platform only with serious purchase intent. Any bid is firm and binding. The Buyer acknowledges that it is their responsibility to verify the condition of the good prior to concluding any sale.</p> },
  { title: "Pricing and Payment", body: <p>Registration and browsing are free. Premium services (featured listings, Pro subscription, auctions) are subject to pricing available on the Platform. Prices are exclusive of tax; applicable taxes are added at billing.</p> },
  { title: "Intellectual Property", body: <p>All elements of the Platform (trademarks, logos, code, databases, editorial content) are protected by intellectual property laws and remain the exclusive property of TractorTrade or its licensors.</p> },
  { title: "Liability", body: <p>TractorTrade's liability may only be engaged in the event of proven fault and within the limit of direct, foreseeable and personal damages suffered. In any event, its total liability to a User cannot exceed the amount of sums actually paid by that User over the last twelve (12) months.</p> },
  { title: "Force Majeure", body: <p>TractorTrade cannot be held liable for any breach resulting from an event of force majeure, including telecommunications network failures, cyberattacks, social conflicts, decisions of public authorities.</p> },
  { title: "Termination", body: <p>The User may close their account at any time from their personal area. TractorTrade may terminate any account in the event of a serious breach of these Terms, subject to 15 days' notice, except in cases of fraud where termination is immediate.</p> },
];
