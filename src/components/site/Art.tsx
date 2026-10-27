import type { ReactNode } from "react";
import {
  Boxes,
  Briefcase,
  Building2,
  Compass,
  Cpu,
  Landmark,
  Megaphone,
  Layers,
  type LucideIcon,
} from "lucide-react";

export type ArtName =
  | "whiteboard"
  | "blueprint"
  | "code"
  | "growth"
  | "meeting"
  | "icon-compass"
  | "icon-cpu"
  | "icon-briefcase"
  | "icon-landmark"
  | "icon-megaphone"
  | "icon-layers"
  | "icon-boxes"
  | "icon-building"
  | "monogram";

const INDIGO = "#4f46e5";
const SOFT = "#6366f1";
const CYAN = "#06b6d4";
const NAVY = "#1e1b4b";
const AMBER = "#fbbf24";

function Scene({ children, id }: { children: ReactNode; id: string }) {
  return (
    <svg
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e0e7ff" />
          <stop offset="1" stopColor="#cffafe" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#bg-${id})`} />
      {children}
    </svg>
  );
}

/** Diagnose: a whiteboard with sticky notes and a magnifier. */
function Whiteboard() {
  return (
    <Scene id="wb">
      <rect
        x="34"
        y="26"
        width="252"
        height="132"
        rx="10"
        fill="#fff"
        stroke="#c7d2fe"
        strokeWidth="3"
      />
      <rect x="52" y="42" width="90" height="8" rx="4" fill={NAVY} opacity=".85" />
      <rect x="52" y="58" width="56" height="6" rx="3" fill="#c7d2fe" />
      <g className="art-bob">
        <rect x="52" y="82" width="62" height="54" rx="4" fill={AMBER} />
        <rect x="60" y="94" width="40" height="5" rx="2.5" fill="#92400e" opacity=".45" />
        <rect x="60" y="106" width="30" height="5" rx="2.5" fill="#92400e" opacity=".45" />
      </g>
      <g className="art-bob art-delay">
        <rect x="128" y="76" width="62" height="54" rx="4" fill="#67e8f9" />
        <rect x="136" y="88" width="40" height="5" rx="2.5" fill={NAVY} opacity=".4" />
        <rect x="136" y="100" width="28" height="5" rx="2.5" fill={NAVY} opacity=".4" />
      </g>
      <g className="art-bob">
        <rect x="204" y="84" width="62" height="54" rx="4" fill="#a5b4fc" />
        <rect x="212" y="96" width="40" height="5" rx="2.5" fill={NAVY} opacity=".4" />
        <rect x="212" y="108" width="32" height="5" rx="2.5" fill={NAVY} opacity=".4" />
      </g>
      <path
        d="M120 64 C150 40 190 40 214 70"
        fill="none"
        stroke={INDIGO}
        strokeWidth="3"
        strokeDasharray="6 6"
      />
      <circle
        cx="252"
        cy="150"
        r="22"
        fill="#fff"
        fillOpacity=".7"
        stroke={INDIGO}
        strokeWidth="6"
      />
      <path d="M268 166 L292 190" stroke={INDIGO} strokeWidth="8" strokeLinecap="round" />
      <rect x="40" y="166" width="230" height="8" rx="4" fill="#a5b4fc" />
    </Scene>
  );
}

/** Design: a wireframe of an app on a blueprint. */
function Blueprint() {
  return (
    <Scene id="bp">
      <g stroke="#a5b4fc" strokeWidth="1" opacity=".6">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`h${i}`} x1="0" x2="320" y1={i * 25} y2={i * 25} />
        ))}
        {Array.from({ length: 14 }, (_, i) => (
          <line key={`v${i}`} y1="0" y2="200" x1={i * 25} x2={i * 25} />
        ))}
      </g>
      <rect
        x="62"
        y="30"
        width="196"
        height="140"
        rx="10"
        fill="#fff"
        stroke={INDIGO}
        strokeWidth="3"
      />
      <rect x="62" y="30" width="196" height="24" rx="10" fill={INDIGO} />
      <circle cx="78" cy="42" r="4" fill="#fff" />
      <circle cx="92" cy="42" r="4" fill="#fff" opacity=".7" />
      <rect x="76" y="68" width="48" height="88" rx="6" fill="#e0e7ff" />
      <rect x="136" y="68" width="108" height="22" rx="6" fill="#c7d2fe" />
      <rect x="136" y="100" width="50" height="56" rx="6" fill="#a5f3fc" />
      <rect x="194" y="100" width="50" height="56" rx="6" fill="#ddd6fe" />
      <path d="M262 150 L296 116" stroke={AMBER} strokeWidth="9" strokeLinecap="round" />
      <path d="M262 150 L256 164 L270 158 Z" fill={NAVY} />
      <circle
        cx="40"
        cy="160"
        r="20"
        fill="none"
        stroke={CYAN}
        strokeWidth="3"
        strokeDasharray="5 5"
      />
      <path
        d="M40 140 L40 160 L54 168"
        stroke={CYAN}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </Scene>
  );
}

