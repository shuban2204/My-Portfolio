"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase } from "lucide-react";
import { experiences } from "@/data/site";
import { Section } from "./section";

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="02 · Experience"
      title={<>Where I've shipped.</>}
      subtitle="Two internships, both meaningfully technical — no coffee-running."
    >
      <ol className="relative border-l border-[color:var(--border)] ml-3 md:ml-4 space-y-10">
        {experiences.map((e, i) => (
          <motion.li
            key={e.company}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="pl-6 md:pl-10 relative"
          >
            <span className="absolute -left-[7px] top-1.5 size-3 rounded-full bg-[color:var(--accent)] shadow-[0_0_0_4px_var(--bg),0_0_18px_var(--accent)]" />
            <div className="card p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-[color:var(--fg-muted)] text-xs font-mono">
                    <Briefcase size={12} />
                    {e.period} · {e.location}
                  </div>
                  <h3 className="mt-2 text-xl md:text-2xl font-semibold">
                    {e.role}{" "}
                    <span className="text-[color:var(--fg-muted)] font-normal">at</span>{" "}
                    {e.href ? (
                      <a
                        href={e.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[color:var(--accent)] inline-flex items-center gap-1 group"
                      >
                        {e.company}
                        <ArrowUpRight size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
                      </a>
                    ) : (
                      e.company
                    )}
                  </h3>
                </div>
              </div>

              <ul className="mt-5 space-y-2.5 text-[color:var(--fg-muted)] text-sm md:text-base leading-relaxed">
                {e.highlights.map((h, j) => (
                  <li key={j} className="relative pl-4">
                    <span className="absolute left-0 top-2.5 size-1 rounded-full bg-[color:var(--accent-2)]" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {e.stack.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
