export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  title: string;
  slug: string;
  featured: boolean;
  oneLiner: string;
  problem: string;
  approach: string;
  architectureBullets: string[];
  resultsBullets: string[];
  learnings: string[];
  techStack: string[];
  tags: string[];
  links: ProjectLink[];
  mermaid: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  tags: string[];
};

export type Achievement = {
  title: string;
  subtitle: string;
};

export type Publication = {
  title: string;
  venue: string;
  year?: string;
};

export const profile = {
  name: "Preet Sojitra",
  titles: ["AI Engineer", "ML Engineer", "Software Engineer"],
  email: "preetsojitralearning@gmail.com",
  phone: "+1 (951) 542-0336",
  location: "San Francisco, USA (Open to Relocation)",
  github: "https://github.com/preetsojitra2712",
  linkedin: "",
  summary:
    "AI / ML / Software Engineer focused on scalable intelligent systems across distributed infrastructure, agentic AI, and edge computing. Built production backends for 500K+ MAU and led automation and ML pipelines processing 10K+ records at global scale.",
};

export const counters = [
  { label: "Google Summer of Code 2025 (Unicode Consortium)", value: "Selected Contributor", source: "From resume" },
  { label: "TreeHacks 2026", value: "Stanford Hackathon", source: "From resume" },
  { label: "10K+ issues triaged / processed", value: "Global i18n workflows", source: "From resume" },
  { label: "500K+ MAU backend impact", value: "Banking platform", source: "From resume" },
  { label: "2M+ monthly queries handled", value: "Node.js microservices", source: "From resume" },
] as const;

export const links = {
  github: profile.github,
  linkedin: profile.linkedin,
  email: `mailto:${profile.email}`,
  phone: `tel:${profile.phone.replace(/\s/g, "")}`,
  resumePath: "https://drive.google.com/file/d/1Qoo77dBZnRZ5Xd3GrizFTXTHK-AvmilY/view?usp=drive_link",
};

export const experiences: ExperienceItem[] = [
  {
    company: "Google Summer of Code (Unicode Consortium)",
    role: "Software Engineering Intern / Open Source Contributor",
    period: "May 2025 - Sep 2025",
    location: "Remote",
    bullets: [
      "Built an automated LLM-driven Python triage pipeline to classify and route 10,000+ Jira issues across 40+ locales.",
      "Generated locale JSON/XML with strict CLDR schema validation using Pydantic.",
      "Implemented cross-validation against units.xml to correct historical inconsistencies.",
      "Automated Jira workflow transitions with structured suggested-fix annotations.",
    ],
    tags: ["Python", "LLMs", "LangChain", "Data Validation", "APIs", "Internationalization"],
  },
  {
    company: "UCR Database Research Lab",
    role: "Student Researcher",
    period: "Mar 2025 - Dec 2025",
    location: "Riverside, California",
    bullets: [
      "Built a bias evaluation pipeline for vision-language models at scale with 10K+ synthetic occupation images and 50+ roles.",
      "Implemented prompt generation, batch inference, and metric aggregation in PyTorch.",
      "Ran debiasing experiments and generated structured reports with tables/charts.",
    ],
    tags: ["PyTorch", "VLM", "Evaluation", "Research", "Pipelines"],
  },
  {
    company: "Ashvi Consultancy Service",
    role: "Full Stack Software Engineer Intern",
    period: "Aug 2022 - May 2024",
    location: "India",
    bullets: [
      "Built Node.js microservices backend for banking workloads impacting 500K+ MAU and 2M+ monthly queries.",
      "Automated CI/CD with Docker + Jenkins and reduced release lead time by around 65%.",
      "Developed secure REST APIs that reduced support tickets by around 70%.",
    ],
    tags: ["Node.js", "Kubernetes", "CI/CD", "Backend", "Microservices"],
  },
];

export const achievements: Achievement[] = [
  { title: "TreeHacks 2026", subtitle: "Stanford University" },
  { title: "Google Summer of Code 2025", subtitle: "Selected Contributor, Unicode Consortium" },
];

