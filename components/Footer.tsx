import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-cyan-900/30 py-10 px-4 relative z-10">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-4">
            <span className="text-2xl font-bold tracking-tight">
                <span className="text-white">Arori</span>
                <span className="text-cyan-400">.AI</span>
            </span>
        </div>
        <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
            Transforming businesses through intelligent automation, custom agent engineering, and data-driven insights.
        </p>
        <div className="flex justify-center space-x-6 mb-8 text-sm text-gray-400">
            <a href="#services" className="hover:text-cyan-400 transition">Services</a>
            <a href="#process" className="hover:text-cyan-400 transition">Process</a>
            <a href="#contact" className="hover:text-cyan-400 transition">Contact</a>
        </div>
        <p className="text-gray-600 text-xs">
          &copy; {new Date().getFullYear()} Arori.AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;