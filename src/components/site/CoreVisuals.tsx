import type { CSSProperties } from "react";
import { Check, Play } from "lucide-react";

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

export function ElectionVisual() {
  const events = [
    ["Sat", "Ward rally", "is-live"],
    ["Sun", "Volunteer meet", ""],
    ["Tue", "Door-to-door", ""],
  ] as const;
  return (
    <div className="cv cv-election" aria-hidden="true">
      <div className="cv-bar">
        <span />
        <span />
        <span />
        <em>Campaign · This week</em>
      </div>
      <div className="cv-body">
        <ul className="cv-list">
          {events.map(([day, name, live], index) => (
            <li key={name} style={vars({ "--i": index })}>
              <b>{day}</b>
              <span>{name}</span>
              <i className={live}>{live ? "Today" : "Planned"}</i>
            </li>
          ))}
        </ul>
        <div className="cv-marks">
          {[40, 58, 52, 74, 88, 96].map((height, index) => (
            <i key={index} style={vars({ "--h": `${height}%`, "--i": index })} />
          ))}
        </div>
        <div className="cv-stats">
          <div>
            <strong>248</strong>
            <small>Volunteers</small>
          </div>
          <div>
            <strong>6</strong>
            <small>Events</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WebAppVisual() {
  return (
    <div className="cv cv-web" aria-hidden="true">
      <div className="cv-bar">
        <span />
        <span />
        <span />
        <em>yourbusiness.in</em>
      </div>
      <div className="cv-body">
        <div className="cv-hero-block">
          <i />
          <i />
          <b />
        </div>
        <div className="cv-tiles">
          {[0, 1, 2].map((index) => (
            <span key={index} style={vars({ "--i": index })} />
          ))}
        </div>
        <div className="cv-phone">
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}

export function SmallBusinessVisual() {
  const lines = [
    ["Item A", "₹1,200"],
    ["Item B", "₹850"],
    ["Item C", "₹2,400"],
  ] as const;
  return (
    <div className="cv cv-shop" aria-hidden="true">
      <div className="cv-bar">
        <span />
        <span />
        <span />
        <em>Invoice #1042</em>
      </div>
      <div className="cv-body">
        <ul className="cv-invoice">
          {lines.map(([name, price], index) => (
            <li key={name} style={vars({ "--i": index })}>
              <span>{name}</span>
              <b>{price}</b>
            </li>
          ))}
          <li className="is-total">
            <span>Total</span>
            <b>₹4,450</b>
          </li>
        </ul>
        <div className="cv-marks">
          {[80, 62, 44, 70, 30].map((height, index) => (
            <i key={index} style={vars({ "--h": `${height}%`, "--i": index })} />
          ))}
        </div>
        <div className="cv-stats">
          <div>
            <strong>3</strong>
            <small>Low stock</small>
          </div>
          <div>
            <strong>12</strong>
            <small>Follow-ups</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SocialVisual() {
  return (
    <div className="cv cv-social" aria-hidden="true">
      <div className="cv-bar">
        <span />
        <span />
        <span />
        <em>Content calendar</em>
      </div>
      <div className="cv-body">
        <div className="cv-posts">
          {Array.from({ length: 6 }, (_, index) => (
            <span
              key={index}
              className={index === 1 ? "is-reel" : ""}
              style={vars({ "--i": index })}
            >
              {index === 1 ? <Play size={16} fill="currentColor" /> : null}
            </span>
          ))}
        </div>
        <div className="cv-stats">
          <div>
            <strong>24</strong>
            <small>Posts / month</small>
          </div>
          <div>
            <strong>8</strong>
            <small>Reels</small>
          </div>
        </div>
      </div>
    </div>
  );
}
