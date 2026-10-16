import React from 'react';
import { Search, Code2, Rocket, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: "01",
    phase: "Phase I",
    icon: Search,
    title: "Discovery & Architectural Audit",
    duration: "Week 1 - 2",
    description: "We audit your existing manual operational bottlenecks, SaaS dependencies, data schemas, and API boundaries. Through strategic working sessions, we isolate high-leverage workflows with immediate 5x+ ROI potential.",
    deliverables: ["Process Bottleneck Blueprint", "Data Security & Sandboxing Plan", "Architectural Milestone Map"]
  },
  {
    id: "02",
    phase: "Phase II",
    icon: Code2,
    title: "Agile Agent Engineering",
    duration: "Week 3 - 6",
    description: "Our team builds your custom multi-agent workforce in private staging sandboxes. You receive real-time preview links, inspect decision logs, and validate accuracy before any code touches production channels.",
    deliverables: ["Custom Tool Orchestration", "Deterministic Safety Guards", "Continuous Live Test Runs"]
  },
  {
    id: "03",
    phase: "Phase III",
    icon: Rocket,
    title: "Production Deployment & Telemetry",
    duration: "Week 7+",
    description: "We deploy your autonomous agents directly into production with zero downtime. We conduct thorough team training, install real-time KPI dashboards, and continuously optimize agent performance loops.",
    deliverables: ["Zero-Downtime Rollout", "Comprehensive Team Handover", "24/7 Monitored Self-Healing"]
  }
];

const Process: React.FC = () => {
  return (
    <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10" aria-label="Our Engineering Process">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow-badge mb-3">05 / ENGINEERING PROCESS</div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-champagne mb-4">
            From Blueprint to <span className="gold-gradient-text">Autonomous Production</span>
          </h2>
          <p className="text-warm-gray text-base md:text-lg leading-relaxed">
            A battle-tested 3-stage lifecycle structured across modular glass tiles, ensuring rapid deployment without organizational friction.
          </p>
        </div>

        {/* Process Glass Tiles Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="glass-panel group rounded-3xl p-8 sm:p-9 border border-[oklch(0.8_0.12_82/22%)] hover:border-gold transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top Ambient Highlight Bar */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[oklch(0.8_0.14_82/0%)] to-transparent group-hover:via-[oklch(0.8_0.14_82/80%)] transition-all duration-500" />

                <div>
                  {/* Step Header with Phase, Glass Icon & Numbering */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="glass-icon w-14 h-14 rounded-2xl flex items-center justify-center text-gold">
                      <Icon className="w-7 h-7" />
                    </div>

                    <div className="text-right">
                      <span className="font-heading font-mono text-3xl font-extrabold text-[oklch(0.8_0.14_82/35%)] group-hover:text-gold transition-colors duration-300 block leading-none">
                        {step.id}
                      </span>
                      <span className="text-[10px] text-warm-gray font-mono uppercase tracking-wider">
                        {step.phase}
                      </span>
                    </div>
                  </div>

                  {/* Title & Duration */}
                  <div className="mb-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[oklch(0.8_0.14_82/10%)] text-gold border border-[oklch(0.8_0.12_82/20%)] mb-2">
                      {step.duration}
                    </span>
                    <h3 className="text-xl font-bold font-heading text-champagne group-hover:text-gold transition-colors duration-300">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-warm-gray text-xs sm:text-sm leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="pt-5 border-t border-[oklch(0.8_0.12_82/15%)] space-y-2">
                  <span className="text-[11px] font-semibold text-champagne uppercase tracking-wider block font-mono">
                    Key Deliverables:
                  </span>
                  <ul className="space-y-1.5 text-xs text-warm-gray">
                    {step.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-center space-x-2">
                        <ArrowRight className="w-3 h-3 text-gold shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;