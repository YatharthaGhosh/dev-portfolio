/**
 * ALL website content lives here.
 * Edit this file to change text, links or projects; you never need to touch the components.
 */
import { Brain, Eye, Network, Search } from "lucide-react";

export const site = {
  name: "Yathartha Ghosh",
  brand: "Y. GHOSH",
  role: "AI Engineer",
  location: "Howrah, India",
  status: "Open to AI Engineer roles",
  email: "ghoshyathartha51103@gmail.com",
  links: {
    github: "https://github.com/YatharthaGhosh",
    linkedin: "https://www.linkedin.com/in/yatharthaghosh",
  },
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  greeting: "Hi, I'm Yathartha Ghosh",
  headline: ["Building", "AI", "systems", "that"],
  headlineAccent: ["ship", "to", "production."],
  positioning: "AI Engineer · LLMs · RAG · Multi-Agent Systems",
  description:
    "I build LLM systems end to end: retrieval pipelines with access control, multi-agent workflows with human approval, vision and OCR pipelines, and the evaluation that proves they work.",
  proof: [
    { value: "0%", label: "unauthorised retrieval in RAG leakage tests" },
    { value: "95.8%", label: "top-1 retrieval with hybrid search" },
    { value: "5", label: "LangGraph agents with human-in-the-loop" },
  ],
};

/**
 * Case studies. Every number here comes from the projects' own evaluation runs (see each README).
 *  - shots: screenshots in /public/projects/, shown as a small gallery.
 *  - chart: optional bar chart, one measure across a few items (values in %).
 */
export const projects = [
  {
    id: "rag",
    kicker: "Retrieval-Augmented Generation · Access control · Evaluation",
    title: "Enterprise RAG with Role-Based Access Control",
    summary:
      "Question answering over internal company documents where what you can retrieve depends on who you are. Access rules are enforced inside the vector search, every answer is cited, and the whole pipeline is measured on a 40-question golden set.",
    shots: [
      {
        src: "/projects/rag-answer.webp",
        caption: "A finance manager asks about a confidential acquisition and gets a cited answer.",
      },
      {
        src: "/projects/rag-refusal.webp",
        caption: "An engineering employee asks the same question and is refused; the relevance gate skips the LLM call.",
      },
    ],
    metrics: [
      { value: "0%", label: "unauthorised retrieval across 600 user × question × mode checks" },
      { value: "87.5%", label: "answer accuracy on answerable questions (21/24)" },
      { value: "100%", label: "correct refusals on restricted and unanswerable questions (16/16)" },
      { value: "1.3 s", label: "median end-to-end latency" },
    ],
    chart: {
      title: "Top-1 retrieval accuracy by retrieval mode",
      caption: "Share of 24 answerable questions where the correct document ranked first. The corpus includes 4 distractor documents.",
      unit: "%",
      data: [
        { label: "Dense (BGE embeddings)", value: 87.5, detail: "MRR 0.917 · 10 ms median" },
        { label: "Hybrid (dense + BM25)", value: 95.8, detail: "MRR 0.958 · 15 ms median" },
        { label: "Hybrid + cross-encoder rerank", value: 95.8, detail: "MRR 0.958 · ~600 ms median on CPU" },
      ],
    },
    highlights: [
      "Role rules compiled into a Qdrant filter applied inside both dense and sparse search, so unauthorised chunks never reach the LLM.",
      "Docling parses PDF, DOCX and XLSX; structure-aware chunking keeps tables whole as markdown.",
      "SHA-256 incremental indexing: unchanged files are skipped, changed files replaced, deleted files purged.",
      "Citations are validated against the retrieved sources after generation; a reranker-based relevance gate refuses without an LLM call.",
      "The evaluation harness (retrieval, end-to-end and Ragas) caught 3 production bugs that were then fixed.",
    ],
    stack: ["Python", "FastAPI", "Docling", "LlamaIndex", "Qdrant", "FastEmbed", "gpt-oss-120b (Groq)", "Ragas", "Streamlit", "Docker", "GitHub Actions"],
    links: [{ label: "Code, tests & evaluation", href: "https://github.com/YatharthaGhosh/enterprise-rag-rbac" }],
  },
  {
    id: "agents",
    kicker: "Multi-agent orchestration · Human-in-the-loop · Observability",
    title: "Multi-Agent Personal Assistant",
    summary:
      "A LangGraph supervisor plans each request and hands steps to research, calendar, email, notifier and memory agents. Anything high-stakes waits for human approval, tool failures are recovered, and every step streams to a live trace.",
    shots: [
      {
        src: "/projects/agent-approval.webp",
        caption: "The email agent's draft pauses at an approval card: approve, edit the fields, or reject.",
      },
      {
        src: "/projects/agent-result.webp",
        caption: "After approval: research → calendar → email completed, with the agent trace and token counts.",
      },
    ],
    metrics: [
      { value: "96%", label: "supervisor routing accuracy on 25 scripted multi-step tasks" },
      { value: "5", label: "specialist agents behind one typed plan" },
      { value: "13", label: "offline tests driven by a scripted LLM" },
      { value: "4", label: "failure modes found by evaluation and fixed" },
    ],
    highlights: [
      "The supervisor emits a typed plan (Pydantic) and a pure route() function walks it, so routing is deterministic and unit-tested.",
      "Agents can only propose emails and events; an approval node pauses the run with interrupt() and resumes from a SQLite checkpoint.",
      "Recovery at three levels: tool retries with exponential backoff, argument repair, and self-repairing structured output, proven with fault injection.",
      "Every handoff, tool call, retry and token count streams over Server-Sent Events to the UI.",
      "Evaluation exposed a supervisor hallucination and agents asking for confirmation in plain text; both fixed with regression tests.",
    ],
    stack: ["Python", "LangGraph", "LangChain", "FastAPI (SSE)", "SQLite", "gpt-oss (Groq)", "Tavily / DuckDuckGo", "Telegram Bot API", "Streamlit", "Docker"],
    links: [{ label: "Code, tests & evaluation", href: "https://github.com/YatharthaGhosh/multi-agent-assistant" }],
  },
];

