import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import LogoWallpaper from './components/LogoWallpaper';
import SocialFloatingDock from './components/SocialFloatingDock';
import ContactPage from './components/ContactPage';
import ChatBot from './components/ChatBot';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    // Simple hash-based router
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#contact') {
        setCurrentView('contact');
        window.scrollTo(0, 0);
      } else {
        setCurrentView('home');
        // If there's a specific section hash (e.g. #services), scroll to it after rendering
        if (hash && hash !== '#home') {
          setTimeout(() => {
            const element = document.getElementById(hash.substring(1));
            if (element) {
              const headerOffset = 64;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.scrollY - headerOffset;
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }, 100);
        } else if (hash === '#home' || !hash) {
          window.scrollTo(0, 0);
        }
      }
    };

    // Initialize on mount
    handleHashChange();

    // Listen for changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <LogoWallpaper />
      <ParticleBackground />
      
      <div className="relative">
        <Navbar currentView={currentView} />
        
        <main>
          {currentView === 'home' ? (
            <>
              <Hero />
              <About />
              <Services />
              <Process />
              <Testimonials />
              <FAQ />
              <div className="pb-20">
                {/* 
                  Optional: render the contact form here too, or just a CTA. 
                  We'll keep the original Contact component as a bottom-of-page CTA 
                  for the Home view, but modify the Navbar "Contact" to go to the new page.
                */}
                <Contact />
              </div>
            </>
          ) : (
            <ContactPage />
          )}
        </main>
        
        <Footer />
        <SocialFloatingDock currentView={currentView} />
        <ChatBot />
      </div>
    </div>
  );
};

export default App;