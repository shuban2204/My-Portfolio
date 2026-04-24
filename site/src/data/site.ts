export const site = {
  name: "Shuddhabrota Banerjee",
  shortName: "Shuddhabrota",
  role: "AI/ML Engineer · MLOps · Full-Stack Builder",
  tagline:
    "I build end-to-end AI systems — from XLS-R-based deepfake detection to multi-tenant SaaS at a German AI startup.",
  location: "Delhi, India",
  email: "shuddhabrota1981@gmail.com",
  phone: "+91 9654175997",
  url: "https://shuddhabrota.dev",
  resume: "/Shuddhabrota_Banerjee_Resume.pdf",
  social: {
    github: "https://github.com/shuban2204",
    linkedin: "https://www.linkedin.com/in/shuddhabrota-banerjee-23a120293/",
    leetcode: "https://leetcode.com/u/shuban2204/",
    email: "mailto:shuddhabrota1981@gmail.com",
  },
  currentStatus: {
    label: "MLOps Engineer Intern at Scaile.tech",
    href: "https://scaile.tech",
  },
} as const;

export const about = [
  "I'm a third-year BTech CSE student at Delhi Technological University who spends most of his time either reading ML papers and re-implementing them, or shipping production systems that use the models I just built.",
  "Right now I'm the MLOps intern at Scaile.tech (Germany, remote), where I'm architecting the backend of an AEO platform — multi-agent LLM workflows, Redis-based parallel processing, Stripe payments, multi-tenant auth, and Postgres migrations. Before that I was at Matiks as an AI Engineer intern, building a multi-agent math-question generator on Vertex AI + BigQuery and a Bi-LSTM knowledge-tracing model.",
  "My favorite work lives at the seam between research and product: taking something that started as a paper and turning it into a thing people can actually use.",
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  href?: string;
  highlights: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    company: "Scaile.tech",
    role: "MLOps Engineer Intern",
    period: "Jan 2026 — Present",
    location: "Germany · Remote",
    href: "https://scaile.tech",
    highlights: [
      "Architected and optimized the backend of an AEO platform: company-context extraction, keyword and blog generation, and AI-engine mention analytics.",
      "Streamlined multi-agent workflows, LLM prompts, Redis-based parallel processing, and caching; wired Supabase for identity and Postgres for app data.",
      "Shipped Stripe payments, 2FA auth, multi-tenancy with RBAC and team invites, EN/DE i18n, and Strapi CMS cutover for the marketing site.",
      "Deployed the production full-stack application on Render for scalable, reliable delivery.",
    ],
    stack: ["Next.js", "FastAPI", "Postgres", "Supabase", "Redis", "Gemini", "Claude", "Stripe", "Strapi", "Render"],
  },
  {
    company: "Matiks",
    role: "AI Engineer Intern",
    period: "Dec 2024 — May 2025",
    location: "Remote",
    href: "https://matiks.com",
    highlights: [
      "Built an AI-powered multi-agent platform generating 100+ math question templates with real-time validation; reduced generation time by 20% using Vertex AI, stored on BigQuery.",
      "Deployed a Bi-LSTM Deep Knowledge Tracing model on 20K+ interactions to model topic mastery, enabling personalized learning paths and adaptive practice.",
    ],
    stack: ["Python", "Vertex AI", "BigQuery", "TensorFlow", "Multi-Agent"],
  },
];

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  stack: string[];
  href?: string;
  github?: string;
  metric?: string;
  featured?: boolean;
  category: "Research" | "GenAI" | "Full-stack AI";
  year: string;
};

