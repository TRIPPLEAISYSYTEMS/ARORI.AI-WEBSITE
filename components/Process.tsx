import React from 'react';
import { Search, Code2, Rocket, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: "01",
    phase: "Phase 1: Discovery",
    icon: Search,
    title: "Finding Your Biggest Time Wasters",
    duration: "Week 1",
    description: "We review your daily operations to find the slow, repetitive computer tasks that eat up your team's hours, and pinpoint the easiest ones to automate first for quick cost savings.",
    deliverables: ["List of repetitive tasks to automate", "Estimated hours and dollars saved", "Simple step-by-step rollout plan"]
  },
  {
    id: "02",
    phase: "Phase 2: Building",
    icon: Code2,
    title: "Building & Testing Your Automations",
    duration: "Weeks 2 - 4",
    description: "We build your custom AI assistants and connect your software in a secure private test area. You get to test everything yourself with sample data and make sure it works exactly how you want.",
    deliverables: ["Interactive private preview", "Thorough accuracy testing", "Adjustments to match your business style"]
  },
  {
    id: "03",
    phase: "Phase 3: Launch",
    icon: Rocket,
    title: "Smooth Launch & Team Training",
    duration: "Week 5+",
    description: "We turn on your automations smoothly without disrupting your daily business. We train your staff in simple, plain language so everyone is confident, and we keep watch 24/7 so it runs reliably.",
    deliverables: ["Zero-downtime smooth launch", "Friendly hands-on team training", "Ongoing 24/7 monitoring & support"]
  }
];

const Process: React.FC = () => {
  return (
    <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10" aria-label="Our Process">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow-badge mb-3">03 / SIMPLE 3-STEP PROCESS</div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-champagne mb-4">
            How We Work With You, <span className="gold-gradient-text">Step by Step</span>
          </h2>
          <p className="text-warm-gray text-base md:text-lg leading-relaxed">
            No confusing technical jargon or overwhelming software changes. We handle all the technical heavy lifting so your business can enjoy the time and cost savings.
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
                    What You Get:
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