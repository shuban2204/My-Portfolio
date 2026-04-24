import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative border-t border-[color:var(--border)] mt-16">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-xs font-mono text-[color:var(--fg-muted)]">
        <div>
          © {new Date().getFullYear()} {site.name}. Built with Next.js, Tailwind, and Framer Motion.
        </div>
        <div className="flex items-center gap-4">
          <a href={site.social.github} target="_blank" rel="noreferrer" className="hover:text-[color:var(--fg)] transition">
            GitHub
          </a>
          <a href={site.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-[color:var(--fg)] transition">
            LinkedIn
          </a>
          <a href={site.social.email} className="hover:text-[color:var(--fg)] transition">
            Email
          </a>
          <a href="#top" className="hover:text-[color:var(--fg)] transition">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
