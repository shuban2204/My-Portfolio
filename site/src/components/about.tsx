"use client";

import { motion } from "framer-motion";
import { about, education, positions } from "@/data/site";
import { Section } from "./section";
import { GraduationCap, Users } from "lucide-react";

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="01 · About"
      title={<>The short version.</>}
      subtitle="Third-year CSE undergrad who lives at the seam between research and product."
    >
      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3 space-y-5 text-[color:var(--fg-muted)] leading-relaxed text-base md:text-lg">
          {about.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        <aside className="md:col-span-2 space-y-5">
          <SideCard icon={<GraduationCap size={16} />} title="Education">
            <ul className="space-y-3 text-sm">
              {education.map((e) => (
                <li key={e.institute + e.period}>
                  <div className="text-[color:var(--fg)] font-medium">{e.degree}</div>
                  <div className="text-[color:var(--fg-muted)]">{e.institute}</div>
                  <div className="text-xs font-mono text-[color:var(--fg-dim)] mt-0.5">
                    {e.period} · {e.score}
                  </div>
                </li>
              ))}
            </ul>
          </SideCard>

          <SideCard icon={<Users size={16} />} title="Roles & Responsibilities">
            <ul className="space-y-2 text-sm">
              {positions.map((p) => (
                <li key={p.title} className="flex flex-col">
                  <span className="text-[color:var(--fg)]">{p.title}</span>
                  <span className="text-xs font-mono text-[color:var(--fg-dim)]">{p.period}</span>
                </li>
              ))}
            </ul>
          </SideCard>
        </aside>
      </div>
    </Section>
  );
}

function SideCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="card p-5"
    >
      <div className="flex items-center gap-2 text-[color:var(--fg-muted)] text-xs font-mono uppercase tracking-wider mb-4">
        <span className="text-[color:var(--accent)]">{icon}</span>
        {title}
      </div>
      {children}
    </motion.div>
  );
}
