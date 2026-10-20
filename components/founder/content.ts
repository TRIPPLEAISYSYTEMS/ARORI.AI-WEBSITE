import {
  Bot,
  Braces,
  ChartNoAxesCombined,
  CodeXml,
  Megaphone,
  PenTool,
  Smartphone,
  Workflow,
} from "lucide-react";

export const profile = {
  name: "Given Arori",
  role: "AI solutions specialist",
  intro:
    "I’m Given Arori, an AI solutions specialist and fourth-year student at Kenyatta University. I experiment with AI and build websites, apps, automation, and scalable systems for businesses.",
  education: "Fourth-year B.Ed Science (Mathematics & Physics), Kenyatta University.",
  phone: "0792 767 922",
  whatsapp: "https://wa.me/254792767922",
  linkedin: "https://www.linkedin.com/in/arori/",
  company: "https://trippleaisystems.page",
} as const;

export const navigation = [
  { label: "About", href: "#founder-about" },
  { label: "Services", href: "#founder-services" },
  { label: "Experience", href: "#founder-experience" },
  { label: "Oculus", href: "#founder-oculus" },
  { label: "Skills", href: "#founder-skills" },
] as const;

export const services = [
  {
    title: "AI solutions & automation",
    detail: "Practical workflows that remove repetitive work and connect business operations.",
    icon: Workflow,
  },
  {
    title: "Websites",
    detail: "Clear, responsive digital experiences built around a business goal.",
    icon: CodeXml,
  },
  {
    title: "Apps",
    detail: "Useful product experiences shaped from idea to working interface.",
    icon: Smartphone,
  },
  {
    title: "Adverts",
    detail: "Digital campaign creative designed for attention, clarity, and action.",
    icon: Megaphone,
  },
  {
    title: "Social media",
    detail: "Structured publishing and channel management for consistent brand presence.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Content writing",
    detail: "Focused content that translates ideas into useful, readable communication.",
    icon: PenTool,
  },
  {
    title: "AI agent management",
    detail: "Agent workflows coordinated around defined tasks and reliable handoffs.",
    icon: Bot,
  },
  {
    title: "Scalable systems",
    detail: "Connected tools and processes designed to grow with company operations.",
    icon: Braces,
  },
] as const;

export const technologyRows = [
  [
    "n8n", "Make", "Zapier", "Python", "Vercel", "Netlify", "JSON", "REST APIs", "Meta Apps", "OpenAI",
    "Claude", "Gemini", "Perplexity", "Hugging Face", "LangChain", "LlamaIndex", "CrewAI", "AutoGen", "Pinecone", "Chroma",
    "Supabase", "Firebase", "PostgreSQL", "MySQL", "MongoDB",
  ],
  [
    "JavaScript", "TypeScript", "React", "Next.js", "TanStack", "Node.js", "HTML", "CSS", "Tailwind CSS", "Three.js",
    "WebGL", "Vite", "Git", "GitHub", "Cloudflare", "AWS", "Google Cloud", "Docker", "Linux", "Bash",
    "GraphQL", "Webhooks", "OAuth", "JWT", "Edge Functions",
  ],
  [
    "Figma", "Canva", "Adobe Photoshop", "Adobe Illustrator", "Premiere Pro", "After Effects", "CapCut", "Framer", "Webflow", "WordPress",
    "Shopify", "Wix", "Notion", "Airtable", "Trello", "Slack", "Google Workspace", "Microsoft 365", "HubSpot", "Mailchimp",
    "Buffer", "Hootsuite", "Meta Business Suite", "Google Analytics", "Search Console",
  ],
  [
    "TensorFlow", "PyTorch", "scikit-learn", "Pandas", "NumPy", "Jupyter", "Computer Vision", "NLP", "Embeddings", "Vector Search",
    "RAG", "Prompt Engineering", "Fine-tuning", "AI Agents", "Voice AI", "ElevenLabs", "Twilio", "WhatsApp Business", "Stripe", "M-Pesa",
    "SEO", "Content Strategy", "Copywriting", "Social Analytics", "Workflow Design",
  ],
] as const;
