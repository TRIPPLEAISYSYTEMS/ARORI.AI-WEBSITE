import React, { useState, useEffect } from 'react';

interface SocialFloatingDockProps {
  currentView?: string;
}

const SocialFloatingDock: React.FC<SocialFloatingDockProps> = ({ currentView = 'home' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // If we are on the contact page, hide this dock as the links are already big and center
  if (currentView === 'contact') {
    return null;
  }

  const socialLinks = [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/254792767922',
      color: 'hover:bg-[#25D366]',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/arori_ai',
      color: 'hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-500',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      name: 'TikTok',
      href: 'https://tiktok.com/@arori_ai',
      color: 'hover:bg-[#000000]',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.14c0 3.48-2.32 6.15-5.91 6.15-2.68 0-5.07-1.64-6.07-4.04-1-2.4.4-5.34 3.12-5.34.42 0 .83.06 1.23.15v4.32c-.17-.03-.35-.05-.53-.05-.62 0-1.2.3-1.52.82-.31.52-.3 1.18 0 1.7.32.53.9.83 1.52.83 1.05 0 1.91-.86 1.91-1.91V.02h2.16z"/>
        </svg>
      )
    },
    {
      name: 'X',
      href: 'https://x.com/arori_ai',
      color: 'hover:bg-black',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    }
  ];

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 flex flex-col-reverse gap-4 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      {socialLinks.map((social, index) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-12 h-12 bg-slate-800 border border-cyan-500/30 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${social.color} backdrop-blur-sm group`}
          style={{
            animation: `float 3s ease-in-out infinite`,
            animationDelay: `${index * 0.2}s`
          }}
          aria-label={`Contact us on ${social.name}`}
        >
          {social.icon}
          
          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-2 py-1 bg-slate-900 text-xs rounded text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-cyan-500/20">
            {social.name}
          </span>
        </a>
      ))}
      
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
};

export default SocialFloatingDock;