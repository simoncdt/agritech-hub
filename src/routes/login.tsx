import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const { t, lang } = useT();
  return (
    <PageLayout>
      <div className="container-pro py-16 max-w-md">
        <h1 className="font-display text-3xl font-extrabold text-primary">{t("topbar.login")}</h1>
        <form onSubmit={(e) => e.preventDefault()} className="mt-6 bg-card border border-border rounded-lg shadow-card p-6 space-y-3">
          <input type="email" placeholder={t("contact.email")} className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm" />
          <input type="password" placeholder={lang === "fr" ? "Mot de passe" : "Password"} className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm" />
          <button className="w-full h-11 rounded-md bg-gradient-primary text-primary-foreground font-bold text-sm uppercase tracking-wider">{t("topbar.login")}</button>
          <p className="text-xs text-muted-foreground text-center">
            {lang === "fr" ? "Pas de compte ?" : "No account?"} <Link to="/register" className="text-primary font-semibold underline">{t("topbar.register")}</Link>
          </p>
        </form>
      </div>
    </PageLayout>
  );
}
