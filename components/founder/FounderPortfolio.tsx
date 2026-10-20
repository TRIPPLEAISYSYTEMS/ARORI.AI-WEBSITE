import React, { useEffect } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  GraduationCap,
  Layers3,
  Linkedin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { profile, services, technologyRows } from "./content";
import StarField from "./StarField";

function SectionHeading({
  number,
  label,
  title,
}: {
  number: string;
  label: string;
  title: string;
}) {
  return (
    <div className="section-heading mb-10">
      <p className="eyebrow-badge">
        {number} / {label}
      </p>
      <h2 className="mt-4 max-w-4xl font-heading text-3xl font-bold leading-tight text-champagne sm:text-5xl md:text-6xl">
        {title}
      </h2>
    </div>
  );
}

function FounderHeader() {
  const statusItems = [
    { label: "AI SOLUTIONS SPECIALIST", highlight: false },
    { label: "AVAILABLE FOR ENTERPRISE BUILDS", highlight: true },
    { label: "NAIROBI, KENYA", highlight: false },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[oklch(0.8_0.12_82/15%)] bg-[oklch(0.13_0.012_70/80%)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#home"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-warm-gray hover:text-gold transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to TRIPPLE AI SYSTEMS</span>
        </a>

        <div className="hidden md:flex items-center space-x-4 text-[11px] font-mono text-warm-gray uppercase tracking-wider">
          {statusItems.map((item) => (
            <span
              key={item.label}
              className={`flex items-center space-x-2 ${
                item.highlight ? "text-gold font-semibold" : ""
              }`}
            >
              {item.highlight && <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />}
              <span>{item.label}</span>
            </span>
          ))}
        </div>

        <a
          href={profile.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-black transition-all"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp 0792767922</span>
        </a>
      </div>
    </header>
  );
}

function FounderHero() {
  return (
    <section className="relative pt-12 pb-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        {/* Left Column: Bio & Core Pitch */}
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-pill border border-[oklch(0.8_0.12_82/25%)] text-gold text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FOUNDER &amp; LEAD AI ARCHITECT</span>
          </div>

          <h1 className="font-heading font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight text-champagne leading-[0.92]">
            GIVEN <br />
            <span className="gold-gradient-text">ARORI</span>
          </h1>

          <p className="text-base sm:text-xl text-warm-gray leading-relaxed max-w-xl">
            {profile.intro}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-[#25D366] via-[#1EBE5D] to-[#128C7E] text-white shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:scale-105 transition-all flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-2xl font-semibold text-sm glass-panel text-champagne hover:border-gold hover:text-gold transition-all flex items-center space-x-2"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn Profile</span>
            </a>

            <a
              href="tel:+254792767922"
              className="px-5 py-3.5 rounded-2xl font-mono text-xs glass-panel text-warm-gray hover:text-champagne hover:border-gold transition-all flex items-center space-x-2"
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>0792 767 922</span>
            </a>
          </div>
        </div>

        {/* Right Column: Original Glass Portrait Visual */}
        <div className="relative group">
          <div className="absolute inset-0 bg-[oklch(0.8_0.14_82/20%)] blur-[70px] rounded-3xl pointer-events-none group-hover:bg-[oklch(0.8_0.14_82/30%)] transition-all duration-700" />
          
          <div className="relative overflow-hidden rounded-3xl border border-[oklch(0.8_0.12_82/30%)] glass-panel shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
            <img
              src="assets/given-arori-ai-glass.jpg"
              alt="Given Arori - AI Solutions Specialist"
              className="w-full h-auto max-h-[580px] object-cover object-top"
              onError={(e) => {
                // Fallback to local image path if assets/ prefix varies
                (e.target as HTMLImageElement).src = "/assets/given-arori-ai-glass.jpg";
              }}
            />
            <div className="absolute inset-x-4 bottom-4 glass-panel p-3.5 rounded-2xl flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-warm-gray border border-[oklch(0.8_0.12_82/30%)]">
              <span className="text-champagne font-semibold">AI / AUTOMATION / SYSTEMS</span>
              <span className="text-gold">NAIROBI, KE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FounderAbout() {
  return (
    <section id="founder-about" className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[oklch(0.8_0.12_82/15%)]">
      <SectionHeading number="01" label="About" title="Curious by nature. Practical by design." />
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <p className="font-heading text-xl sm:text-2xl leading-relaxed text-champagne">
          I work where emerging AI meets useful business systems—testing what is possible, then shaping it into something people can actually use.
        </p>

        <div className="space-y-4 text-sm leading-relaxed text-warm-gray">
          <div className="glass-panel-elevated flex gap-4 p-5 rounded-2xl border border-[oklch(0.8_0.12_82/20%)]">
            <GraduationCap className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-champagne font-mono">Academic Background</p>
              <p className="mt-1.5 text-warm-gray">{profile.education}</p>
            </div>
          </div>

          <div className="glass-panel-elevated flex gap-4 p-5 rounded-2xl border border-[oklch(0.8_0.12_82/20%)]">
            <Layers3 className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-champagne font-mono">Company Leadership</p>
              <p className="mt-1.5 text-warm-gray">
                Building sovereign enterprise agent architectures through{" "}
                <a href="#home" className="text-gold underline hover:text-champagne transition-colors">
                  TRIPPLE AI SYSTEMS
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FounderServices() {
  return (
    <section id="founder-services" className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[oklch(0.8_0.12_82/15%)]">
      <SectionHeading number="02" label="Services" title="Digital capability, connected end to end." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ title, detail, icon: Icon }, index) => (
          <article
            key={title}
            className="glass-panel group rounded-3xl p-6 md:min-h-72 border border-[oklch(0.8_0.12_82/20%)] hover:border-gold transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className="glass-icon w-12 h-12 rounded-2xl flex items-center justify-center text-gold">
                <Icon className="size-5 text-gold" aria-hidden="true" />
              </div>
              <span className="text-xs font-mono text-warm-gray">0{index + 1}</span>
            </div>
            <div className="mt-8">
              <h3 className="font-heading text-lg font-bold text-champagne group-hover:text-gold transition-colors">
                {title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-warm-gray">
                {detail}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FounderExperience() {
  const points = [
    "Experimenting with AI tools, multi-agent frameworks, and reasoning workflows",
    "Building robust web applications, internal tools, and client platforms",
    "Connecting content, digital campaigns, and scalable company data pipelines",
    "Ensuring sub-second execution, deterministic accuracy, and zero downtime",
  ];

  return (
    <section id="founder-experience" className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[oklch(0.8_0.12_82/15%)]">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 items-center">
        <SectionHeading number="03" label="Experience" title="Learn fast. Build clearly. Improve continuously." />
        <div>
          <p className="text-base sm:text-lg leading-relaxed text-warm-gray mb-8">
            My engineering philosophy is hands-on: learning through live tools, real customer workflows, and the discipline of turning a broad conceptual idea into an operational, reliable system.
          </p>
          <ul className="space-y-4">
            {points.map((point) => (
              <li
                key={point}
                className="glass-panel p-4 rounded-2xl border border-[oklch(0.8_0.12_82/20%)] flex items-center gap-3.5 text-xs sm:text-sm text-champagne"
              >
                <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                  <Check className="size-3.5 text-gold" />
                </div>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FounderOculus() {
  return (
    <section id="founder-oculus" className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[oklch(0.8_0.12_82/15%)]">
      <SectionHeading number="04" label="Selected Project" title="One focus. Oculus." />

      <div className="oculus-stage relative overflow-hidden rounded-3xl border border-[oklch(0.8_0.12_82/25%)] glass-panel-elevated p-8 sm:p-14 md:p-20 min-h-[32rem] flex flex-col justify-between gold-glow">
        {/* Giant Monolithic Watermark Mark */}
        <div
          className="absolute inset-0 flex items-center justify-center font-heading text-[min(65vw,36rem)] font-extrabold text-[oklch(0.8_0.14_82/7%)] select-none pointer-events-none"
          aria-hidden="true"
        >
          O
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-warm-gray">
          <span className="text-gold font-bold">PROJECT / 001</span>
          <span>ENTERPRISE ARCHITECTURE • DETAILS ON REQUEST</span>
        </div>

        <div className="relative z-10 max-w-2xl my-10">
          <h3 className="font-heading text-6xl sm:text-8xl md:text-9xl font-extrabold text-champagne tracking-tighter">
            Oculus
          </h3>
          <p className="mt-4 text-sm sm:text-base text-warm-gray leading-relaxed max-w-lg">
            A bespoke intelligence engine and automated operations pipeline designed for high-throughput enterprise monitoring, anomaly detection, and rapid action execution.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://wa.me/254792767922?text=Hello%20Given%2C%20I%20would%20like%20to%20learn%20more%20about%20the%20Oculus%20project."
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-[oklch(0.88_0.12_85)] via-[oklch(0.8_0.14_82)] to-[oklch(0.72_0.16_80)] text-black shadow-xl shadow-[oklch(0.8_0.14_82/25%)] hover:shadow-[oklch(0.8_0.14_82/40%)] hover:scale-105 transition-all flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask About Oculus</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="relative z-10 pt-4 border-t border-[oklch(0.8_0.12_82/15%)] flex items-center justify-between text-xs text-warm-gray">
          <span>Architected by Given Arori</span>
          <span className="font-mono text-gold">Production Ready</span>
        </div>
      </div>
    </section>
  );
}

function FounderTechnologies() {
  return (
    <section id="founder-skills" className="py-20 border-t border-[oklch(0.8_0.12_82/15%)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-12">
        <SectionHeading number="05" label="Technology" title="A broad toolkit for connected work." />
        <p className="text-xs sm:text-sm text-warm-gray max-w-2xl -mt-4">
          Over 100 tools, AI models, frameworks, and APIs actively integrated across production workflows.
        </p>
      </div>

      <div className="space-y-3.5" aria-label="100 technologies and skills">
        {technologyRows.map((row, index) => (
          <div
            key={row[0]}
            className={`flex w-max gap-3 ${
              index % 2 === 1 ? "animate-marquee-reverse-slow" : "animate-marquee-slow"
            } hover:[animation-play-state:paused]`}
          >
            {[...row, ...row].map((tech, itemIndex) => (
              <span
                key={`${tech}-${itemIndex}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass-panel text-xs font-mono text-champagne border border-[oklch(0.8_0.12_82/20%)] hover:border-gold hover:text-gold transition-colors whitespace-nowrap shadow-sm"
              >
                <Sparkles className="w-3 h-3 text-gold shrink-0" aria-hidden="true" />
                <span>{tech}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function FounderContact() {
  return (
    <section id="founder-contact" className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[oklch(0.8_0.12_82/15%)]">
      <div className="glass-panel-elevated rounded-3xl p-8 sm:p-14 md:p-16 border border-[oklch(0.8_0.12_82/25%)] gold-glow space-y-8">
        <p className="eyebrow-badge">06 / START A CONVERSATION</p>
        <h2 className="max-w-4xl font-heading text-4xl sm:text-6xl font-bold leading-tight text-champagne">
          Have a problem AI could help solve?
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pt-6 border-t border-[oklch(0.8_0.12_82/15%)]">
          <div>
            <p className="text-xs uppercase font-mono tracking-wider text-warm-gray">Direct WhatsApp Line</p>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-1 block font-heading text-2xl sm:text-3xl font-bold text-champagne hover:text-gold transition-colors font-mono"
            >
              {profile.phone}
            </a>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[#25D366] via-[#1EBE5D] to-[#128C7E] text-white shadow-lg shadow-[#25D366]/25 hover:scale-105 transition-all flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-2xl font-semibold text-xs sm:text-sm glass-panel text-champagne hover:border-gold hover:text-gold transition-all flex items-center space-x-2"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>

            <a
              href="#home"
              className="px-6 py-3.5 rounded-2xl font-semibold text-xs sm:text-sm glass-panel text-gold hover:border-gold hover:text-champagne transition-all flex items-center space-x-2"
            >
              <span>Return to Agency</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <footer className="mt-12 flex flex-col sm:flex-row items-center justify-between text-xs text-warm-gray gap-4">
        <span>&copy; {new Date().getFullYear()} Given Arori. All rights reserved.</span>
        <a href="#home" className="hover:text-gold transition-colors font-semibold">
          TRIPPLE AI SYSTEMS
        </a>
      </footer>
    </section>
  );
}

export const FounderPortfolio: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="relative isolate min-h-screen">
      {/* Interactive Canvas Star Field from Portfolio */}
      <StarField />

      <FounderHeader />
      <main>
        <FounderHero />
        <FounderAbout />
        <FounderServices />
        <FounderExperience />
        <FounderOculus />
        <FounderTechnologies />
        <FounderContact />
      </main>
    </div>
  );
};

export default FounderPortfolio;
