"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Code2 } from "lucide-react";
import { site } from "@/data/site";
import { Section } from "./section";

const links = [
  { href: site.social.email, label: "Email", hint: site.email, icon: Mail },
  { href: site.social.github, label: "GitHub", hint: "shuban2204", icon: Github },
  { href: site.social.linkedin, label: "LinkedIn", hint: "shuddhabrota-banerjee", icon: Linkedin },
  { href: site.social.leetcode, label: "LeetCode", hint: "150+ solved", icon: Code2 },
];

export default function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="07 · Contact"
      title={
        <>
          Let&apos;s build something{" "}
          <span className="gradient-text">together</span>.
        </>
      }
      subtitle="Open to internships, research collaborations, and interesting full-time conversations. The fastest way to reach me is email."
    >
      <div className="grid md:grid-cols-[1.2fr_1fr] gap-5 items-stretch">
        {/* Primary card */}
        <motion.a
          href={site.social.email}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="card card-shine group p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[240px]"
        >
          <div
            aria-hidden
            className="absolute -right-10 -bottom-10 size-48 rounded-full bg-[color:var(--accent)]/10 blur-3xl"
          />
          <div className="relative">
            <div className="eyebrow">Fastest</div>
            <div className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">{site.email}</div>
            <p className="mt-3 text-[color:var(--fg-muted)] max-w-md">
              Drop a line about what you&apos;re working on. I reply within a day — usually faster.
            </p>
          </div>
          <div className="relative mt-6 inline-flex items-center gap-2 text-sm text-[color:var(--accent)] font-mono">
            Write an email
            <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
          </div>
        </motion.a>

        {/* Links grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {links.map((l, i) => {
            const Icon = l.icon;
            return (
              <motion.a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                className="group card p-4 flex items-center gap-3 hover:border-[color:var(--border-strong)] transition"
              >
                <div className="size-9 rounded-md bg-[color:var(--bg-raise)] border border-[color:var(--border-strong)] flex items-center justify-center text-[color:var(--fg-muted)] group-hover:text-[color:var(--accent)] transition">
                  <Icon size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{l.label}</div>
                  <div className="text-xs text-[color:var(--fg-muted)] truncate">{l.hint}</div>
                </div>
                <ArrowUpRight
                  size={14}
                  className="text-[color:var(--fg-dim)] group-hover:text-[color:var(--fg)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition"
                />
              </motion.a>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
