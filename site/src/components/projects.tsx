"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/data/site";
import { Section } from "./section";
import { useState } from "react";

export default function Projects() {
  const [filter, setFilter] = useState<"All" | "Research" | "GenAI" | "Full-stack AI">("All");
  const visible = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <Section
      id="projects"
      eyebrow="03 · Projects"
      title={<>Selected work.</>}
      subtitle="A mix of research-style ML, agentic GenAI, and full-stack AI products. Hover a card — each one lights up differently."
      action={
        <div className="inline-flex items-center gap-1 p-1 rounded-full border border-[color:var(--border)] bg-[color:var(--bg-elev)]">
          {(["All", "Research", "GenAI", "Full-stack AI"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative px-3 py-1.5 text-xs font-mono rounded-full transition ${
                filter === f ? "text-[color:var(--fg)]" : "text-[color:var(--fg-muted)] hover:text-[color:var(--fg)]"
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-[color:var(--bg-raise)] border border-[color:var(--border-strong)]"
                  transition={{ type: "spring", stiffness: 360, damping: 30 }}
                />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>
      }
    >
      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map((p, i) => (
          <ProjectCard key={p.slug} p={p} idx={i} />
        ))}
      </motion.div>
    </Section>
  );
}

type P = (typeof projects)[number];

function ProjectCard({ p, idx }: { p: P; idx: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const bg = useMotionTemplate`radial-gradient(240px circle at ${mx}px ${my}px, color-mix(in oklab, var(--accent) 18%, transparent), transparent 60%)`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.25) }}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      className="card card-shine group relative p-5 md:p-6 h-full flex flex-col"
    >
      <motion.div aria-hidden className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: bg }} />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={`chip ${categoryChip(p.category)}`}>{p.category}</span>
          <span className="chip">{p.year}</span>
        </div>
        <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition">
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex size-8 items-center justify-center rounded-md border border-[color:var(--border)] bg-[color:var(--bg-elev)] hover:border-[color:var(--border-strong)]"
            >
              <Github size={14} />
            </a>
          )}
          {p.href && (
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              aria-label="Live"
              className="inline-flex size-8 items-center justify-center rounded-md border border-[color:var(--border)] bg-[color:var(--bg-elev)] hover:border-[color:var(--border-strong)]"
            >
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>

      <h3 className="relative mt-5 text-xl md:text-2xl font-semibold tracking-tight">{p.name}</h3>
      <p className="relative mt-1.5 text-sm text-[color:var(--accent)] font-mono">{p.tagline}</p>
      <p className="relative mt-4 text-sm text-[color:var(--fg-muted)] leading-relaxed flex-1">
        {p.description}
      </p>

      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {p.stack.map((s) => (
          <span key={s} className="chip">
            {s}
          </span>
        ))}
      </div>

      {p.metric && (
        <div className="relative mt-5 pt-4 border-t border-dashed border-[color:var(--border)] flex items-center justify-between text-xs font-mono">
          <span className="text-[color:var(--fg-dim)]">Signal</span>
          <span className="text-[color:var(--fg)]">{p.metric}</span>
        </div>
      )}
    </motion.article>
  );
}

function categoryChip(c: P["category"]) {
  if (c === "Research") return "!text-[color:var(--accent)] !border-[color:var(--accent)]/30";
  if (c === "GenAI") return "!text-[color:var(--accent-2)] !border-[color:var(--accent-2)]/30";
  return "!text-[color:var(--accent-3)] !border-[color:var(--accent-3)]/30";
}
