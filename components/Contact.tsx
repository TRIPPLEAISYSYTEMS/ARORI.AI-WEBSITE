import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, ArrowUpRight, Sparkles, Clock, MessageSquare } from 'lucide-react';

const inquiryTopics = [
  { label: 'Smart AI Assistants', message: 'Hello Given, I would like to inquire about building smart AI assistants for our daily business tasks.' },
  { label: 'Automate Daily Workflows', message: 'Hello Given, I want to inquire about connecting our software and automating routine tasks.' },
  { label: 'Live Business Dashboards', message: 'Hello Given, I am interested in seeing live performance and time-saving dashboards for our business.' },
  { label: 'Connect Existing Software', message: 'Hello Given, I would like to inquire about connecting AI into our current tools and spreadsheets.' }
];

const Contact: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState(inquiryTopics[0].label);
  const [customNotes, setCustomNotes] = useState('');
  const [clientName, setClientName] = useState('');

  const getWhatsAppUrl = () => {
    const topicObj = inquiryTopics.find(t => t.label === selectedTopic);
    let text = topicObj ? topicObj.message : 'Hello Given, I am inquiring about TRIPPLE AI SYSTEMS.';
    if (clientName.trim()) {
      text += ` My name is ${clientName.trim()}.`;
    }
    if (customNotes.trim()) {
      text += ` Project details: ${customNotes.trim()}`;
    }
    return `https://wa.me/254792767922?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10" aria-label="Inquire Now Section">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow-badge mb-3">08 / INQUIRE NOW</div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-champagne mb-4">
            Connect Directly with <span className="gold-gradient-text">Given Arori</span>
          </h2>
          <p className="text-warm-gray text-base md:text-lg leading-relaxed">
            Direct WhatsApp channel to founder Given Arori for quick questions, project estimates, or starting your business automation at <strong className="text-champagne font-mono">0792767922</strong>.
          </p>
        </div>

        {/* Contact Container with Modular Bento Glass Tiles */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Tile 1: Direct Contact & Guarantees (5 Cols) */}
          <div className="lg:col-span-5 glass-panel-elevated rounded-3xl p-8 sm:p-9 border border-[oklch(0.8_0.12_82/25%)] gold-glow space-y-7 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-gold font-semibold">Direct Communication Channels</span>
              <h3 className="font-heading font-bold text-2xl text-champagne mt-1 mb-3">Direct Contact</h3>
              <p className="text-xs sm:text-sm text-warm-gray leading-relaxed mb-6">
                Chat directly with founder &amp; engineer Given Arori for quick feedback, privacy agreements, or project scoping.
              </p>

              <div className="space-y-4">
                {/* WhatsApp Direct Highlight */}
                <a 
                  href="https://wa.me/254792767922" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glass-panel p-4 rounded-2xl flex items-center space-x-4 border border-[oklch(0.8_0.12_82/25%)] hover:border-[#25D366] transition-colors group"
                >
                  <div className="glass-icon w-11 h-11 rounded-2xl flex items-center justify-center text-[#25D366] shrink-0">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] text-[#25D366] uppercase tracking-wider block font-mono font-semibold">WhatsApp Direct</span>
                    <span className="text-sm font-bold text-champagne group-hover:text-[#25D366] transition-colors font-mono">
                      0792767922
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-warm-gray group-hover:text-[#25D366] transition-colors" />
                </a>

                <a 
                  href="tel:+254792767922" 
                  className="glass-panel p-4 rounded-2xl flex items-center space-x-4 border border-[oklch(0.8_0.12_82/20%)] hover:border-gold transition-colors group"
                >
                  <div className="glass-icon w-11 h-11 rounded-2xl flex items-center justify-center text-gold shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-warm-gray uppercase tracking-wider block font-mono">Phone / Signal</span>
                    <span className="text-sm font-semibold text-champagne group-hover:text-gold transition-colors font-mono">
                      +254 792 767 922
                    </span>
                  </div>
                </a>

                <a 
                  href="mailto:givenarori77@gmail.com" 
                  className="glass-panel p-4 rounded-2xl flex items-center space-x-4 border border-[oklch(0.8_0.12_82/20%)] hover:border-gold transition-colors group"
                >
                  <div className="glass-icon w-11 h-11 rounded-2xl flex items-center justify-center text-gold shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-warm-gray uppercase tracking-wider block font-mono">Executive Email</span>
                    <span className="text-sm font-semibold text-champagne group-hover:text-gold transition-colors break-all">
                      givenarori77@gmail.com
                    </span>
                  </div>
                </a>

                <div className="glass-panel p-4 rounded-2xl flex items-center space-x-4 border border-[oklch(0.8_0.12_82/20%)]">
                  <div className="glass-icon w-11 h-11 rounded-2xl flex items-center justify-center text-gold shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-warm-gray uppercase tracking-wider block font-mono">Global Headquarters</span>
                    <span className="text-sm font-semibold text-champagne">
                      Nairobi, Kenya • Global Delivery
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* SLA Sub-Tile */}
            <div className="p-5 rounded-2xl glass-panel border border-[oklch(0.8_0.12_82/20%)] space-y-3">
              <div className="flex items-center space-x-2 text-xs font-semibold text-gold uppercase tracking-wider font-mono">
                <Clock className="w-4 h-4" />
                <span>Our Promise to You</span>
              </div>
              <ul className="space-y-2 text-xs text-warm-gray">
                {[
                  "Direct founder access via WhatsApp (0792767922)",
                  "Quick reply within 1 hour during business hours",
                  "100% full ownership of your tools and data",
                  "Clear, fixed pricing with no surprise fees"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tile 2: Dedicated Inquire Now via WhatsApp Panel (7 Cols) */}
          <div className="lg:col-span-7 glass-panel-elevated rounded-3xl p-8 sm:p-9 border border-[oklch(0.8_0.12_82/25%)] gold-glow space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs font-semibold mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span>WhatsApp Line Active: 0792767922</span>
                </div>
                <h3 className="font-heading font-bold text-2xl text-champagne">
                  Inquire Now for Simple Business Automation
                </h3>
                <p className="text-xs sm:text-sm text-warm-gray mt-1 leading-relaxed">
                  Choose what you need help with or describe your business routine below. Your message opens directly in WhatsApp with Given Arori.
                </p>
              </div>

              {/* Inquiry Focus Selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-warm-gray mb-2.5">
                  Select Inquiry Topic
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {inquiryTopics.map((topic) => {
                    const isSelected = selectedTopic === topic.label;
                    return (
                      <button
                        key={topic.label}
                        type="button"
                        onClick={() => setSelectedTopic(topic.label)}
                        className={`p-3.5 rounded-2xl text-left transition-all duration-200 border text-xs font-medium flex items-center justify-between ${
                          isSelected
                            ? 'bg-gold/15 border-gold text-champagne shadow-md shadow-gold/10'
                            : 'glass-panel text-warm-gray hover:text-champagne hover:border-gold/40'
                        }`}
                      >
                        <span>{topic.label}</span>
                        {isSelected && <CheckCircle className="w-3.5 h-3.5 text-gold shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Optional Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-warm-gray mb-1.5">
                    Your Name or Business Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Sarah Mwangi • Retail & Distribution"
                    className="w-full px-4 py-3 rounded-xl bg-[oklch(0.18_0.02_75/50%)] border border-[oklch(0.8_0.12_82/20%)] focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm text-champagne placeholder-[oklch(0.6_0.02_80)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-warm-gray mb-1.5">
                    Brief Notes or What You Want Automated (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="Mention repetitive tasks, tools you use (WhatsApp, Excel, email, CRM), or what you would like automated..."
                    className="w-full px-4 py-3 rounded-xl bg-[oklch(0.18_0.02_75/50%)] border border-[oklch(0.8_0.12_82/20%)] focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm text-champagne placeholder-[oklch(0.6_0.02_80)] transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* High-Intent Inquire Now Action Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base bg-gradient-to-r from-[#25D366] via-[#1EBE5D] to-[#128C7E] text-white shadow-xl shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2.5 group"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>Inquire Now on WhatsApp (0792767922)</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <div className="flex items-center justify-between text-xs text-warm-gray px-1 pt-1">
                <span className="flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>Instant founder channel</span>
                </span>
                <a 
                  href="tel:+254792767922" 
                  className="text-champagne hover:text-gold transition-colors font-mono font-medium flex items-center space-x-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call 0792767922</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;