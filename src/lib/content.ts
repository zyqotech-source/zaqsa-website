import agricultureImg from "@/assets/industries/agriculture.jpg";
import healthcareImg from "@/assets/industries/healthcare.jpg";
import educationImg from "@/assets/industries/education.jpg";
import financeImg from "@/assets/industries/finance.jpg";
import retailImg from "@/assets/industries/retail.jpg";
import ecommerceImg from "@/assets/industries/ecommerce.jpg";
import logisticsImg from "@/assets/industries/logistics.jpg";
import manufacturingImg from "@/assets/industries/manufacturing.jpg";
import realEstateImg from "@/assets/industries/real-estate.jpg";
import professionalServicesImg from "@/assets/industries/professional-services.jpg";
import startupsImg from "@/assets/industries/startups.jpg";
import smallBusinessImg from "@/assets/industries/small-business.jpg";
import technologyBusinessImg from "@/assets/industries/technology-business.jpg";

export const COMPANY = {
  name: "ZYQO",
  founder: "Chinmay Anand",
  role: "Founder & Director",
  address: "Mahavir Enclave, New Delhi – 110045, India",
  email: "zyqotech@gmail.com",
  phone: "+91 9570752983",
  tagline: "Business intelligence. Technology execution. Measurable progress.",
  support: "Strategy, technology and operations — connected by one accountable team.",
};

export const CONSULTING_PILLARS = [
  {
    number: "01",
    title: "Business strategy",
    blurb:
      "Turn market signals, operational realities and leadership priorities into a focused roadmap.",
  },
  {
    number: "02",
    title: "Digital transformation",
    blurb:
      "Modernise workflows and customer journeys without disrupting the business that already works.",
  },
  {
    number: "03",
    title: "AI & data advisory",
    blurb:
      "Move from scattered data and AI experiments to useful systems with clear governance and value.",
  },
  {
    number: "04",
    title: "Technology execution",
    blurb:
      "Design and deliver the software, platforms and infrastructure required to make the strategy real.",
  },
] as const;

