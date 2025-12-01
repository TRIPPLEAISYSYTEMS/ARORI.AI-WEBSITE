import React from 'react';
import { Globe, Target, Rocket, Calendar } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 relative z-10 bg-slate-900/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
              <Rocket className="w-4 h-4" />
              <span>Est. December 1st, 2025</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Architecting the Future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Global Automation</span>
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed">
              Founded by <strong className="text-white">Given Arori Arori</strong>, Arori.AI was born from a singular vision: to bridge the gap between complex artificial intelligence capability and practical, day-to-day business utility.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 border border-cyan-500/20">
                  <Target className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Our Operations</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    We specialize in constructing bespoke AI infrastructures. Unlike generic wrappers, we engineer autonomous agent workforces that deeply integrate with your legacy systems, ensuring data privacy and operational continuity while eliminating redundancy.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 border border-cyan-500/20">
                  <Globe className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Global Scaling Goals</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Our ambition is borderless. We are actively scaling our operations to serve 10,000 enterprise partners across 5 continents by 2030. We aim to democratize access to elite-level automation, creating a global network of hyper-efficient, data-driven organizations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual/Stats Column */}
          <div className="relative">
            {/* Abstract Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
            
            <div className="relative bg-slate-800/50 border border-cyan-500/20 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center space-x-4 mb-8">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                  GA
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Given Arori Arori</h4>
                  <p className="text-cyan-400 text-sm">Founder & CEO</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-900/50 rounded-lg p-4 border border-cyan-500/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Global Reach Goal</span>
                    <span className="text-cyan-400 font-bold text-sm">Target: 2030</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-600 h-full w-3/4 animate-pulse"></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Scaling operations across N. America, Europe, Africa & Asia.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-cyan-500/10 text-center">
                    <Calendar className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">2025</div>
                    <div className="text-xs text-gray-400">Established</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-cyan-500/10 text-center">
                    <Rocket className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">100+</div>
                    <div className="text-xs text-gray-400">Agents Deployed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;