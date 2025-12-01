import React, { useEffect, useState } from 'react';

const LogoWallpaper: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to center of screen
      // Small multiplier to create a subtle parallax effect
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
      <div 
        className="opacity-[0.04] transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      >
         {/* Using the logo as a massive background element */}
         <img 
            src="logo.png" 
            alt="" 
            className="w-[120vmax] h-[120vmax] max-w-none object-contain animate-[spin_120s_linear_infinite]" 
         />
      </div>
    </div>
  );
};

export default LogoWallpaper;