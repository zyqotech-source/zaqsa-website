import type { CSSProperties } from "react";
import {
  Briefcase,
  Building2,
  Compass,
  Cpu,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  Rocket,
  ShoppingBag,
  ShoppingCart,
  Store,
  Truck,
  Wheat,
} from "lucide-react";

const vars = (values: Record<string, string | number>) => values as CSSProperties;

/** Services: four service families orbiting the ZYQO core. */
export function ServicesVisual() {
  const families = [
    ["Consulting", Compass],
    ["Technology", Cpu],
    ["Business", Briefcase],
    ["Civic", Landmark],
  ] as const;
  return (
    <div className="hv hv-orbit" aria-hidden="true">
      <span className="hv-orbit-track" />
      <span className="hv-orbit-track hv-orbit-track-inner" />
      <span className="hv-core">ZYQO</span>
      <div className="hv-orbit-ring">
        {families.map(([label, Icon], index) => (
          <span key={label} className="hv-sat" style={vars({ "--a": `${index * 90}deg` })}>
            <span className="hv-sat-inner">
              <Icon size={15} />
              {label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Technology: a request travelling down the layers of a stack. */
export function TechnologyVisual() {
  const layers = ["Interface", "API & logic", "Data", "Cloud"];
  return (
    <div className="hv hv-stack" aria-hidden="true">
      {layers.map((layer, index) => (
        <div key={layer} className="hv-layer" style={vars({ "--i": index })}>
          <span>{layer}</span>
          <i />
        </div>
      ))}
      <span className="hv-packet" />
    </div>
  );
}

/** Business: a lead moving through the daily workflow, with a live report. */
export function BusinessVisual() {
  const steps = ["Lead captured", "Follow-up", "Invoice sent", "Report ready"];
  return (
    <div className="hv hv-flow" aria-hidden="true">
      <ol>
        {steps.map((step, index) => (
          <li key={step} style={vars({ "--i": index })}>
            <b>{String(index + 1).padStart(2, "0")}</b>
            {step}
          </li>
        ))}
      </ol>
      <div className="hv-bars">
        {[38, 62, 48, 80, 66, 94].map((height, index) => (
          <span key={index} style={vars({ "--h": `${height}%`, "--i": index })} />
        ))}
      </div>
    </div>
  );
}

/** Solutions: a path from idea to launch with a marker travelling along it. */
export function SolutionsVisual() {
  const stops = [
    ["Discover", 8, 78],
    ["Plan", 30, 34],
    ["Build", 52, 70],
    ["Deploy", 74, 28],
    ["Evolve", 94, 52],
  ] as const;
  return (
    <div className="hv hv-path" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          className="hv-path-line"
          d="M8 78 C 18 78, 20 34, 30 34 S 42 70, 52 70 S 64 28, 74 28 S 86 52, 94 52"
        />
        <circle r="2.6" className="hv-traveller">
          <animateMotion
            dur="5s"
            repeatCount="indefinite"
            keyPoints="0;1"
            keyTimes="0;1"
            calcMode="spline"
            keySplines="0.45 0 0.55 1"
            path="M8 78 C 18 78, 20 34, 30 34 S 42 70, 52 70 S 64 28, 74 28 S 86 52, 94 52"
          />
        </circle>
      </svg>
      {stops.map(([label, x, y], index) => (
        <span
          key={label}
          className="hv-stop"
          style={vars({ left: `${x}%`, top: `${y}%`, "--i": index })}
        >
          <i />
          {label}
        </span>
      ))}
    </div>
  );
}

/** Industries: tiles lighting up in sequence. */
export function IndustriesVisual() {
  const tiles = [
    [Wheat, "Agri"],
    [HeartPulse, "Health"],
    [GraduationCap, "Edu"],
    [Landmark, "Finance"],
    [Store, "Retail"],
    [ShoppingCart, "Commerce"],
    [Truck, "Logistics"],
    [Factory, "Factory"],
    [Building2, "Property"],
    [Briefcase, "Services"],
    [Rocket, "Startups"],
    [ShoppingBag, "SMB"],
  ] as const;
  return (
    <div className="hv hv-tiles" aria-hidden="true">
      {tiles.map(([Icon, label], index) => (
        <span key={label} className="hv-tile" style={vars({ "--i": index })}>
          <Icon size={20} strokeWidth={1.6} />
          <small>{label}</small>
        </span>
      ))}
    </div>
  );
}

/** Lab: a radar sweeping over experiments. */
export function LabVisual() {
  const blips = [
    ["AI", 30, 28],
    ["IoT", 68, 38],
    ["Data", 42, 70],
    ["Robotics", 74, 72],
  ] as const;
  return (
    <div className="hv hv-radar" aria-hidden="true">
      <span className="hv-radar-ring" />
      <span className="hv-radar-ring hv-radar-ring-2" />
      <span className="hv-radar-ring hv-radar-ring-3" />
      <span className="hv-radar-sweep" />
      {blips.map(([label, x, y], index) => (
        <span
          key={label}
          className="hv-blip"
          style={vars({ left: `${x}%`, top: `${y}%`, "--i": index })}
        >
          <i />
          {label}
        </span>
      ))}
    </div>
  );
}

/** About: five steps rising from idea to ecosystem. */
export function AboutVisual() {
  const steps = ["Idea", "Prototype", "Product", "Platform", "Ecosystem"];
  return (
    <div className="hv hv-steps" aria-hidden="true">
      {steps.map((step, index) => (
        <span key={step} className="hv-step" style={vars({ "--i": index })}>
          <em>{step}</em>
        </span>
      ))}
    </div>
  );
}

/** Contact: a conversation starting. */
export function ContactVisual() {
  return (
    <div className="hv hv-chat" aria-hidden="true">
      <p className="hv-bubble hv-bubble-you">I have an idea for an app…</p>
      <p className="hv-bubble hv-bubble-typing">
        <i />
        <i />
        <i />
      </p>
      <p className="hv-bubble hv-bubble-us">Tell us more. Let’s build it together.</p>
    </div>
  );
}
