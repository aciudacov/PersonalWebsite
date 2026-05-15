import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ProjectImage = {
  label: string;
  src: string;
  description?: string;
};

type Project = {
  title: string;
  years?: string;
  summary: string;
  body: string;
  focus: string[];
  cover: string;
  images: ProjectImage[];
};

const placeholderImage = (
  title: string,
  label: string,
  accent: string,
  secondary: string,
  variant: number,
) => {
  const layouts = [
    `
      <rect x="96" y="122" width="456" height="66" rx="12" fill="rgba(255,255,255,0.12)" />
      <rect x="112" y="142" width="210" height="10" rx="5" fill="${accent}" />
      <rect x="112" y="162" width="330" height="8" rx="4" fill="rgba(255,255,255,0.2)" />
      <rect x="96" y="222" width="132" height="164" rx="14" fill="rgba(255,255,255,0.1)" />
      <rect x="258" y="222" width="132" height="164" rx="14" fill="rgba(255,255,255,0.08)" />
      <rect x="420" y="222" width="132" height="164" rx="14" fill="rgba(255,255,255,0.1)" />
      <rect x="120" y="336" width="84" height="12" rx="6" fill="${secondary}" />
      <rect x="282" y="292" width="84" height="56" rx="10" fill="${accent}" opacity="0.8" />
      <rect x="444" y="262" width="84" height="86" rx="10" fill="${secondary}" opacity="0.8" />
    `,
    `
      <rect x="92" y="124" width="460" height="262" rx="18" fill="rgba(255,255,255,0.1)" />
      <circle cx="136" cy="166" r="10" fill="${accent}" />
      <circle cx="176" cy="166" r="10" fill="rgba(255,255,255,0.28)" />
      <circle cx="216" cy="166" r="10" fill="${secondary}" />
      <path d="M140 278 C192 214, 250 346, 312 278 S422 236, 504 292" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round" />
      <path d="M140 326 C202 288, 254 316, 314 306 S426 232, 504 248" fill="none" stroke="${secondary}" stroke-width="10" stroke-linecap="round" opacity="0.8" />
      <rect x="132" y="206" width="120" height="10" rx="5" fill="rgba(255,255,255,0.24)" />
      <rect x="132" y="226" width="86" height="8" rx="4" fill="rgba(255,255,255,0.18)" />
    `,
    `
      <rect x="90" y="124" width="464" height="262" rx="18" fill="rgba(255,255,255,0.09)" />
      <rect x="124" y="158" width="138" height="78" rx="12" fill="${accent}" opacity="0.86" />
      <rect x="294" y="158" width="226" height="24" rx="12" fill="rgba(255,255,255,0.18)" />
      <rect x="294" y="202" width="184" height="24" rx="12" fill="rgba(255,255,255,0.14)" />
      <rect x="124" y="270" width="396" height="18" rx="9" fill="rgba(255,255,255,0.14)" />
      <rect x="124" y="316" width="278" height="18" rx="9" fill="${secondary}" opacity="0.72" />
      <rect x="424" y="316" width="96" height="18" rx="9" fill="${accent}" opacity="0.72" />
    `,
  ];

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#15151d" />
          <stop offset="0.55" stop-color="#0b0b10" />
          <stop offset="1" stop-color="#050507" />
        </linearGradient>
        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="22" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.55 0" />
          <feBlend in="SourceGraphic" />
        </filter>
      </defs>
      <rect width="640" height="480" fill="url(#bg)" />
      <rect x="48" y="52" width="544" height="376" rx="28" fill="rgba(255,255,255,0.045)" stroke="rgba(255,255,255,0.18)" />
      <circle cx="520" cy="106" r="78" fill="${accent}" opacity="0.2" filter="url(#softGlow)" />
      <circle cx="136" cy="382" r="86" fill="${secondary}" opacity="0.18" filter="url(#softGlow)" />
      ${layouts[variant % layouts.length]}
      <text x="96" y="84" fill="rgba(255,255,255,0.62)" font-family="Inter, Arial, sans-serif" font-size="14" letter-spacing="3">${label.toUpperCase()}</text>
      <text x="96" y="426" fill="rgba(255,255,255,0.86)" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="600">${title}</text>
    </svg>
  `;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const projects: Project[] = [
  {
    title: "LoadBoardScanner",
    years: "2023 - Present",
    summary: "An ongoing Telegram-connected car hauling loadboard scanner for SuperDispatch and Central Dispatch, hosted on Azure.",
    body: "LoadBoardScanner is my flagship project: an ongoing car hauling loadboard scanner started in 2023 that watches SuperDispatch and Central Dispatch, with more integrations planned, and sends Telegram notifications when an order matches the user's configured search criteria. The bot has gone through two major product generations and several UI iterations. The first version worked entirely through Telegram inline commands. Later, I added a small Telegram webview for creating searches and passing callback data back to the bot, followed by a full Bootstrap-based CRUD suite. The latest major update moved the control surface to a Blazor and MudBlazor interface, giving both users and admins much deeper control over searches, settings, notification behavior, and platform sessions. A significant part of the work involved integrating with undocumented platform endpoints by studying how the official websites communicate with their own APIs. The app runs as two Azure-hosted services for backend and frontend, with Log Analytics for operational visibility. The adaptive UI preserves context across mobile and desktop experiences, supports opening inside Telegram as a web app by passing Telegram initData to the backend for authentication, and also works as a standalone web URL with Telegram OIDC login. The admin tooling includes session automation for integrations such as Central Dispatch, where Playwright is used to simulate a real browser login flow and capture the authenticated session needed for API access.",
    focus: ["Azure", "MudBlazor", "Telegram auth", "Playwright", "Loadboard integrations", "Log Analytics"],
    cover: publicAsset("portfolio/loadboardscanner/search-configuration.jpg"),
    images: [
      {
        label: "Search configuration",
        description: "Adaptive MudBlazor form for creating load searches with pickup and delivery locations, vehicle settings, price filters, and platform selection.",
        src: publicAsset("portfolio/loadboardscanner/search-configuration.jpg"),
      },
      {
        label: "Admin session handler",
        description: "Administration screen for user management, broadcasts, credentials, and Central Dispatch session automation with authenticated token capture.",
        src: publicAsset("portfolio/loadboardscanner/admin-session-handler.jpg"),
      },
      {
        label: "Settings and localization",
        description: "Settings screen with theme mode, notification template controls, and full multilingual support for both interface text and Telegram notifications.",
        src: publicAsset("portfolio/loadboardscanner/settings-localization.jpg"),
      },
    ],
  },
  {
    title: "AllCars",
    years: "2026 - Present",
    summary: "A Blazor WebAssembly PWA for helping car hauling drivers manage loads and generate accurate BOLs from platform data.",
    body: "AllCars, codename DriverLoadsApp, is an ongoing project started in 2026. It helps car hauling drivers manage their load orders and generate accurate BOLs on demand from data gathered across their operational systems. The app integrates with SuperDispatch for load information and TrackTruck for logbook data, then combines both sources so BOLs can be generated from the actual load and log context instead of being manually reconstructed. It can be opened inside Telegram or used through a standalone browser sign-in flow, including Telegram OIDC. The frontend is delivered as Blazor WebAssembly, allowing the app to cache on client devices and stay responsive after initial load. It is also a PWA, installable from Safari or Chrome on both desktop and mobile devices.",
    focus: ["Blazor WebAssembly", "PWA", "BOL generation", "Telegram auth", "SuperDispatch", "TrackTruck"],
    cover: publicAsset("portfolio/allcars/admin-dashboard.jpg"),
    images: [
      {
        label: "Admin dashboard",
        description: "Workspace summary showing drivers, imported loads, log detection status, and current issues that need review.",
        src: publicAsset("portfolio/allcars/admin-dashboard.jpg"),
      },
      {
        label: "Driver loads grid",
        description: "Imported SuperDispatch loads with route, vehicle, broker, driver, parsing status, BOL actions, and log review controls.",
        src: publicAsset("portfolio/allcars/driver-loads-grid.jpg"),
      },
      {
        label: "TrackTruck logs",
        description: "Parsed TrackTruck logbook events for a load, including pickup and delivery detection, route summary, and technical event data.",
        src: publicAsset("portfolio/allcars/tracktruck-logs.jpg"),
      },
    ],
  },
  {
    title: "DepoNexis",
    years: "2025",
    summary: "A Binance and Bybit main/sub-account management web app with secure auth flows, 2FA, and transfer tooling.",
    body: "DepoNexis, formerly DCC, was developed in 2025 as a web app for managing main and sub accounts on Binance and Bybit. The main product flow took about four months to implement and covered login, two-factor authentication setup, email confirmation, authenticated sessions, security-sensitive account flows, cryptography, adaptive layout work, and exchange API integrations. The app was designed for cryptocurrency holders and traders who needed to observe account dynamics and move funds between main and sub accounts, with the expectation that those funds would eventually be managed by a larger auto-trading system. The project was discontinued before the broader product shipped, but the core account-management and transfer workflows were implemented.",
    focus: ["Exchange APIs", "2FA", "Cryptography", "Adaptive layout"],
    cover: publicAsset("portfolio/deponexis/management-overview.jpg"),
    images: [
      {
        label: "Management overview",
        description: "Main account-management screen showing Binance account status, balance categories, account search, and main-account controls.",
        src: publicAsset("portfolio/deponexis/management-overview.jpg"),
      },
      {
        label: "Two-factor setup",
        description: "Security settings modal for authenticator-based 2FA setup, manual key entry, verification code input, and app-lock configuration.",
        src: publicAsset("portfolio/deponexis/two-factor-setup.jpg"),
      },
      {
        label: "USDT transfer modal",
        description: "Transfer flow for moving funds from a main account to a sub account, including asset, source, target, account type, and amount controls.",
        src: publicAsset("portfolio/deponexis/transfer-modal.jpg"),
      },
    ],
  },
  {
    title: "TrackTruckWeb",
    years: "2024 - 2025",
    summary: "A Blazor Server replacement for TrackTruckAuto, bringing logbook automation into a browser-based, cross-platform UI.",
    body: "TrackTruckWeb was developed from 2024 to 2025 as the successor to TrackTruckAuto. The original tool solved the workflow problem, but it was limited to Windows and required a local desktop installation. TrackTruckWeb moved those same logbook-management workflows into the browser using Blazor Server, making the tool accessible from any platform without downloads or setup. The web version kept the core goal of automating repetitive driver-log work, while improving the user experience with a modern interface, clearer navigation, richer log inspection, and faster everyday workflows for managers. It included driver log dashboards, integrity and driving checks, copy-actions automation for duplicating logs across ranges with exact parameters, and detailed day/action editing directly in the browser.",
    focus: ["Blazor Server", "C#", "Cross-platform", "Logbook automation"],
    cover: publicAsset("portfolio/tracktruckweb/driver-logs-dashboard.jpg"),
    images: [
      {
        label: "Driver logs dashboard",
        description: "Main driver log screen with a browser-based timeline, daily summary table, filters, and navigation for log-related workflows.",
        src: publicAsset("portfolio/tracktruckweb/driver-logs-dashboard.jpg"),
      },
      {
        label: "Copy actions",
        description: "Workflow for selecting source actions and duplicating them with exact parameters across a target date range, company, and driver.",
        src: publicAsset("portfolio/tracktruckweb/copy-actions.jpg"),
      },
      {
        label: "Log day inspection",
        description: "Expanded day view with individual log actions, inline edit mode, editable fields, and quick-copy controls for repeated values.",
        src: publicAsset("portfolio/tracktruckweb/log-day-inspection.jpg"),
      },
    ],
  },
  {
    title: "TrackTruckAuto",
    years: "2020 - 2025",
    summary: "A WinForms logbook management tool for automating driver-log checks, updates, and route review workflows.",
    body: "TrackTruckAuto was the first production-style application I built, developed in 2020 at the request of a friend and maintained until 2025. It was designed as an everyday tool for a logbook manager, filling gaps left by driver log platforms that either did not allow certain workflows to be automated or made them slow through poor UX. The app supports a broad set of log-related actions, from bulk updates and certification fixes to integrity checks that scan driver logs for violations such as speeding, teleports, rest timer issues, and other inconsistent events. It also includes a route map generator based on log coordinates, making it easier to visually inspect the path a driver took. The UI was built with WinForms because it was my first real project and I was focused primarily on making the workflows work reliably.",
    focus: ["WinForms", "C#", "Logbook automation", "Route mapping"],
    cover: publicAsset("portfolio/tracktruckauto/main-interface.jpg"),
    images: [
      {
        label: "Main interface",
        description: "Primary workspace for managing driver logs, daily records, updates, documents, certifications, and related actions.",
        src: publicAsset("portfolio/tracktruckauto/main-interface.jpg"),
      },
      {
        label: "Integrity check",
        description: "Automated scan for log issues such as speeding, teleports, rest timer violations, engine hour mismatches, certification problems, and mileage inconsistencies.",
        src: publicAsset("portfolio/tracktruckauto/integrity-check.jpg"),
      },
      {
        label: "Map generator",
        description: "Route generator that builds a map link from log coordinates so the manager can inspect the driver's path visually.",
        src: publicAsset("portfolio/tracktruckauto/map-generator.jpg"),
      },
    ],
  },
];

export function Portfolio() {
  const [openProject, setOpenProject] = useState<string | null>(null);

  useEffect(() => {
    if (!openProject) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [openProject]);

  return (
    <section id="portfolio" className="relative overflow-hidden border-t border-white/5 py-32">
      <div className="absolute inset-0 bg-white/[0.025]" />

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-white/40">
              Portfolio
            </h2>
            <h3 className="max-w-3xl text-3xl font-medium tracking-tight text-white md:text-5xl">
              Project snapshots.
            </h3>
          </div>
          <p className="max-w-xl text-base font-light leading-relaxed text-white/60 md:text-lg">
            Case studies from real tools and systems work. Source code is private; each solution was custom-built on demand for a specific business domain.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <Dialog
              key={project.title}
              open={openProject === project.title}
              onOpenChange={(open) => {
                setOpenProject(open ? project.title : null);
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
              >
                <DialogTrigger asChild>
                  <button
                    type="button"
                    aria-label={`Open ${project.title} portfolio details`}
                    className="group flex h-full w-full flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] text-left transition-colors duration-300 hover:bg-white/[0.065] focus:outline-none focus:ring-2 focus:ring-white/40"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden border-b border-white/10 bg-white/5">
                      <img
                        src={project.cover}
                        alt={`${project.title} project preview`}
                        className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-5 p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          {project.years ? (
                            <span className="mb-2 block text-xs font-mono tracking-wide text-white/40">
                              {project.years}
                            </span>
                          ) : null}
                          <h4 className="text-xl font-medium tracking-tight text-white">
                            {project.title}
                          </h4>
                        </div>
                        <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors group-hover:bg-white group-hover:text-black">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                      <p className="text-sm font-light leading-relaxed text-white/60">
                        {project.summary}
                      </p>
                      <div className="mt-auto flex flex-wrap gap-2">
                        {project.focus.slice(0, 3).map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                </DialogTrigger>
              </motion.div>

              <DialogContent
                className="portfolio-dialog-content max-h-[92vh] max-w-5xl overflow-y-auto overscroll-contain border-white/10 bg-background/95 p-0 text-white shadow-2xl backdrop-blur-xl sm:rounded-lg"
                data-lenis-prevent=""
                data-lenis-prevent-wheel=""
              >
                <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
                  <div className="min-w-0 border-b border-white/10 bg-white/[0.03] p-4 lg:border-b-0 lg:border-r">
                    <Carousel opts={{ loop: true }} className="w-full">
                      <CarouselContent>
                        {project.images.map((image) => (
                          <CarouselItem key={image.label}>
                            <div className="relative z-0 overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
                              <img
                                src={image.src}
                                alt={`${project.title} ${image.label}`}
                                className="block h-auto w-full"
                              />
                              {image.description ? (
                                <div className="border-t border-white/10 bg-white/[0.03] px-4 py-3">
                                  <p className="text-xs font-medium uppercase tracking-wide text-white/45">
                                    {image.label}
                                  </p>
                                  <p className="mt-1 text-sm font-light leading-relaxed text-white/65">
                                    {image.description}
                                  </p>
                                </div>
                              ) : null}
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-3 z-30 border-white/15 bg-black/70 text-white shadow-lg backdrop-blur-md hover:bg-white hover:text-black disabled:opacity-30 sm:left-4" />
                      <CarouselNext className="right-3 z-30 border-white/15 bg-black/70 text-white shadow-lg backdrop-blur-md hover:bg-white hover:text-black disabled:opacity-30 sm:right-4" />
                    </Carousel>
                  </div>

                  <div className="p-6 md:p-8 lg:p-10">
                    <DialogHeader className="space-y-4 text-left">
                      <div>
                        <DialogDescription className="mb-3 text-sm font-medium uppercase tracking-widest text-white/40">
                          {project.years ? `Development: ${project.years}` : "Placeholder case study"}
                        </DialogDescription>
                        <DialogTitle className="text-3xl font-medium tracking-tight text-white md:text-4xl">
                          {project.title}
                        </DialogTitle>
                      </div>
                    </DialogHeader>

                    <p className="mt-8 text-base font-light leading-relaxed text-white/68">
                      {project.body}
                    </p>

                    <div className="mt-8">
                      <h5 className="mb-4 text-sm font-medium uppercase tracking-wide text-white/45">
                        Focus areas
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {project.focus.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
