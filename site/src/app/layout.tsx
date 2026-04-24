import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#07080c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "Shuddhabrota Banerjee",
    "AI Engineer",
    "MLOps",
    "Machine Learning",
    "Deep Learning",
    "LLM",
    "Agentic AI",
    "RAG",
    "PyTorch",
    "Next.js",
    "Delhi Technological University",
    "Scaile.tech",
    "AEO",
    "Portfolio",
  ],
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    siteName: site.name,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: "MLOps Engineer Intern",
  worksFor: { "@type": "Organization", name: "Scaile.tech", url: "https://scaile.tech" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Delhi Technological University",
  },
  address: { "@type": "PostalAddress", addressLocality: "Delhi", addressCountry: "IN" },
  email: `mailto:${site.email}`,
  sameAs: [site.social.github, site.social.linkedin, site.social.leetcode],
  knowsAbout: [
    "Machine Learning",
    "Deep Learning",
    "MLOps",
    "LLM Agents",
    "Retrieval-Augmented Generation",
    "Computer Vision",
    "Knowledge Graphs",
    "Reinforcement Learning",
  ],
  description: site.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
