# shuddhabrota.dev — personal portfolio

Personal portfolio for **Shuddhabrota Banerjee** — AI/ML engineer, MLOps intern at Scaile.tech,
currently at Delhi Technological University.

Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion**.

## Features

- **Single-page, section-scroll** layout: Hero → About → Experience → Projects → Research → Stack → Honors → Contact.
- **Signature interactive elements:** cursor spotlight, orbiting tech badge in the hero, category-filtered project grid with per-card cursor-tracked glow, interactive tech-stack pills + auto-scrolling marquee, animated timeline, magnetic buttons, and section-aware nav highlight.
- **SEO-ready:** Next `metadata` API with OpenGraph + Twitter card, JSON-LD `Person` schema, auto-generated `robots.txt` and `sitemap.xml`, semantic HTML, canonical URL, proper heading hierarchy, and font `display: swap`.
- **Accessible:** respects `prefers-reduced-motion`, keyboard-navigable, color-contrast-friendly, semantic landmarks.
- **Fully responsive** — desktop, tablet, mobile.

## Project structure

```
site/
├── public/
│   └── Shuddhabrota_Banerjee_Resume.pdf      # served at /Shuddhabrota_Banerjee_Resume.pdf
├── src/
│   ├── app/
│   │   ├── layout.tsx                        # fonts, SEO metadata, JSON-LD
│   │   ├── page.tsx                          # home page composition
│   │   ├── globals.css                       # design tokens + utilities
│   │   ├── icon.svg                          # favicon
│   │   ├── robots.ts                         # auto robots.txt
│   │   └── sitemap.ts                        # auto sitemap.xml
│   ├── components/
│   │   ├── nav.tsx                           # sticky nav + mobile drawer
│   │   ├── hero.tsx                          # hero + orbit badge
│   │   ├── about.tsx                         # about + education + roles
│   │   ├── experience.tsx                    # timeline (Scaile, Matiks)
│   │   ├── projects.tsx                      # filterable project grid
│   │   ├── research.tsx                      # deeper experiment write-ups
│   │   ├── tech-stack.tsx                    # categorised stack + marquee
│   │   ├── achievements.tsx                  # honors grid
│   │   ├── contact.tsx                       # contact CTAs
│   │   ├── footer.tsx
│   │   ├── section.tsx                       # section scaffold
│   │   └── spotlight.tsx                     # cursor spotlight
│   └── data/
│       └── site.ts                           # single source of truth for content
```

## Editing content

All portfolio content — projects, experience, achievements, tech stack, links, nav items — lives in
[`src/data/site.ts`](src/data/site.ts). Edit that one file and the site updates everywhere.

To replace the resume, drop a new PDF at `public/Shuddhabrota_Banerjee_Resume.pdf` (or update the
`resume` path in `src/data/site.ts`).

## Local development

```bash
cd site
npm install
npm run dev
# open http://localhost:3000
```

Other scripts:

```bash
npm run build     # production build
npm run start     # serve the production build locally
npm run lint      # ESLint
```

## Deploy to Vercel

1. Push this repo to GitHub (e.g. `shuban2204/portfolio`).
2. On [vercel.com/new](https://vercel.com/new), import the repo.
3. Root directory: `site`. Framework preset: **Next.js** (auto-detected).
4. Click **Deploy**. Done.
5. For the custom domain (`shuddhabrota.dev`), go to **Settings → Domains** in the Vercel project,
   add the domain, and point your registrar's DNS records as Vercel instructs.

Update `site.url` in `src/data/site.ts` if you deploy under a different domain — `sitemap.xml`,
`robots.txt`, canonical URL, JSON-LD, and OpenGraph all read from it.

## OG image (optional but recommended)

Drop a 1200×630 PNG at `public/og.png` to get a proper preview card when someone shares the
site on LinkedIn, Twitter, or iMessage. Until it exists, the meta tag still renders but the link
404s — harmless but worth fixing before going live.

## Tweak the look

Design tokens live at the top of [`src/app/globals.css`](src/app/globals.css):

```
--accent:  #22d3ee;   /* primary */
--accent-2: #a78bfa;  /* secondary */
--accent-3: #34d399;  /* tertiary */
```

Change them, reload, done.
