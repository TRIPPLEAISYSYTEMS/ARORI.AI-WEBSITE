import React, { useState, useEffect } from 'react';
import { Menu, X, Bot } from 'lucide-react';
import { NavLink } from '../types';

const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
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

  // Handle scroll spy to update active section (only relevant on Home view)
  useEffect(() => {
    if (currentView !== 'home') {
      setActiveSection('contact');
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for header detection

      for (const link of navLinks) {
        // Skip 'Contact' for scroll spy on home page as it's a separate page now, 
        // but we might have a contact section at bottom. 
        if (link.href === '#contact') continue;

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // Smooth scroll handler
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    
    // If it's the contact link, we just let the default anchor behavior happen
    // because #contact will trigger the view switch in App.tsx
    if (href === '#contact') {
      return; 
    }

    // If we are on the contact page and clicking a home link (like #services),
    // also let default behavior happen. The hash change will trigger App.tsx to 
    // switch to Home view and then scroll.
    if (currentView === 'contact') {
      return;
    }

    // If we are on Home view, use smooth scrolling
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 64; // Height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update hash manually without jumping
      window.history.pushState(null, '', href);
      setActiveSection(targetId);
    }
  };

  return (
    <nav className="fixed w-full bg-slate-950/95 backdrop-blur-sm border-b border-cyan-500/20 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a 
            href="#home"
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={(e) => handleNavigation(e, '#home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Arori.AI</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = currentView === 'contact' 
                ? link.href === '#contact' 
                : activeSection === link.href.substring(1);

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]'
                      : 'text-gray-300 hover:text-cyan-400'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-cyan-500/20 absolute w-full left-0 animate-in slide-in-from-top-5 duration-200 shadow-2xl">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => {
               const isActive = currentView === 'contact' 
                ? link.href === '#contact' 
                : activeSection === link.href.substring(1);
                
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`block py-3 text-base font-medium rounded-lg px-4 ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-500'
                      : 'text-gray-300 hover:text-cyan-400 hover:bg-slate-800'
                  }`}
                  onClick={(e) => handleNavigation(e, link.href)}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;