import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, ExternalLink, Eye, X, CheckCircle2, Shield, Layers, Cpu } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: 'Quantitative & Finance' | 'Campus & Social Ecosystem';
  status: 'Production Ready' | 'Public Beta' | 'Active Deployment';
  timeline: string;
  tagline: string;
  image: string;
  imageFit?: 'cover' | 'contain';
  description: string;
  vision: string;
  techStack: string[];
  keyFeatures: string[];
  demoUrl?: string;
  inquiryMessage: string;
  previewMetrics?: { label: string; value: string }[];
}

const projectsData: Project[] = [
  {
    id: 'odin-trading-system',
    title: 'ODIN Trading System',
    category: 'Quantitative & Finance',
    status: 'Production Ready',
    timeline: 'v5 Verified System',
    tagline: 'Institutional-grade, 100% deterministic quantitative trading suite & zero-lookahead backtest lab.',
    image: '/assets/aistudio/96dfd8f2-3885-4392-a394-fca76cb48ee1_35814364.png',
    imageFit: 'contain',
    description: 'An institutional quantitative trading platform, backtesting lab, and risk discipline suite. Built with React 19, TypeScript, and a high-performance event-driven simulation engine, ODIN evaluates declarative strategy rules against historical candle data with full cost accounting, prop-firm risk enforcement, and 53-bit cryptographic run hashes (cyrb53).',
    vision: 'To provide systemic traders with an uncompromised, institutional-grade quantitative foundation where every backtest is verifiable, every rule is enforced without bias, and every trade reflects real market mechanics.',
    techStack: ['React 19', 'TypeScript', 'Event Simulation', 'cyrb53 Hashes', 'Market Structure', 'TailwindCSS'],
    keyFeatures: [
      '100% Deterministic Backtest Engine with 53-bit cryptographic run hashes (cyrb53)',
      'Zero-Lookahead Market Structure Library (MSS, Fair Value Gaps, Liquidity Sweeps, Swings)',
      'Realistic Limit & Market fills with exact spread, slippage, and same-bar conflict resolution',
      'Prop-Firm Compliance Hub with 00:00 UTC daily loss resets & trailing drawdown gates',
      'Position-based trade journal aggregation (buildJournalTrades) with finite projected R:R',
      'AI Strategy Translation Layer converting natural language into validated JSON schemas'
    ],
    demoUrl: 'https://ai.studio/apps/1880af50-7e00-415d-807d-59a0f0063ce2?fullscreenApplet=true',
    inquiryMessage: 'Hello Given, I am interested in exploring or deploying the ODIN Trading System for quantitative trading and risk discipline.',
    previewMetrics: [
      { label: 'Execution Determinism', value: '100%' },
      { label: 'Cryptographic Run Hash', value: '53-Bit cyrb53' },
      { label: 'Verified Test Coverage', value: '117 Tests Pass' }
    ]
  },
  {
    id: 'oculus',
    title: 'OCULUS',
    category: 'Campus & Social Ecosystem',
    status: 'Production Ready',
    timeline: 'Live Platform Deployment',
    tagline: 'Institutional campus portal & social intelligence gateway (Nexus Workspaces + BUZZ Community).',
    image: '/src/assets/images/project_ku_aid_nexus_1794382241559.jpg',
    description: 'OCULUS is an integrated institutional gateway and campus intelligence platform. It features the central OCULUS Gateway context router, the Nexus Academic World for student and faculty workspaces, and BUZZ for campus community engagement (Connect, Spaces, People, Discover, Events, Hub, Meet, Manage), powered by a context-aware AI academic companion.',
    vision: 'To unify academic productivity, faculty collaboration, and vibrant campus life into a single privacy-first AI digital ecosystem for higher-education institutions worldwide.',
    techStack: ['React 19', 'TypeScript', 'TailwindCSS', 'Context AI Companion', 'OCULUS Gateway', 'Vite'],
    keyFeatures: [
      'OCULUS Gateway: Centralized institutional context router and single sign-on security',
      'Nexus Academic World: Dedicated student research, faculty grading & course material workspace',
      'BUZZ Social World: Integrated campus community feeds, Spaces, People, Discover, Events & Meet',
      'Personal Context-Aware AI Companion: Smart academic assistant tracking coursework & campus life',
      'Privacy & Safety by Design: Multi-institution scalability with strict student data protection'
    ],
    demoUrl: 'https://ku-aid-nexus.lovable.app',
    inquiryMessage: 'Hello Given, I am interested in exploring or deploying the OCULUS campus platform for our institution.',
    previewMetrics: [
      { label: 'Campus Ecosystem', value: 'Academic + Social' },
      { label: 'Core Modules', value: 'Nexus + BUZZ' },
      { label: 'Institutional Scale', value: 'Enterprise Ready' }
    ]
  }
];

