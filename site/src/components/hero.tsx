"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, MousePointer2, Sparkles } from "lucide-react";
import { site } from "@/data/site";
import { useEffect, useState } from "react";

const rotating = [
  "AI/ML Engineer",
  "MLOps Engineer",
  "Full-Stack Builder",
  "Paper-reader & Re-implementer",
  "Agent-pipeline Plumber",
];

function useRotator(items: string[], ms = 2200) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % items.length), ms);
    return () => clearInterval(id);
  }, [items, ms]);
  return items[i];
}

export default function Hero() {
  const word = useRotator(rotating);

  return (
    <section id="top" className="relative isolate min-h-[100svh] flex items-center overflow-hidden pt-24 pb-16">
      {/* Background layers */}
      <div aria-hidden className="absolute inset-0 bg-grid mask-fade-edges opacity-60" />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, color-mix(in oklab, var(--accent) 10%, transparent) 0%, transparent 70%)",
        }}
      />
      <OrbitBadge />

      <div className="relative max-w-6xl mx-auto px-5 md:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <StatusPill />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-8 text-[44px] sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.02em] leading-[1.02]"
        >
          Shuddhabrota <br className="hidden sm:block" />
          <span className="gradient-text">Banerjee</span>
          <span className="text-[color:var(--accent)]">.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 flex items-center gap-3 font-mono text-sm text-[color:var(--fg-muted)]"
        >
          <span className="size-1.5 rounded-full bg-[color:var(--accent-3)] shadow-[0_0_12px_var(--accent-3)]" />
          <span className="inline-flex gap-1 overflow-hidden">
            <motion.span
              key={word}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[color:var(--fg)]"
            >
              {word}
            </motion.span>
          </span>
          <span>·</span>
          <span>{site.location}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 max-w-2xl text-lg md:text-xl text-[color:var(--fg-muted)] leading-relaxed"
        >
          I build end-to-end AI systems — from{" "}
          <span className="text-[color:var(--fg)]">XLS-R-based deepfake detection</span> and{" "}
          <span className="text-[color:var(--fg)]">CycleGAN cloud-removal</span> to{" "}
          <span className="text-[color:var(--fg)]">multi-tenant SaaS</span> at a German AI startup.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a href="#projects" className="btn btn-primary">
            View projects <ArrowRight size={16} />
          </a>
          <a href={site.resume} target="_blank" rel="noreferrer" className="btn">
            <Download size={15} /> Resume
          </a>
          <div className="hidden sm:block mx-1 h-8 w-px bg-[color:var(--border)]" />
          <div className="flex items-center gap-1.5">
            <IconLink href={site.social.github} label="GitHub">
              <Github size={16} />
            </IconLink>
            <IconLink href={site.social.linkedin} label="LinkedIn">
              <Linkedin size={16} />
            </IconLink>
            <IconLink href={site.social.email} label="Email">
              <Mail size={16} />
            </IconLink>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 md:mt-24 flex items-center gap-2 text-xs font-mono text-[color:var(--fg-dim)]"
        >
          <MousePointer2 size={12} />
          <span>Scroll — or hover anything. Most of this site is quietly alive.</span>
        </motion.div>
      </div>
    </section>
  );
}

function StatusPill() {
  return (
    <a
      href={site.currentStatus.href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-2.5 rounded-full border border-[color:var(--border)] bg-[color:var(--bg-elev)]/70 backdrop-blur px-3.5 py-1.5 text-xs font-mono hover:border-[color:var(--border-strong)] transition"
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-[color:var(--accent-3)] opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-[color:var(--accent-3)]" />
      </span>
      <span className="text-[color:var(--fg-muted)]">
        <span className="text-[color:var(--fg)]">Currently</span> — {site.currentStatus.label}
      </span>
      <ArrowRight size={12} className="translate-x-0 group-hover:translate-x-0.5 transition" />
    </a>
  );
}

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="inline-flex size-9 items-center justify-center rounded-md border border-[color:var(--border)] bg-[color:var(--bg-elev)] text-[color:var(--fg-muted)] hover:text-[color:var(--fg)] hover:border-[color:var(--border-strong)] transition"
    >
      {children}
    </a>
  );
}