export const projects: Project[] = [
  {
    slug: "sbas",
    name: "SBAS",
    tagline: "Self-Blended Audio Synthesis for domain-agnostic deepfake detection",
    description:
      "XLS-R 300M SSL backbone with a Sensitive Layer Selection module, classification + boundary + consistency heads. Trains on self-generated pseudo-fakes via phoneme splicing, prosody transfer, and formant blending — eliminating dependency on specific TTS systems.",
    tags: ["Audio", "Self-Supervised", "Deepfake"],
    stack: ["PyTorch", "XLS-R", "Hugging Face"],
    github: "https://github.com/shuban2204/sbas",
    metric: "Domain-agnostic",
    featured: true,
    category: "Research",
    year: "2026",
  },
  {
    slug: "openenv-finops",
    name: "OpenEnv FinOps RL",
    tagline: "Cloud cost optimization as a reinforcement-learning environment",
    description:
      "An OpenEnv environment where an agent acts as a Cloud Financial Engineer — deleting unused storage, right-sizing, migrating to spot/RI — while respecting SLA and dependency constraints. 6 graded tasks, multi-dimensional scoring, adversarial traps.",
    tags: ["RL", "Agents", "Cloud"],
    stack: ["Python", "Docker", "OpenEnv"],
    github: "https://github.com/shuban2204/OpenEnvMetaRLHack",
    metric: "$30B+ problem domain",
    featured: true,
    category: "Research",
    year: "2026",
  },
  {
    slug: "document-translator",
    name: "DocumentTranslator",
    tagline: "Layout-preserving PDF translation across 15+ languages",
    description:
      "Dual-pipeline system: PaddleOCR for text extraction, DocLayoutYOLO + PyMuPDF for layout detection, and a Gemini-powered translation agent with layout-aware prompting. Reliable parsing of multi-page PDFs and scanned documents with strong layout retention.",
    tags: ["OCR", "Agents", "Document AI"],
    stack: ["PaddleOCR", "DocLayoutYOLO", "Gemini", "PyMuPDF"],
    github: "https://github.com/shuban2204/DocumentTranslator",
    metric: "15+ languages",
    featured: true,
    category: "GenAI",
    year: "2025",
  },
  {
    slug: "cyclegan",
    name: "CloudGAN / SAR→EO",
    tagline: "Cloud removal and cross-modal translation for satellite imagery",
    description:
      "A CycleGAN-based model that translates cloudy Sentinel-2 images into cloud-free counterparts (0.8 SSIM, 0.21 LPIPS) and SAR→EO translation on SEN12MS. Full preprocessing and AMP-optimized training pipeline reduced cloud artifacts by 30%.",
    tags: ["GAN", "Remote Sensing", "Computer Vision"],
    stack: ["PyTorch", "CycleGAN", "Sentinel-2"],
    github: "https://github.com/shuban2204/cycleGAN",
    metric: "0.8 SSIM · 0.21 LPIPS",
    featured: true,
    category: "Research",
    year: "2025",
  },
  {
    slug: "tutorx",
    name: "TutorX",
    tagline: "Adaptive learning with knowledge tracing and careless-error detection",
    description:
      "A gamified CS-education platform: Bayesian knowledge tracing with a forgetting model, progressive 3-level hints, AI tutor powered by Gemini 2.0 Flash, and story-mode / sprints / marathons for engagement.",
    tags: ["EdTech", "Agents", "Full-stack"],
    stack: ["React", "TypeScript", "Vite", "Node", "Gemini"],
    github: "https://github.com/shuban2204/TutorX",
    metric: "Adaptive difficulty",
    featured: true,
    category: "Full-stack AI",
    year: "2026",
  },
  {
    slug: "fraudguard",
    name: "FraudGuard",
    tagline: "Real-time risk scoring for insurance claims with RAG",
    description:
      "LlamaIndex + Groq LLM analyze claim documents, extract insights, and flag anomalies. GPT-4o-powered investigative assistant helps agents triage active, flagged, and resolved claims through a unified dashboard.",
    tags: ["RAG", "FinServ", "Full-stack"],
    stack: ["LlamaIndex", "Groq", "GPT-4o", "React", "Streamlit"],
    github: "https://github.com/shuban2204/FraudGuard",
    metric: "Claims-grade",
    featured: true,
    category: "Full-stack AI",
    year: "2026",
  },
  {
    slug: "supria",
    name: "SupRIA",
    tagline: "Knowledge-graph insurance recommender with RLHF",
    description:
      "Knowledge graph–powered recommendation system for SBI Life: reduced user search time by 43% across a 1,000+ product catalog and improved prediction accuracy by 21.3% using updated NLP pipelines and RLHF.",
    tags: ["Knowledge Graph", "RLHF", "NLP"],
    stack: ["Django", "Neo4j", "RLHF", "Transformers"],
    metric: "−43% search time",
    category: "GenAI",
    year: "2025",
  },
  {
    slug: "cooking-voice",
    name: "Cooking Voice Agent",
    tagline: "Real-time, hands-free cooking assistant",
    description:
      "Streaming voice loop: AssemblyAI ASR → Gemini 2.0 Flash reasoning → Murf Falcon streaming TTS, glued by Flask-SocketIO for low-latency bidirectional audio.",
    tags: ["Voice", "Streaming", "Agents"],
    stack: ["AssemblyAI", "Gemini", "Murf", "Flask-SocketIO"],
    github: "https://github.com/shuban2204/CookinfVoiceAgent",
    metric: "Low-latency",
    category: "Full-stack AI",
    year: "2025",
  },
  {
    slug: "prism",
    name: "PRISM",
    tagline: "Product price regression via image + semantic modeling",
    description:
      "Two-stage pipeline: RoBERTa classifier fine-tuned on catalog text predicts 14 ordinal price bins (Box-Cox, winsorized), then LightGBM ensembles the classifier output with engineered features.",
    tags: ["NLP", "Regression", "Ensembling"],
    stack: ["RoBERTa", "LightGBM", "HuggingFace"],
    github: "https://github.com/shuban2204/PRISM",
    metric: "SMAPE-tuned",
    category: "Research",
    year: "2025",
  },
];

