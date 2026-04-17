import { useT, type Lang } from "@/lib/i18n";

export function LangSwitcher({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const { lang, setLang } = useT();
  const base =
    variant === "dark"
      ? "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
      : "border-border text-foreground hover:bg-secondary";

  const Btn = ({ value, label }: { value: Lang; label: string }) => (
    <button
      onClick={() => setLang(value)}
      className={`px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded transition-smooth ${
        lang === value
          ? "bg-accent text-accent-foreground shadow-glow"
          : variant === "dark"
            ? "text-primary-foreground/80 hover:text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
      }`}
      aria-pressed={lang === value}
    >
      {label}
    </button>
  );

  return (
    <div className={`inline-flex items-center gap-0.5 rounded-md border px-1 py-0.5 ${base}`}>
      <Btn value="fr" label="FR" />
      <Btn value="en" label="EN" />
    </div>
  );
}
