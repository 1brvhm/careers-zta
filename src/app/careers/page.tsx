"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EyebrowRule } from "@/components/ui/eyebrow-rule";
import { BrandWordmark } from "@/components/BrandWordmark";

/* ═══════════════════════════════════════════════════════════════
   BUTTON STYLES (mirrors landing-page-v2)
   ═══════════════════════════════════════════════════════════════ */

const primaryBtn = cn(
  "h-auto rounded-[10px] px-6 py-3.5 text-[15px] font-semibold tracking-tight",
  "shadow-[0_0_0_1px_color-mix(in_oklch,var(--color-accent)_38%,transparent),0_0_40px_color-mix(in_oklch,var(--color-accent)_22%,transparent)]",
  "transition-transform duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px",
);

/* ═══════════════════════════════════════════════════════════════
   TYPES + DATA
   ═══════════════════════════════════════════════════════════════ */

type Bullet = { lead?: string; body: string };
type Section = { eyebrow: string; bullets: Bullet[] };
type Value = { name: string; body: string };

type RoleData = {
  title: string;
  team: string;
  location: string;
  type: string;
  salary: string;
  intro: string;
  sections: Section[];
  values: Value[];
};

const roles: RoleData[] = [
  {
    title: "Founding Agent Engineer",
    team: "Engineering",
    location: "Toronto · Remote OK",
    type: "Full-time",
    salary: "75–90K CAD",
    intro:
      "Build production AI agents that founders and executives actually use. End-to-end ownership from pilot to production, with real customers in industries that pay for outcomes.",
    sections: [
      {
        eyebrow: "What you'll do",
        bullets: [
          {
            lead: "Design and deliver production-grade AI agents.",
            body: "Ship reliable, intuitive agents that drive revenue and run mission-critical workflows for our customers — not prototypes, real systems in production across finance, healthcare, and commerce.",
          },
          {
            lead: "Drive the Agent Development Life Cycle (ADLC).",
            body: "Complete ownership from initial pilot through deployment and continuous iteration. Build, tune, and evolve agents in production, and define the standard for ADLC best practices along the way.",
          },
          {
            lead: "Partner with enterprise leaders and cutting-edge startups.",
            body: "Work directly with executives at some of the world's largest enterprises to understand their pressing challenges, then build agents that transform how they operate at scale. You'll also partner with leading startups across North America to embed agents across their entire stack.",
          },
          {
            lead: "Build the future of the platform.",
            body: "Your customer work guides ZTA's core platform. Surface unmet needs, prototype new tools and features, and collaborate with research, product, and platform to shape where agent development goes next.",
          },
        ],
      },
      {
        eyebrow: "Example projects",
        bullets: [
          {
            body: "Design and ship AI agents for large telecommunications and media companies that consistently outperform human agents at managing subscription churn.",
          },
          {
            body: "Develop agents capable of navigating complex customer interactions — troubleshooting a broken device, personalizing product recommendations.",
          },
          {
            body: "Create generalizable agent frameworks tailored for industry-specific use cases.",
          },
          {
            body: "Facilitate design partnerships for new product initiatives: new agent architectures, self-service capabilities, generative agent development.",
          },
          {
            body: "Experiment with the latest voice models and integrate them at scale for enterprise-grade customers.",
          },
        ],
      },
      {
        eyebrow: "What you'll bring",
        bullets: [
          { body: "Experience building and scaling end-to-end production systems." },
          { body: "Strong technical problem-solving in fast-changing, ambiguous environments." },
          {
            body: "A builder and tinkerer's mindset with high agency — you find creative ways to overcome obstacles and ship.",
          },
          {
            body: "Comfort working directly with customers to understand their needs and solve real-world problems.",
          },
          {
            body: "Excellent communication — clear, direct, and persuasive across technical and non-technical audiences.",
          },
        ],
      },
      {
        eyebrow: "Even better",
        bullets: [
          { body: "Experience building or deploying AI/LLM systems in production." },
          {
            body: "Former founder or founding engineer — you know what it means to balance craft, ownership, and speed.",
          },
          {
            body: "Familiarity with the tools that power today's AI agents: eval frameworks, agent tooling, RAG pipelines, prompt engineering.",
          },
          { body: "Prior experience with React, TypeScript, and/or Go." },
          {
            body: "Previous roles where you interfaced with customers or led technical projects with external stakeholders.",
          },
        ],
      },
    ],
    values: [
      {
        name: "Trust",
        body: "We build trust with our customers through accountability, empathy, quality, and responsiveness. We build trust in AI by making it more accessible, safe, and useful. And we build trust with each other by showing up — professionally and personally — so everyone can do their best work.",
      },
      {
        name: "Customer Obsession",
        body: "We deeply understand our customers' business goals and relentlessly focus on driving outcomes, not technical milestones. Everyone here knows and spends time with our customers. When a customer has an issue, we drop everything and fix it.",
      },
      {
        name: "Craftsmanship",
        body: "We get the details right, from the words on the page to the system architecture. We have good taste. When something isn't right, we take the time to fix it. We're proud of what we ship and continuously self-reflect to continuously self-improve.",
      },
      {
        name: "Intensity",
        body: "We don't have the luxury of patience. We play to win. We care about our product being the best, and when it isn't, we fix it. When we fail, we talk about it openly and without blame so we succeed the next time.",
      },
      {
        name: "Family",
        body: "Balance and intensity are compatible — we model it in our actions and processes. We support and respect each other and celebrate each other's personal and professional achievements.",
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   ATOMS
   ═══════════════════════════════════════════════════════════════ */

function Eyebrow({
  children,
  accent,
  className,
}: {
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "m-0 font-mono text-[11px] font-medium tracking-[0.18em] uppercase",
        accent ? "text-[var(--color-accent)]" : "text-[var(--color-text-faint)]",
        className,
      )}
    >
      {children}
    </p>
  );
}

function CornerSvg({
  tint,
  pos,
  t,
}: {
  tint: string;
  pos: React.CSSProperties;
  t: string;
}) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 20 20"
      fill="none"
      className="absolute opacity-[0.55]"
      style={{ ...pos, transform: t || undefined }}
      aria-hidden
    >
      <path d="M2 2H10M2 2V10" stroke={tint} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CornerOrnaments({ accent, inset = 10 }: { accent?: boolean; inset?: number }) {
  const tint = accent
    ? "color-mix(in oklch, var(--color-accent) 70%, var(--color-text-faint))"
    : "var(--color-text-faint)";
  return (
    <>
      <CornerSvg tint={tint} pos={{ top: inset, left: inset }} t="" />
      <CornerSvg tint={tint} pos={{ top: inset, right: inset }} t="scaleX(-1)" />
      <CornerSvg tint={tint} pos={{ bottom: inset, left: inset }} t="scaleY(-1)" />
      <CornerSvg tint={tint} pos={{ bottom: inset, right: inset }} t="scale(-1, -1)" />
    </>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function CoinIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3v18M16.5 7.5h-6a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5h-6" />
    </svg>
  );
}

function MetaChip({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 font-mono text-[11px] tracking-[0.08em] text-[var(--color-text-muted)]">
      <span className="grid place-items-center text-[var(--color-text-faint)]">{icon}</span>
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════════════════════ */

function HamburgerButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label="Toggle menu"
      whileTap={{ scale: 0.8 }}
      animate={{
        borderColor: open
          ? "color-mix(in oklch, var(--color-accent) 55%, transparent)"
          : "var(--color-border)",
        backgroundColor: open
          ? "color-mix(in oklch, var(--color-accent) 10%, var(--color-surface))"
          : "var(--color-surface)",
      }}
      transition={{ duration: 0.25 }}
      className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border"
    >
      <motion.span
        animate={{ rotate: open ? 45 : 0, y: open ? 6.5 : 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        className="block h-[1.5px] w-[18px] rounded-full bg-[var(--color-text)]"
      />
      <motion.span
        animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        className="block h-[1.5px] w-[18px] rounded-full bg-[var(--color-text)]"
      />
      <motion.span
        animate={{ rotate: open ? -45 : 0, y: open ? -6.5 : 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        className="block h-[1.5px] w-[18px] rounded-full bg-[var(--color-text)]"
      />
    </motion.button>
  );
}

function CareersNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [clipOrigin, setClipOrigin] = useState("50% 36px");
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleOpen = useCallback(() => {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setClipOrigin(
        `${Math.round(r.left + r.width / 2)}px ${Math.round(r.top + r.height / 2)}px`,
      );
    }
    setMenuOpen(true);
  }, []);

  const links: { label: string; href: string }[] = [
    { label: "Features",     href: "/landing-page-v2#why" },
    { label: "How it works", href: "/landing-page-v2#how-it-works" },
    { label: "Integrations", href: "/landing-page-v2#integrations" },
    { label: "Pricing",      href: "/landing-page-v2#pricing" },
    { label: "Open roles",   href: "#roles" },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const goHome = () => {
    document.body.style.overflow = "";
    window.location.href = "/landing-page-v2";
  };

  return (
    <>
      {/* ── Floating pill nav ── */}
      <header className="sticky top-4 z-50 pointer-events-none">
        <div className="mx-auto max-w-[800px] px-4 pointer-events-auto">
          <motion.div
            animate={{
              background: scrolled ? "rgba(6,5,10,0.85)" : "rgba(6,5,10,0.5)",
              boxShadow: scrolled
                ? "0 16px 48px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(255,255,255,0.05) inset"
                : "0 4px 24px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(255,255,255,0.04) inset",
            }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-2 rounded-full border border-white/[0.07] px-3 py-2"
            style={{
              backdropFilter: "blur(22px) saturate(1.5)",
              WebkitBackdropFilter: "blur(22px) saturate(1.5)",
            }}
          >
            <button
              type="button"
              onClick={goHome}
              aria-label="Back to main site"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors duration-150 hover:bg-[var(--color-surface-2)] hover:border-[var(--color-border-strong)]"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-text)"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="shrink-0 mr-1 cursor-pointer bg-transparent border-0 p-0"
            >
              <BrandWordmark
                className="gap-3 text-[var(--color-text)]"
                textClassName="font-heading text-lg leading-none tracking-tight"
                markerClassName="scale-90"
              />
            </button>
            <nav className="hidden lg:flex flex-1 items-center justify-center gap-0.5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="font-body text-[13px] font-medium px-4 py-1.5 rounded-full no-underline text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-all duration-150"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-2">
              <div ref={btnRef}>
                <HamburgerButton
                  open={menuOpen}
                  onClick={menuOpen ? () => setMenuOpen(false) : handleOpen}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── Fullscreen yellow menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            variants={{
              hidden: { clipPath: `circle(22px at ${clipOrigin})`, opacity: 1 },
              visible: { clipPath: `circle(170vmax at ${clipOrigin})`, opacity: 1 },
              out: { opacity: 0 },
            }}
            initial="hidden"
            animate="visible"
            exit="out"
            transition={{ duration: 0.52, ease: [0.34, 1.4, 0.64, 1] }}
            style={{ background: "var(--color-accent)" }}
            className="fixed inset-0 z-[99] flex flex-col overflow-hidden"
          >
            {[
              { size: 420, x: "62%", top: "2%", delay: 0.3, blur: 100 },
              { size: 240, x: "5%", top: "52%", delay: 0.35, blur: 70 },
              { size: 180, x: "38%", top: "76%", delay: 0.38, blur: 55 },
              { size: 140, x: "82%", top: "60%", delay: 0.32, blur: 45 },
            ].map((orb, i) => (
              <motion.div
                key={i}
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: orb.delay }}
                style={{
                  position: "absolute",
                  borderRadius: "50%",
                  width: orb.size,
                  height: orb.size,
                  left: orb.x,
                  top: orb.top,
                  background:
                    "radial-gradient(circle at 32% 28%, rgba(255,236,130,0.95) 0%, rgba(245,197,66,0.85) 40%, rgba(184,134,11,0.6) 100%)",
                  filter: `blur(${orb.blur}px)`,
                  pointerEvents: "none",
                }}
              />
            ))}

            <div className="relative z-10 flex items-center justify-between px-[clamp(16px,4vw,40px)] pt-5 pb-2">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={goHome}
                  aria-label="Back to main site"
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-150 hover:bg-black/10"
                  style={{ border: "1.5px solid rgba(0,0,0,0.18)" }}
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-accent-ink)"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    requestAnimationFrame(scrollToTop);
                  }}
                  aria-label="Back to top"
                  className="cursor-pointer bg-transparent border-0 p-0"
                >
                  <BrandWordmark
                    className="gap-3"
                    textClassName="font-heading text-[22px] leading-none tracking-tight"
                    style={{ color: "var(--color-accent-ink)" }}
                  />
                </button>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-150 hover:bg-black/10"
                style={{ border: "1.5px solid rgba(0,0,0,0.18)" }}
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-accent-ink)"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="relative z-10 flex flex-1 flex-col justify-center px-[clamp(28px,6vw,72px)] pb-16">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    if (l.href.startsWith("#")) {
                      e.preventDefault();
                      document.body.style.overflow = "";
                      setMenuOpen(false);
                      requestAnimationFrame(() => {
                        document
                          .getElementById(l.href.slice(1))
                          ?.scrollIntoView({ behavior: "smooth" });
                      });
                    } else {
                      setMenuOpen(false);
                    }
                  }}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.38,
                    delay: 0.22 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-display no-underline leading-[1.05] tracking-[-0.02em] py-[clamp(10px,2vw,18px)] border-b border-black/10 hover:pl-3 hover:border-black/25 transition-all duration-150 cursor-pointer"
                  style={{
                    fontSize: "clamp(38px,8vw,72px)",
                    color: "var(--color-accent-ink)",
                  }}
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════ */

