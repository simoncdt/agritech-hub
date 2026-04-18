import { Header } from "./Header";
import { Footer } from "./Footer";
import { Toaster } from "sonner";
import type { ReactNode } from "react";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}
