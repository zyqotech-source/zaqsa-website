import type { CSSProperties } from "react";
import { Check } from "lucide-react";

const vars = (values: Record<string, string | number>) => values as CSSProperties;

/* Illustrative product previews for the three core services. They are drawn in
   code (no photos), so they stay sharp, light and easy to adjust. */

export function HealthcareVisual() {
  const rows = [
    ["AK", "09:30", "In room", "is-live"],
    ["RS", "09:45", "Waiting", ""],
    ["MP", "10:00", "Next", ""],
  ] as const;
  return (
    <div className="cv cv-health" aria-hidden="true">
      <div className="cv-bar">
        <span />
        <span />
        <span />
        <em>Clinic · Today</em>
      </div>
      <div className="cv-body">
        <ul className="cv-list">
          {rows.map(([initials, time, state, live], index) => (
            <li key={initials} style={vars({ "--i": index })}>
              <b>{initials}</b>
              <span>{time}</span>
              <i className={live}>{state}</i>
            </li>
          ))}
        </ul>
        <svg className="cv-ecg" viewBox="0 0 220 70" preserveAspectRatio="none">
          <path d="M0 38 H52 L62 38 L70 12 L80 60 L90 26 L98 38 H150 L158 38 L166 18 L174 50 L182 38 H220" />
        </svg>
        <div className="cv-stats">
          <div>
            <strong>12</strong>
            <small>Beds free</small>
          </div>
          <div>
            <strong>6</strong>
            <small>In queue</small>
          </div>
          <div>
            <strong>24</strong>
            <small>Visits</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HotelVisual() {
  const rooms = [
    ["101", 0, 3],
    ["102", 2, 4],
    ["103", 1, 2],
    ["104", 4, 3],
    ["105", 0, 5],
  ] as const;
  return (
    <div className="cv cv-hotel" aria-hidden="true">
      <div className="cv-bar">
        <span />
        <span />
        <span />
        <em>Bookings · This week</em>
      </div>
      <div className="cv-body">
        <div className="cv-days">
          {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
            <span key={index}>{day}</span>
          ))}
        </div>
        <div className="cv-grid">
          {rooms.map(([room, start, span], index) => (
            <div className="cv-row" key={room}>
              <small>{room}</small>
              <div className="cv-track">
                <i
                  style={vars({
                    "--start": start,
                    "--span": span,
                    "--i": index,
                  })}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="cv-stats">
          <div>
            <strong>82%</strong>
            <small>Occupancy</small>
          </div>
          <div>
            <strong>5</strong>
            <small>Check-ins</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SchoolVisual() {
  const students = ["Aanya", "Ravi", "Meera", "Kabir"];
  return (
    <div className="cv cv-school" aria-hidden="true">
      <div className="cv-bar">
        <span />
        <span />
        <span />
        <em>Class 7A · Attendance</em>
      </div>
      <div className="cv-body">
        <ul className="cv-attendance">
          {students.map((name, index) => (
            <li key={name} style={vars({ "--i": index })}>
              <span>{name}</span>
              <Check size={14} strokeWidth={3} />
            </li>
          ))}
        </ul>
        <div className="cv-marks">
          {[62, 84, 70, 92, 78].map((height, index) => (
            <i key={index} style={vars({ "--h": `${height}%`, "--i": index })} />
          ))}
        </div>
        <div className="cv-stats">
          <div>
            <strong>96%</strong>
            <small>Present</small>
          </div>
          <div>
            <strong>8</strong>
            <small>Fees pending</small>
          </div>
        </div>
      </div>
    </div>
  );
}
