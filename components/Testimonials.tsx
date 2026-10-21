import React from 'react';
import { Quote, Star } from 'lucide-react';
import { TestimonialItem } from '../types';

const testimonials: (TestimonialItem & { metrics: string; companyType: string })[] = [
  {
    quote: "TRIPPLE AI SYSTEMS cut our customer reply times by 70% and helped us close 45% more sales inquiries. Their smart digital assistants take care of all initial questions automatically on WhatsApp and web, so our sales team only talks to serious, ready-to-buy clients.",
    author: "Marcus Vance",
    role: "Managing Director",
    companyType: "Cloud Services & Hosting",
    metrics: "70% Faster Replies • +45% More Sales"
  },
  {
    quote: "We used to spend hours every single day typing patient information from paper forms into our system. Given Arori built an automated document reader that handles it instantly, saving our staff 35+ hours every week without a single mistake.",
    author: "Elena Rostova",
    role: "Operations Manager",
    companyType: "Health & Medical Clinic",
    metrics: "35+ Hours Saved Weekly • 0% Errors"
  },
  {
    quote: "The live business dashboard and automatic order routing were complete game-changers for our warehouse. Orders from WhatsApp and our store now get organized in seconds without anyone having to manually copy-paste tracking numbers and customer details.",
    author: "Darius K.",
    role: "Founder & Logistics Lead",
    companyType: "Retail & E-Commerce Delivery",
    metrics: "Instant Order Processing • Zero Backlog"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10" aria-label="Client Testimonials">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow-badge mb-3">06 / PROVEN RESULTS</div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-champagne mb-4">
            Real Businesses, <span className="gold-gradient-text">Real Results</span>
          </h2>
          <p className="text-warm-gray text-base md:text-lg leading-relaxed">
            See how business owners save hours each week and grow revenue with simple, custom automations from TRIPPLE AI SYSTEMS.
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