export const ENGAGEMENT_STEPS = [
  {
    number: "01",
    title: "Diagnose",
    blurb: "We map goals, constraints, customers, systems and the decisions that matter most.",
  },
  {
    number: "02",
    title: "Design",
    blurb: "We shape the business case, future operating model and practical delivery roadmap.",
  },
  {
    number: "03",
    title: "Deliver",
    blurb: "Our strategists and builders work together through focused, measurable releases.",
  },
  {
    number: "04",
    title: "Evolve",
    blurb: "We measure adoption, strengthen capability and identify the next advantage.",
  },
] as const;

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/technology", label: "Technology" },
  { to: "/business", label: "Business" },
  { to: "/solutions", label: "Solutions" },
  { to: "/industries", label: "Industries" },
  { to: "/lab", label: "Lab" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export type Group = { id: string; title: string; blurb: string; items: string[] };

export const TECHNOLOGY: Group[] = [
  {
    id: "ai",
    title: "AI",
    blurb: "Intelligence that fits real workflows.",
    items: [
      "Artificial Intelligence",
      "Machine Learning",
      "Generative AI",
      "AI Assistants",
      "AI Chatbots",
      "AI Applications",
      "AI Integration",
      "AI APIs",
      "AI Agents",
      "NLP",
      "Speech Processing",
      "Computer Vision",
      "Recommendation Systems",
      "Predictive Systems",
      "AI Workflow Automation",
    ],
  },
  {
    id: "data",
    title: "Data",
    blurb: "Turning records into decisions.",
    items: [
      "Data Analytics",
      "Business Intelligence",
      "Data Visualization",
      "Data Cleaning",
      "Data Processing",
      "Data Integration",
      "Database Development",
      "Data Pipelines",
      "Reporting Systems",
      "Dashboards",
      "Predictive Analytics",
      "Decision Support",
    ],
  },
  {
    id: "software",
    title: "Software",
    blurb: "Custom systems, built to last.",
    items: [
      "Custom Software",
      "Business Software",
      "Enterprise Applications",
      "Web Applications",
      "Desktop Applications",
      "Backend Systems",
      "APIs",
      "Full-Stack Development",
      "Database Systems",
      "SaaS Development",
      "Software Testing",
      "QA",
      "Maintenance",
      "Performance Optimization",
    ],
  },
  {
    id: "web",
    title: "Web",
    blurb: "Websites that work as hard as you do.",
    items: [
      "Business Websites",
      "Corporate Websites",
      "Portfolio Websites",
      "E-commerce Websites",
      "Landing Pages",
      "Responsive Websites",
      "Web Applications",
      "PWAs",
      "CMS Websites",
      "Custom Web Platforms",
      "Website Maintenance",
    ],
  },
  {
    id: "mobile",
    title: "Mobile",
    blurb: "Apps people actually open.",
    items: [
      "Android",
      "iOS",
      "Cross-platform Applications",
      "Business Apps",
      "Customer Apps",
      "Management Apps",
      "API Integration",
      "Mobile Backend",
      "Notifications",
      "Authentication",
      "App Maintenance",
    ],
  },
  {
    id: "cloud",
    title: "Cloud",
    blurb: "Reliable foundations, quietly running.",
    items: [
      "Cloud Deployment",
      "Hosting Setup",
      "Cloud Migration",
      "Application Deployment",
      "Server Management",
      "CI/CD",
      "DevOps",
      "Containers",
      "Backup Systems",
      "Monitoring",
      "Performance Optimization",
      "Infrastructure Automation",
    ],
  },
  {
    id: "it",
    title: "IT / Networking",
    blurb: "Everyday infrastructure, handled.",
    items: [
      "Network Setup",
      "Wi-Fi Solutions",
      "Network Management",
      "Server Setup",
      "Local Infrastructure",
      "IT Support",
      "System Administration",
      "Backup Solutions",
      "Remote Support",
      "Device Management",
      "Troubleshooting",
    ],
  },
  {
    id: "iot",
    title: "IoT",
    blurb: "Connecting the physical world.",
    items: [
      "IoT Solutions",
      "Sensors",
      "Smart Monitoring",
      "Device Connectivity",
      "ESP32 / Embedded Applications",
      "Data Collection",
      "IoT Dashboards",
      "Device Management",
      "Practical Automation",
    ],
  },
];

export const BUSINESS: Group[] = [
  {
    id: "core",
    title: "Business Solutions",
    blurb: "The operating system of a growing business.",
    items: [
      "Business Management Software",
      "CRM",
      "Lead Management",
      "Customer Management",
      "Inventory Management",
      "Billing",
      "Invoice Management",
      "Employee Management",
      "Attendance",
      "Workflow Management",
      "Digital Records",
      "Reporting",
      "Business Dashboards",
      "Communication Systems",
      "Process Automation",
      "Digital Transformation",
    ],
  },
  {
    id: "crm",
    title: "CRM",
    blurb: "Every customer, every follow-up, in one place.",
    items: [
      "CRM Systems",
      "Lead Tracking",
      "Customer Records",
      "Follow-up Management",
      "Sales Pipeline",
      "Customer Communication",
      "Support Requests",
      "Service Tickets",
      "Notifications",
      "Customer Dashboards",
      "Reports",
      "Business Analytics",
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    blurb: "From catalogue to doorstep.",
    items: [
      "E-commerce Website Development",
      "Product Catalogues",
      "Shopping Cart",
      "Checkout",
      "Payment Gateway Integration",
      "Order Management",
      "Inventory Integration",
      "Customer Accounts",
      "Admin Dashboards",
      "Product Management",
      "Delivery / Order Tracking Integration",
      "Notifications",
      "E-commerce Analytics",
    ],
  },
  {
    id: "hr",
    title: "HR & Employees",
    blurb: "Simpler days for the people who run things.",
    items: [
      "Employee Records",
      "Attendance",
      "Leave Management",
      "Staff Management",
      "Employee Dashboards",
      "Document Management",
      "Internal Communication",
      "Task Management",
      "Payroll Data Integration",
      "Reports",
      "Administrative Workflows",
    ],
  },
  {
    id: "inventory",
    title: "Inventory & Operations",
    blurb: "Know what you have, and where.",
    items: [
      "Inventory Management",
      "Stock Tracking",
      "Product Records",
      "Purchase Records",
      "Sales Records",
      "Supplier Records",
      "Order Management",
      "Warehouse Records",
      "Stock Alerts",
      "Reports",
      "Dashboards",
      "Operational Automation",
    ],
  },
  {
    id: "education",
    title: "Education Management",
    blurb: "Schools, institutes, coaching and libraries.",
    items: [
      "School Management",
      "College / Institute Management",
      "Coaching Management",
      "Student Management",
      "Staff Management",
      "Attendance",
      "Fees & Fee Tracking",
      "Student Records",
      "Staff Records",
      "Examination Records",
      "Library Management",
      "Book Issue / Return",
      "Member Management",
      "Notifications",
      "Communication",
      "Reports",
      "Dashboards",
      "Administrative Workflows",
    ],
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    blurb: "Clear stories, told consistently.",
    items: [
      "Digital Marketing",
      "Social Media Management",
      "Social Media Strategy",
      "Content Planning",
      "Content Creation",
      "Graphic Design",
      "Poster Design",
      "Video Editing",
      "Reels / Short Videos",
      "Content Calendars",
      "Digital Branding",
      "SEO",
      "Local SEO",
      "Search Visibility",
      "Social Media Optimization",
      "Online Advertising",
      "Campaign Management",
      "Analytics",
      "Reporting",
      "Digital Communication",
    ],
  },
  {
    id: "docs",
    title: "Documents & Workflow",
    blurb: "Paperwork, made digital and searchable.",
    items: [
      "Digital Records",
      "Document Management",
      "File Organization",
      "Approval Workflows",
      "Task Management",
      "Notifications",
      "Internal Processes",
      "Digital Forms",
      "Reports",
      "Search",
      "Role-based Access",
      "Workflow Automation",
    ],
  },
];

export const CONSULTING = [
  "Technology Consulting",
  "Business Consulting",
  "Digital Transformation",
  "Requirement Analysis",
  "Software Planning",
  "Product Planning",
  "Process Improvement",
  "Technology Strategy",
  "Digital Strategy",
  "Automation Consulting",
  "Data Strategy",
  "Technology Roadmapping",
];

export const CIVIC = [
  "Election Information Systems",
  "Public Information Websites",
  "Administrative Dashboards",
  "Event Coordination",
  "Volunteer Coordination",
  "Area / Booth Records",
  "Election-Day Information Systems",
  "Reporting",
  "Survey / Feedback Systems",
  "Public Communication",
  "Media Coordination",
  "Content Management",
  "Digital Presence",
  "Analytics",
  "Documentation Support",
  "Operations Planning",
  "Crisis Communication Workflows",
  "Civic Engagement Platforms",
];

export const PRODUCTS = [
  "AI Products",
  "SaaS",
  "Business Platforms",
  "CRM",
  "Education Platforms",
  "Management Software",
  "Dashboards",
  "Automation Tools",
  "Data Platforms",
  "Customer Platforms",
  "Internal Business Tools",
];

export const LAB = [
  "AI Experiments",
  "Software Prototypes",
  "Automation Experiments",
  "IoT Prototypes",
  "Data Experiments",
  "Interface Experiments",
  "New Product Ideas",
  "Business Technology Experiments",
  "Emerging Technology Research",
];

export const FUTURE = [
  "Quantum Computing",
  "Robotics",
  "AR / VR / XR",
  "Spatial Computing",
  "Neuromorphic Computing",
  "Other Emerging Technologies",
];

export type Service = Group & {
  category: "Industry" | "Technology" | "Business" | "Consulting" | "Civic";
  intro: string;
  outcomes: string[];
  detail: ServiceDetail;
};

const CONSULTING_GROUP: Group = {
  id: "consulting",
  title: "Consulting & Strategy",
  blurb: "Clarity before commitment.",
  items: CONSULTING,
};

export const ELECTION_CAMPAIGN: Group = {
  id: "election-campaign",
  title: "Election Campaign Services",
  blurb: "Organised, transparent and compliant campaign operations.",
  items: [
    "Campaign Websites",
    "Candidate Profile Pages",
    "Campaign Operations Planning",
    "Volunteer Management",
    "Event & Rally Coordination",
    "Booth / Area Records",
    "Election-Day Information Systems",
    "Campaign Dashboards",
    "Social Media Management",
    "Content Calendars",
    "Poster & Graphic Design",
    "Video Editing & Reels",
    "Press & Media Coordination",
    "Public Communication",
    "Survey & Feedback Systems",
    "Analytics & Reporting",
    "Documentation Support",
    "Crisis Communication Workflows",
  ],
};


/** The three flagship, industry-specific products. Shown first and highlighted across the site. */
export const INDUSTRY_SOLUTIONS: Group[] = [
  {
    id: "healthcare",
    title: "Healthcare Management Software",
    blurb: "Calmer clinics, faster front desks, records that stay organised.",
    items: [
      "Appointment & Queue Management",
      "Patient Records & Visit History",
      "Doctor & Staff Scheduling",
      "Prescriptions & Follow-up Reminders",
      "Pharmacy & Lab Inventory",
      "Billing, Invoices & Insurance Tracking",
      "Patient Reminders (SMS, WhatsApp, Email)",
      "Teleconsultation Integration",
      "Clinic & Hospital Dashboards",
      "Role-based Access & Audit Trails",
    ],
  },
  {
    id: "hotel-management",
    title: "Hotel Management Software",
    blurb: "Every room, booking and guest in one calm control room.",
    items: [
      "Room Inventory & Availability Calendar",
      "Reservations & Direct Booking Website",
      "Front Desk Check-in / Check-out",
      "Housekeeping & Maintenance Tasks",
      "Channel Manager & OTA Integration",
      "Billing, Guest Folios & Invoices",
      "Restaurant & Room-service Orders",
      "Guest Profiles & Feedback",
      "Staff Rostering",
      "Occupancy & Revenue Reports",
    ],
  },
  {
    id: "school-management",
    title: "School Management Software",
    blurb: "From admission to report card, one system for the whole school.",
    items: [
      "Admissions & Enquiry Tracking",
      "Student & Parent Records",
      "Attendance for Students & Staff",
      "Fee Collection, Receipts & Reminders",
      "Timetable & Substitution Planning",
      "Exams, Marks & Report Cards",
      "Parent Communication & Notices",
      "Teacher & Staff Portal",
      "Library & Transport Records",
      "Principal Dashboards & Reports",
    ],
  },
];

/** Presentation copy for the pinned "core solutions" showcase on the home page. */
export const CORE_SERVICES = [
  {
    id: "healthcare",
    number: "01",
    label: "Healthcare management",
    title: "Hospitals & clinics",
    blurb:
      "Appointments, patient records, billing and pharmacy in one calm system — so doctors spend time on patients, not paperwork.",
    builtFor: ["Clinics", "Hospitals", "Diagnostic labs"],
    features: ["Appointments & queues", "Patient records", "Billing & insurance", "Pharmacy & lab stock"],
  },
  {
    id: "hotel-management",
    number: "02",
    label: "Hotel management",
    title: "Hotels & guest houses",
    blurb:
      "Room inventory, bookings, front desk and housekeeping live in one control room — fewer double bookings, happier guests.",
    builtFor: ["Hotels", "Resorts", "Guest houses"],
    features: ["Bookings & availability", "Front desk", "Housekeeping", "Revenue reports"],
  },
  {
    id: "school-management",
    number: "03",
    label: "School management",
    title: "Schools & institutes",
    blurb:
      "Admissions, attendance, fees, exams and parent communication from one dashboard — less chasing, more teaching.",
    builtFor: ["Schools", "Coaching institutes", "Colleges"],
    features: ["Admissions", "Attendance & timetable", "Fees & receipts", "Report cards & parents"],
  },
] as const;

export type ServiceDetail = {
  who: string;
  engagements: string[];
  faqs: { q: string; a: string }[];
};

const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  healthcare: {
    who: "Clinics, nursing homes, hospitals and diagnostic labs where queues, paper files and scattered billing slow down care.",
    engagements: [
      "Clinic and hospital management systems",
      "Appointment, queue and reminder workflows",
      "Patient records and prescription history",
      "Pharmacy, lab and billing integration",
      "Dashboards for doctors and administrators",
    ],
    faqs: [
      {
        q: "Can this replace our paper files and registers?",
        a: "Yes. We digitise records in stages, keep the screens simple for front-desk and medical staff, and migrate existing registers with you.",
      },
      {
        q: "How do you handle patient privacy?",
        a: "Access is role-based, actions are logged, and data handling is agreed up front. Legal and statutory compliance is scoped separately for each project.",
      },
      {
        q: "Does it work for a single clinic as well as a hospital?",
        a: "Yes. We start with the modules you need today — usually appointments, records and billing — and add departments as you grow.",
      },
    ],
  },
  "hotel-management": {
    who: "Hotels, resorts, homestays and guest houses that juggle bookings across calls, spreadsheets and booking sites.",
    engagements: [
      "Booking engine and direct-booking website",
      "Front desk, billing and guest folios",
      "Housekeeping and maintenance task boards",
      "Channel manager and OTA integration",
      "Occupancy and revenue dashboards",
    ],
    faqs: [
      {
        q: "Will it stop double bookings?",
        a: "Availability is kept in one place and synced with connected channels, so a room booked anywhere is blocked everywhere.",
      },
      {
        q: "Can guests book directly on our website?",
        a: "Yes. We can build a direct-booking site connected to your live room inventory and payment provider.",
      },
      {
        q: "We run a small property. Is this overkill?",
        a: "No. We size the system to your property — often just bookings, front desk and billing at first.",
      },
    ],
  },
  "school-management": {
    who: "Schools, coaching institutes and colleges running admissions, attendance, fees and exams on registers, receipts and group chats.",
    engagements: [
      "School management system, end to end",
      "Admissions and enquiry tracking",
      "Fee collection, receipts and reminders",
      "Exams, marks and report cards",
      "Parent and teacher portals",
    ],
    faqs: [
      {
        q: "Our teachers are not very technical. Will they manage?",
        a: "The system is designed for the least technical user in the room, with short training sessions and support after go-live.",
      },
      {
        q: "Can parents see attendance, fees and results?",
        a: "Yes. A parent view can show attendance, fee status, notices and report cards, with notifications you control.",
      },
      {
        q: "Can we import our existing student data?",
        a: "Yes. We clean and import your current records so you do not start from zero.",
      },
    ],
  },
  consulting: {
    who: "Founders, leadership teams and growing organisations facing a decision that is too important to guess — entering a new market, modernising operations, or committing to a technology investment.",
    engagements: [
      "Strategy & roadmap sprints (2–6 weeks)",
      "Digital transformation programmes",
      "Technology selection & vendor evaluation",
      "Process improvement diagnostics",
      "AI readiness assessment",
    ],
    faqs: [
      {
        q: "How does an engagement usually start?",
        a: "With a focused diagnostic: we map your goals, constraints and current systems, then present a prioritised roadmap before any build work begins.",
      },
      {
        q: "Do you only advise, or also execute?",
        a: "Both. ZYQO pairs advisory with in-house technology delivery, so the strategy we recommend is one we can actually build and support.",
      },
      {
        q: "What size of organisation do you work with?",
        a: "From early-stage founders to established businesses. Engagements are sized to the decision at hand, not to a fixed package.",
      },
    ],
  },
  "election-campaign": {
    who: "Candidates, parties and campaign offices that need disciplined operations and communication — from first-time contestants to established campaign teams.",
    engagements: [
      "Campaign website & digital presence setup",
      "Volunteer & booth coordination systems",
      "Event and rally logistics planning",
      "Content, design and social media operations",
      "Reporting dashboards for campaign leadership",
    ],
    faqs: [
      {
        q: "Do you work with any party or candidate?",
        a: "We evaluate each engagement against our boundaries: no voter manipulation, no deceptive messaging, no discriminatory targeting, and full compliance with election law and the model code of conduct.",
      },
      {
        q: "Can you support a campaign mid-way?",
        a: "Yes. We can audit current operations and stabilise the highest-friction areas first — typically communication scheduling and volunteer coordination.",
      },
      {
        q: "What happens to campaign data after the election?",
        a: "Data handling is agreed up front, documented, and closed out per the engagement terms and applicable law.",
      },
    ],
  },
  ai: {
    who: "Organisations with real workflows — support, sales, operations, documents — where AI could remove repetitive effort, but where accuracy and accountability matter.",
    engagements: [
      "AI assistant & chatbot builds",
      "Workflow automation with AI",
      "Recommendation & prediction systems",
      "Document & speech processing",
      "AI integration into existing software",
    ],
    faqs: [
      {
        q: "Do we need our own data to start?",
        a: "Not always. Many useful AI features work on your existing documents and processes; we assess feasibility before recommending any data programme.",
      },
      {
        q: "How do you handle accuracy and risk?",
        a: "Every AI feature ships with guardrails, human review points and measurement — we do not deploy black-box automation into critical workflows.",
      },
    ],
  },
  data: {
    who: "Teams sitting on records, spreadsheets and reports who need one reliable view of the business to make faster, better decisions.",
    engagements: [
      "Dashboard & reporting systems",
      "Data cleaning & integration projects",
      "Analytics pipeline setup",
      "Decision-support tooling",
    ],
    faqs: [
      {
        q: "Our data is scattered across Excel files. Can you help?",
        a: "Yes — consolidation is the most common starting point. We clean, structure and connect your records before building any reporting layer.",
      },
      {
        q: "Will our team be able to maintain it?",
        a: "Systems are designed for your team's skill level, with documentation and handover training included.",
      },
    ],
  },
  software: {
    who: "Businesses whose processes have outgrown off-the-shelf tools and spreadsheets, and need software shaped around how they actually work.",
    engagements: [
      "Custom business applications",
      "Internal tools & admin systems",
      "API & backend development",
      "Modernisation of legacy systems",
    ],
    faqs: [
      {
        q: "How do you keep a custom build from becoming expensive?",
        a: "Focused, measurable releases. You see working software early and often, and scope is re-prioritised with every release.",
      },
      {
        q: "Do you maintain what you build?",
        a: "Yes — maintenance, performance work and iteration are part of how we engage, not an afterthought.",
      },
    ],
  },
  web: {
    who: "Businesses that need a website to do a job — win trust, generate enquiries, sell products — not just exist.",
    engagements: [
      "Business & corporate websites",
      "E-commerce storefronts",
      "Landing pages & campaign sites",
      "Website rebuilds & maintenance",
    ],
    faqs: [
      {
        q: "How long does a business website take?",
        a: "A focused site typically takes weeks, not months. Scope is agreed up front so timelines hold.",
      },
      {
        q: "Can we update content ourselves?",
        a: "Yes — sites are built with editing in mind, and we walk your team through it at handover.",
      },
    ],
  },
  mobile: {
    who: "Organisations whose customers or field teams live on their phones — and need an app people actually open.",
    engagements: [
      "Customer-facing apps",
      "Internal & field-team apps",
      "Cross-platform builds (Android + iOS)",
      "App maintenance & iteration",
    ],
    faqs: [
      {
        q: "Do we need separate Android and iOS apps?",
        a: "Usually not — cross-platform builds cover both from one codebase, keeping cost and maintenance down.",
      },
    ],
  },
  cloud: {
    who: "Teams running systems on ad-hoc hosting or a single machine, who need reliability, backups and room to grow.",
    engagements: [
      "Cloud migration & hosting setup",
      "Deployment pipelines (CI/CD)",
      "Monitoring, backup & recovery",
      "Infrastructure cost optimisation",
    ],
    faqs: [
      {
        q: "Will migration disrupt our operations?",
        a: "Migrations are planned in stages with rollback points, so the business keeps running throughout.",
      },
    ],
  },
  it: {
    who: "Offices and organisations that need everyday infrastructure — networks, devices, support — to simply work.",
    engagements: [
      "Office network & Wi-Fi setup",
      "Server & device management",
      "Ongoing IT support",
      "Backup & recovery setup",
    ],
    faqs: [
      {
        q: "Do you offer ongoing support contracts?",
        a: "Yes — support arrangements are sized to your team, from on-call help to managed infrastructure.",
      },
    ],
  },
  iot: {
    who: "Businesses with physical operations — farms, factories, facilities — where knowing what is happening on the ground changes decisions.",
    engagements: [
      "Sensor monitoring pilots",
      "IoT dashboards & alerts",
      "Device connectivity & data collection",
      "Practical automation projects",
    ],
    faqs: [
      {
        q: "Is IoT practical for a small operation?",
        a: "Yes — we start with a small, bounded pilot (a few sensors, one dashboard) and expand only if the value proves out.",
      },
    ],
  },
  core: {
    who: "Growing businesses where leads, billing, inventory and staff records live in too many places at once.",
    engagements: [
      "Business management software",
      "Billing, inventory & records digitisation",
      "Workflow automation",
      "Management dashboards",
    ],
    faqs: [
      {
        q: "We already use several tools. Do we replace them?",
        a: "Only where it helps. We often connect what you have first, and replace only the tools that are genuinely holding you back.",
      },
    ],
  },
  crm: {
    who: "Sales and service teams losing follow-ups in inboxes, notebooks and memory.",
    engagements: [
      "CRM setup & customisation",
      "Lead & pipeline tracking",
      "Customer communication workflows",
      "Service ticket systems",
    ],
    faqs: [
      {
        q: "Off-the-shelf CRM or custom?",
        a: "We assess both honestly. Many teams start on a configured off-the-shelf system; custom makes sense when your process is genuinely different.",
      },
    ],
  },
  ecommerce: {
    who: "Retailers and brands ready to sell online with operations that can keep up with the storefront.",
    engagements: [
      "E-commerce website builds",
      "Payment & shipping integration",
      "Order & inventory management",
      "E-commerce analytics",
    ],
    faqs: [
      {
        q: "Which platform do you build on?",
        a: "It depends on your catalogue, budget and team — we recommend after understanding the business, not before.",
      },
    ],
  },
  hr: {
    who: "Teams where attendance, leave, records and communication eat hours that should go to real work.",
    engagements: [
      "Employee records & attendance systems",
      "Leave & task management",
      "Internal communication tools",
      "HR reporting",
    ],
    faqs: [
      {
        q: "Can this connect to our payroll?",
        a: "Yes — payroll data integration is a standard part of these builds.",
      },
    ],
  },
  inventory: {
    who: "Businesses that lose money to stockouts, over-ordering and records nobody trusts.",
    engagements: [
      "Inventory & stock tracking systems",
      "Purchase & supplier records",
      "Warehouse dashboards",
      "Stock alert automation",
    ],
    faqs: [
      {
        q: "Can it work across multiple locations?",
        a: "Yes — multi-location stock visibility is a common requirement and is designed in from the start.",
      },
    ],
  },
  education: {
    who: "Schools, colleges, coaching institutes and libraries running on registers, receipts and WhatsApp groups.",
    engagements: [
      "School / institute management systems",
      "Fees, attendance & exam records",
      "Library management",
      "Parent & student communication",
    ],
    faqs: [
      {
        q: "Our staff are not technical. Will they manage?",
        a: "Systems are designed for the least technical user in the room, with training and support included.",
      },
    ],
  },
  marketing: {
    who: "Businesses with a good product and an inconsistent story — posting irregularly, invisible in search, unsure what is working.",
    engagements: [
      "Social media management & content calendars",
      "SEO & local search visibility",
      "Design, video & content production",
      "Campaign management & reporting",
    ],
    faqs: [
      {
        q: "How soon does SEO show results?",
        a: "Honest answer: months, not weeks. We pair it with channels that move faster so you see progress while search builds.",
      },
    ],
  },
  docs: {
    who: "Organisations drowning in paper files, email approvals and documents nobody can find.",
    engagements: [
      "Document digitisation & management",
      "Approval & task workflows",
      "Digital forms & records",
      "Role-based access & search",
    ],
    faqs: [
      {
        q: "Do you handle the scanning and migration of old files?",
        a: "We plan the digitisation with you and can support the migration process as part of the engagement.",
      },
    ],
  },
};

const INTROS: Record<string, string> = {
  healthcare:
    "Healthcare runs on timing, records and trust. We build management software for clinics and hospitals that keeps appointments, patient history, billing and pharmacy in one calm system — simple for front-desk staff, clear for doctors, and organised for administrators.",
  "hotel-management":
    "A hotel is a live system: rooms, guests, staff and bills changing every hour. We build hotel management software that brings bookings, front desk, housekeeping and revenue reports into one control room — and a direct-booking website that sells your rooms.",
  "school-management":
    "Schools carry admissions, attendance, fees, exams and parent communication every single day. We build school management software that puts all of it in one place, so teachers teach, parents stay informed and the principal sees the whole school at a glance.",
  "election-campaign":
    "We support candidates, parties and campaign offices with the operational and communication backbone of a campaign — websites, volunteer coordination, event logistics, content and reporting. Every engagement follows election-commission guidelines and our boundaries: no voter manipulation, no deceptive messaging, no discriminatory targeting.",
  consulting:
    "For founders, teams and organisations who need clarity before commitment — we frame the decision, map options and build a roadmap you can actually execute.",
};

const OUTCOMES: Record<string, string[]> = {
  healthcare: [
    "Shorter queues and fewer missed appointments",
    "Patient history available in seconds",
    "Billing and pharmacy that match",
    "One dashboard for the whole clinic",
  ],
  "hotel-management": [
    "One live view of every room and booking",
    "Fewer double bookings and faster check-ins",
    "Housekeeping that knows what to clean next",
    "Revenue and occupancy reports without spreadsheets",
  ],
  "school-management": [
    "Admissions, fees and attendance in one place",
    "Report cards without manual calculation",
    "Parents informed without phone calls",
    "A principal dashboard for the whole school",
  ],
  "election-campaign": [
    "One coordinated view of volunteers, events and areas",
    "Consistent, on-schedule public communication",
    "Faster reporting for campaign leadership",
    "Compliance-first documentation",
  ],
};
const DEFAULT_OUTCOMES = [
  "A clear scope and roadmap before build",
  "Systems shaped around how your team works",
  "Measurable releases, not one big launch",
  "Support and improvement after go-live",
];

const toService = (g: Group, category: Service["category"]): Service => ({
  ...g,
  category,
  intro:
    INTROS[g.id] ??
    `${g.blurb} ZYQO plans, builds and supports ${g.title.toLowerCase()} work end to end — starting with your goals and constraints, then delivering in focused, measurable releases.`,
  outcomes: OUTCOMES[g.id] ?? DEFAULT_OUTCOMES,
  detail: SERVICE_DETAILS[g.id] ?? {
    who: `Teams and businesses that need ${g.title.toLowerCase()} done properly — shaped around how they work, supported after go-live.`,
    engagements: g.items.slice(0, 5),
    faqs: [
      {
        q: "How does an engagement start?",
        a: "With a short diagnostic of your goals and current setup, followed by a clear scope and roadmap before any build work begins.",
      },
      {
        q: "Do you support what you deliver?",
        a: "Yes — support, maintenance and iteration are part of how we engage, not an afterthought.",
      },
    ],
  },
});

export const SERVICES: Service[] = [
  ...INDUSTRY_SOLUTIONS.map((g) => toService(g, "Industry")),
  toService(CONSULTING_GROUP, "Consulting"),
  toService(ELECTION_CAMPAIGN, "Civic"),
  ...TECHNOLOGY.map((g) => toService(g, "Technology")),
  ...BUSINESS.map((g) => toService(g, "Business")),
];

export type Industry = {
  name: string;
  ideas: string;
  detail: string;
  focus: string[];
  image: string;
};

export const INDUSTRIES: Industry[] = [
  {
    name: "Agriculture",
    ideas: "Sensor monitoring, crop records, supply dashboards.",
    detail:
      "Agriculture decisions are made on ground reality that is rarely written down. We help frame where sensor data, field records and dashboards remove guesswork — from plot-level monitoring to supply-chain visibility.",
    focus: [
      "Sensor & IoT monitoring pilots",
      "Crop and plot records",
      "Supply & cold-chain dashboards",
      "Yield and cost tracking",
      "Market linkage platforms",
    ],
    image: agricultureImg,
  },
  {
    name: "Healthcare",
    ideas: "Appointment systems, records workflows, clinic dashboards.",
    detail:
      "Care runs on timing, records and trust. We map clinical and administrative workflows first, then identify where scheduling, records and dashboards reduce friction for staff and patients alike.",
    focus: [
      "Appointment & queue systems",
      "Patient records workflows",
      "Clinic operations dashboards",
      "Pharmacy & lab inventory",
      "Patient communication tools",
    ],
    image: healthcareImg,
  },
  {
    name: "Education",
    ideas: "School management, fees, attendance, learning portals.",
    detail:
      "Institutions juggle students, staff, fees and communication every day. We help consolidate scattered registers into systems that keep administrators, teachers and parents working from one source of truth.",
    focus: [
      "School & coaching management",
      "Fees, attendance & records",
      "Learning portals & content",
      "Library & member systems",
      "Parent communication",
    ],
    image: educationImg,
  },
  {
    name: "Finance",
    ideas: "Reporting, data pipelines, customer management tools.",
    detail:
      "Financial work rewards precision and auditability. We help design data pipelines, reporting and customer-facing tools where correctness and traceability are non-negotiable.",
    focus: [
      "Reporting & MIS dashboards",
      "Data pipelines & reconciliation",
      "Customer & KYC records",
      "Lending & portfolio trackers",
      "Process automation",
    ],
    image: financeImg,
  },
  {
    name: "Retail",
    ideas: "Billing, inventory, loyalty and customer records.",
    detail:
      "Every counter, shelf and customer interaction generates data — most of it unused. We help retailers capture billing, inventory and loyalty information in systems staff will actually use.",
    focus: [
      "Billing & POS workflows",
      "Inventory & stock alerts",
      "Loyalty & customer records",
      "Multi-store reporting",
      "Supplier & purchase tracking",
    ],
    image: retailImg,
  },
  {
    name: "E-commerce",
    ideas: "Storefronts, order management, analytics.",
    detail:
      "Selling online is an operations problem as much as a storefront. We help structure catalogues, orders and analytics so the business can see what is happening and act quickly.",
    focus: [
      "Storefront & catalogue builds",
      "Order & fulfilment management",
      "Payment & shipping integrations",
      "Analytics & conversion tracking",
      "Customer support tooling",
    ],
    image: ecommerceImg,
  },
  {
    name: "Logistics",
    ideas: "Tracking integrations, fleet records, operations boards.",
    detail:
      "Movement creates blind spots — vehicles, shipments, handoffs. We help design tracking integrations and operations boards that make status visible to everyone who needs it.",
    focus: [
      "Shipment & fleet tracking",
      "Operations status boards",
      "Route & delivery records",
      "Partner / 3PL integrations",
      "Proof-of-delivery workflows",
    ],
    image: logisticsImg,
  },
  {
    name: "Manufacturing",
    ideas: "Production records, IoT monitoring, stock alerts.",
    detail:
      "Factory decisions are only as good as their records. We help digitise production, stock and maintenance data so planning stops relying on whiteboards and memory.",
    focus: [
      "Production & batch records",
      "IoT / machine monitoring pilots",
      "Stock & material alerts",
      "Maintenance scheduling",
      "Shift & output dashboards",
    ],
    image: manufacturingImg,
  },
  {
    name: "Real Estate",
    ideas: "Listing sites, lead CRM, property records.",
    detail:
      "Property businesses live on listings, leads and documentation. We help organise all three into systems that keep site visits, negotiations and paperwork moving.",
    focus: [
      "Listing websites & portals",
      "Lead CRM & follow-up tracking",
      "Property & document records",
      "Broker / channel management",
      "Site-visit scheduling",
    ],
    image: realEstateImg,
  },
  {
    name: "Professional Services",
    ideas: "Client portals, documents, workflow automation.",
    detail:
      "Firms sell expertise, but run on documents, approvals and time. We help digitise the back office so more effort goes to clients and less to chasing files.",
    focus: [
      "Client portals & collaboration",
      "Document & knowledge management",
      "Approval & task workflows",
      "Time & engagement tracking",
      "Internal process automation",
    ],
    image: professionalServicesImg,
  },
  {
    name: "Startups",
    ideas: "MVPs, product planning, cloud foundations.",
    detail:
      "Early decisions compound. We help founders pressure-test scope, pick a buildable MVP slice and set up cloud foundations that won't need rework after the first customers arrive.",
    focus: [
      "MVP scoping & build",
      "Product & roadmap planning",
      "Cloud architecture foundations",
      "AI feature feasibility",
      "Investor-ready demos",
    ],
    image: startupsImg,
  },
  {
    name: "Small Businesses",
    ideas: "Websites, billing, simple everyday software.",
    detail:
      "Simple software, done properly, beats complex tools nobody uses. We help small businesses get a credible web presence, billing and everyday records working without overhead.",
    focus: [
      "Websites & local presence",
      "Billing & simple accounting",
      "Customer & supplier records",
      "Communication workflows",
      "Everyday admin automation",
    ],
    image: smallBusinessImg,
  },
  {
    name: "Technology Businesses",
    ideas: "APIs, integrations, AI features, DevOps.",
    detail:
      "Technology companies feel scaling pain in integrations, APIs and delivery speed. We help extend platforms, add AI capability and harden the plumbing behind the product.",
    focus: [
      "API design & integrations",
      "AI feature development",
      "DevOps & cloud efficiency",
      "Internal tooling & dashboards",
      "Technical architecture reviews",
    ],
    image: technologyBusinessImg,
  },
];

export const NEEDS = [
  "Website",
  "Mobile App",
  "AI Solution",
  "Business Software",
  "CRM",
  "E-commerce",
  "Automation",
  "Data Dashboard",
  "Education System",
  "Management System",
  "Digital Marketing",
  "Industry Solution",
  "Something Completely New",
];

export const STACK_ROWS = [
  [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Flutter",
    "React Native",
    "Android",
    "iOS",
    "PWA",
  ],
  [
    "Node.js",
    "Python",
    "Java",
    "FastAPI",
    "Django",
    "REST APIs",
    "GraphQL",
    "PostgreSQL",
    "MongoDB",
    "MySQL",
  ],
  ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "CI/CD", "Linux", "Nginx", "Monitoring"],
  [
    "Machine Learning",
    "Generative AI",
    "NLP",
    "Computer Vision",
    "Power BI",
    "Data Pipelines",
    "ESP32",
    "MQTT",
    "IoT Dashboards",
  ],
] as const;

export const TECH_RIBBON = [
  "Software",
  "AI & ML",
  "Cloud",
  "Mobile",
  "Data",
  "DevOps",
  "IoT",
  "Automation",
] as const;

export const JOURNEY_STEPS = [
  "Discover",
  "Understand",
  "Discuss",
  "Plan",
  "Build",
  "Test",
  "Improve",
  "Deploy",
  "Support",
  "Evolve",
] as const;

/**
 * People shown as cards on the About page. To add a teammate, add an entry here and drop a photo
 * named after its slot (for example `team-priya.webp`) into src/assets/photos.
 */
export const TEAM: { name: string; role: string; slot: `team-${string}` }[] = [
  { name: COMPANY.founder, role: COMPANY.role, slot: "team-founder" },
];
