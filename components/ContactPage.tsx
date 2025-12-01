import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Send, Loader2, ArrowLeft } from 'lucide-react';
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
Hi Arori.AI Team,

You have received a new discovery call request.

--- Client Details ---
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Business Type: ${formData.business || 'Not specified'}

--- Message ---
${formData.message}

----------------------
Sent via Arori.AI Contact Page
`.trim();

    const subject = encodeURIComponent(`Discovery Call Request from ${formData.name}`);
    const body = encodeURIComponent(emailBody);
    const mailtoLink = `mailto:arori.ai@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      window.location.href = mailtoLink;
      setFormData({
        name: '',
        email: '',
        phone: '',
        business: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 800);
  };

  const socialLinks = [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/254792767922',
      color: 'bg-[#25D366] hover:bg-[#20bd5a]',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/arori_ai',
      color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 hover:opacity-90',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      name: 'TikTok',
      href: 'https://tiktok.com/@arori_ai',
      color: 'bg-[#000000] hover:bg-[#1a1a1a]',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.14c0 3.48-2.32 6.15-5.91 6.15-2.68 0-5.07-1.64-6.07-4.04-1-2.4.4-5.34 3.12-5.34.42 0 .83.06 1.23.15v4.32c-.17-.03-.35-.05-.53-.05-.62 0-1.2.3-1.52.82-.31.52-.3 1.18 0 1.7.32.53.9.83 1.52.83 1.05 0 1.91-.86 1.91-1.91V.02h2.16z"/>
        </svg>
      )
    },
    {
      name: 'X',
      href: 'https://x.com/arori_ai',
      color: 'bg-black hover:bg-gray-900',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <a href="#home" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition mb-6 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </a>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-400">
            Connect with us on social media or send us a message directly.
          </p>
        </div>

        {/* Social Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${social.color} rounded-xl p-6 flex flex-col items-center justify-center text-white transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20 group`}
            >
              <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300">
                {social.icon}
              </div>
              <span className="font-semibold">{social.name}</span>
            </a>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Details */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-6">Direct Contact</h3>
              
              <div className="space-y-6">
                <a href="mailto:arori.ai@gmail.com" className="flex items-start space-x-3 group">
                  <div className="w-10 h-10 bg-cyan-900/30 rounded-lg flex items-center justify-center shrink-0 border border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Email Us</p>
                    <p className="text-cyan-400 text-sm break-all">arori.ai@gmail.com</p>
                  </div>
                </a>

                <a href="tel:+254792767922" className="flex items-start space-x-3 group">
                  <div className="w-10 h-10 bg-cyan-900/30 rounded-lg flex items-center justify-center shrink-0 border border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors">
                    <Phone className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Call Us</p>
                    <p className="text-gray-400 text-sm group-hover:text-cyan-400 transition-colors">+254 792 767 922</p>
                  </div>
                </a>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-cyan-900/30 rounded-lg flex items-center justify-center shrink-0 border border-cyan-500/20">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Location</p>
                    <p className="text-gray-400 text-sm">Global</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/20 rounded-xl p-6 shadow-lg">
               <h4 className="font-bold mb-4 text-cyan-400 text-sm">Quick Response</h4>
               <p className="text-gray-400 text-xs leading-relaxed">
                 Our team typically responds within 24 hours. For immediate assistance, please use WhatsApp.
               </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <div className="bg-slate-800/30 border border-cyan-500/10 rounded-xl p-6 md:p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-2 text-gray-300 uppercase tracking-wider">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-900/80 border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-gray-600 transition"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2 text-gray-300 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-900/80 border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-gray-600 transition"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-2 text-gray-300 uppercase tracking-wider">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-900/80 border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-gray-600 transition"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2 text-gray-300 uppercase tracking-wider">Business Type</label>
                    <input
                      type="text"
                      name="business"
                      value={formData.business}
                      onChange={handleInputChange}
                      placeholder="e.g. SaaS"
                      className="w-full px-4 py-3 bg-slate-900/80 border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-gray-600 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-300 uppercase tracking-wider">Message</label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-900/80 border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-gray-600 transition resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 rounded-lg font-bold text-white transition-all duration-300 flex items-center justify-center space-x-2 group ${
                    isSubmitting 
                      ? 'bg-slate-700 cursor-wait' 
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/50 hover:from-cyan-400 hover:to-blue-500'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Opening Email Client...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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