import React from 'react';

interface FooterProps {
  currentView?: string;
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="border-t border-[oklch(0.8_0.12_82/18%)] bg-[oklch(0.12_0.012_70)] py-14 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-[oklch(0.8_0.12_82/12%)]">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center space-x-2.5 mb-2">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#FF4500] via-[#FFAA00] to-[#FFE600] blur-sm opacity-70 animate-pulse pointer-events-none" />
                <img 
                  src="logo.png" 
                  alt="TRIPPLE AI SYSTEMS Logo"
                  className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_8px_rgba(255,200,0,0.85)]"
                />
              </div>
              <span className="font-heading font-extrabold text-base tracking-tight text-champagne">
                TRIPPLE <span className="gold-gradient-text">AI SYSTEMS</span>
              </span>
            </div>
            <p className="text-xs text-warm-gray max-w-sm">
              Custom AI assistants, hands-free business workflows, and live dashboards that take repetitive work off your plate.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-warm-gray">
            <a href="#about" className="hover:text-gold transition-colors">About</a>
            <a href="#services" className="hover:text-gold transition-colors">Services</a>
            <a href="#process" className="hover:text-gold transition-colors">Process</a>
            <a href="#testimonials" className="hover:text-gold transition-colors">Case Studies</a>
            <a href="#faq" className="hover:text-gold transition-colors">FAQ</a>
            <a href="https://wa.me/254792767922" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-champagne transition-colors">Inquire Now</a>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-warm-gray gap-4">
          <p>
            &copy; {new Date().getFullYear()} TRIPPLE AI SYSTEMS. Founded by Given Arori Arori. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-[10px] font-mono uppercase text-gold">Nairobi / Global AI Architecture</span>
            <a href="https://wa.me/254792767922" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors font-mono">WhatsApp: 0792767922</a>
            <a href="mailto:givenarori77@gmail.com" className="hover:text-gold transition-colors">givenarori77@gmail.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;