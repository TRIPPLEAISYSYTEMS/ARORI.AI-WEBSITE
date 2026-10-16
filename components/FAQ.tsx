import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { FaqItem } from '../types';

const faqs: FaqItem[] = [
  {
    question: "How long does enterprise agent implementation typically take?",
    answer: "Most production deployments transition from initial discovery to active deployment within 6 to 12 weeks. Because our engineering is modular and agile, you begin testing functional sandbox prototypes as early as Week 3, allowing for real-world tuning long before final production rollout."
  },
  {
    question: "Who retains ownership of the custom AI solutions and confidential data?",
    answer: "You retain 100% full ownership. All custom agent weights, custom pipeline orchestrations, tools, prompts, database bridges, and telemetry logs remain your exclusive intellectual property. We sign comprehensive IP assignment and NDA agreements prior to commencing any project."
  },
  {
    question: "How is TRIPPLE AI SYSTEMS pricing structured?",
    answer: "We employ value-based, milestone-driven pricing tailored directly to the complexity and operational ROI of your organization. Following our discovery workshop, we furnish a transparent fixed-price milestone agreement or flexible dedicated engineering retainer. There are never surprise licensing markups or hidden fees."
  },
  {
    question: "Will implementing AI automation replace or displace our existing team?",
    answer: "No. Our core engineering principle is augmentation, not displacement. We eliminate high-friction, repetitive drudgery (manual data re-entry, triage queues, routine reconciliations) so your talented personnel can focus on creative problem-solving, strategic expansion, and high-touch client relationships."
  },
  {
    question: "How do you guarantee enterprise data security and compliance?",
    answer: "Security is non-negotiable. We operate under zero-trust enterprise paradigms, encrypting all data in transit (TLS 1.3) and at rest (AES-256). All models run in customer-isolated sovereign virtual environments, ensuring proprietary company data is never used to train public foundation models."
  },
  {
    question: "What LLMs and agent frameworks do you build on?",
    answer: "We primarily utilize Google's advanced Gemini 3.0 Pro reasoning infrastructure along with specialized open-weight models when on-prem air-gapped hosting is required. For orchestration, we engineer deterministic Python and TypeScript multi-agent swarms with granular state checkpointing."
  }
];

const FAQ: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10" aria-label="Frequently Asked Questions">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="eyebrow-badge mb-3">07 / FREQUENTLY ASKED QUESTIONS</div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-champagne mb-4">
            Answers &amp; <span className="gold-gradient-text">Architectural Details</span>
          </h2>
          <p className="text-warm-gray text-base md:text-lg max-w-2xl mx-auto">
            Everything you need to know about partnering with TRIPPLE AI SYSTEMS to build sovereign enterprise automation.
          </p>
        </div>

        {/* FAQ Accordion Tiles */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;

            return (
              <div
                key={index}
                className={`glass-panel rounded-3xl overflow-hidden border transition-all duration-300 ${
                  isOpen 
                    ? 'border-[oklch(0.8_0.14_82/50%)] bg-[oklch(0.18_0.02_75/65%)] shadow-xl shadow-[oklch(0.8_0.14_82/10%)]' 
                    : 'border-[oklch(0.8_0.12_82/20%)] hover:border-[oklch(0.8_0.12_82/35%)]'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-7 py-5 text-left flex justify-between items-center transition-colors group"
                  aria-expanded={isOpen}
                >
                  <span className={`font-heading font-semibold text-base sm:text-lg transition-colors ${
                    isOpen ? 'text-gold' : 'text-champagne group-hover:text-gold'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full border border-[oklch(0.8_0.12_82/25%)] flex items-center justify-center shrink-0 ml-4 transition-transform duration-300 ${
                    isOpen ? 'bg-gold text-black rotate-90' : 'bg-[oklch(0.14_0.015_70)] text-gold'
                  }`}>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-7 pb-6 text-warm-gray text-sm sm:text-base leading-relaxed border-t border-[oklch(0.8_0.12_82/15%)] pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Further Queries Callout */}
        <div className="mt-12 text-center text-xs text-warm-gray">
          <span>Have a custom compliance or architecture question? </span>
          <a href="mailto:givenarori77@gmail.com" className="text-gold hover:underline font-semibold ml-1">
            Speak directly with Given Arori
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;