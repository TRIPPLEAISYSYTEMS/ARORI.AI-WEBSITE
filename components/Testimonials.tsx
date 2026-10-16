import React from 'react';
import { Quote, Star } from 'lucide-react';
import { TestimonialItem } from '../types';

const testimonials: (TestimonialItem & { metrics: string; companyType: string })[] = [
  {
    quote: "TRIPPLE AI SYSTEMS helped us reduce customer support response time by 70% and increase lead conversion by 45%. Their autonomous agents didn't just automate our processes—they transformed how our entire cross-functional team executes. The enterprise ROI was transparent within our very first quarter.",
    author: "Marcus Vance",
    role: "CEO & Co-Founder",
    companyType: "TechCorp Enterprise Cloud",
    metrics: "70% Faster Turnaround • 45% Conversion Lift"
  },
  {
    quote: "We were skeptical about generative agent workflows in regulated healthcare operations, but Given Arori and the TRIPPLE AI team engineered bulletproof data sandboxes. The custom agents built for our triage team save us 35+ hours weekly while maintaining zero compliance anomalies.",
    author: "Elena Rostova",
    role: "Director of Operations",
    companyType: "HealthPlus Integrated Health",
    metrics: "35+ Hours Reclaimed / Week • 100% Audit Pass"
  },
  {
    quote: "The real-time telemetry console and autonomous multi-channel dispatch have been fundamentally game-changing. We now have instant visibility across supply bottlenecks we never caught manually. It completely eliminated the order fulfillment backlog that was choking our expansion.",
    author: "Darius K.",
    role: "Founder & Managing Director",
    companyType: "E-Comm Global Logistics",
    metrics: "99.9% Order Routing Accuracy • Zero Backlog"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10" aria-label="Client Testimonials">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow-badge mb-3">06 / PROVEN CASE STUDIES</div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-champagne mb-4">
            Real Enterprises, <span className="gold-gradient-text">Quantifiable Outcomes</span>
          </h2>
          <p className="text-warm-gray text-base md:text-lg leading-relaxed">
            Discover how visionary leaders deploy TRIPPLE AI SYSTEMS to achieve operational dominance in their respective verticals.
          </p>
        </div>

        {/* Testimonials Glass Tiles Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div 
              key={index} 
              className="glass-panel group rounded-3xl p-8 sm:p-9 border border-[oklch(0.8_0.12_82/22%)] hover:border-gold transition-all duration-500 flex flex-col justify-between hover:-translate-y-2"
            >
              <div>
                {/* Rating Stars & Glass Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-1 text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div className="glass-icon w-9 h-9 rounded-full flex items-center justify-center text-gold">
                    <Quote className="w-4 h-4" />
                  </div>
                </div>

                {/* Impact Metric Badge */}
                <div className="mb-4 inline-block px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-[oklch(0.8_0.14_82/10%)] text-gold border border-[oklch(0.8_0.12_82/25%)]">
                  {t.metrics}
                </div>

                {/* Quote Body */}
                <p className="text-champagne/90 text-sm leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-4 pt-5 border-t border-[oklch(0.8_0.12_82/15%)]">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[oklch(0.88_0.12_85)] via-[oklch(0.8_0.14_82)] to-[oklch(0.68_0.16_78)] p-[1.5px] shrink-0">
                  <div className="w-full h-full rounded-2xl bg-[oklch(0.14_0.015_70)] flex items-center justify-center font-heading font-bold text-sm text-gold">
                    {t.author.charAt(0)}
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-champagne">{t.author}</h3>
                  <p className="text-xs text-gold/90 font-medium">{t.role}</p>
                  <span className="text-[11px] text-warm-gray block">{t.companyType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;