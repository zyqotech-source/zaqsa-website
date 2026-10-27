import { useEffect, useState } from "react";
import { Link, useLocation, useRouter } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Compass,
  GraduationCap,
  HeartPulse,
  Home,
  MessageSquare,
  RefreshCw,
  Wifi,
  WifiOff,
} from "lucide-react";
import { TechBackdrop } from "@/components/site/motion";

const POPULAR = [
  { to: "/", label: "Home", note: "Start from the beginning", Icon: Home },
  { to: "/services", label: "Services", note: "Everything we build", Icon: Compass },
  {
    to: "/services/$slug",
    slug: "hospital-management",
    label: "Hospital software",
    note: "Hospitals & clinics",
    Icon: HeartPulse,
  },
  {
    to: "/services/$slug",
    slug: "school-management",
    label: "School software",
    note: "Schools & institutes",
    Icon: GraduationCap,
  },
  { to: "/contact", label: "Contact", note: "Talk to the team", Icon: MessageSquare },
] as const;

/** 404 — also used for missing service pages. */
export function NotFoundPage({ what = "page" }: { what?: string }) {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = "Page not found | ZAQSA";
  }, []);
  return (
    <main className="err-page">
      <TechBackdrop />
      <div className="container-z err-inner">
        <p className="err-code" aria-hidden="true">
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </p>
        <p className="eyebrow err-eyebrow">Error 404</p>
        <h1 className="err-title">We couldn't find that {what}.</h1>
        <p className="err-lead">
          The link may be old, mistyped or the {what} may have moved. Here is where most people go
          next.
        </p>
        <p className="err-path" role="status">
          <span>GET</span> {pathname} <b>404 Not Found</b>
        </p>
        <ul className="err-links">
          {POPULAR.map((item) => {
            const content = (
              <>
                <span className="err-link-icon">
                  <item.Icon size={20} strokeWidth={1.7} />
                </span>
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.note}</small>
                </span>
                <ArrowUpRight size={16} />
              </>
            );
            return (
              <li key={item.label}>
                {"slug" in item ? (
                  <Link to="/services/$slug" params={{ slug: item.slug }}>
                    {content}
                  </Link>
                ) : (
                  <Link to={item.to}>{content}</Link>
                )}
              </li>
            );
          })}
        </ul>
        <button type="button" className="err-back" onClick={() => window.history.back()}>
          Go back to the previous page
        </button>
      </div>
    </main>
  );
}

const NETWORK_PATTERN =
  /failed to fetch|networkerror|network request failed|load failed|dynamically imported module|importing a module script|chunk|timeout|offline/i;

export function isNetworkError(error: unknown) {
  const message = error instanceof Error ? `${error.name} ${error.message}` : String(error);
  return NETWORK_PATTERN.test(message);
}

/** Generic runtime error, with a clearer message when the cause looks like a connection problem. */
export function ErrorPage({ error, reset }: { error: unknown; reset: () => void }) {
  const router = useRouter();
  const [online, setOnline] = useState(true);
  useEffect(() => setOnline(navigator.onLine), []);
  const network = !online || isNetworkError(error);
  useEffect(() => {
    document.title = network ? "Connection problem | ZAQSA" : "Something went wrong | ZAQSA";
  }, [network]);

  return (
    <main className="err-page">
      <TechBackdrop />
      <div className="container-z err-inner">
        <span className={`err-badge ${network ? "is-network" : ""}`}>
          {network ? (
            <WifiOff size={30} strokeWidth={1.6} />
          ) : (
            <RefreshCw size={30} strokeWidth={1.6} />
          )}
        </span>
        <p className="eyebrow err-eyebrow">
          {network ? "Connection problem" : "Something went wrong"}
        </p>
        <h1 className="err-title">
          {network ? "We couldn't reach the network." : "This page didn't load."}
        </h1>
        <p className="err-lead">
          {network
            ? "Your internet connection may have dropped, or the page could not finish downloading. Check your connection and try again — nothing you did caused this."
            : "Something broke on our side. It has been logged, and trying again usually fixes it."}
        </p>
        <div className="err-actions">
          <button
            type="button"
            className="err-primary"
            onClick={() => {
              void router.invalidate();
              reset();
            }}
          >
            <RefreshCw size={16} /> Try again
          </button>
          <button type="button" className="err-secondary" onClick={() => window.location.reload()}>
            Reload page
          </button>
          <a className="err-secondary" href="/">
            Go home
          </a>
        </div>
      </div>
      <ConnectionBanner />
    </main>
  );
}

/** A small toast that appears when the visitor goes offline and confirms when they are back. */
export function ConnectionBanner() {
  const [state, setState] = useState<"online" | "offline" | "restored">("online");

  useEffect(() => {
    if (!navigator.onLine) setState("offline");
    let timer = 0;
    const goOffline = () => {
      window.clearTimeout(timer);
      setState("offline");
    };
    const goOnline = () => {
      setState("restored");
      timer = window.setTimeout(() => setState("online"), 3500);
    };
    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, []);

  if (state === "online") return null;
  const offline = state === "offline";
  return (
    <div
      className={`conn-banner ${offline ? "is-offline" : "is-restored"}`}
      role="status"
      aria-live="polite"
    >
      {offline ? <WifiOff size={16} /> : <Wifi size={16} />}
      {offline ? "You're offline. Some pages may not load until you reconnect." : "Back online."}
    </div>
  );
}
