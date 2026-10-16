import React from 'react';
import { Bot, Zap, BarChart3, Network, FileSearch, Headphones, ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  category: string;
  description: string;
  features: string[];
}

const services: ServiceItem[] = [
  {
    id: "01",
    icon: Bot,
    category: "Autonomous Swarms",
    title: "Custom AI Agent Engineering",
    description: "We architect intelligent multi-agent swarms tailored to your proprietary operations, enabling your staff to focus on strategic milestones while agents handle repetitive workflows.",
    features: ["Autonomous reasoning loops", "Deterministic fallback checks", "Multi-agent swarm coordination"]
  },
  {
    id: "02",
    icon: Zap,
    category: "End-to-End Systems",
    title: "Managed Automation Pipelines",
    description: "From automated lead gen to continuous client onboarding, we construct resilient data pipelines that synchronize across your CRM, databases, and third-party tools 24/7.",
    features: ["Zero-latency CRM syncing", "Self-healing pipeline daemons", "Event-driven orchestration"]
  },
  {
    id: "03",
    icon: BarChart3,
    category: "Real-Time Telemetry",
    title: "Performance Analytics & Audit",
    description: "Gain complete transparency into organizational throughput with real-time dashboards that expose bottlenecks, track exact cost-savings, and forecast resource demands.",
    features: ["Sub-second metric ingestion", "Predictive bottleneck detection", "Executive ROI reporting"]
  },
  {
    id: "04",
    icon: Network,
    category: "Infrastructure",
    title: "Enterprise System Integration",
    description: "We link cutting-edge LLMs and custom agent workers directly to legacy on-premise ERPs, modern Cloud APIs, and proprietary relational databases without security trade-offs.",
    features: ["SOC-2 compliant sandboxing", "Encrypted secrets management", "Legacy database bridges"]
  },
  {
    id: "05",
    icon: FileSearch,
    category: "Document Intelligence",
    title: "Cognitive Knowledge Extraction",
    description: "Convert messy PDFs, incoming emails, contracts, and technical schemas into structured database entities ready for automated decision engines and instant search.",
    features: ["Multi-modal visual parsing", "Schema validation barriers", "Vectorized neural memory"]
  },
  {
    id: "06",
    icon: Headphones,
    category: "Customer Dispatch",
    title: "Autonomous Resolution Concierge",
    description: "Deploy customer-facing agents that resolve high-friction tickets within seconds, execute account updates autonomously, and gracefully escalate complex cases to human staff.",
    features: ["Human-in-the-loop triggers", "Adaptive conversational tone", "Instant action execution"]
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10" aria-label="Services Section">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow-badge mb-3">02 / SERVICES MATRIX</div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-champagne mb-4">
            Bespoke Autonomy, <span className="gold-gradient-text">Engineered for Scale</span>
          </h2>
          <p className="text-warm-gray text-base md:text-lg leading-relaxed">
            Eliminate operational drag with our specialized modular glass tiles and custom glass icons. Every system is built to scale your enterprise without expanding headcount.
          </p>
        </div>

        {/* Bento Grid Services Glass Tiles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div 
                key={service.id}
                className="group relative glass-panel rounded-3xl p-7 sm:p-8 transition-all duration-500 hover:-translate-y-2 hover:bg-gradient-to-b hover:from-[oklch(0.22_0.03_76/65%)] hover:to-[oklch(0.16_0.02_74/65%)] flex flex-col justify-between overflow-hidden border border-[oklch(0.8_0.12_82/22%)] hover:border-gold"
              >
                {/* Top Ambient Highlight */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[oklch(0.8_0.14_82/0%)] to-transparent group-hover:via-[oklch(0.8_0.14_82/80%)] transition-all duration-500" />

                {/* Top Corner Numbering & Glass Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="glass-icon w-13 h-13 rounded-2xl flex items-center justify-center text-gold">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="font-heading font-mono text-3xl font-extrabold text-[oklch(0.8_0.14_82/35%)] group-hover:text-gold transition-colors duration-300">
                      {service.id}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-3 mb-6">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-gold block font-mono">
                      {service.category}
                    </span>
                    <h3 className="text-xl font-bold font-heading text-champagne group-hover:text-gold transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-warm-gray text-xs sm:text-sm leading-relaxed group-hover:text-[oklch(0.88_0.02_85)] transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Features & Action Link */}
                <div className="pt-5 border-t border-[oklch(0.8_0.12_82/15%)] space-y-3">
                  <ul className="space-y-1.5 text-xs text-warm-gray">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold/70" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className="pt-2 inline-flex items-center space-x-1.5 text-xs font-semibold text-gold group-hover:text-champagne transition-colors"
                  >
                    <span>Inquire About Implementation</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Tile CTA */}
        <div className="mt-12 glass-panel-elevated rounded-3xl p-8 border border-[oklch(0.8_0.12_82/25%)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-bold font-heading text-champagne">
              Need a bespoke, custom-tailored automation tile?
            </h4>
            <p className="text-xs sm:text-sm text-warm-gray">
              We design specialized architectures connecting on-premise infrastructure, proprietary fine-tunes, and air-gapped systems.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-7 py-3.5 rounded-2xl font-bold text-xs sm:text-sm bg-gold text-black hover:bg-[oklch(0.86_0.16_84)] shadow-md shadow-[oklch(0.8_0.14_82/25%)] transition-all transform hover:scale-105"
          >
            Request Custom Consultation
          </a>
        </div>

      </div>
    </section>
  );
};

export default Services;