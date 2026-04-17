import type { ReactNode } from "react";

const ICONS: Record<string, ReactNode> = {
  tractors: (
    <g>
      <circle cx="7" cy="17" r="3" />
      <circle cx="17" cy="17" r="2" />
      <path d="M3 13l2-7h6l2 5h6l1 4" />
      <path d="M13 11h5" />
    </g>
  ),
  excavators: (
    <g>
      <circle cx="8" cy="18" r="2" />
      <circle cx="14" cy="18" r="2" />
      <path d="M3 18h2M11 18h2M16 18h5" />
      <path d="M5 16V11h7l2 3h3v2" />
      <path d="M12 11l3-7 4 1-2 5" />
    </g>
  ),
  harvesters: (
    <g>
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
      <path d="M3 18h2M9 18h6M19 18h2" />
      <path d="M4 16V9h10l3 4v3" />
      <path d="M6 9V6h6v3" />
    </g>
  ),
  "skid-steers": (
    <g>
      <circle cx="7" cy="17" r="2.5" />
      <circle cx="16" cy="17" r="2.5" />
      <path d="M4 17h0M9 17h5M19 17h0" />
      <path d="M5 14V9h11v5" />
      <path d="M16 12l5-1v3l-5 1" />
    </g>
  ),
  "wheel-loaders": (
    <g>
      <circle cx="7" cy="17" r="2.5" />
      <circle cx="16" cy="17" r="2.5" />
      <path d="M4 17h0M9 17h5" />
      <path d="M5 14V8h7v6" />
      <path d="M12 14h8v-2l-5-2" />
    </g>
  ),
  dozers: (
    <g>
      <path d="M3 17h16v-3H5z" />
      <path d="M5 14V9h11v5" />
      <path d="M19 17V8" />
      <path d="M19 8h-2" />
    </g>
  ),
  cranes: (
    <g>
      <path d="M4 20h16" />
      <path d="M8 20v-6h6v6" />
      <path d="M11 14V4l9 4" />
      <path d="M11 8h6" />
    </g>
  ),
  "motor-graders": (
    <g>
      <circle cx="6" cy="17" r="2" />
      <circle cx="18" cy="17" r="2" />
      <path d="M3 17h1M8 17h8M20 17h1" />
      <path d="M5 17l4-7h6l4 7" />
    </g>
  ),
  "loader-backhoes": (
    <g>
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M4 17h1M9 17h6M19 17h1" />
      <path d="M5 14V9h8v5M13 12l5-3 2 4-3 2" />
    </g>
  ),
  "sleeper-trucks": (
    <g>
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M3 17h2M9 17h6M19 17h2" />
      <path d="M3 17V9h11v8" />
      <path d="M14 12h5l2 3v2" />
    </g>
  ),
  "day-cab": (
    <g>
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M3 17h2M9 17h6M19 17h2" />
      <path d="M3 17v-5h7v5" />
      <path d="M10 14h6l3 3v0" />
    </g>
  ),
  "dump-trucks": (
    <g>
      <circle cx="7" cy="17" r="2" />
      <circle cx="14" cy="17" r="2" />
      <circle cx="18" cy="17" r="2" />
      <path d="M3 17h2M9 17h3M16 17h0M20 17h1" />
      <path d="M3 17V9h7l2 4h9v4" />
    </g>
  ),
  "box-trucks": (
    <g>
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M3 17h2M9 17h6M19 17h2" />
      <path d="M3 17V8h13v9" />
      <path d="M16 13h5l1 4" />
    </g>
  ),
  "tow-trucks": (
    <g>
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M3 17h2M9 17h6M19 17h2" />
      <path d="M3 17v-6h7v6" />
      <path d="M10 13l9-5 2 3-9 5" />
    </g>
  ),
  "tank-trucks": (
    <g>
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M3 17h2M9 17h6M19 17h2" />
      <path d="M3 17v-5h6v5" />
      <ellipse cx="15" cy="13" rx="6" ry="3" />
    </g>
  ),
  "hay-forage": (
    <g>
      <circle cx="8" cy="17" r="3" />
      <circle cx="17" cy="17" r="2" />
      <path d="M11 17h4M19 17h2" />
      <path d="M3 16l4-8h7l3 5h4" />
    </g>
  ),
  tillage: (
    <g>
      <path d="M3 14h18" />
      <path d="M5 14v6M9 14v6M13 14v6M17 14v6" />
      <path d="M3 14l3-6h12l3 6" />
    </g>
  ),
  planting: (
    <g>
      <path d="M3 16h18" />
      <path d="M6 16v3M10 16v3M14 16v3M18 16v3" />
      <path d="M5 16V9h14v7" />
      <circle cx="6" cy="22" r="1" />
      <circle cx="10" cy="22" r="1" />
      <circle cx="14" cy="22" r="1" />
      <circle cx="18" cy="22" r="1" />
    </g>
  ),
  "lawn-mowers": (
    <g>
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M5 17h0M9 17h6M19 17h0" />
      <path d="M5 14V9h12v5" />
      <path d="M9 9V6h4v3" />
    </g>
  ),
  chemical: (
    <g>
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M3 17h2M9 17h6M19 17h2" />
      <path d="M5 14V8h12v6" />
      <path d="M9 8V5h4v3" />
      <path d="M3 14h18" />
    </g>
  ),
};

export function CategoryIcon({ slug, className }: { slug: string; className?: string }) {
  const paths = ICONS[slug] ?? ICONS.tractors;
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths}
    </svg>
  );
}