const filterCategories = ['All Flagships', 'Quantitative & Finance', 'Campus & Social Ecosystem'] as const;

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<typeof filterCategories[number]>('All Flagships');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === 'All Flagships') return true;
    return project.category === activeFilter;
  });

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10" aria-label="Projects and Institutional Systems">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="eyebrow-badge mb-3">03 / INSTITUTIONAL SYSTEMS &amp; PROJECTS</div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-champagne mb-4 tracking-tight">
            Flagship Platforms &amp; <span className="gold-gradient-text">Live Systems</span>
          </h2>
          <p className="text-warm-gray text-base md:text-lg leading-relaxed">
            Explore our deployed institutional platforms and quantitative engines engineered for precision, scalability, and impact.
          </p>
        </div>

        {/* Category Filter Controls */}
        <div className="flex items-center justify-center mb-12">
          <div className="p-1.5 glass-panel rounded-2xl flex flex-wrap justify-center gap-1 sm:gap-2 border border-[oklch(0.8_0.12_82/25%)]">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-gold text-black shadow-md font-bold'
                    : 'text-warm-gray hover:text-champagne hover:bg-[oklch(0.8_0.14_82/10%)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel group rounded-3xl overflow-hidden border border-[oklch(0.8_0.12_82/22%)] hover:border-gold transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5 shadow-2xl"
            >
              <div>
                {/* Image Banner */}
                <div className={`relative h-60 sm:h-72 overflow-hidden ${project.imageFit === 'contain' ? 'bg-black flex items-center justify-center p-4 pt-12' : 'bg-[oklch(0.16_0.02_75)]'}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full transition-transform duration-700 ${
                      project.imageFit === 'contain'
                        ? 'object-contain group-hover:scale-105 opacity-95 group-hover:opacity-100'
                        : 'object-cover group-hover:scale-105 opacity-90 group-hover:opacity-100'
                    }`}
                  />
                  <div className={`absolute inset-0 pointer-events-none ${
                    project.imageFit === 'contain'
                      ? 'bg-gradient-to-t from-[oklch(0.13_0.012_70)] via-transparent to-transparent'
                      : 'bg-gradient-to-t from-[oklch(0.13_0.012_70)] via-[oklch(0.13_0.012_70/40%)] to-transparent'
                  }`} />
                  
                  {/* Category & Status Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono font-medium text-champagne">
                    <span className="glass-pill px-3 py-1 rounded-full border border-[oklch(0.8_0.12_82/30%)] bg-black/60 text-gold font-semibold">
                      {project.category}
                    </span>
                    <span className="glass-pill px-3 py-1 rounded-full border border-[oklch(0.8_0.12_82/30%)] bg-black/60 text-emerald-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-8 space-y-5">
                  {/* Metadata Row */}
                  <div className="flex items-center gap-2 text-xs text-gold/90 font-mono">
                    <span>{project.timeline}</span>
                    <span aria-hidden="true">•</span>
                    <span>Live Verification</span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold font-heading text-champagne group-hover:text-gold transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-warm-gray mt-1.5 leading-relaxed font-medium">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Overview Description */}
                  <p className="text-xs sm:text-sm text-warm-gray/90 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Vision Highlight Box */}
                  <div className="p-4 rounded-2xl bg-[oklch(0.18_0.02_75/50%)] border border-[oklch(0.8_0.12_82/18%)] space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-gold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Institutional Vision</span>
                    </div>
                    <p className="text-xs text-champagne/90 italic leading-relaxed">
                      "{project.vision}"
                    </p>
                  </div>

                  {/* Key Metrics Strip */}
                  {project.previewMetrics && (
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {project.previewMetrics.map((m) => (
                        <div key={m.label} className="p-2.5 rounded-xl bg-[oklch(0.16_0.02_75/60%)] border border-[oklch(0.8_0.12_82/15%)] text-center">
                          <span className="block text-xs sm:text-sm font-bold font-mono text-gold">{m.value}</span>
                          <span className="text-[10px] text-warm-gray block truncate mt-0.5">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-[oklch(0.18_0.02_75/70%)] border border-[oklch(0.8_0.12_82/15%)] text-[11px] font-mono text-warm-gray"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row items-center gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-1/2 py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-[oklch(0.88_0.12_85)] via-[oklch(0.8_0.14_82)] to-[oklch(0.72_0.16_80)] text-black hover:shadow-lg hover:shadow-[oklch(0.8_0.14_82/25%)] transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="w-4 h-4 shrink-0" />
                    <span>Launch Live System</span>
                  </a>
                )}

                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full sm:w-1/2 py-3 px-4 rounded-xl font-bold text-xs bg-[oklch(0.18_0.02_75)] hover:bg-[oklch(0.22_0.02_75)] text-champagne border border-[oklch(0.8_0.12_82/30%)] hover:border-gold transition-all duration-200 flex items-center justify-center space-x-2 group/btn"
                >
                  <Eye className="w-4 h-4 text-gold group-hover/btn:scale-110 transition-transform" />
                  <span>Architecture &amp; Specs</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep-Dive Interactive Preview & Vision Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel-elevated max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border border-[oklch(0.8_0.12_82/40%)] p-6 sm:p-8 space-y-6 relative gold-glow">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full glass-panel text-warm-gray hover:text-champagne transition-colors"
              aria-label="Close project preview modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-gold uppercase tracking-wider mb-2">
                <span>{selectedProject.category}</span>
                <span aria-hidden="true">•</span>
                <span>{selectedProject.timeline}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-heading text-champagne">
                {selectedProject.title}
              </h2>
              <p className="text-sm text-warm-gray mt-1 leading-relaxed font-medium">
                {selectedProject.tagline}
              </p>
            </div>

            {/* Image Preview Container */}
            <div className={`relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-[oklch(0.8_0.12_82/25%)] ${selectedProject.imageFit === 'contain' ? 'bg-black p-4' : ''}`}>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full ${selectedProject.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 pointer-events-none">
                <div className="flex items-center space-x-3 text-xs text-champagne font-mono">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-bold">
                    Status: {selectedProject.status}
                  </span>
                  <span>{selectedProject.timeline}</span>
                </div>
              </div>
            </div>

            {/* Key Preview Metrics Grid */}
            {selectedProject.previewMetrics && (
              <div className="grid grid-cols-3 gap-3">
                {selectedProject.previewMetrics.map((m) => (
                  <div key={m.label} className="p-4 rounded-2xl glass-panel text-center border border-[oklch(0.8_0.12_82/20%)]">
                    <span className="block text-lg sm:text-2xl font-bold font-mono text-gold">{m.value}</span>
                    <span className="text-[11px] text-warm-gray block font-medium mt-0.5">{m.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Vision & Full Description */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-gold mb-1 font-semibold">Institutional Vision</h3>
                <p className="text-sm text-champagne italic bg-[oklch(0.18_0.02_75/50%)] p-4 rounded-2xl border border-[oklch(0.8_0.12_82/20%)] leading-relaxed">
                  "{selectedProject.vision}"
                </p>
              </div>

              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-warm-gray mb-1 font-semibold">Architecture &amp; System Overview</h3>
                <p className="text-sm text-warm-gray leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Core Features List */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-warm-gray mb-2.5 font-semibold">Core Capabilities &amp; System Modules</h3>
                <ul className="grid sm:grid-cols-2 gap-2 text-xs text-warm-gray">
                  {selectedProject.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2 p-2.5 rounded-xl glass-panel">
                      <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-warm-gray mb-2 font-semibold">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-xl bg-[oklch(0.18_0.02_75)] text-xs font-mono text-gold border border-[oklch(0.8_0.12_82/25%)]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[oklch(0.8_0.12_82/20%)] flex flex-col sm:flex-row gap-3">
              {selectedProject.demoUrl && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-[oklch(0.88_0.12_85)] via-[oklch(0.8_0.14_82)] to-[oklch(0.72_0.16_80)] text-black hover:shadow-xl hover:shadow-[oklch(0.8_0.14_82/30%)] transition-all flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4 shrink-0" />
                  <span>Launch Live Fullscreen Applet</span>
                </a>
              )}

              <a
                href={`https://wa.me/254792767922?text=${encodeURIComponent(selectedProject.inquiryMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full ${selectedProject.demoUrl ? 'sm:w-auto' : 'sm:flex-1'} py-3.5 px-6 rounded-2xl font-bold text-sm glass-panel text-champagne hover:border-gold transition-colors flex items-center justify-center space-x-2`}
              >
                <span>Inquire on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
