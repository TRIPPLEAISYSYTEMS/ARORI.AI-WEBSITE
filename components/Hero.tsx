import React from 'react';
import { ArrowUpRight, Bot, Zap, BarChart3, ShieldCheck, Sparkles } from 'lucide-react';
import SolarLightningLogo from './SolarLightningLogo';

const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 relative z-10" aria-label="Hero Section">
      <div className="max-w-7xl mx-auto">
        
        {/* Top: Living Solar Logo with Fiery Sun Flares and Crackling Yellow Lightning */}
        <div className="mb-10 sm:mb-12 flex justify-center">
          <SolarLightningLogo size="lg" />
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
            We build custom AI assistants and hands-free business automations that take boring, repetitive computer work off your plate, speed up your daily operations, and help your company grow—without replacing your staff.
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
              <span>How It Works</span>
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
                  ALWAYS ON
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-champagne group-hover:text-gold transition-colors mb-2">
                Smart Digital Assistants
              </h3>
              <p className="text-xs sm:text-sm text-warm-gray leading-relaxed">
                Virtual staff members that answer customer questions, handle daily data entry, and organize records 24/7 without making mistakes.
              </p>
            </div>
            <div className="pt-4 mt-5 border-t border-[oklch(0.8_0.12_82/15%)] flex items-center justify-between text-[11px] font-mono text-gold">
              <span>Zero Human Fatigue</span>
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
                  ZERO MANUAL WORK
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-champagne group-hover:text-gold transition-colors mb-2">
                Hands-Free Workflows
              </h3>
              <p className="text-xs sm:text-sm text-warm-gray leading-relaxed">
                Connect your WhatsApp, spreadsheets, email, and billing tools so data flows across your business automatically with zero copy-pasting.
              </p>
            </div>
            <div className="pt-4 mt-5 border-t border-[oklch(0.8_0.12_82/15%)] flex items-center justify-between text-[11px] font-mono text-gold">
              <span>Automatic Syncing</span>
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
                  CLEAR NUMBERS
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-champagne group-hover:text-gold transition-colors mb-2">
                Live Business Dashboards
              </h3>
              <p className="text-xs sm:text-sm text-warm-gray leading-relaxed">
                Simple, real-time visual dashboards showing where time is being saved, how quickly tasks finish, and your exact return on investment.
              </p>
            </div>
            <div className="pt-4 mt-5 border-t border-[oklch(0.8_0.12_82/15%)] flex items-center justify-between text-[11px] font-mono text-gold">
              <span>Instant Visibility</span>
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
                  100% PRIVATE
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-champagne group-hover:text-gold transition-colors mb-2">
                Total Ownership &amp; Privacy
              </h3>
              <p className="text-xs sm:text-sm text-warm-gray leading-relaxed">
                You own 100% of all software and tools we build. Your private company records remain confidential and are never shared or leaked.
              </p>
            </div>
            <div className="pt-4 mt-5 border-t border-[oklch(0.8_0.12_82/15%)] flex items-center justify-between text-[11px] font-mono text-gold">
              <span>Bank-Grade Security</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;