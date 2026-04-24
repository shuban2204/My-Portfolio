"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Section } from "./section";
import { MousePointerClick } from "lucide-react";

const TechSpheres = dynamic(() => import("./tech-spheres"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-[color:var(--fg-dim)]">
      loading 3d scene…
    </div>
  ),
});

const legend = [
  { label: "AI / ML", color: "#ee4c2c" },
  { label: "GenAI", color: "#a78bfa" },
  { label: "Backend", color: "#34d399" },
  { label: "Frontend", color: "#22d3ee" },
  { label: "Infra", color: "#f59e0b" },
  { label: "Languages", color: "#f472b6" },
];

export default function TechStack() {
  return (
    <Section
      id="stack"
      eyebrow="05 · Stack"
      title={<>The tools I actually use.</>}
      subtitle="Move your cursor into the cloud to push the spheres. Each ball is a tech I've shipped with — colored by category."
    >
      <div className="relative h-[520px] md:h-[640px] rounded-3xl border border-[color:var(--border)] bg-[radial-gradient(120%_80%_at_50%_0%,rgba(34,211,238,0.06),transparent_60%),linear-gradient(180deg,var(--bg-elev),var(--bg))] overflow-hidden">
        {/* Canvas */}
        <div className="absolute inset-0">
          <TechSpheres />
        </div>

        {/* Title overlay */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 pointer-events-none flex items-center"
        >
          <div className="w-full max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-end">
            <div className="text-right">
              <div className="eyebrow justify-end">The cloud</div>
              <h3 className="mt-3 text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[0.95]">
                MY<br />
                <span className="gradient-text">TECH</span>STACK
              </h3>
              <p className="mt-4 hidden md:block text-[color:var(--fg-muted)] text-sm max-w-[280px] ml-auto">
                Drag · hover · click a sphere.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Hint (bottom-left) */}
        <div className="absolute left-4 md:left-6 bottom-4 md:bottom-6 flex items-center gap-2 text-[11px] font-mono text-[color:var(--fg-dim)] pointer-events-none">
          <MousePointerClick size={12} />
          <span>click any sphere</span>
        </div>

        {/* Legend (bottom) */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 md:bottom-6 flex flex-wrap justify-center gap-x-4 gap-y-2 px-4 py-2 rounded-full border border-[color:var(--border)] bg-[color:var(--bg-elev)]/70 backdrop-blur pointer-events-none text-[11px] font-mono">
          {legend.map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span
                className="size-1.5 rounded-full"
                style={{ background: l.color, boxShadow: `0 0 8px ${l.color}` }}
              />
              <span className="text-[color:var(--fg-muted)]">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Small note below, to keep SEO keywords crawlable for the stack */}
      <p className="mt-6 text-xs font-mono text-[color:var(--fg-dim)] text-center">
        PyTorch · TensorFlow · HuggingFace · LangChain · LangGraph · LlamaIndex · Gemini · Claude · RAG ·
        Next.js · React · Tailwind · FastAPI · Node.js · Postgres · Supabase · Redis · Neo4j ·
        GCP · AWS · Docker · Vercel · Render · Python · TypeScript · C++
      </p>
    </Section>
  );
}
