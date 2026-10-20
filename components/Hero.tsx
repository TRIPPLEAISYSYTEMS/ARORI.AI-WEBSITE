import React from 'react';
import { ArrowUpRight, Bot, Zap, BarChart3, ShieldCheck, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 relative z-10" aria-label="Hero Section">
      <div className="max-w-7xl mx-auto">
        
        {/* Top: Retaining Original Logo Prominently at the Top */}
        <div className="mb-10 flex justify-center">
          <div className="relative group">
            {/* Ambient Radiant Gold Glow Halo */}
            <div className="absolute inset-0 bg-[oklch(0.8_0.14_82/25%)] blur-[75px] rounded-full group-hover:bg-[oklch(0.8_0.14_82/35%)] transition-all duration-700 pointer-events-none" />
            
            {/* Glass Ring Halo */}
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full glass-panel flex items-center justify-center p-6 transition-transform duration-500 hover:scale-105 border border-[oklch(0.8_0.12_82/35%)] shadow-2xl">
              <div className="absolute inset-2 rounded-full border border-dashed border-[oklch(0.8_0.12_82/25%)] animate-[spin_180s_linear_infinite]" />
              <img 
                src="logo.png" 
                alt="TRIPPLE AI SYSTEMS Logo - The Future of AI Automation" 
                className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(240,183,59,0.45)] relative z-10"
              />
            </div>
          </div>
        </div>

        {/* Hero Center Text & Actions */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Status Pill Indicator with Glass Finish */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full glass-pill border border-[oklch(0.8_0.12_82/30%)] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
            <span className="text-xs font-semibold text-champagne tracking-wide">
              Available for ambitious enterprise builds
            </span>
            <span className="text-[10px] text-gold/80 font-mono uppercase pl-2 border-l border-[oklch(0.8_0.12_82/25%)] hidden sm:inline">
              NAIROBI // GLOBAL SCALE
            </span>
          </div>

          {/* Clamp-based Editorial Typography */}
          <h1 
            className="font-extrabold font-heading text-champagne tracking-tight leading-[0.92]"
            style={{ fontSize: 'clamp(2.75rem, 7.5vw, 6.2rem)' }}
          >
            Transform Your Enterprise with <br />
            <span className="gold-gradient-text">TRIPPLE AI SYSTEMS</span>
          </h1>

          <p className="text-warm-gray text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            We are a premier <strong className="text-champagne font-semibold">AI Automation Agency</strong> engineering bespoke multi-agent workforces and managed pipelines to eliminate bottlenecks, accelerate operations, and unlock hidden revenue—without replacing your team.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/254792767922"
              target="_blank"
              rel="noopener noreferrer"
              title="Inquire directly on WhatsApp: 0792767922"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm sm:text-base bg-gradient-to-r from-[oklch(0.88_0.12_85)] via-[oklch(0.8_0.14_82)] to-[oklch(0.72_0.16_80)] text-black shadow-xl shadow-[oklch(0.8_0.14_82/25%)] hover:shadow-[oklch(0.8_0.14_82/45%)] hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group"
            >
              <span>Inquire Now</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="#services"
              title="View our AI automation services"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl font-semibold text-sm sm:text-base glass-panel text-champagne hover:border-gold hover:text-gold transition-colors duration-300 flex items-center justify-center"
            >
              Explore Services
            </a>

            <a
              href="#about"
              title="Explore our architecture"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl font-semibold text-sm glass-panel text-warm-gray hover:text-champagne hover:border-gold transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span>System Directive</span>
            </a>
          </div>
        </div>

        {/* Glassmorphism Tiles Layout (Bento Grid) with Glass Icons */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tile 1 */}
          <div className="glass-panel rounded-3xl p-7 border border-[oklch(0.8_0.12_82/25%)] hover:border-gold transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[oklch(0.8_0.14_82/0%)] to-transparent group-hover:via-[oklch(0.8_0.14_82/75%)] transition-all duration-500" />
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="glass-icon w-13 h-13 rounded-2xl flex items-center justify-center text-gold">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full glass-pill text-gold">
                  &lt; 380MS
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-champagne group-hover:text-gold transition-colors mb-2">
                Custom AI Agents
              </h3>
              <p className="text-xs sm:text-sm text-warm-gray leading-relaxed">
                Autonomous agent swarms executing multi-step reasoning, tool dispatch, and deterministic fallback loops.
              </p>
            </div>
            <div className="pt-4 mt-5 border-t border-[oklch(0.8_0.12_82/15%)] flex items-center justify-between text-[11px] font-mono text-gold">
              <span>Bespoke Swarms</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Tile 2 */}
          <div className="glass-panel rounded-3xl p-7 border border-[oklch(0.8_0.12_82/25%)] hover:border-gold transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[oklch(0.8_0.14_82/0%)] to-transparent group-hover:via-[oklch(0.8_0.14_82/75%)] transition-all duration-500" />
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="glass-icon w-13 h-13 rounded-2xl flex items-center justify-center text-gold">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full glass-pill text-gold">
                  24/7 ACTIVE
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-champagne group-hover:text-gold transition-colors mb-2">
                Managed Pipelines
              </h3>
              <p className="text-xs sm:text-sm text-warm-gray leading-relaxed">
                Zero-friction data ingestion and autonomous CRM sync bridging modern LLMs with your legacy ERP databases.
              </p>
            </div>
            <div className="pt-4 mt-5 border-t border-[oklch(0.8_0.12_82/15%)] flex items-center justify-between text-[11px] font-mono text-gold">
              <span>Automated ETL</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Tile 3 */}
          <div className="glass-panel rounded-3xl p-7 border border-[oklch(0.8_0.12_82/25%)] hover:border-gold transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[oklch(0.8_0.14_82/0%)] to-transparent group-hover:via-[oklch(0.8_0.14_82/75%)] transition-all duration-500" />
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="glass-icon w-13 h-13 rounded-2xl flex items-center justify-center text-gold">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full glass-pill text-gold">
                  99.98% ACC
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-champagne group-hover:text-gold transition-colors mb-2">
                Real-Time Telemetry
              </h3>
              <p className="text-xs sm:text-sm text-warm-gray leading-relaxed">
                Auditable dashboards monitoring exact cost per token, latency curves, and immediate operational ROI tracking.
              </p>
            </div>
            <div className="pt-4 mt-5 border-t border-[oklch(0.8_0.12_82/15%)] flex items-center justify-between text-[11px] font-mono text-gold">
              <span>Predictive Audits</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Tile 4 */}
          <div className="glass-panel rounded-3xl p-7 border border-[oklch(0.8_0.12_82/25%)] hover:border-gold transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[oklch(0.8_0.14_82/0%)] to-transparent group-hover:via-[oklch(0.8_0.14_82/75%)] transition-all duration-500" />
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="glass-icon w-13 h-13 rounded-2xl flex items-center justify-center text-gold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full glass-pill text-gold">
                  SOC-2 READY
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-champagne group-hover:text-gold transition-colors mb-2">
                Sovereign Privacy
              </h3>
              <p className="text-xs sm:text-sm text-warm-gray leading-relaxed">
                Complete IP retention with client-isolated sandbox execution. Your confidential enterprise data is never leaked.
              </p>
            </div>
            <div className="pt-4 mt-5 border-t border-[oklch(0.8_0.12_82/15%)] flex items-center justify-between text-[11px] font-mono text-gold">
              <span>100% IP Retained</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;