export const techCategories = [
  {
    id: "ai-ml",
    label: "AI / ML",
    items: [
      { name: "PyTorch", note: "SBAS, CycleGAN, HR-VITON" },
      { name: "TensorFlow", note: "Matiks Bi-LSTM KT" },
      { name: "Hugging Face", note: "XLS-R, RoBERTa" },
      { name: "OpenCV", note: "Vision preprocessing" },
      { name: "Vision Transformers", note: "Image modeling" },
      { name: "Reinforcement Learning", note: "OpenEnv FinOps" },
      { name: "Knowledge Graphs", note: "SupRIA (Neo4j)" },
      { name: "Transfer Learning", note: "Cross-domain fine-tunes" },
    ],
  },
  {
    id: "genai",
    label: "GenAI & Agents",
    items: [
      { name: "LangChain", note: "Agent orchestration" },
      { name: "LangGraph", note: "Stateful agent graphs" },
      { name: "LlamaIndex", note: "FraudGuard RAG" },
      { name: "RAG", note: "Retrieval-augmented pipelines" },
      { name: "Gemini", note: "Scaile blog + DocumentTranslator" },
      { name: "Claude Opus", note: "Blog-engine at Scaile" },
      { name: "Vertex AI", note: "Matiks generation platform" },
      { name: "BLIP", note: "Vision-language" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      { name: "Python", note: "Primary language" },
      { name: "FastAPI", note: "Scaile platform backend" },
      { name: "Node.js", note: "TutorX server" },
      { name: "Postgres", note: "Render + pgvector" },
      { name: "Supabase", note: "Auth + storage" },
      { name: "Redis", note: "Caching + parallelism" },
      { name: "BigQuery", note: "Matiks analytics" },
      { name: "Neo4j", note: "SupRIA graphs" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { name: "Next.js", note: "Scaile platform + this site" },
      { name: "React", note: "TutorX, FraudGuard" },
      { name: "TypeScript", note: "End-to-end" },
      { name: "Tailwind CSS", note: "Design system" },
      { name: "Framer Motion", note: "Motion layer" },
      { name: "Vite", note: "Fast dev" },
    ],
  },
  {
    id: "infra",
    label: "Infra & Deploy",
    items: [
      { name: "Google Cloud", note: "Vertex AI, BigQuery" },
      { name: "AWS", note: "GenAI with LLMs cert" },
      { name: "Render", note: "Scaile production" },
      { name: "Vercel", note: "Frontend hosting" },
      { name: "Docker", note: "Environment packaging" },
      { name: "Stripe", note: "Payments at Scaile" },
      { name: "Strapi", note: "CMS cutover" },
      { name: "Resend", note: "Transactional email" },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    items: [
      { name: "Python", note: "Primary" },
      { name: "C++", note: "DSA · 150+ LeetCode" },
      { name: "C", note: "Systems-adjacent" },
      { name: "TypeScript", note: "Frontend + backend" },
      { name: "JavaScript", note: "Legacy/glue" },
      { name: "HTML / CSS", note: "Web fundamentals" },
    ],
  },
];

export const achievements = [
  {
    title: "Grand Finalist · Smart India Hackathon 2025",
    description:
      "AOI-based IC marking system to identify fake marking on integrated circuits.",
    year: "2025",
  },
  {
    title: "Amazon ML Summer School 2025",
    description:
      "Selected among top candidates nationwide for Amazon's advanced ML program.",
    year: "2025",
  },
  {
    title: "Grand Finalist · SBI LIFE Hack_AI_THON 2024",
    description:
      "Out of 500+ teams — built SupRIA, an AI-driven personalisation engine for insurance policies.",
    year: "2024",
  },
  {
    title: "Winner · CodeCrunch ML, Invictus DTU",
    description:
      "Facial Emotion Detection Challenge by Microsoft — 70% accuracy.",
    year: "2024",
  },
  {
    title: "Finalist · Adobe Devcraft 2025",
    description: "Real-time bidding optimization problem statement at DTU.",
    year: "2025",
  },
];

export const education = [
  {
    institute: "Delhi Technological University",
    degree: "B.Tech, Computer Science and Engineering",
    period: "2023 — 2027",
    score: "CGPA 8.3",
  },
  {
    institute: "Kendriya Vidyalaya Sec-8, RK Puram",
    degree: "Senior Secondary (CBSE)",
    period: "2022",
    score: "96%",
  },
  {
    institute: "Kendriya Vidyalaya Sec-8, RK Puram",
    degree: "Secondary (CBSE)",
    period: "2020",
    score: "95.8%",
  },
];

export const positions = [
  {
    title: "Joint Treasurer, AIMS-DTU",
    period: "Aug 2025 — Present",
  },
  {
    title: "Technical Designer, ACM-DTU Students' Chapter",
    period: "Dec 2025 — Present",
  },
  {
    title: "Organizer, BrAInwave Hackathon (DTU)",
    period: "Oct — Nov 2024",
  },
];

export const nav = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#research", label: "Research" },
  { href: "#stack", label: "Stack" },
  { href: "#achievements", label: "Honors" },
  { href: "#contact", label: "Contact" },
] as const;
