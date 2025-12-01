import React from 'react';
import { Youtube } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="mb-12 flex justify-center">
          <div className="relative group">
            {/* Animated Glow Effect */}
            <div className="absolute inset-0 bg-cyan-500/20 blur-[60px] rounded-full group-hover:bg-cyan-500/30 transition-all duration-700 animate-pulse"></div>
            
            {/* Logo Image */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center transition-transform duration-500 hover:scale-105">
              <img 
                src="logo.png" 
                alt="Arori.AI Logo" 
                className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              />
            </div>
          </div>
        </div>

        {/* Video Placeholder Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-slate-800/40 border border-cyan-500/20 rounded-xl p-4 md:p-6 backdrop-blur-sm shadow-2xl">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h3 className="text-lg md:text-xl font-bold flex items-center gap-2 text-white">
                <Youtube className="w-6 h-6 text-red-500" />
                See How It Works
              </h3>
              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                Visit our Channel
              </a>
            </div>

            <div className="relative w-full aspect-video">
              <div className="absolute inset-0 bg-slate-900/80 border-2 border-dashed border-cyan-500/30 rounded-lg flex items-center justify-center overflow-hidden">
                 {/* 
                    To embed a real video, replace this div with an iframe:
                    <iframe 
                      src="https://www.youtube.com/embed/YOUR_ID" 
                      className="w-full h-full" 
                      frameBorder="0" 
                      allowFullScreen
                    ></iframe>
                 */}
                 <div className="text-center p-6">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:scale-110 transition-transform cursor-pointer">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                    </div>
                    <p className="text-gray-400 text-sm">Introduction Video Placeholder</p>
                 </div>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm mt-4 text-center">
              Watch how our AI agents transform business workflows in real-time.
            </p>
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white tracking-tight">
            Transform Your Business with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient">
              Intelligent AI Automation
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            We build custom AI solutions that eliminate bottlenecks, accelerate growth, and unlock hidden revenue opportunities—without replacing your team.
          </p>

          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-bold text-white hover:shadow-lg hover:shadow-cyan-500/40 transition transform hover:-translate-y-1"
              >
                Book a Discovery Call
              </a>
              <a
                href="#services"
                className="w-full sm:w-auto px-8 py-4 border border-cyan-500/50 text-cyan-400 rounded-lg font-bold hover:bg-cyan-500/10 transition backdrop-blur-sm"
              >
                Explore Services
              </a>
            </div>
            
            <a
              href="#contact"
              className="w-full sm:w-64 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-lg font-bold hover:bg-white/10 hover:border-cyan-400/50 transition backdrop-blur-sm shadow-lg shadow-black/50 hover:shadow-cyan-900/20"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;