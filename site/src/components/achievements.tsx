"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { achievements } from "@/data/site";
import { Section } from "./section";

export default function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="06 · Honors"
      title={<>Things I've won (or nearly did).</>}
      subtitle="National-level hackathon finals, a selective ML program, and the occasional DTU-level win."
    >
      <div className="grid md:grid-cols-2 gap-4">
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="group card p-5 flex gap-4 hover:border-[color:var(--accent)]/40 transition"
          >
            <div className="shrink-0 size-10 rounded-lg bg-[color:var(--bg-raise)] border border-[color:var(--border-strong)] flex items-center justify-center text-[color:var(--accent)] group-hover:scale-110 transition">
              <Trophy size={18} />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <div className="font-medium leading-snug">{a.title}</div>
                <span className="chip shrink-0">{a.year}</span>
              </div>
              <p className="mt-1.5 text-sm text-[color:var(--fg-muted)]">{a.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
