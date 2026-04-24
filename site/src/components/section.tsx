import { clsx } from "clsx";

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
  action,
}: {
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <section id={id} className={clsx("relative py-24 md:py-28 scroll-mt-20", className)}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="section-header">
          <div className="max-w-2xl">
            <div className="eyebrow">{eyebrow}</div>
            <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-[-0.02em]">{title}</h2>
            {subtitle && <p className="mt-4 text-[color:var(--fg-muted)] text-base md:text-lg">{subtitle}</p>}
          </div>
          {action}
        </div>
        {children}
      </div>
    </section>
  );
}
