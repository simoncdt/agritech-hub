import { useEffect, useState, type ReactNode } from "react";
import { X, CheckCircle2, Loader2, Phone, Mail, User, MessageSquare } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { useT } from "@/lib/i18n";

export type ContactIntent = "buy" | "sell" | "auction" | "rent" | "info";

interface VehicleContext {
  id?: string;
  title?: string;
  brand?: string;
  model?: string;
  year?: number | string;
  price?: number;
  category?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  intent: ContactIntent;
  vehicle?: VehicleContext;
  trigger?: ReactNode;
}

const schema = z.object({
  name: z.string().trim().min(2, "min2").max(100),
  email: z.string().trim().email("invalidEmail").max(255),
  phone: z.string().trim().min(6, "min6").max(30),
  message: z.string().trim().max(1000).optional(),
});

const intentLabel: Record<ContactIntent, { fr: string; en: string }> = {
  buy: { fr: "Acheter cet équipement", en: "Buy this equipment" },
  sell: { fr: "Vendre mon équipement", en: "Sell my equipment" },
  auction: { fr: "Participer à l'enchère", en: "Bid on this auction" },
  rent: { fr: "Louer cet équipement", en: "Rent this equipment" },
  info: { fr: "Demande d'information", en: "Request information" },
};

export function ContactDialog({ open, onClose, intent, vehicle }: Props) {
  const { lang } = useT();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (open) {
      setDone(false);
      setErrors({});
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const T = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const title = intentLabel[intent][lang];

  const errorMsg = (code?: string) => {
    if (!code) return "";
    if (code === "min2") return T("Au moins 2 caractères", "At least 2 characters");
    if (code === "min6") return T("Numéro invalide", "Invalid phone");
    if (code === "invalidEmail") return T("Email invalide", "Invalid email");
    return T("Champ invalide", "Invalid field");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse({ name, email, phone, message });
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as string;
        next[k] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitting(true);
    // Demo: simulate request. In production, send to backend / email service.
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setDone(true);
    toast.success(T("Demande envoyée", "Request sent"), {
      description: T(
        "Notre équipe vous contactera sous 24h.",
        "Our team will contact you within 24h.",
      ),
    });
    setTimeout(() => {
      onClose();
      setName(""); setEmail(""); setPhone(""); setMessage("");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      <div className="relative w-full md:max-w-xl bg-card border border-border rounded-t-2xl md:rounded-2xl shadow-elegant overflow-hidden animate-in slide-in-from-bottom-4 md:zoom-in-95">
        {/* Header */}
        <div className="bg-gradient-primary text-primary-foreground px-6 py-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider font-bold text-accent">
              {T("TractorTrade", "TractorTrade")}
            </p>
            <h2 className="font-display text-xl md:text-2xl font-extrabold mt-1">{title}</h2>
            <p className="text-xs text-primary-foreground/80 mt-1">
              {T(
                "Notre équipe vous rappelle sous 24h ouvrées.",
                "Our team will reach out within 24 business hours.",
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-smooth shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {done ? (
          <div className="p-10 text-center">
            <div className="mx-auto h-14 w-14 rounded-full bg-success/10 inline-flex items-center justify-center">
              <CheckCircle2 className="h-7 w-7 text-success" />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold">
              {T("Merci !", "Thank you!")}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {T(
                "Votre demande a bien été reçue. Nous vous contactons rapidement.",
                "Your request has been received. We'll contact you shortly.",
              )}
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Vehicle context */}
            {vehicle && (
              <div className="bg-secondary/50 border border-border rounded-lg p-3 flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 rounded bg-gradient-primary text-primary-foreground inline-flex items-center justify-center font-display font-bold text-sm">
                  {vehicle.brand?.slice(0, 2).toUpperCase() ?? "TT"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {T("Concerne", "Regarding")}
                  </p>
                  <p className="text-sm font-semibold truncate">{vehicle.title ?? `${vehicle.brand} ${vehicle.model}`}</p>
                  {vehicle.id && <p className="text-[11px] text-muted-foreground">Réf. {vehicle.id.toUpperCase()}</p>}
                </div>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-3">
              <Field
                icon={<User className="h-4 w-4" />}
                label={T("Nom complet", "Full name")}
                value={name}
                onChange={setName}
                error={errorMsg(errors.name)}
                required
                autoFocus
              />
              <Field
                icon={<Phone className="h-4 w-4" />}
                label={T("Téléphone", "Phone")}
                type="tel"
                value={phone}
                onChange={setPhone}
                error={errorMsg(errors.phone)}
                required
              />
            </div>
            <Field
              icon={<Mail className="h-4 w-4" />}
              label={T("Adresse e-mail", "Email address")}
              type="email"
              value={email}
              onChange={setEmail}
              error={errorMsg(errors.email)}
              required
            />
            <div>
              <label className="text-xs font-semibold text-foreground/80 mb-1.5 inline-flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5" />
                {T("Message (optionnel)", "Message (optional)")}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
                rows={4}
                placeholder={T(
                  intent === "sell"
                    ? "Décrivez votre machine : marque, modèle, année, état..."
                    : intent === "auction"
                    ? "Précisez votre budget max, votre disponibilité..."
                    : "Précisez votre besoin, budget, délai souhaité...",
                  intent === "sell"
                    ? "Describe your machine: brand, model, year, condition..."
                    : intent === "auction"
                    ? "Your max budget, availability..."
                    : "Your need, budget, expected timing...",
                )}
                className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
              <p className="mt-1 text-[10px] text-muted-foreground text-right">{message.length}/1000</p>
            </div>

            <div className="pt-2 flex flex-col-reverse sm:flex-row gap-2">
              <button
                type="button"
                onClick={onClose}
                className="sm:flex-1 h-11 rounded-md border border-input bg-background text-sm font-semibold hover:bg-secondary transition-smooth"
              >
                {T("Annuler", "Cancel")}
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="sm:flex-[2] h-11 rounded-md bg-gradient-accent text-accent-foreground font-bold text-sm uppercase tracking-wider shadow-elegant inline-flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {submitting ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> {T("Envoi...", "Sending...")}</>
                ) : (
                  T("Envoyer ma demande", "Send my request")
                )}
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center">
              {T(
                "En soumettant ce formulaire, vous acceptez d'être contacté par TractorTrade.",
                "By submitting, you agree to be contacted by TractorTrade.",
              )}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  icon, label, value, onChange, type = "text", error, required, autoFocus,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
  required?: boolean;
  autoFocus?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-foreground/80 mb-1.5 inline-flex items-center gap-1.5">
        {icon} {label}{required && <span className="text-destructive">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autoFocus}
        className={`w-full h-11 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 ${
          error ? "border-destructive ring-destructive/30" : "border-input focus:ring-ring"
        }`}
      />
      {error && <p className="mt-1 text-[11px] text-destructive font-medium">{error}</p>}
    </div>
  );
}
