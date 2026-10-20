import React from 'react';
import { Globe, Target, Rocket, Shield, Calendar, Cpu } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10" aria-label="About TRIPPLE AI SYSTEMS">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow-badge mb-3">01 / ABOUT TRIPPLE AI</div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-champagne mb-4">
            Architecting <span className="gold-gradient-text">Sovereign Intelligence</span>
          </h2>
          <p className="text-warm-gray text-base md:text-lg leading-relaxed">
            Founded by Given Arori Arori, TRIPPLE AI SYSTEMS builds resilient, self-governing multi-agent architectures designed to turn operational friction into automated velocity.
          </p>
        </div>

        {/* Modular Bento Glass Tiles Grid */}
        <div className="grid md:grid-cols-12 gap-6">
          
          {/* Tile 1: Core Mission (7-Col Glass Tile) */}
          <div className="md:col-span-7 glass-panel-elevated rounded-3xl p-8 sm:p-10 border border-[oklch(0.8_0.12_82/25%)] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-pill border border-[oklch(0.8_0.12_82/30%)] text-gold text-xs font-semibold mb-6">
                <Target className="w-3.5 h-3.5" />
                <span>The Sovereign Directive</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-champagne mb-4 leading-snug">
                Bridging Complex Artificial Intelligence with Real Enterprise Utility
              </h3>

              <p className="text-warm-gray text-sm sm:text-base leading-relaxed mb-6">
                Most agencies assemble fragile wrappers that fail under load. We engineer sovereign multi-agent swarms integrated directly into core company ERPs, relational databases, and customer communication pipelines.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-[oklch(0.8_0.12_82/15%)]">
              <div className="flex items-center space-x-3.5">
                <div className="glass-icon w-11 h-11 rounded-2xl flex items-center justify-center text-gold shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-champagne">Zero Wrappers</h4>
                  <p className="text-[11px] text-warm-gray">Bespoke Python &amp; Gemini Agents</p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <div className="glass-icon w-11 h-11 rounded-2xl flex items-center justify-center text-gold shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-champagne">100% Sovereign IP</h4>
                  <p className="text-[11px] text-warm-gray">Complete Client Ownership</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tile 2: Founder Card (5-Col Glass Tile) */}
          <div className="md:col-span-5 glass-panel-elevated rounded-3xl p-8 border border-[oklch(0.8_0.12_82/25%)] gold-glow flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[oklch(0.8_0.12_82/30%)] shrink-0 shadow-lg shadow-[oklch(0.8_0.14_82/20%)] bg-[oklch(0.14_0.015_70)]">
                  <img
                    src="assets/given-arori-ai-glass.jpg"
                    alt="Given Arori Arori"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/assets/given-arori-ai-glass.jpg";
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-champagne">Given Arori Arori</h3>
                  <p className="text-gold text-xs font-mono uppercase tracking-wider mt-0.5 font-semibold">Founder &amp; Chief AI Architect</p>
                  <span className="text-[11px] text-warm-gray">Kenyatta Univ. (Math &amp; Physics)</span>
                </div>
              </div>

              <p className="text-warm-gray text-xs sm:text-sm leading-relaxed mb-6 italic">
                "Our commitment is simple: eliminate organizational bottlenecks, accelerate operational velocity, and empower human ingenuity through transparent, verifiable artificial intelligence."
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="#founder"
                className="w-full py-3.5 px-4 rounded-2xl font-bold text-xs bg-gradient-to-r from-[oklch(0.88_0.12_85)] via-[oklch(0.8_0.14_82)] to-[oklch(0.72_0.16_80)] text-black shadow-md shadow-[oklch(0.8_0.14_82/20%)] hover:shadow-lg hover:shadow-[oklch(0.8_0.14_82/35%)] hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Explore Given Arori's Portfolio</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>

              <div className="p-3 rounded-xl glass-panel border border-[oklch(0.8_0.12_82/15%)] flex items-center justify-between text-[11px]">
                <span className="text-warm-gray flex items-center gap-1.5 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  Est. Dec 1st, 2025
                </span>
                <span className="text-gold font-bold font-mono">NAIROBI HQ</span>
              </div>
            </div>
          </div>

          {/* Tile 3: Global Scaling Goal (6-Col Glass Tile) */}
          <div className="md:col-span-6 glass-panel rounded-3xl p-7 sm:p-8 border border-[oklch(0.8_0.12_82/20%)] hover:border-gold transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="glass-icon w-12 h-12 rounded-2xl flex items-center justify-center text-gold">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-gold px-3 py-1 rounded-full glass-pill border border-[oklch(0.8_0.12_82/25%)]">
                TARGET: 2030
              </span>
            </div>

            <h4 className="font-heading font-bold text-xl text-champagne mb-2">
              10,000 Enterprise Partners
            </h4>
            <p className="text-xs sm:text-sm text-warm-gray leading-relaxed mb-6">
              Scaling our autonomous agent pipelines across 5 continents: North America, Europe, Africa, Asia, and Latin America.
            </p>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-warm-gray">
                <span>Operational Footprint</span>
                <span className="text-gold font-bold">5 Continents Active</span>
              </div>
              <div className="w-full bg-[oklch(0.14_0.015_70)] h-2 rounded-full overflow-hidden border border-[oklch(0.8_0.12_82/15%)]">
                <div className="bg-gradient-to-r from-gold to-[oklch(0.92_0.08_85)] h-full w-3/4" />
              </div>
            </div>
          </div>

          {/* Tile 4: Agent Deployments & Track Record (6-Col Glass Tile) */}
          <div className="md:col-span-6 glass-panel rounded-3xl p-7 sm:p-8 border border-[oklch(0.8_0.12_82/20%)] hover:border-gold transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="glass-icon w-12 h-12 rounded-2xl flex items-center justify-center text-gold">
                <Rocket className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-gold px-3 py-1 rounded-full glass-pill border border-[oklch(0.8_0.12_82/25%)]">
                PRODUCTION VERIFIED
              </span>
            </div>

            <h4 className="font-heading font-bold text-xl text-champagne mb-2">
              100+ Autonomous Agents Live
            </h4>
            <p className="text-xs sm:text-sm text-warm-gray leading-relaxed mb-6">
              Continuously parsing transactions, resolving inquiries, and synchronizing data streams with 99.98% deterministic precision.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl glass-panel border border-[oklch(0.8_0.12_82/15%)]">
                <span className="text-lg font-bold font-heading text-champagne block">4.2M+</span>
                <span className="text-[10px] text-warm-gray uppercase font-mono">Tasks Automated</span>
              </div>
              <div className="p-3.5 rounded-2xl glass-panel border border-[oklch(0.8_0.12_82/15%)]">
                <span className="text-lg font-bold font-heading text-gold block">70%</span>
                <span className="text-[10px] text-warm-gray uppercase font-mono">Avg Time Reclaimed</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;