export const experience = {
  company: "The 3C Edge",
  roles: [
    {
      title: "Full Stack Developer",
      period: "Jun 2026 – Present",
      intro: "Production AI features on a live platform with web and mobile clients.",
      ai: [
        {
          title: "Grounded LLM chatbot",
          detail:
            "Multi-persona assistant across 5 role-based portals. Live analytics injected as compact prompt context, with a cold-start fallback for new users.",
          tags: ["DeepSeek API", "Context injection", "Spring Boot"],
        },
        {
          title: "Vision-language pipeline",
          detail:
            "Reads questions from photos and runs a server-enforced staged-hint flow ending in graded verification. Session-level caching means a reopened session costs zero LLM calls.",
          tags: ["VLM", "State machine", "Caching"],
        },
        {
          title: "Two-model verified OCR",
          detail:
            "Gemini Flash extracts handwritten mark sheets, row sums are checked against written totals, and mismatches escalate to Gemini Pro for an independent re-read before human confirmation. 8–11 s per sheet.",
          tags: ["Gemini", "Checksum validation", "Human-in-the-loop"],
        },
        {
          title: "GenAI content pipelines",
          detail:
            "Async draft-for-review jobs for lessons and MCQs, with an independent LLM verifier that answers each question without its key; batching cut verification from N+1 calls to 2. Veo video and Gemini image generation.",
          tags: ["LLM-as-verifier", "Async jobs", "Veo"],
        },
        {
          title: "Speech AI",
          detail:
            "LLM-as-judge grading of speech-to-text answers for meaning and grammar, Azure pronunciation scoring, and speaker-labelled transcripts drafted into reports with human review.",
          tags: ["STT", "LLM-as-judge", "Azure Speech"],
        },
        {
          title: "LLM infrastructure",
          detail:
            "Gemini REST client with JSON-Schema structured outputs, reasoning-token budgeting after measuring a 7x variance on identical prompts, and an atomic daily spend cap enforced across instances.",
          tags: ["Structured outputs", "Token budgets", "Cost guardrails"],
        },
      ],
      platform:
        "Also built and deployed the platform itself: Spring Boot 3.5 / Java 17 APIs with JWT multi-role auth, a React 19 web app in 23 languages, a React Native (Expo) app, and AWS EC2 + RDS with zero-downtime canary releases.",
    },
    {
      title: "Full Stack Developer Intern",
      period: "Dec 2025 – May 2026",
      intro: "Built modules for the web platform, the React Native app and the AI chatbot across two internship terms.",
    },
  ],
  earlier: [
    { title: "AI/ML Intern", org: "Microsoft × AICTE Internship Program", period: "May 2025 – Jun 2025" },
    { title: "Summer Intern", org: "India Space Lab", period: "Jun 2025 – Jul 2025" },
  ],
};