export const publications: Publication[] = [
  {
    title: "Ensembling ML-Based Hybrid Feature Vector and Adaptive Genetic Algorithms",
    venue: "IJNRD - Android Malware Detection",
  },
  {
    title: "Virtual and Augmented Reality for Medical Research and Training",
    venue: "Springer Book Chapter",
    year: "2024",
  },
];

export const skills = {
  Languages: ["Python", "C", "C++", "Java", "JavaScript", "TypeScript", "SQL", "Bash"],
  "AI/ML": ["PyTorch", "Hugging Face", "LangChain", "RAG", "LLM Agents", "LoRA/Fine-tuning", "Computer Vision", "NLP"],
  Backend: ["FastAPI", "Node.js", "Express", "REST APIs", "SSE", "Auth/JWT"],
  "Data/Infra": [
    "PostgreSQL",
    "MongoDB",
    "Elasticsearch",
    "Redis",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Jenkins",
    "Terraform",
    "AWS",
    "GCP",
    "Prometheus",
  ],
  Frontend: ["React", "Next.js", "Tailwind", "shadcn/ui"],
} as const;

export const projects: Project[] = [
  {
    title: "Systems Optimization Copilot",
    slug: "systems-optimization-copilot",
    featured: true,
    oneLiner: "AI-powered debugging copilot for CUDA/C++/linker/build errors with citation-backed fixes.",
    problem:
      "Teams lose engineering velocity when build failures and low-level runtime errors require hours of manual triage across fragmented docs and logs.",
    approach:
      "Built an agentic diagnosis pipeline that parses error logs, retrieves supporting references, and streams deterministic step-by-step fixes.",
    architectureBullets: [
      "FastAPI ingestion endpoint normalizes stack traces and compiler output.",
      "Retriever ranks relevant snippets from curated debugging docs.",
      "Tool-calling planner selects diagnosis strategy by error family.",
      "SSE stream emits progressive analysis, root cause, and concrete fix steps.",
    ],
    resultsBullets: [
      "84% faster fix discovery",
      "~2.2s median diagnostic latency",
      "Deterministic citations in every diagnosis",
    ],
    learnings: [
      "Grounded retrieval with strict citation requirements improves trust.",
      "Streaming partial reasoning reduces user drop-off during long analyses.",
    ],
    techStack: ["Python", "FastAPI", "CUDA", "SSE streaming", "Retrieval", "Tool-calling", "Search API (You.com)"],
    tags: ["AI", "Agents", "Infra", "Developer Productivity", "Streaming"],
    links: [{ label: "GitHub", url: "https://github.com/preetsojitra2712/AI-debugging-agent-for-complex-errors" }],
    mermaid: `flowchart LR
  A[Paste Error Log] --> B[Normalizer]
  B --> C[Retriever]
  C --> D[Tool-calling Planner]
  D --> E[Diagnosis + Fixes]
  E --> F[SSE Stream to UI]`,
  },
  {
    title: "Git Blame for Hardware",
    slug: "git-blame-for-hardware",
    featured: true,
    oneLiner: "Real-time physical state versioning + natural-language search for hardware debugging.",
    problem:
      "Hardware labs lack a searchable timeline for state changes, making root-cause analysis of physical failures slow.",
    approach:
      "Built an edge pipeline on NVIDIA Jetson that tracks objects, versions state transitions, and indexes events for natural-language retrieval.",
    architectureBullets: [
      "DeepStream + YOLO pipeline processes frames on-device.",
      "VLM-based filter suppresses noisy detections.",
      "Event changelog indexed in Elasticsearch.",
      "RAG layer maps natural language questions to physical state history.",
    ],
    resultsBullets: ["30+ FPS", "<120ms latency", "20+ objects/frame", "10K+ events indexed", "40% fewer false events"],
    learnings: [
      "Edge-first architecture is essential for predictable latency.",
      "Temporal event compression dramatically improves query quality.",
    ],
    techStack: ["NVIDIA Jetson", "DeepStream", "YOLO", "VLM filtering", "Elasticsearch", "RAG pipeline"],
    tags: ["Edge AI", "Computer Vision", "Search", "Systems"],
    links: [{ label: "GitHub", url: "https://github.com/adsrivatsa/ctrl-f" }],
    mermaid: `flowchart LR
  A[Camera Feed] --> B[DeepStream + YOLO]
  B --> C[VLM Filter]
  C --> D[Event Versioner]
  D --> E[Elasticsearch]
  E --> F[Natural Language Query]`,
  },
  {
    title: "Predictive Autoscaler for Distributed Systems",
    slug: "predictive-autoscaler",
    featured: true,
    oneLiner: "LSTM-based predictive autoscaling policy using time-series metrics to cut over-provisioning.",
    problem:
      "Reactive autoscaling frequently lags under bursts, causing waste in steady periods and SLA risk during spikes.",
    approach:
      "Trained forecasting models over Prometheus metrics and integrated predictive policies into HPA workflows.",
    architectureBullets: [
      "Prometheus metrics ingestion and feature engineering pipeline.",
      "LSTM forecaster predicts near-term demand windows.",
      "Policy adapter writes predictive scale targets to Kubernetes HPA.",
      "Guardrails enforce SLA-safe floor and rapid spike overrides.",
    ],
    resultsBullets: [
      "~18-22% better utilization",
      "Preserved SLA under 4x spikes",
      "Stable scaling with lower resource waste",
    ],
    learnings: [
      "Hybrid policy (predictive + reactive) outperforms either alone.",
      "Model drift checks are mandatory for long-running clusters.",
    ],
    techStack: ["Kubernetes", "Prometheus", "AWS EKS", "Python", "Time-series forecasting", "HPA integration"],
    tags: ["MLOps", "Cloud", "Distributed Systems"],
    links: [{ label: "GitHub", url: "https://github.com/preetsojitra2712/Cloudproject" }],
    mermaid: `flowchart LR
  A[Prometheus Metrics] --> B[Feature Pipeline]
  B --> C[LSTM Forecast]
  C --> D[Predictive Policy]
  D --> E[Kubernetes HPA]
  E --> F[Service Pods]`,
  },
  {
    title: "DocFlow-AI",
    slug: "docflow-ai",
    featured: true,
    oneLiner: "Agentic document workflow platform with scalable orchestration + storage + multi-tenant auth.",
    problem: "Manual document operations across teams cause delays, errors, and poor auditability at scale.",
    approach:
      "Built a multi-tenant workflow platform with agentic routing decisions, durable orchestration, and secure document storage.",
    architectureBullets: [
      "Next.js frontend + Fastify APIs for tenant-aware operations.",
      "Temporal orchestrates long-running workflow state.",
      "Prisma + PostgreSQL for metadata and audit logs.",
      "MinIO object storage + JWT auth for secure access boundaries.",
    ],
    resultsBullets: ["Sub-500ms decisions", "~70% automation", "Supports 10K+ workflows"],
    learnings: [
      "Workflow idempotency and retries are core for reliability.",
      "Tenant isolation must be designed at schema and auth layers together.",
    ],
    techStack: [
      "TypeScript",
      "Node.js/Fastify",
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "Temporal",
      "MinIO",
      "Docker",
      "JWT",
    ],
    tags: ["Agentic AI", "Workflow", "Full Stack", "SaaS"],
    links: [{ label: "GitHub", url: "https://github.com/preetsojitra2712/docflow-ai" }],
    mermaid: `flowchart LR
  A[Client Upload] --> B[Gateway API]
  B --> C[Temporal Workflow]
  C --> D[Agent Decision Node]
  D --> E[Storage + Metadata]
  E --> F[Notifications / Output]`,
  },
  {
    title: "MedQuery / Hybrid Medical Search",
    slug: "medquery-hybrid-medical-search",
    featured: false,
    oneLiner: "Hybrid retrieval engine using BM25 + embeddings for medical search quality.",
    problem: "Single-mode retrieval misses either lexical precision or semantic context in domain-heavy medical text.",
    approach: "Combined Lucene BM25 with vector retrieval and merged ranks for robust top-k relevance.",
    architectureBullets: ["BM25 lexical index", "FAISS embeddings index", "Fusion ranking service"],
    resultsBullets: ["Improved search quality with hybrid ranking"],
    learnings: ["Hybrid retrieval gives better practical relevance than either approach alone."],
    techStack: ["Lucene BM25", "FAISS", "BERT", "Django", "Docker"],
    tags: ["Search", "NLP", "Information Retrieval"],
    links: [{ label: "GitHub", url: "https://github.com/preetsojitra2712/retrivex-webapp-clean" }],
    mermaid: `flowchart LR
  A[Query] --> B[BM25]
  A --> C[Embedding Search]
  B --> D[Rank Fusion]
  C --> D
  D --> E[Top Results]`,
  },
  {
    title: "University Admission Predictor",
    slug: "university-admission-predictor",
    featured: false,
    oneLiner: "Flask app using regression models to estimate graduate admission probability.",
    problem: "Applicants often lack calibrated probability estimates across profile factors.",
    approach: "Trained and compared linear, ridge, and lasso models with a simple web interface.",
    architectureBullets: ["Feature preprocessing", "Model selection", "Flask prediction API"],
    resultsBullets: ["~92% prediction accuracy"],
    learnings: ["Simple models can still provide strong baseline decision support."],
    techStack: ["Flask", "Python", "Linear Regression", "Ridge", "Lasso"],
    tags: ["ML", "Web App"],
    links: [
      { label: "GitHub", url: "https://github.com/preetsojitra2712/University-prediction-for-Masters-student-in-USA" },
    ],
    mermaid: `flowchart LR
  A[Input Profile] --> B[Preprocessing]
  B --> C[Regression Ensemble]
  C --> D[Admission Probability]`,
  },
  {
    title: "Full-Stack SWE Assessment Task",
    slug: "markdown-to-google-docs",
    featured: false,
    oneLiner: "Markdown-to-Google Docs pipeline using batchUpdate APIs.",
    problem: "Manual rich-doc formatting is repetitive and error-prone for structured content.",
    approach: "Parsed markdown into an intermediate representation and generated Google Docs operations in batches.",
    architectureBullets: ["Markdown parser", "Operation mapper", "Google Docs API writer"],
    resultsBullets: ["Automated rich formatting from plain markdown"],
    learnings: ["Batch APIs require strict operation ordering to preserve structure."],
    techStack: ["Python", "Google Docs API", "batchUpdate"],
    tags: ["Automation", "APIs"],
    links: [
      { label: "GitHub", url: "https://github.com/preetsojitra2712/Full-Stack-Software-Engineer-Assessment-Task" },
    ],
    mermaid: `flowchart LR
  A[Markdown] --> B[Parser]
  B --> C[Google Docs Operations]
  C --> D[batchUpdate]`,
  },
  {
    title: "Genetic Algorithm Simulator",
    slug: "genetic-algorithm-simulator",
    featured: false,
    oneLiner: "Simulation environment for evolutionary optimization with visual convergence tracking.",
    problem: "Learning optimization dynamics is difficult without iterative visual feedback.",
    approach: "Implemented GA primitives and benchmark scenarios with generation-level insights.",
    architectureBullets: ["Population engine", "Selection + crossover + mutation", "Convergence visualizer"],
    resultsBullets: ["Clear convergence behavior across benchmark functions"],
    learnings: ["Mutation-rate scheduling heavily influences escape from local minima."],
    techStack: ["Python", "Genetic Algorithms", "Simulation"],
    tags: ["Optimization", "Algorithms"],
    links: [{ label: "GitHub", url: "https://github.com/preetsojitra2712/Genetic-Algorithm-Simulator" }],
    mermaid: `flowchart LR
  A[Initialize Population] --> B[Evaluate Fitness]
  B --> C[Select Parents]
  C --> D[Crossover + Mutation]
  D --> B`,
  },
];
