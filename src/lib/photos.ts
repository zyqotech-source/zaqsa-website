import strategySession from "@/assets/strategy-session.jpg";
import type { ArtName } from "@/components/site/Art";
import transformationOperations from "@/assets/transformation-operations.jpg";

export type PhotoSlot =
  | "hero-team"
  | "hero-collab"
  | "hero-client"
  | "service-consulting"
  | "service-technology"
  | "service-business"
  | "service-civic"
  | "process-1"
  | "process-2"
  | "process-3"
  | "process-4"
  | "stack-team"
  | "bg-team"
  | "stat-1"
  | "stat-2"
  | "stat-3"
  | "stat-4"
  | "cta-group"
  | "contact-team"
  | "team-founder"
  | `team-${string}`;

// Files dropped into src/assets/photos are matched to slots by file name.
const uploaded = import.meta.glob("/src/assets/photos/*.{webp,jpg,jpeg,png,avif}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const byName = new Map<string, string>();
for (const [path, url] of Object.entries(uploaded)) {
  const name = path
    .split("/")
    .pop()
    ?.replace(/\.[^.]+$/, "");
  if (name) byName.set(name, url);
}

const ALT: Record<string, string> = {
  "hero-team": "Team of engineers working together at their desks",
  "hero-collab": "Colleagues collaborating over a software plan",
  "hero-client": "A client meeting where requirements are discussed face to face",
  "service-consulting": "Consultants discussing strategy with a client",
  "service-technology": "Engineers reviewing code together",
  "service-business": "Team walking through a business dashboard",
  "service-civic": "Coordinators planning a public information campaign",
  "process-1": "Team mapping goals and constraints on a whiteboard",
  "process-2": "Designers and engineers shaping a delivery roadmap",
  "process-3": "A developer reviewing code with a teammate",
  "process-4": "Client and team agreeing on the next release",
  "stack-team": "The ZYQO team working through a technical problem together",
  "bg-team": "The ZYQO team at work in the office",
  "stat-1": "A ZYQO engineer smiling at their desk",
  "stat-2": "A ZYQO engineer pairing with a colleague",
  "stat-3": "A client reviewing a finished project",
  "stat-4": "A ZYQO team member presenting to a client",
  "cta-group": "The ZYQO team standing together in the office",
  "contact-team": "Friendly ZYQO team members ready to talk about your project",
  "team-founder": "Chinmay Anand, founder and director of ZYQO",
};

// Stand-ins for large slots until real team photos are uploaded.
const FALLBACK: Partial<Record<string, { src: string; alt: string }>> = {
  "hero-team": {
    src: transformationOperations,
    alt: "A consulting team using operational data to guide transformation",
  },
  "hero-collab": {
    src: strategySession,
    alt: "Business leaders reviewing a strategy together in a New Delhi office",
  },
  "stack-team": {
    src: transformationOperations,
    alt: "A consulting team using operational data to guide transformation",
  },
  "bg-team": {
    src: strategySession,
    alt: "Business leaders reviewing a strategy together in a New Delhi office",
  },
  "cta-group": {
    src: strategySession,
    alt: "Business leaders reviewing a strategy together in a New Delhi office",
  },
  "contact-team": {
    src: transformationOperations,
    alt: "A consulting team using operational data to guide transformation",
  },
};

// Relevant illustrations for slots that have no uploaded photo yet.
const ART: Partial<Record<string, ArtName>> = {
  "process-1": "whiteboard",
  "process-2": "blueprint",
  "process-3": "code",
  "process-4": "growth",
  "hero-client": "meeting",
  "service-consulting": "icon-compass",
  "service-technology": "icon-cpu",
  "service-business": "icon-briefcase",
  "service-civic": "icon-landmark",
  "stat-1": "icon-layers",
  "stat-2": "icon-cpu",
  "stat-3": "icon-boxes",
  "stat-4": "icon-building",
};

const INITIALS: Record<string, string> = { "team-founder": "CA" };

export function getPhoto(slot: PhotoSlot): {
  src: string | undefined;
  alt: string;
  art: ArtName | undefined;
  initials: string | undefined;
} {
  const own = byName.get(slot);
  const alt = ALT[slot] ?? "A member of the ZYQO team";
  if (own) return { src: own, alt, art: undefined, initials: undefined };
  const fallback = FALLBACK[slot];
  if (fallback) return { ...fallback, art: undefined, initials: undefined };
  if (slot.startsWith("team-")) {
    return { src: undefined, alt, art: "monogram", initials: INITIALS[slot] ?? "ZQ" };
  }
  return { src: undefined, alt, art: ART[slot], initials: undefined };
}