/** The AI groups are the focus; `alsoShips` is the development side, shown as a smaller strip. */
export const skillGroups = [
  {
    title: "LLM engineering",
    icon: Brain,
    items: ["RAG", "Multi-agent systems", "LangGraph", "LlamaIndex", "LangChain", "Tool calling", "Structured outputs", "Prompt engineering"],
  },
  {
    title: "Retrieval & evaluation",
    icon: Search,
    items: ["Qdrant", "Hybrid search (dense + BM25)", "Cross-encoder reranking", "FastEmbed", "Ragas", "LLM-as-judge", "Golden datasets"],
  },
  {
    title: "Multimodal",
    icon: Eye,
    items: ["Vision-language models", "OCR", "Speech-to-text", "Docling", "Veo video", "Image generation"],
  },
  {
    title: "Models & APIs",
    icon: Network,
    items: ["Gemini (Vertex AI)", "DeepSeek", "gpt-oss (Groq)", "OpenAI-compatible APIs", "Azure Speech"],
  },
];

export const alsoShips = ["Python", "FastAPI", "Java 17", "Spring Boot", "React 19", "React Native", "MySQL", "AWS", "Docker", "GitHub Actions"];

export const about = {
  paragraphs: [
    "I'm Yathartha, an AI engineer from Howrah, West Bengal. I build LLM features that real users depend on: grounded chatbots, vision and OCR pipelines, content generation, and the cost and quality controls around them.",
    "I care about AI systems that can be trusted: access control enforced where the data lives, answers that cite their sources, humans approving anything high-stakes, and evaluations that show what works and what doesn't.",
    "My full-stack background means I can take a model all the way to production: the API, the interface, the deployment.",
  ],
  facts: [
    { label: "Based in", value: "Howrah, West Bengal, India" },
    { label: "Currently", value: "Full Stack Developer, The 3C Edge" },
    { label: "Education", value: "B.Tech CSE (AI & ML), MCKV Institute of Engineering (MAKAUT), 2022–2026 · CGPA 7.52" },
    { label: "Open to", value: "AI Engineer roles" },
  ],
  certifications: [
    { name: "Getting Started with AI", issuer: "IBM", href: "https://drive.google.com/file/d/1GTJgREu66FXuBQ3zebLIlCIw6HNTuyyH/view?usp=drive_link" },
    { name: "Data Science and Analytics", issuer: "HP", href: "https://drive.google.com/file/d/1TLyR4wKHd5ekgSx3DhDavgk3vxaoK6v9/view?usp=drive_link" },
    { name: "AI/ML Internship", issuer: "Microsoft × AICTE", href: "https://drive.google.com/file/d/1ruubm8OMj2u8_rnZRlhUspXRTOCA0TId/view?usp=drive_link" },
    { name: "Summer Internship", issuer: "India Space Lab", href: "https://drive.google.com/file/d/1KvuxMveed5KnBQJVRSPWGo1B20j6d9aK/view?usp=drive_link" },
    { name: "Complete Full Stack Web Development Bootcamp", issuer: "Udemy (Dr. Angela Yu)" },
  ],
};

export const contact = {
  headline: ["Building with AI?", "Let's talk."],
  intro: "I'm open to AI Engineer roles. Email me, connect on LinkedIn, or send a message here and I'll reply within a day or two.",
};
