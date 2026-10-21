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
    category: "Virtual Staff",
    title: "Smart AI Digital Assistants",
    description: "Tired of repetitive computer tasks? We build custom AI assistants tailored to how your business runs, handling daily routine work so your human staff can focus on customers and growth.",
    features: ["Works 24/7 without getting tired", "Double-checks its work to prevent mistakes", "Acts as an extra set of hands for your team"]
  },
  {
    id: "02",
    icon: Zap,
    category: "Zero Copy-Pasting",
    title: "Hands-Free Business Workflows",
    description: "Connect your emails, WhatsApp, spreadsheets, and databases. When a new customer reaches out, their contact info, invoices, and follow-ups happen automatically without anyone retyping data.",
    features: ["No more manual copy-pasting", "Instant customer follow-ups", "Runs smoothly day and night"]
  },
  {
    id: "03",
    icon: BarChart3,
    category: "Clear Numbers",
    title: "Live Business Dashboards",
    description: "Get crystal-clear visual dashboards showing how quickly orders are fulfilled, which steps cause delays, and exactly how many hours and dollars your automations save you every week.",
    features: ["See your entire business at a glance", "Catch delays before they cost you money", "Clear, easy-to-read savings reports"]
  },
  {
    id: "04",
    icon: Network,
    category: "Works With Your Tools",
    title: "Connecting Your Existing Software",
    description: "You don't need to learn or buy new software. We safely plug smart AI right into the tools you already use every day—like your CRM, accounting software, or spreadsheets—with bank-level privacy.",
    features: ["Works with your current software", "Bank-level confidential data protection", "Zero downtime or business interruption"]
  },
  {
    id: "05",
    icon: FileSearch,
    category: "Paperwork Made Easy",
    title: "Instant Document & Invoice Reader",
    description: "Stop spending hours typing data from paper receipts, supplier invoices, contracts, and PDF files. Our AI scans them in seconds, pulls out the key numbers, and saves them automatically.",
    features: ["Reads invoices, receipts & contracts instantly", "Eliminates typing mistakes", "Makes all your documents instantly searchable"]
  },
  {
    id: "06",
    icon: Headphones,
    category: "Happy Customers",
    title: "24/7 Instant Customer Support",
    description: "Give your clients immediate, friendly, and helpful replies on WhatsApp or your website in seconds. When someone needs personal attention, the AI smoothly alerts your staff.",
    features: ["Answers clients in under 5 seconds", "Polite, natural, and helpful tone", "Hands off to human staff when needed"]
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10" aria-label="Services Section">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow-badge mb-3">02 / WHAT WE DO</div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-champagne mb-4">
            How We Help Your Business <span className="gold-gradient-text">Run on Autopilot</span>
          </h2>
          <p className="text-warm-gray text-base md:text-lg leading-relaxed">
            Practical, reliable AI solutions that take boring computer work off your plate, cut your operating costs, and give your customers instant service—without requiring any technical background.
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
                    href="https://wa.me/254792767922"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pt-2 inline-flex items-center space-x-1.5 text-xs font-semibold text-gold group-hover:text-champagne transition-colors"
                  >
                    <span>Inquire About This Solution</span>
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
              Have a unique workflow you want to automate?
            </h4>
            <p className="text-xs sm:text-sm text-warm-gray">
              Every business is different. Tell us what task takes up the most time in your day, and we will build a custom solution for it.
            </p>
          </div>
          <a
            href="https://wa.me/254792767922?text=Hello%20Given%2C%20I%20have%20a%20specific%20workflow%20I%20would%20like%20to%20automate."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-7 py-3.5 rounded-2xl font-bold text-xs sm:text-sm bg-gold text-black hover:bg-[oklch(0.86_0.16_84)] shadow-md shadow-[oklch(0.8_0.14_82/25%)] transition-all transform hover:scale-105"
          >
            Inquire on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};

export default Services;