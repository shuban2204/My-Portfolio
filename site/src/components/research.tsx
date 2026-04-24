"use client";

import { motion } from "framer-motion";
import { FlaskConical, ArrowUpRight } from "lucide-react";
import { Section } from "./section";

type Experiment = {
  title: string;
  blurb: string;
  points: string[];
  stack: string[];
  href?: string;
};

const experiments: Experiment[] = [
  {
    title: "SBAS — Self-Blended Audio Synthesis",
    blurb:
      "Training an audio deepfake detector that generalizes across unseen TTS systems by synthesizing its own pseudo-fakes.",
    points: [
      "Freezes XLS-R 300M and learns a Sensitive Layer Selection module to gate the most informative transformer layers.",
      "Three heads: binary classification (real vs fake), temporal boundary detection for splice localization, and a consistency head for artifact coherence.",
      "Pseudo-fake generator mixes phoneme splicing, prosody transfer, and formant blending — no dependency on specific TTS systems.",
    ],
    stack: ["PyTorch", "XLS-R", "SSL", "Attention pooling"],
    href: "https://github.com/shuban2204/sbas",
  },
  {
    title: "OpenEnv FinOps — Cloud cost as an RL environment",
    blurb:
      "A realistic AWS-like fleet where an agent plays Cloud Financial Engineer, respecting SLA and dependency constraints.",
    points: [
      "Action space: terminate, delete-volume, resize, convert-to-spot, purchase-RI, skip, submit — all five tested in a capstone task.",
      "Multi-dimensional scoring (savings, safety-violations, completeness, precision, steps) and adversarial traps that fool naive heuristics.",
      "Pre-computed analysis engine handles SLA math and eligibility so the LLM reasons instead of doing arithmetic.",
    ],
    stack: ["OpenEnv", "Python", "Docker", "RL"],
    href: "https://github.com/shuban2204/OpenEnvMetaRLHack",
  },
  {
    title: "CloudGAN & SAR→EO translation",
    blurb: "Cross-modal satellite imagery translation with a CycleGAN pipeline on SEN12MS winter data.",
    points: [
      "Cloudy Sentinel-2 → clear-scene CycleGAN: 0.8 SSIM, 0.21 LPIPS, 30% fewer cloud artifacts.",
      "Full preprocessing pipeline: cloud-mask filtering, patch extraction, AMP-optimized training (20% faster).",
      "Explored multiple output band configurations to trade off perceptual quality and spectral fidelity.",
    ],
    stack: ["PyTorch", "CycleGAN", "Sentinel-2", "AMP"],
    href: "https://github.com/shuban2204/cycleGAN",
  },
];

export default function Research() {
  return (
    <Section
      id="research"
      eyebrow="04 · Research & Experiments"
      title={<>Papers, but make them runnable.</>}
      subtitle="A few deeper dives where I took something from a paper and built a working implementation — with the design tradeoffs written down."
    >
      <div className="space-y-5">
        {experiments.map((x, i) => (
          <motion.article
            key={x.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="card p-6 md:p-8 grid md:grid-cols-[200px_1fr] gap-6"
          >
            <div className="flex md:flex-col gap-3 md:gap-4 items-start">
              <div className="inline-flex items-center gap-2 chip !text-[color:var(--accent)] !border-[color:var(--accent)]/30">
                <FlaskConical size={12} /> Experiment {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {x.stack.map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-xl md:text-2xl font-semibold">{x.title}</h3>
                {x.href && (
                  <a
                    href={x.href}
                    target="_blank"
                    rel="noreferrer"
                    className="btn !py-1.5 !px-3 text-xs"
                  >
                    Repo <ArrowUpRight size={12} />
                  </a>
                )}
              </div>
              <p className="mt-2 text-[color:var(--fg-muted)]">{x.blurb}</p>
              <ul className="mt-4 space-y-2 text-sm text-[color:var(--fg-muted)] leading-relaxed">
                {x.points.map((p, j) => (
                  <li key={j} className="relative pl-4">
                    <span className="absolute left-0 top-2 size-1 rounded-full bg-[color:var(--accent-2)]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