/** Deliver: a code editor with a passing check. */
function Code() {
  const lines: [number, number, string][] = [
    [28, 70, SOFT],
    [52, 110, CYAN],
    [52, 86, "#a5b4fc"],
    [76, 120, INDIGO],
    [52, 96, CYAN],
    [28, 40, SOFT],
  ];
  return (
    <Scene id="cd">
      <rect x="36" y="26" width="248" height="148" rx="12" fill={NAVY} />
      <rect x="36" y="26" width="248" height="22" rx="12" fill="#312e81" />
      <circle cx="54" cy="37" r="4" fill="#f87171" />
      <circle cx="68" cy="37" r="4" fill={AMBER} />
      <circle cx="82" cy="37" r="4" fill="#34d399" />
      {lines.map(([x, w, color], index) => (
        <g key={index}>
          <text x="48" y={72 + index * 18} fontSize="9" fill="#6366f1" fontFamily="monospace">
            {index + 1}
          </text>
          <rect
            x={x + 32}
            y={64 + index * 18}
            width={w}
            height="8"
            rx="4"
            fill={color}
            className="art-line"
          />
        </g>
      ))}
      <circle cx="252" cy="140" r="26" fill="#22c55e" />
      <path
        d="M240 140 L249 150 L266 130"
        fill="none"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Scene>
  );
}

/** Evolve: growth chart with an improvement loop. */
function Growth() {
  return (
    <Scene id="gr">
      <g>
        {[34, 54, 76, 104, 138].map((h, index) => (
          <rect
            key={index}
            x={50 + index * 38}
            y={170 - h}
            width="26"
            height={h}
            rx="5"
            fill={index > 2 ? INDIGO : "#a5b4fc"}
            className="art-grow"
          />
        ))}
      </g>
      <path
        d="M44 120 C100 112 150 84 200 70 S250 40 276 32"
        fill="none"
        stroke={CYAN}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M276 32 L262 34 M276 32 L272 46"
        stroke={CYAN}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <circle
        cx="268"
        cy="62"
        r="24"
        fill="none"
        stroke={AMBER}
        strokeWidth="5"
        strokeDasharray="30 14"
        className="art-spin"
      />
      <rect x="40" y="172" width="240" height="6" rx="3" fill="#a5b4fc" />
    </Scene>
  );
}

/** A client meeting around a table with a laptop and speech bubbles. */
function Meeting() {
  const person = (cx: number, color: string, flip = false) => (
    <g transform={`translate(${cx} 0) ${flip ? "scale(-1 1) translate(-0 0)" : ""}`}>
      <circle cx="0" cy="84" r="16" fill="#fde68a" />
      <path d="M-26 128 C-26 104 26 104 26 128 L26 140 L-26 140 Z" fill={color} />
    </g>
  );
  return (
    <Scene id="mt">
      <ellipse cx="160" cy="150" rx="118" ry="30" fill="#fff" stroke="#c7d2fe" strokeWidth="3" />
      {person(78, INDIGO)}
      {person(160, CYAN)}
      {person(242, "#7c3aed")}
      <rect x="132" y="128" width="56" height="30" rx="4" fill={NAVY} />
      <rect x="138" y="133" width="44" height="20" rx="2" fill="#a5f3fc" />
      <g className="art-bob">
        <rect
          x="40"
          y="22"
          width="76"
          height="34"
          rx="12"
          fill="#fff"
          stroke="#c7d2fe"
          strokeWidth="2"
        />
        <rect x="52" y="34" width="40" height="5" rx="2.5" fill={INDIGO} />
        <rect x="52" y="44" width="26" height="5" rx="2.5" fill="#a5b4fc" />
      </g>
      <g className="art-bob art-delay">
        <rect x="200" y="14" width="80" height="34" rx="12" fill={INDIGO} />
        <rect x="212" y="26" width="46" height="5" rx="2.5" fill="#fff" />
        <rect x="212" y="36" width="30" height="5" rx="2.5" fill="#c7d2fe" />
      </g>
    </Scene>
  );
}

const ICONS: Record<string, LucideIcon> = {
  "icon-compass": Compass,
  "icon-cpu": Cpu,
  "icon-briefcase": Briefcase,
  "icon-landmark": Landmark,
  "icon-megaphone": Megaphone,
  "icon-layers": Layers,
  "icon-boxes": Boxes,
  "icon-building": Building2,
};

export function Art({ name, initials }: { name: ArtName; initials?: string }) {
  if (name === "whiteboard") return <Whiteboard />;
  if (name === "blueprint") return <Blueprint />;
  if (name === "code") return <Code />;
  if (name === "growth") return <Growth />;
  if (name === "meeting") return <Meeting />;
  if (name === "monogram") {
    return (
      <div className="art-monogram" aria-hidden="true">
        {initials ?? "ZQ"}
      </div>
    );
  }
  const Icon = ICONS[name] ?? Layers;
  return (
    <div className="art-icon" aria-hidden="true">
      <Icon strokeWidth={1.6} />
    </div>
  );
}
