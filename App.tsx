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
import ConstellationSystem from './components/ConstellationSystem';
import LogoWallpaper from './components/LogoWallpaper';
import SocialFloatingDock from './components/SocialFloatingDock';
import ContactPage from './components/ContactPage';
import ChatBot from './components/ChatBot';
import './index.css';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'contact'>('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#contact-page') {
        setCurrentView('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('home');
        if (hash && hash !== '#home') {
          setTimeout(() => {
            const element = document.getElementById(hash.substring(1));
            if (element) {
              const headerOffset = 90;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.scrollY - headerOffset;
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }, 100);
        } else if (hash === '#home' || !hash) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-[oklch(0.13_0.012_70)] text-[oklch(0.95_0.02_85)] relative selection:bg-gold selection:text-black font-body overflow-x-hidden sparkling-bg-aura">
      {/* Three.js Interactive Constellation Particle System */}
      <ConstellationSystem />
      <LogoWallpaper />
      
      <div className="relative z-10">
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
              <Contact />
            </>
          ) : (
            <ContactPage />
          )}
        </main>
        
        <Footer currentView={currentView} />
        <SocialFloatingDock currentView={currentView} />
        <ChatBot />
      </div>
    </div>
  );
};

export default App;