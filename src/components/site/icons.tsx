import type { ComponentType, SVGProps } from "react";
import {
  ArrowDown as PhArrowDown,
  ArrowUpRight as PhArrowUpRight,
  ArrowsClockwise,
  Bank,
  Briefcase as PhBriefcase,
  Buildings,
  ChartLineUp,
  ChatCenteredDots,
  ChatCircle,
  ChatText,
  Chats,
  Check as PhCheck,
  Code,
  Compass as PhCompass,
  Cpu as PhCpu,
  Cube,
  EnvelopeSimple,
  Factory as PhFactory,
  Flag,
  GraduationCap as PhGraduationCap,
  Heartbeat,
  House,
  Icon as PhosphorIcon,
  List,
  MapPin as PhMapPin,
  Megaphone as PhMegaphone,
  Palette as PhPalette,
  Phone as PhPhone,
  PhoneCall as PhPhoneCall,
  Plant,
  Play as PhPlay,
  Plus as PhPlus,
  Receipt,
  Robot,
  RocketLaunch,
  ShareNetwork,
  ShoppingBag as PhShoppingBag,
  ShoppingCart as PhShoppingCart,
  Sparkle,
  Stack,
  Storefront,
  TreeStructure,
  Truck as PhTruck,
  UserPlus as PhUserPlus,
  WifiHigh,
  WifiSlash,
  X as PhX,
} from "@phosphor-icons/react";

/**
 * One place that decides how every icon on the site looks: Phosphor, duotone for feature
 * icons and bold for small controls. Components keep the size / className props they used.
 */
export type IconComponent = ComponentType<
  { size?: number | string; strokeWidth?: number } & Omit<SVGProps<SVGSVGElement>, "ref">
>;

const feature = (Icon: PhosphorIcon): IconComponent =>
  function FeatureIcon({ size = 24, strokeWidth: _stroke, ...rest }) {
    return <Icon size={size} weight="duotone" {...(rest as object)} />;
  };
const control = (Icon: PhosphorIcon): IconComponent =>
  function ControlIcon({ size = 24, strokeWidth: _stroke, ...rest }) {
    return <Icon size={size} weight="bold" {...(rest as object)} />;
  };

export const ArrowDown = control(PhArrowDown);
export const ArrowUpRight = control(PhArrowUpRight);
export const Bot = feature(Robot);
export const Boxes = feature(Cube);
export const Briefcase = feature(PhBriefcase);
export const Building2 = feature(Buildings);
export const Check = control(PhCheck);
export const Code2 = feature(Code);
export const Compass = feature(PhCompass);
export const Cpu = feature(PhCpu);
export const Factory = feature(PhFactory);
export const GraduationCap = feature(PhGraduationCap);
export const HeartPulse = feature(Heartbeat);
export const Home = feature(House);
export const Landmark = feature(Bank);
export const Layers = feature(Stack);
export const LineChart = feature(ChartLineUp);
export const Mail = feature(EnvelopeSimple);
export const MapPin = feature(PhMapPin);
export const Megaphone = feature(PhMegaphone);
export const Menu = control(List);
export const MessageCircle = feature(ChatCircle);
export const MessageSquare = feature(ChatText);
export const MessageSquareText = feature(ChatCenteredDots);
export const MessagesSquare = feature(Chats);
export const Palette = feature(PhPalette);
export const Phone = feature(PhPhone);
export const PhoneCall = feature(PhPhoneCall);
export const Play = control(PhPlay);
export const Plus = control(PhPlus);
export const ReceiptText = feature(Receipt);
export const RefreshCw = control(ArrowsClockwise);
export const Rocket = feature(RocketLaunch);
export const Share2 = feature(ShareNetwork);
export const ShoppingBag = feature(PhShoppingBag);
export const ShoppingCart = feature(PhShoppingCart);
export const Sparkles = feature(Sparkle);
export const Store = feature(Storefront);
export const Truck = feature(PhTruck);
export const UserPlus = feature(PhUserPlus);
export const Vote = feature(Flag);
export const Wheat = feature(Plant);
export const Wifi = feature(WifiHigh);
export const WifiOff = feature(WifiSlash);
export const Workflow = feature(TreeStructure);
export const X = control(PhX);
