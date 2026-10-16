import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Send, Loader2, Sparkles } from 'lucide-react';
import { ContactFormData } from '../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    business: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailBody = `
Hi Given Arori & the TRIPPLE AI SYSTEMS Team,

I would like to schedule an enterprise discovery call to discuss our AI automation goals.

--- Client Details ---
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Business Vertical: ${formData.business || 'Not specified'}

--- Project Scope & Goals ---
${formData.message}

----------------------
Sent via TRIPPLE AI SYSTEMS Architecture Portal
`.trim();

    const subject = encodeURIComponent(`Enterprise Discovery Call: ${formData.name} (${formData.business || 'New Lead'})`);
    const body = encodeURIComponent(emailBody);
    const mailtoLink = `mailto:givenarori77@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      window.location.href = mailtoLink;
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        business: '',
        message: ''
      });
    }, 700);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10" aria-label="Contact Section">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow-badge mb-3">08 / INITIATE ENGAGEMENT</div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-champagne mb-4">
            Ready to Build Your <span className="gold-gradient-text">Autonomous Future</span>?
          </h2>
          <p className="text-warm-gray text-base md:text-lg leading-relaxed">
            Leading enterprises do not wait for the future; they automate today. Schedule a private discovery session with our founding architecture team.
          </p>
        </div>

        {/* Contact Container with Modular Bento Glass Tiles */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Tile 1: Direct Contact & Enterprise Guarantees (5 Cols) */}
          <div className="lg:col-span-5 glass-panel-elevated rounded-3xl p-8 sm:p-9 border border-[oklch(0.8_0.12_82/25%)] gold-glow space-y-7 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-gold font-semibold">Direct Communication Channels</span>
              <h3 className="font-heading font-bold text-2xl text-champagne mt-1 mb-3">Direct Executive Channels</h3>
              <p className="text-xs sm:text-sm text-warm-gray leading-relaxed mb-6">
                Connect directly with our engineering lab for technical inquiries, enterprise RFPs, or strategic partnership evaluation.
              </p>

              <div className="space-y-4">
                <a 
                  href="mailto:givenarori77@gmail.com" 
                  className="glass-panel p-4 rounded-2xl flex items-center space-x-4 border border-[oklch(0.8_0.12_82/20%)] hover:border-gold transition-colors group"
                >
                  <div className="glass-icon w-11 h-11 rounded-2xl flex items-center justify-center text-gold shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-warm-gray uppercase tracking-wider block font-mono">Principal Email</span>
                    <span className="text-sm font-semibold text-champagne group-hover:text-gold transition-colors">
                      givenarori77@gmail.com
                    </span>
                  </div>
                </a>

                <a 
                  href="tel:+254792767922" 
                  className="glass-panel p-4 rounded-2xl flex items-center space-x-4 border border-[oklch(0.8_0.12_82/20%)] hover:border-gold transition-colors group"
                >
                  <div className="glass-icon w-11 h-11 rounded-2xl flex items-center justify-center text-gold shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-warm-gray uppercase tracking-wider block font-mono">Executive Direct Line</span>
                    <span className="text-sm font-semibold text-champagne group-hover:text-gold transition-colors">
                      +254 792 767 922
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
                      Nairobi, Kenya • Worldwide Operations
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose TRIPPLE AI Sub-Tile */}
            <div className="p-5 rounded-2xl glass-panel border border-[oklch(0.8_0.12_82/20%)] space-y-3">
              <div className="flex items-center space-x-2 text-xs font-semibold text-gold uppercase tracking-wider font-mono">
                <Sparkles className="w-4 h-4" />
                <span>The TRIPPLE AI Standard</span>
              </div>
              <ul className="space-y-2 text-xs text-warm-gray">
                {[
                  "100% Client-Owned Intellectual Property",
                  "Fixed-Price Milestones with Guaranteed ROI",
                  "SOC-2 Compliant Zero-Leak Sandboxing",
                  "Dedicated 24/7 Monitored Self-Healing Agents"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tile 2: Interactive Consultation Booking Form (7 Cols) */}
          <div className="lg:col-span-7 glass-panel-elevated rounded-3xl p-8 sm:p-9 border border-[oklch(0.8_0.12_82/25%)] gold-glow space-y-6">
            <div>
              <h3 className="font-heading font-bold text-2xl text-champagne">Book Discovery Consultation</h3>
              <p className="text-xs sm:text-sm text-warm-gray mt-1">
                Fill in your details to initiate a direct pre-configured email dispatch to Given Arori.
              </p>
            </div>

            {submitted && (
              <div className="p-4 rounded-xl bg-[oklch(0.8_0.14_82/10%)] border border-gold text-gold text-xs font-semibold flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Email client invoked successfully! We will respond within 24 hours.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-warm-gray mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Marcus Vance"
                    className="w-full px-4 py-3 rounded-xl bg-[oklch(0.18_0.02_75/50%)] border border-[oklch(0.8_0.12_82/20%)] focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm text-champagne placeholder-[oklch(0.6_0.02_80)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-warm-gray mb-1.5">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="marcus@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-[oklch(0.18_0.02_75/50%)] border border-[oklch(0.8_0.12_82/20%)] focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm text-champagne placeholder-[oklch(0.6_0.02_80)] transition-all"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-warm-gray mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl bg-[oklch(0.18_0.02_75/50%)] border border-[oklch(0.8_0.12_82/20%)] focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm text-champagne placeholder-[oklch(0.6_0.02_80)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-warm-gray mb-1.5">
                    Business Vertical
                  </label>
                  <input
                    type="text"
                    name="business"
                    value={formData.business}
                    onChange={handleInputChange}
                    placeholder="e.g. FinTech / SaaS / Logistics"
                    className="w-full px-4 py-3 rounded-xl bg-[oklch(0.18_0.02_75/50%)] border border-[oklch(0.8_0.12_82/20%)] focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm text-champagne placeholder-[oklch(0.6_0.02_80)] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-warm-gray mb-1.5">
                  Operational Bottleneck or Automation Goals *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your current manual bottlenecks, tools in use (CRM, ERP, DB), and desired outcomes..."
                  className="w-full px-4 py-3 rounded-xl bg-[oklch(0.18_0.02_75/50%)] border border-[oklch(0.8_0.12_82/20%)] focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm text-champagne placeholder-[oklch(0.6_0.02_80)] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[oklch(0.88_0.12_85)] via-[oklch(0.8_0.14_82)] to-[oklch(0.72_0.16_80)] text-black shadow-lg shadow-[oklch(0.8_0.14_82/25%)] hover:shadow-[oklch(0.8_0.14_82/45%)] transition-all duration-300 flex items-center justify-center space-x-2 group disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Opening Secure Dispatch Client...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Discovery Request</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;