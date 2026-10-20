import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NavLink } from '../types';

const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Founder', href: '#founder' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  currentView?: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentView = 'home' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (currentView === 'contact') {
      setActiveSection('contact');
      return;
    }
    if (currentView === 'founder') {
      setActiveSection('founder');
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      for (const link of navLinks) {
        if (link.href === '#contact' || link.href === '#founder') continue;
        const sectionId = link.href.substring(1);
        const element = document.getElementById(sectionId);
        
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break; 
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);

    if (href === '#founder' || href === '#contact-page' || currentView !== 'home') {
      window.location.hash = href;
      return;
    }

    e.preventDefault();
    const targetId = href.substring(1);
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '#');
      setActiveSection('home');
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', href);
      setActiveSection(targetId);
    }
  };

  return (
    <header className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl">
      <nav 
        className="glass-pill rounded-full px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between transition-all duration-300 relative border border-[oklch(0.8_0.12_82/25%)] shadow-2xl"
        aria-label="Main Navigation"
      >
        {/* Brand Logo & Name: Original logo.png retained at top */}
        <a 
          href="#home"
          className="flex items-center space-x-2.5 group cursor-pointer" 
          onClick={(e) => handleNavigation(e, '#home')}
        >
          <div className="w-8 h-8 rounded-full bg-[oklch(0.14_0.015_70)] border border-[oklch(0.8_0.12_82/30%)] flex items-center justify-center p-1 shadow-md shadow-[oklch(0.8_0.14_82/20%)] group-hover:scale-105 transition-transform overflow-hidden">
            <img 
              src="logo.png" 
              alt="TRIPPLE AI SYSTEMS Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-heading font-bold text-sm tracking-tight text-champagne hidden xs:inline-block">
            TRIPPLE <span className="gold-gradient-text">AI</span> <span className="text-[10px] font-mono text-warm-gray ml-0.5">SYSTEMS</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = currentView === 'contact' 
              ? link.href === '#contact' 
              : activeSection === sectionId;

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavigation(e, link.href)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-black bg-gold font-bold shadow-md shadow-[oklch(0.8_0.14_82/25%)]'
                    : 'text-warm-gray hover:text-champagne hover:bg-[oklch(0.8_0.14_82/8%)]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center space-x-2">
          <a
            href="https://wa.me/254792767922"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-[oklch(0.88_0.12_85)] via-[oklch(0.8_0.14_82)] to-[oklch(0.72_0.16_80)] text-black hover:shadow-lg hover:shadow-[oklch(0.8_0.14_82/30%)] transition-all transform hover:scale-105"
          >
            <span>Inquire Now</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <button
            className="md:hidden p-2 rounded-full text-warm-gray hover:text-champagne hover:bg-[oklch(0.8_0.14_82/10%)] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 glass-panel-elevated rounded-2xl p-4 border border-[oklch(0.8_0.12_82/30%)] shadow-2xl animate-in fade-in duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const sectionId = link.href.substring(1);
              const isActive = currentView === 'contact' 
                ? link.href === '#contact' 
                : activeSection === sectionId;
                
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium px-4 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gold text-black font-bold'
                      : 'text-warm-gray hover:text-champagne hover:bg-[oklch(0.8_0.14_82/10%)]'
                  }`}
                  onClick={(e) => handleNavigation(e, link.href)}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="pt-2 border-t border-[oklch(0.8_0.12_82/15%)] mt-2">
              <a
                href="https://wa.me/254792767922"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl text-xs font-bold bg-gold text-black"
              >
                <span>Inquire Now</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;