import type { ComponentType, SVGProps } from "react";
import {
  ArrowDown as PhArrowDown,
  ArrowUpRight as PhArrowUpRight,
  ArrowsClockwise,
  Check as PhCheck,
  Icon as PhosphorIcon,
  List,
  Play as PhPlay,
  Plus as PhPlus,
  X as PhX,
} from "@phosphor-icons/react";

/**
 * One place that decides how every icon on the site looks. Topic icons are the two-tone blue
 * "Plump" illustrations from Streamline (CC BY 4.0, credited in the footer); small controls
 * such as arrows and the menu stay as plain Phosphor glyphs so they follow the text colour.
 */
export type IconComponent = ComponentType<
  { size?: number | string; strokeWidth?: number } & Omit<SVGProps<SVGSVGElement>, "ref">
>;

const files = import.meta.glob("/src/assets/icons/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const topic = (file: string): IconComponent =>
  function TopicIcon({ size = 24, className, style }) {
    return (
      <img
        src={files[`/src/assets/icons/${file}.svg`]}
        width={size}
        height={size}
        alt=""
        aria-hidden="true"
        draggable={false}
        className={className}
        style={{ ...(style as object), flex: "none" }}
      />
    );
  };
const control = (Icon: PhosphorIcon): IconComponent =>
  function ControlIcon({ size = 24, strokeWidth: _stroke, ...rest }) {
    return <Icon size={size} weight="bold" {...(rest as object)} />;
  };

export const ArrowDown = control(PhArrowDown);
export const ArrowUpRight = control(PhArrowUpRight);
export const Check = control(PhCheck);
export const Menu = control(List);
export const Play = control(PhPlay);
export const Plus = control(PhPlus);
export const RefreshCw = control(ArrowsClockwise);
export const X = control(PhX);

export const Bot = topic("ai-science-robot");
export const Boxes = topic("archive-box");
export const Briefcase = topic("bag-suitcase-4");
export const Building2 = topic("building-office");
export const Code2 = topic("code-monitor-2");
export const Compass = topic("compass-navigator");
export const Cpu = topic("ai-technology-spark");
export const Factory = topic("factory-plant");
export const GraduationCap = topic("graduation-cap");
export const HeartPulse = topic("hospital-sign-square");
export const Home = topic("home-1");
export const Landmark = topic("government-building-1");
export const Layers = topic("layers-1");
export const LineChart = topic("graph-arrow-user-increase");
export const Mail = topic("mail-send-email-message");
export const MapPin = topic("location-pin");
export const Megaphone = topic("announcement-megaphone");
export const MessageCircle = topic("chat-bubble-oval-smiley-1");
export const MessageSquare = topic("chat-bubble-text-square");
export const MessageSquareText = topic("chat-two-bubbles-oval");
export const MessagesSquare = topic("chat-two-bubbles-oval");
export const Palette = topic("paint-palette");
export const Phone = topic("phone");
export const PhoneCall = topic("call-center-support-service");
export const ReceiptText = topic("receipt-cross");
export const Rocket = topic("magic-wand-1");
export const Share2 = topic("share-link");
export const ShoppingBag = topic("shopping-basket-1");
export const ShoppingCart = topic("shopping-cart-add");
export const Sparkles = topic("ai-technology-spark");
export const Store = topic("store-2");
export const Truck = topic("warehouse-1");
export const UserPlus = topic("user-multiple-accounts");
export const Vote = topic("politics-vote-2");
export const Wheat = topic("wheat");
export const Wifi = topic("wifi");
export const WifiOff = topic("cloud-off");
export const Workflow = topic("arrow-curvy-both-direction-2");