function CareersHero() {
  const openCount = roles.length;
  return (
    <section className="relative overflow-hidden pt-16 pb-16 lg:pt-24 lg:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-[12%] left-[6%] size-[520px] rounded-full blur-[50px] [animation:z2a-drift_26s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--color-accent) 14%, transparent) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -top-[6%] right-[4%] size-[460px] rounded-full blur-[48px] [animation:z2a-drift-slow_32s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--color-accent) 10%, transparent) 0%, transparent 70%)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto max-w-7xl px-[clamp(16px,3vw,28px)] text-center"
      >
        <div className="flex justify-center">
          <EyebrowRule center>Careers · Toronto</EyebrowRule>
        </div>
        <h1 className="font-display m-0 mt-6 text-[clamp(34px,7vw,88px)] leading-[0.96] font-normal tracking-[-0.035em] text-[var(--color-text)]">
          Build the <span className="text-[var(--color-accent)]">Chief of Staff.</span>
        </h1>
        <p className="font-body mx-auto mt-5 max-w-[620px] text-[15px] md:text-[19px] leading-[1.6] text-muted-foreground">
          We&apos;re hiring engineers to ship agents the world&apos;s busiest founders and executives rely on every morning. End-to-end ownership, real customers in production, no theater.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button
            className={cn(primaryBtn, "gap-2.5")}
            onClick={() => {
              document.getElementById("roles")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            See open roles
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v14m0 0l-6-6m6 6l6-6"
              />
            </svg>
          </Button>
        </div>
        <p className="font-mono mt-3.5 text-[11px] tracking-[0.16em] text-[var(--color-text-muted)] uppercase">
          Currently hiring · {openCount} role{openCount === 1 ? "" : "s"} open
        </p>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROLES SECTION
   ═══════════════════════════════════════════════════════════════ */

function RolesSection() {
  return (
    <section id="roles" className="relative px-[clamp(16px,3vw,32px)] py-16 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <EyebrowRule center>Open roles</EyebrowRule>
          <h2 className="font-heading mt-5 text-[clamp(32px,4vw,52px)] leading-[1.02] font-normal tracking-[-0.025em] text-[var(--color-text)]">
            One seat. <span className="text-[var(--color-accent)]">High agency.</span>
          </h2>
          <p className="font-body mx-auto mt-4 max-w-[520px] text-[15px] md:text-[17px] leading-[1.55] text-muted-foreground">
            We hire intentionally and rarely. If this is you, send us your work.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-4">
          {roles.map((r) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.1, margin: "-50px" }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <JobCard role={r} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   JOB CARD (expandable accordion)
   ═══════════════════════════════════════════════════════════════ */

function JobCard({ role }: { role: RoleData }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <motion.div
      initial={false}
      animate={{
        borderColor: open
          ? "color-mix(in oklch, var(--color-accent) 32%, var(--color-border))"
          : "var(--color-border)",
        boxShadow: open
          ? "0 0 0 1px color-mix(in oklch, var(--color-accent) 18%, transparent), 0 40px 100px rgba(229,199,0,0.08)"
          : "0 1px 2px rgba(0,0,0,0.4)",
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[20px] border"
      style={{
        background:
          "radial-gradient(140% 90% at 30% 0%, color-mix(in oklch, var(--color-accent) 6%, var(--color-bg-2)) 0%, var(--color-bg) 65%)",
      }}
    >
      <CornerOrnaments accent={open} inset={14} />

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="relative z-10 flex w-full items-center gap-5 px-6 py-6 text-left transition-colors duration-200 hover:bg-white/[0.015] md:px-8 md:py-7"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <Eyebrow accent>{role.team}</Eyebrow>
            <span
              aria-hidden
              className="hidden sm:inline-block size-1 rounded-full bg-[var(--color-text-faint)]"
            />
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[var(--color-text-faint)]">
              {role.location}
            </span>
          </div>
          <h3 className="font-heading mt-2.5 text-[clamp(22px,2.4vw,30px)] font-normal leading-[1.1] tracking-[-0.02em] text-[var(--color-text)]">
            {role.title}
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <MetaChip icon={<BriefcaseIcon />}>{role.type}</MetaChip>
            <MetaChip icon={<CoinIcon />}>{role.salary}</MetaChip>
          </div>
        </div>

        <motion.span
          aria-hidden
          animate={{
            rotate: open ? 180 : 0,
            backgroundColor: open
              ? "color-mix(in oklch, var(--color-accent) 14%, var(--color-surface))"
              : "var(--color-surface)",
            borderColor: open
              ? "color-mix(in oklch, var(--color-accent) 38%, var(--color-border))"
              : "var(--color-border-strong)",
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="grid size-10 shrink-0 place-items-center rounded-full border"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-text)"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.section
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.3, delay: 0.08 },
            }}
            style={{ overflow: "hidden" }}
            className="relative z-10"
          >
            <motion.div
              initial={{ y: 16, filter: "blur(8px)" }}
              animate={{ y: 0, filter: "blur(0px)" }}
              exit={{ y: 6, filter: "blur(6px)" }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="px-6 pb-8 md:px-8 md:pb-10"
            >
              <div className="h-px w-full bg-[var(--color-border)]" />

              <p className="font-body mt-7 max-w-2xl text-[15px] md:text-[16px] leading-[1.65] text-[var(--color-text-muted)]">
                {role.intro}
              </p>

              <div className="mt-8 flex flex-col gap-9">
                {role.sections.map((sec) => (
                  <SectionBlock key={sec.eyebrow} section={sec} />
                ))}
                <ValuesBlock values={role.values} />
              </div>

              <div className="mt-10 flex flex-col items-start gap-4 border-t border-[var(--color-border)] pt-7 md:flex-row md:items-center md:justify-between">
                <div>
                  <Eyebrow accent>Ready when you are</Eyebrow>
                  <p className="font-body mt-1.5 text-[15px] leading-[1.5] text-[var(--color-text)]">
                    Send a short note and your best work. We read everything.
                  </p>
                </div>
                <Button type="button" className={cn(primaryBtn, "gap-2.5 self-stretch md:self-auto")}>
                  Apply now
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Button>
              </div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SectionBlock({ section }: { section: Section }) {
  return (
    <div>
      <EyebrowRule>{section.eyebrow}</EyebrowRule>
      <ul className="mt-4 flex flex-col gap-3.5">
        {section.bullets.map((b, i) => (
          <li key={i} className="flex gap-3.5">
            <span
              aria-hidden
              className="mt-[10px] block size-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
              style={{
                boxShadow: "0 0 8px color-mix(in oklch, var(--color-accent) 50%, transparent)",
              }}
            />
            <p className="font-body text-[14.5px] md:text-[15px] leading-[1.65] text-[var(--color-text-muted)]">
              {b.lead && (
                <span className="font-semibold text-[var(--color-text)]">{b.lead} </span>
              )}
              {b.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ValuesBlock({ values }: { values: Value[] }) {
  return (
    <div id="values">
      <EyebrowRule>Our values</EyebrowRule>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {values.map((v) => (
          <div
            key={v.name}
            className="relative rounded-[14px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
          >
            <p className="font-heading text-[15px] font-semibold tracking-tight text-[var(--color-text)]">
              {v.name}
            </p>
            <p className="font-body mt-2 text-[13.5px] leading-[1.6] text-[var(--color-text-muted)]">
              {v.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CLOSER
   ═══════════════════════════════════════════════════════════════ */

function Closer() {
  return (
    <section className="px-[clamp(16px,3vw,32px)] pb-24 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[var(--color-border)] px-8 py-[clamp(40px,5vw,64px)] text-center"
        style={{
          background:
            "radial-gradient(90% 70% at 50% 0%, color-mix(in oklch, var(--color-accent) 8%, var(--color-bg-2)) 0%, var(--color-bg) 65%)",
        }}
      >
        <CornerOrnaments inset={16} />
        <Eyebrow accent>Don&apos;t see your role?</Eyebrow>
        <h3 className="font-heading mt-3.5 text-[clamp(26px,3vw,38px)] leading-[1.05] font-normal tracking-[-0.025em] text-[var(--color-text)]">
          We hire when the right person{" "}
          <span className="text-[var(--color-accent)]">shows up.</span>
        </h3>
        <p className="font-body mx-auto mt-3 max-w-[480px] text-[15px] leading-[1.55] text-[var(--color-text-muted)]">
          Tell us what you&apos;re working on. If there&apos;s a fit, we&apos;ll make space.
        </p>
        <div className="mt-7 flex justify-center">
          <Button type="button" className={cn(primaryBtn, "gap-2.5")}>
            Get in touch
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function CareersPage() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="z2a-landing dark">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--color-accent)] origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />
      <CareersNav />
      <main>
        <CareersHero />
        <RolesSection />
        <Closer />
      </main>
    </div>
  );
}
