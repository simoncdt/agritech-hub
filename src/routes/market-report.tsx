import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { useT } from "@/lib/i18n";
import { MARKET_DATA } from "@/lib/data";

export const Route = createFileRoute("/market-report")({
  component: MarketReportPage,
  head: () => ({
    meta: [
      { title: "Rapport de marché EVI — TractorTrade" },
      { name: "description", content: "Indice de valeur des équipements (EVI). Tendances mensuelles retail, enchères et inventaire." },
    ],
  }),
});

function MarketReportPage() {
  const { t, lang } = useT();
  const last = MARKET_DATA[MARKET_DATA.length - 1];
  const prev = MARKET_DATA[MARKET_DATA.length - 2];

  const cards = [
    { key: "retail", value: last.retail, prev: prev.retail, label: t("market.retail") },
    { key: "auction", value: last.auction, prev: prev.auction, label: t("market.auction") },
    { key: "inventory", value: last.inventory, prev: prev.inventory, label: t("market.inventory") },
  ];

  // Build SVG area chart
  const W = 800, H = 260, PAD = 32;
  const xs = MARKET_DATA.map((_, i) => PAD + (i * (W - PAD * 2)) / (MARKET_DATA.length - 1));
  const allVals = MARKET_DATA.flatMap((d) => [d.retail, d.auction, d.inventory]);
  const minV = Math.min(...allVals) - 2;
  const maxV = Math.max(...allVals) + 2;
  const yScale = (v: number) => H - PAD - ((v - minV) * (H - PAD * 2)) / (maxV - minV);

  const series = [
    { key: "retail", color: "var(--chart-1)", data: MARKET_DATA.map((d) => d.retail) },
    { key: "auction", color: "var(--chart-2)", data: MARKET_DATA.map((d) => d.auction) },
    { key: "inventory", color: "var(--chart-4)", data: MARKET_DATA.map((d) => d.inventory) },
  ];

  return (
    <PageLayout>
      <section className="bg-gradient-primary text-primary-foreground py-12 md:py-16">
        <div className="container-pro">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-xs uppercase tracking-wider font-semibold">
            <BarChart3 className="h-3 w-3 text-accent" /> EVI Index
          </div>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-extrabold">{t("market.title")}</h1>
          <p className="mt-3 text-primary-foreground/80 max-w-2xl">{t("market.subtitle")}</p>
        </div>
      </section>

      <div className="container-pro py-10 grid gap-6 md:grid-cols-3">
        {cards.map((c) => {
          const delta = ((c.value - c.prev) / c.prev) * 100;
          const up = delta >= 0;
          return (
            <div key={c.key} className="bg-card border border-border rounded-lg shadow-card p-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</p>
              <p className="mt-2 font-display text-4xl font-extrabold text-foreground">{c.value.toFixed(1)}</p>
              <p className={`mt-1 text-sm font-semibold inline-flex items-center gap-1 ${up ? "text-success" : "text-destructive"}`}>
                {up ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {delta.toFixed(2)}% {lang === "fr" ? "M/M" : "M/M"}
              </p>
            </div>
          );
        })}
      </div>

      <div className="container-pro pb-16">
        <div className="bg-card border border-border rounded-lg shadow-card p-6">
          <h2 className="font-display text-lg font-bold mb-1">EVI — 12 month trend</h2>
          <p className="text-xs text-muted-foreground mb-4">Base 100 = Oct 2025</p>
          <div className="overflow-x-auto">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-72">
              {[0, 0.25, 0.5, 0.75, 1].map((p) => (
                <line key={p} x1={PAD} x2={W - PAD} y1={PAD + p * (H - PAD * 2)} y2={PAD + p * (H - PAD * 2)} stroke="var(--border)" strokeDasharray="4 4" />
              ))}
              {series.map((s) => {
                const path = s.data.map((v, i) => `${i === 0 ? "M" : "L"} ${xs[i]} ${yScale(v)}`).join(" ");
                const area = `${path} L ${xs[xs.length - 1]} ${H - PAD} L ${xs[0]} ${H - PAD} Z`;
                return (
                  <g key={s.key}>
                    <path d={area} fill={s.color} opacity="0.08" />
                    <path d={path} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                    {s.data.map((v, i) => (
                      <circle key={i} cx={xs[i]} cy={yScale(v)} r="3.5" fill={s.color} />
                    ))}
                  </g>
                );
              })}
              {MARKET_DATA.map((d, i) => (
                <text key={i} x={xs[i]} y={H - 8} textAnchor="middle" className="fill-muted-foreground" fontSize="11">{d.month}</text>
              ))}
            </svg>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            {series.map((s) => (
              <div key={s.key} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm" style={{ background: s.color }} />
                <span className="font-semibold capitalize">{t(`market.${s.key}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