/** Signature element: orbit of tech badges in the upper-right. */
function OrbitBadge() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-2 top-20 md:right-8 md:top-24 hidden md:block"
    >
      <div className="relative size-[420px] lg:size-[500px]">
        {/* Soft glow layers behind everything */}
        <div className="absolute inset-16 rounded-full bg-[color:var(--accent)]/10 blur-3xl" />
        <div className="absolute inset-28 rounded-full bg-[color:var(--accent-2)]/10 blur-2xl" />

        {/* Sonar-style pulse rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`pulse-${i}`}
            className="absolute left-1/2 top-1/2 size-24 rounded-full border border-[color:var(--accent)]/40"
            style={{ marginLeft: -48, marginTop: -48 }}
            animate={{ scale: [0.8, 3.2], opacity: [0.5, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.33,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Concentric rings — static, varied styles */}
        <div className="absolute inset-0 rounded-full border border-[color:var(--border)]/70" />
        <div className="absolute inset-[40px] rounded-full border border-dashed border-[color:var(--border-strong)]/70" />
        <div className="absolute inset-[84px] rounded-full border border-[color:var(--border)]/70" />
        <div className="absolute inset-[128px] rounded-full border-[1.5px] border-dotted border-[color:var(--border-strong)]" />

        {/* Tick marks on the outer ring — simulates a radar dial */}
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={`tick-${i}`}
            className="absolute left-1/2 top-1/2 origin-bottom"
            style={{
              width: 1,
              height: 6,
              marginLeft: -0.5,
              transform: `rotate(${i * 15}deg) translateY(-250px)`,
              background: i % 6 === 0 ? "var(--accent)" : "var(--border-strong)",
              opacity: i % 6 === 0 ? 0.8 : 0.4,
            }}
          />
        ))}

        {/* Orbiting badges — counter-rotated so text stays upright */}
        {orbitBadges.map((b, i) => (
          <OrbitItem key={`badge-${i}`} {...b} />
        ))}

        {/* Decorative dots on a middle ring */}
        {Array.from({ length: 4 }).map((_, i) => (
          <OrbitItem
            key={`dot-${i}`}
            radius={170}
            speed={22}
            start={i * 90 + 45}
            reverse
            render={
              <span className="block size-1.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_10px_var(--accent)]" />
            }
          />
        ))}

        {/* Central core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full border border-[color:var(--accent)]/25 animate-pulse" />
            <div className="size-24 rounded-full bg-[color:var(--bg-elev)] border border-[color:var(--border-strong)] flex items-center justify-center relative shadow-[0_0_40px_var(--accent)]/30">
              <Sparkles size={22} className="text-[color:var(--accent)]" />
              <div className="absolute inset-0 rounded-full animate-ping bg-[color:var(--accent)]/15" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type OrbitItemProps = {
  radius: number;
  speed: number;
  start: number;
  reverse?: boolean;
  label?: string;
  color?: string;
  render?: React.ReactNode;
};

function OrbitItem({
  radius,
  speed,
  start,
  reverse,
  label,
  color,
  render,
}: OrbitItemProps) {
  const dir = reverse ? -1 : 1;
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        width: radius * 2,
        height: radius * 2,
        marginLeft: -radius,
        marginTop: -radius,
      }}
      animate={{ rotate: [start, start + dir * 360] }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        animate={{ rotate: [-start, -start - dir * 360] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {render ?? (
          <div
            className="font-mono text-[10px] px-2.5 py-1 rounded-full border bg-[color:var(--bg-elev)]/90 backdrop-blur whitespace-nowrap flex items-center gap-1.5"
            style={{
              borderColor: `${color}55`,
              color,
              boxShadow: `0 0 24px ${color}22`,
            }}
          >
            <span
              className="size-1.5 rounded-full"
              style={{
                background: color,
                boxShadow: `0 0 6px ${color}`,
              }}
            />
            {label}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

const orbitBadges: OrbitItemProps[] = [
  // Outer ring
  { radius: 244, speed: 48, start: 0, label: "PyTorch", color: "#ee4c2c" },
  { radius: 244, speed: 48, start: 120, label: "LangGraph", color: "#a78bfa" },
  { radius: 244, speed: 48, start: 240, label: "XLS-R", color: "#f59e0b" },
  // Middle ring (reverse)
  { radius: 202, speed: 36, start: 60, reverse: true, label: "Next.js", color: "#eaecef" },
  { radius: 202, speed: 36, start: 200, reverse: true, label: "FastAPI", color: "#34d399" },
  // Inner ring
  { radius: 158, speed: 24, start: 30, label: "Gemini", color: "#22d3ee" },
  { radius: 158, speed: 24, start: 210, label: "Claude", color: "#f472b6" },
];
