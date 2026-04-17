import { Link } from "@tanstack/react-router";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <span className="relative flex h-10 w-10 items-center justify-center rounded-md bg-gradient-primary shadow-elegant">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary-foreground" fill="currentColor" aria-hidden="true">
          <path d="M5 17a3 3 0 1 0 0 .01M19 17a3 3 0 1 0 0 .01" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M3 13l2-7h6l1 4h6l3 6v3h-3M5 17h10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-xl font-extrabold tracking-tight ${light ? "text-primary-foreground" : "text-foreground"}`}>
          Tractor<span className="text-accent">Trade</span>
        </span>
        <span className={`text-[10px] uppercase tracking-[0.18em] ${light ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
          New & Used Equipment
        </span>
      </span>
    </Link>
  );
}
