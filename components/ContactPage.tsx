import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Send, Loader2, ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react';
import { ContactFormData } from '../types';

const ContactPage: React.FC = () => {
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

I am requesting an enterprise consultation session.

--- Client Details ---
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Business Vertical: ${formData.business || 'Not specified'}

--- Project Scope & Goals ---
${formData.message}

----------------------
Sent via TRIPPLE AI SYSTEMS Dedicated Contact Portal
`.trim();

    const subject = encodeURIComponent(`Executive Consultation: ${formData.name} (${formData.business || 'New Lead'})`);
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

  const socialLinks = [
    {
      name: 'WhatsApp Direct',
      href: 'https://wa.me/254792767922',
      color: 'hover:border-[#25D366] hover:text-[#25D366]',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/arori_ai',
      color: 'hover:border-[#E1306C] hover:text-[#E1306C]',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      name: 'TikTok',
      href: 'https://tiktok.com/@arori_ai',
      color: 'hover:border-gold hover:text-gold',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.14c0 3.48-2.32 6.15-5.91 6.15-2.68 0-5.07-1.64-6.07-4.04-1-2.4.4-5.34 3.12-5.34.42 0 .83.06 1.23.15v4.32c-.17-.03-.35-.05-.53-.05-.62 0-1.2.3-1.52.82-.31.52-.3 1.18 0 1.7.32.53.9.83 1.52.83 1.05 0 1.91-.86 1.91-1.91V.02h2.16z"/>
        </svg>
      )
    },
    {
      name: 'X (Twitter)',
      href: 'https://x.com/arori_ai',
      color: 'hover:border-white hover:text-white',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@arori_ai?si=HuRijMVFxZ2t6aME',
      color: 'hover:border-[#FF0000] hover:text-[#FF0000]',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="pt-36 sm:pt-44 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Top Back Link & Headline */}
        <div className="mb-12">
          <a
            href="#home"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-gold hover:text-champagne transition-colors mb-6 group glass-pill px-4 py-1.5 rounded-full"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Flagship Experience</span>
          </a>

          <div className="eyebrow-badge mb-3">GET IN TOUCH</div>
          <h1 className="text-4xl sm:text-6xl font-bold font-heading text-champagne tracking-tight mb-4">
            Connect with <span className="gold-gradient-text">TRIPPLE AI</span>
          </h1>
          <p className="text-warm-gray text-base sm:text-lg max-w-2xl leading-relaxed">
            Direct access to Given Arori and the TRIPPLE AI team. Tell us what repetitive computer work you want automated, and we will show you how simple it is to get started.
          </p>
        </div>

        {/* Social Presence Hub */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 mb-12">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass-panel p-5 rounded-3xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 group border border-[oklch(0.8_0.12_82/20%)] ${social.color}`}
            >
              <div className="mb-2 text-champagne group-hover:scale-110 transition-transform duration-300">
                {social.icon}
              </div>
              <span className="text-xs font-semibold text-champagne">{social.name}</span>
            </a>
          ))}
        </div>

        {/* Contact Form & Coordinates Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Coordinates Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel-elevated rounded-3xl p-7 sm:p-8 border border-[oklch(0.8_0.12_82/25%)] space-y-6">
              <h3 className="font-heading font-bold text-lg text-champagne">Headquarters &amp; Direct Channels</h3>
              
              <div className="space-y-5">
                <a href="mailto:givenarori77@gmail.com" className="flex items-start space-x-3.5 group">
                  <div className="glass-icon w-10 h-10 rounded-2xl flex items-center justify-center text-gold shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-warm-gray uppercase tracking-wider block font-mono">Direct Email</span>
                    <span className="text-sm font-semibold text-champagne group-hover:text-gold transition-colors break-all">
                      givenarori77@gmail.com
                    </span>
                  </div>
                </a>

                <a href="tel:+254792767922" className="flex items-start space-x-3.5 group">
                  <div className="glass-icon w-10 h-10 rounded-2xl flex items-center justify-center text-gold shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-warm-gray uppercase tracking-wider block font-mono">Telephone / Signal</span>
                    <span className="text-sm font-semibold text-champagne group-hover:text-gold transition-colors">
                      +254 792 767 922
                    </span>
                  </div>
                </a>

                <div className="flex items-start space-x-3.5">
                  <div className="glass-icon w-10 h-10 rounded-2xl flex items-center justify-center text-gold shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-warm-gray uppercase tracking-wider block font-mono">Location</span>
                    <span className="text-sm font-semibold text-champagne">
                      Nairobi, Kenya • Worldwide Delivery
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-6 border border-[oklch(0.8_0.12_82/20%)] space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-gold uppercase tracking-wider font-mono">
                <Sparkles className="w-4 h-4" />
                <span>Executive Response SLA</span>
              </div>
              <p className="text-xs text-warm-gray leading-relaxed">
                Client submissions are routed directly to Given Arori Arori and reviewed within 24 hours. For high-priority engagements, please initiate contact via WhatsApp.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Instant WhatsApp Inquiry Option */}
            <a
              href="https://wa.me/254792767922?text=Hello%20Given%2C%20I%20am%20inquiring%20about%20TRIPPLE%20AI%20SYSTEMS."
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-5 rounded-2xl flex items-center justify-between border border-[#25D366]/40 hover:border-[#25D366] hover:bg-[#25D366]/10 transition-all duration-300 group shadow-lg shadow-[#25D366]/10"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#25D366]/20 flex items-center justify-center text-[#25D366] shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-bold text-champagne block group-hover:text-[#25D366] transition-colors">
                    Prefer Instant Messaging? Inquire Now on WhatsApp
                  </span>
                  <span className="text-[11px] text-[#25D366] font-mono">
                    Direct line: 0792767922 (Sub-hour response)
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-warm-gray group-hover:text-[#25D366] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            <div className="glass-panel-elevated rounded-3xl p-7 sm:p-9 border border-[oklch(0.8_0.12_82/30%)] gold-glow space-y-5">
              <div>
                <h3 className="font-heading font-bold text-xl text-champagne">Send Us a Direct Message</h3>
                <p className="text-xs text-warm-gray mt-1">
                  We keep all inquiries strictly confidential and reply within 24 hours.
                </p>
              </div>

              {submitted && (
                <div className="p-4 rounded-xl bg-[oklch(0.8_0.14_82/10%)] border border-gold text-gold text-xs font-semibold flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Email client invoked! Thank you for reaching out.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-warm-gray mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl bg-[oklch(0.18_0.02_75/50%)] border border-[oklch(0.8_0.12_82/20%)] focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm text-champagne placeholder-[oklch(0.6_0.02_80)] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-warm-gray mb-1.5">Business Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[oklch(0.18_0.02_75/50%)] border border-[oklch(0.8_0.12_82/20%)] focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm text-champagne placeholder-[oklch(0.6_0.02_80)] transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-warm-gray mb-1.5">Phone Number</label>
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
                    <label className="block text-xs font-mono uppercase tracking-wider text-warm-gray mb-1.5">Business Vertical</label>
                    <input
                      type="text"
                      name="business"
                      value={formData.business}
                      onChange={handleInputChange}
                      placeholder="e.g. HealthTech / FinTech"
                      className="w-full px-4 py-3 rounded-xl bg-[oklch(0.18_0.02_75/50%)] border border-[oklch(0.8_0.12_82/20%)] focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm text-champagne placeholder-[oklch(0.6_0.02_80)] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-warm-gray mb-1.5">Project Scope or Inquiries *</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about the systems you are looking to automate, volume metrics, and timelines..."
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
                      <span>Submit Inquiries</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;