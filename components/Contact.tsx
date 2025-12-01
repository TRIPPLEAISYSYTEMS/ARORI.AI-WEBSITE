import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, ChevronRight, Send, Loader2 } from 'lucide-react';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Format the email body content cleanly
    const emailBody = `
Hi Arori.AI Team,

You have received a new discovery call request from the website.

--- Client Details ---
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Business Type: ${formData.business || 'Not specified'}

--- Message ---
${formData.message}

----------------------
Sent via Arori.AI Contact Form
`.trim();

    // 2. Encode the parameters to ensure the mailto link works correctly with special characters
    const subject = encodeURIComponent(`Discovery Call Request from ${formData.name}`);
    const body = encodeURIComponent(emailBody);

    // 3. Construct the mailto link
    const mailtoLink = `mailto:arori.ai@gmail.com?subject=${subject}&body=${body}`;

    // 4. Simulate a brief loading state for better UX before opening the client
    setTimeout(() => {
      window.location.href = mailtoLink;
      
      // Reset form and state
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

  return (
    <section id="contact" className="py-20 px-4 bg-slate-900/50 backdrop-blur-sm relative z-10 border-t border-cyan-900/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">Ready to Unlock Hidden Potential?</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          The companies winning in today's market aren't working harder—they're working smarter with AI automation.
        </p>

        <div className="grid md:grid-cols-2 gap-12 bg-slate-800/30 p-8 rounded-2xl border border-cyan-500/10 shadow-2xl">
          {/* Contact Info Column */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-white">Contact Information</h3>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-cyan-900/30 rounded-lg flex items-center justify-center shrink-0 border border-cyan-500/20">
                    <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <a href="mailto:arori.ai@gmail.com" className="text-cyan-400 hover:text-cyan-300 transition">arori.ai@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                 <div className="w-10 h-10 bg-cyan-900/30 rounded-lg flex items-center justify-center shrink-0 border border-cyan-500/20">
                    <Phone className="w-5 h-5 text-cyan-400" />
                 </div>
                <div>
                  <p className="font-semibold text-white">Phone</p>
                  <a href="tel:+254792767922" className="text-gray-400 hover:text-cyan-400 transition">+254 792 767 922</a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                 <div className="w-10 h-10 bg-cyan-900/30 rounded-lg flex items-center justify-center shrink-0 border border-cyan-500/20">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                 </div>
                <div>
                  <p className="font-semibold text-white">Location</p>
                  <p className="text-gray-400">Serving businesses globally</p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/20 rounded-xl shadow-lg">
              <h4 className="font-bold mb-4 text-cyan-400">Why Choose Arori.AI?</h4>
              <ul className="space-y-3 text-gray-300 text-sm">
                {[
                    "Custom solutions tailored to your needs",
                    "Transparent pricing with clear ROI",
                    "Ongoing support and optimization",
                    "Secure, compliant enterprise architecture"
                ].map((item, i) => (
                    <li key={i} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                    </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form Column */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">Name</label>
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
              <label className="block text-sm font-semibold mb-2 text-gray-300">Email</label>
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

            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Phone</label>
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
                <label className="block text-sm font-semibold mb-2 text-gray-300">Business Type</label>
                <input
                    type="text"
                    name="business"
                    value={formData.business}
                    onChange={handleInputChange}
                    placeholder="e.g. SaaS, Retail"
                    className="w-full px-4 py-3 bg-slate-900/80 border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-gray-600 transition"
                />
                </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">Message</label>
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-slate-900/80 border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-gray-600 transition resize-none"
                placeholder="Tell us about your automation goals..."
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
            <p className="text-center text-xs text-gray-500 mt-2">
                This will open your default email client with your message pre-filled.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;