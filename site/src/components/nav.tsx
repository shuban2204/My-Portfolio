"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/data/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav.map((n) => document.querySelector(n.href)).filter(Boolean) as Element[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-[color:var(--bg)]/70 border-b border-[color:var(--border)]" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="group flex items-center gap-2 font-mono text-sm">
          <span className="relative inline-flex size-7 items-center justify-center rounded-lg border border-[color:var(--border-strong)] bg-[color:var(--bg-elev)] text-[color:var(--accent)] font-bold">
            S
            <span className="absolute inset-0 rounded-lg ring-1 ring-[color:var(--accent)]/30 group-hover:ring-[color:var(--accent)]/70 transition" />
          </span>
          <span className="hidden sm:inline text-[color:var(--fg-muted)] group-hover:text-[color:var(--fg)] transition">
            shuddhabrota<span className="text-[color:var(--accent)]">.dev</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`relative px-3 py-1.5 text-sm rounded-md transition ${
                active === n.href
                  ? "text-[color:var(--fg)]"
                  : "text-[color:var(--fg-muted)] hover:text-[color:var(--fg)]"
              }`}
            >
              {active === n.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-md bg-[color:var(--bg-raise)] border border-[color:var(--border)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{n.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.resume}
            className="btn hidden md:inline-flex !py-1.5 !px-3 text-xs"
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
          <a href="#contact" className="btn btn-primary hidden md:inline-flex !py-1.5 !px-3 text-xs">
            Get in touch
          </a>
          <button
            className="md:hidden inline-flex items-center justify-center size-9 rounded-md border border-[color:var(--border)] bg-[color:var(--bg-elev)]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden border-t border-[color:var(--border)] bg-[color:var(--bg)]/95 backdrop-blur-xl"
          >
            <div className="px-5 py-4 flex flex-col gap-2">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-md text-sm text-[color:var(--fg-muted)] hover:bg-[color:var(--bg-elev)] hover:text-[color:var(--fg)]"
                >
                  {n.label}
                </a>
              ))}
              <div className="flex gap-2 pt-2">
                <a href={site.resume} className="btn flex-1 text-xs" target="_blank" rel="noreferrer">
                  Resume
                </a>
                <a href="#contact" className="btn btn-primary flex-1 text-xs" onClick={() => setOpen(false)}>
                  Contact
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
