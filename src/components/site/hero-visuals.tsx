import type { CSSProperties } from "react";
import { Briefcase, Compass, Cpu, Landmark } from "lucide-react";

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
