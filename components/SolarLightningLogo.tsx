import React, { useEffect, useRef, useState } from 'react';

interface SolarLightningLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface LightningBolt {
  id: number;
  segments: { x: number; y: number }[];
  branches: { segments: { x: number; y: number }[]; alpha: number }[];
  life: number;
  maxLife: number;
  width: number;
  color: string;
}

interface SolarEmber {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
}

export const SolarLightningLogo: React.FC<SolarLightningLogoProps> = ({ 
  className = '',
  size = 'lg' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  // Size configuration strictly bounded to the original sphere radius (w-44 h-44 sm:w-56 sm:h-56)
  const sizeConfig = {
    sm: { 
      container: 'w-24 h-24', 
      logo: 'w-12 h-12', 
      canvasSize: 96,
      logoRadius: 22,
      maxRadius: 46
    },
    md: { 
      container: 'w-36 h-36', 
      logo: 'w-20 h-20', 
      canvasSize: 144,
      logoRadius: 34,
      maxRadius: 70
    },
    lg: { 
      // Retaining the exact original sphere dimensions: w-44 h-44 sm:w-56 sm:h-56 (radius 88px - 112px)
      container: 'w-44 h-44 sm:w-56 sm:h-56', 
      logo: 'w-24 h-24 sm:w-32 sm:h-32', 
      canvasSize: 224,
      logoRadius: 48,
      maxRadius: 108
    }
  }[size];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let bolts: LightningBolt[] = [];
    let embers: SolarEmber[] = [];
    let lastBoltTime = 0;
    let nextBoltInterval = 75; // ms between lightning strikes

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canvasDim = sizeConfig.canvasSize;
    canvas.width = canvasDim * dpr;
    canvas.height = canvasDim * dpr;
    ctx.scale(dpr, dpr);

    const centerX = canvasDim / 2;
    const centerY = canvasDim / 2;
    const { logoRadius, maxRadius } = sizeConfig;

    // Helper: midpoint displacement for jagged electric lightning
    const generateJaggedLine = (
      x1: number, 
      y1: number, 
      x2: number, 
      y2: number, 
      displace: number, 
      minDisplace: number = 3
    ): { x: number; y: number }[] => {
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < minDisplace || displace < 2) {
        return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
      }

      // Perpendicular normal vector
      const nx = -dy / dist;
      const ny = dx / dist;
      const offset = (Math.random() - 0.5) * displace * 2;

      const pX = midX + nx * offset;
      const pY = midY + ny * offset;

      const left = generateJaggedLine(x1, y1, pX, pY, displace * 0.56, minDisplace);
      const right = generateJaggedLine(pX, pY, x2, y2, displace * 0.56, minDisplace);

      return left.slice(0, left.length - 1).concat(right);
    };

    // Spawn an electrical lightning bolt emanating from the logo and terminating within the sphere radius
    const spawnBolt = (targetAngle?: number) => {
      // Starting point near the contour of the logo
      const angle = targetAngle !== undefined 
        ? targetAngle + (Math.random() - 0.5) * 0.35
        : Math.random() * Math.PI * 2;

      const startDist = logoRadius * (0.85 + Math.random() * 0.2);
      const startX = centerX + Math.cos(angle) * startDist;
      const startY = centerY + Math.sin(angle) * startDist;

      // Terminates strictly within original sphere radius (maxRadius)
      const boltReach = logoRadius + (maxRadius - logoRadius) * (0.65 + Math.random() * 0.35);
      const clampedReach = Math.min(boltReach, maxRadius - 2);
      const endAngle = angle + (Math.random() - 0.5) * 0.45;
      const endX = centerX + Math.cos(endAngle) * clampedReach;
      const endY = centerY + Math.sin(endAngle) * clampedReach;

      const segments = generateJaggedLine(startX, startY, endX, endY, 14, 3);

      // Create 1-2 smaller electrical branches (staying within radius)
      const branches: { segments: { x: number; y: number }[]; alpha: number }[] = [];
      const numBranches = Math.floor(Math.random() * 2) + 1;
      for (let b = 0; b < numBranches; b++) {
        if (segments.length > 3) {
          const splitIdx = Math.floor(Math.random() * (segments.length - 2)) + 1;
          const splitPt = segments[splitIdx];
          const branchAngle = angle + (Math.random() > 0.5 ? 1 : -1) * (0.35 + Math.random() * 0.4);
          const branchLen = 10 + Math.random() * 18;
          let bEndX = splitPt.x + Math.cos(branchAngle) * branchLen;
          let bEndY = splitPt.y + Math.sin(branchAngle) * branchLen;

          // Clamp branch end to max radius
          const bDist = Math.sqrt((bEndX - centerX) ** 2 + (bEndY - centerY) ** 2);
          if (bDist > maxRadius) {
            bEndX = centerX + ((bEndX - centerX) / bDist) * (maxRadius - 2);
            bEndY = centerY + ((bEndY - centerY) / bDist) * (maxRadius - 2);
          }

          const branchSegs = generateJaggedLine(splitPt.x, splitPt.y, bEndX, bEndY, 8, 2.5);
          branches.push({ segments: branchSegs, alpha: 0.85 });
        }
      }

      bolts.push({
        id: Math.random(),
        segments,
        branches,
        life: 0,
        maxLife: 4 + Math.floor(Math.random() * 3), // rapid high-voltage crackle
        width: 1.4 + Math.random() * 1.2,
        color: Math.random() > 0.3 ? '#FFE600' : '#FFF570'
      });
    };

    // Render loop
    let lastTime = performance.now();

    const render = (now: number) => {
      lastTime = now;

      ctx.clearRect(0, 0, canvasDim, canvasDim);

      // 1. Spawn lightning bursts
      const interval = isHovered ? 45 : nextBoltInterval;
      if (now - lastBoltTime > interval) {
        lastBoltTime = now;
        nextBoltInterval = 55 + Math.random() * 110;

        const count = isHovered ? (Math.random() > 0.5 ? 3 : 2) : (Math.random() > 0.65 ? 2 : 1);
        for (let i = 0; i < count; i++) {
          if (mousePosRef.current.active && isHovered) {
            const dx = mousePosRef.current.x - centerX;
            const dy = mousePosRef.current.y - centerY;
            const mouseAngle = Math.atan2(dy, dx);
            spawnBolt(mouseAngle);
          } else {
            spawnBolt();
          }
        }

        // Micro-arcs hugging the logo contour
        if (Math.random() > 0.35) {
          const microAngle = Math.random() * Math.PI * 2;
          const mDist = logoRadius * (0.9 + Math.random() * 0.15);
          const mStartX = centerX + Math.cos(microAngle) * mDist;
          const mStartY = centerY + Math.sin(microAngle) * mDist;
          const mEndX = mStartX + (Math.random() - 0.5) * 16;
          const mEndY = mStartY + (Math.random() - 0.5) * 16;
          bolts.push({
            id: Math.random(),
            segments: generateJaggedLine(mStartX, mStartY, mEndX, mEndY, 6, 2),
            branches: [],
            life: 0,
            maxLife: 3,
            width: 1.0,
            color: '#FFFFA0'
          });
        }
      }

      // 2. Solar embers (contained strictly inside sphere radius)
      if (Math.random() > 0.4) {
        const emberAngle = Math.random() * Math.PI * 2;
        const emberDist = logoRadius * (0.8 + Math.random() * 0.3);
        const speed = 0.4 + Math.random() * 0.8;
        embers.push({
          x: centerX + Math.cos(emberAngle) * emberDist,
          y: centerY + Math.sin(emberAngle) * emberDist,
          vx: Math.cos(emberAngle) * speed + (Math.random() - 0.5) * 0.2,
          vy: Math.sin(emberAngle) * speed + (Math.random() - 0.5) * 0.2,
          size: 1 + Math.random() * 1.8,
          life: 0,
          maxLife: 22 + Math.random() * 30,
          color: Math.random() > 0.5 ? '#FFD700' : (Math.random() > 0.5 ? '#FF7A00' : '#FFEA00')
        });
      }

      // Draw Embers
      ctx.save();
      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.x += e.vx;
        e.y += e.vy;
        e.life++;

        // Fade out or dissolve if reaching sphere radius
        const currentDist = Math.sqrt((e.x - centerX) ** 2 + (e.y - centerY) ** 2);
        const progress = e.life / e.maxLife;

        if (progress >= 1 || currentDist >= maxRadius) {
          embers.splice(i, 1);
          continue;
        }

        const edgeFade = Math.max(0, 1 - (currentDist / maxRadius) ** 3);
        const alpha = Math.sin((1 - progress) * Math.PI * 0.5) * edgeFade;

        ctx.fillStyle = e.color;
        ctx.globalAlpha = alpha * 0.85;
        ctx.shadowBlur = 6;
        ctx.shadowColor = e.color;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * (1 - progress * 0.35), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 3. Draw Lightning Bolts (Yellow with white-hot core)
      ctx.save();
      for (let i = bolts.length - 1; i >= 0; i--) {
        const bolt = bolts[i];
        bolt.life++;

        if (bolt.life >= bolt.maxLife) {
          bolts.splice(i, 1);
          continue;
        }

        const fade = 1 - (bolt.life / bolt.maxLife);

        // PASS 1: Outer electric amber glow
        ctx.lineWidth = bolt.width * 2.2;
        ctx.strokeStyle = '#FFA500';
        ctx.shadowColor = '#FFE600';
        ctx.shadowBlur = 12;
        ctx.globalAlpha = fade * 0.65;
        ctx.beginPath();
        for (let s = 0; s < bolt.segments.length; s++) {
          const pt = bolt.segments[s];
          if (s === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();

        // PASS 2: Mid vivid electric yellow arc
        ctx.lineWidth = bolt.width * 1.3;
        ctx.strokeStyle = bolt.color;
        ctx.shadowColor = '#FFFFFF';
        ctx.shadowBlur = 6;
        ctx.globalAlpha = fade * 0.95;
        ctx.beginPath();
        for (let s = 0; s < bolt.segments.length; s++) {
          const pt = bolt.segments[s];
          if (s === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();

        // PASS 3: Blinding white core
        ctx.lineWidth = Math.max(0.8, bolt.width * 0.55);
        ctx.strokeStyle = '#FFFFFF';
        ctx.shadowBlur = 3;
        ctx.shadowColor = '#FFFFFF';
        ctx.globalAlpha = fade;
        ctx.beginPath();
        for (let s = 0; s < bolt.segments.length; s++) {
          const pt = bolt.segments[s];
          if (s === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();

        // Draw sub-branches
        for (const branch of bolt.branches) {
          ctx.lineWidth = Math.max(0.8, bolt.width * 0.65);
          ctx.strokeStyle = bolt.color;
          ctx.shadowColor = '#FFE600';
          ctx.shadowBlur = 6;
          ctx.globalAlpha = fade * branch.alpha;
          ctx.beginPath();
          for (let s = 0; s < branch.segments.length; s++) {
            const pt = branch.segments[s];
            if (s === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
          ctx.stroke();
        }
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [size, isHovered, sizeConfig]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * sizeConfig.canvasSize;
    const y = ((e.clientY - rect.top) / rect.height) * sizeConfig.canvasSize;
    mousePosRef.current = { x, y, active: true };
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    mousePosRef.current.active = true;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mousePosRef.current.active = false;
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center select-none group cursor-pointer transition-transform duration-500 hover:scale-105 ${sizeConfig.container} ${className}`}
      aria-label="TRIPPLE AI SYSTEMS Living Solar Logo"
    >
      {/* ========================================================
          LAYER 1: SOLAR CORE AMBIENT GLOW
          Strictly bounded within original sphere dimensions
          ======================================================== */}
      {/* Ambient solar corona glow within sphere boundary */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none transition-all duration-700 blur-[28px]"
        style={{
          background: 'radial-gradient(circle, rgba(255,150,0,0.55) 0%, rgba(255,210,0,0.38) 45%, rgba(255,75,0,0.18) 75%, transparent 100%)',
          transform: isHovered ? 'scale(1.12)' : 'scale(1.0)'
        }}
      />

      {/* Pulsing solar core */}
      <div 
        className="absolute inset-[10%] rounded-full pointer-events-none blur-[18px] animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,220,0.8) 0%, rgba(255,200,30,0.65) 40%, rgba(255,100,0,0.4) 75%, transparent 100%)',
          animationDuration: '3s'
        }}
      />

      {/* ========================================================
          LAYER 2: FIERY SOLAR FLARES LIKE THE SUN
          (Flairs emanate from logo to the exact original sphere radius)
          ======================================================== */}
      {/* Solar Flare Corona Layer 1: Clockwise rotation */}
      <div className="absolute inset-0 pointer-events-none animate-[spin_35s_linear_infinite] opacity-90 mix-blend-screen">
        <svg viewBox="0 0 240 240" className="w-full h-full">
          <defs>
            <radialGradient id="solarFlareGrad1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF8D6" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#FFB800" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#FF4500" stopOpacity="0.55" />
              <stop offset="92%" stopColor="#C91900" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#800000" stopOpacity="0" />
            </radialGradient>
            <filter id="solarBlur1" x="-15%" y="-15%" width="130%" height="130%">
              <feGaussianBlur stdDeviation="2.2" />
            </filter>
          </defs>
          {/* 16 Solar Flare Tongues emanating to the sphere edge (radius <= 108) */}
          <g filter="url(#solarBlur1)" fill="url(#solarFlareGrad1)">
            {Array.from({ length: 16 }).map((_, i) => {
              const rot = (i * 360) / 16;
              // Flare lengths between 85 and 108 (strictly within the 112px sphere radius)
              const flareLen = 86 + (i % 2 === 0 ? 20 : 8) + (i % 3 === 0 ? 4 : 0);
              return (
                <path
                  key={i}
                  transform={`rotate(${rot} 120 120)`}
                  d={`M 115,120 C 111,${120 - flareLen * 0.45} 107,${120 - flareLen * 0.75} 120,${120 - flareLen} C 133,${120 - flareLen * 0.75} 129,${120 - flareLen * 0.45} 125,120 Z`}
                />
              );
            })}
          </g>
        </svg>
      </div>

      {/* Solar Flare Corona Layer 2: Counter-clockwise rotation with curved plasma tongues */}
      <div className="absolute inset-0 pointer-events-none animate-[spin_22s_linear_infinite_reverse] opacity-80 mix-blend-screen">
        <svg viewBox="0 0 240 240" className="w-full h-full">
          <defs>
            <radialGradient id="solarFlareGrad2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="35%" stopColor="#FFE066" stopOpacity="0.9" />
              <stop offset="65%" stopColor="#FF7700" stopOpacity="0.6" />
              <stop offset="90%" stopColor="#D62400" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#660000" stopOpacity="0" />
            </radialGradient>
            <filter id="solarBlur2" x="-15%" y="-15%" width="130%" height="130%">
              <feGaussianBlur stdDeviation="1.6" />
            </filter>
          </defs>
          {/* Curved, twisting solar prominences reaching to the sphere perimeter */}
          <g filter="url(#solarBlur2)" fill="url(#solarFlareGrad2)">
            {Array.from({ length: 12 }).map((_, i) => {
              const rot = (i * 360) / 12 + 15;
              const flareLen = 88 + (i % 2 === 0 ? 18 : 6);
              return (
                <path
                  key={i}
                  transform={`rotate(${rot} 120 120)`}
                  d={`M 116,120 Q 104,${120 - flareLen * 0.55} 115,${120 - flareLen} Q 132,${120 - flareLen * 0.65} 124,120 Z`}
                />
              );
            })}
          </g>
        </svg>
      </div>

      {/* Coronal plasma ejection loops (curling within the sphere radius) */}
      <div className="absolute inset-0 pointer-events-none opacity-80 mix-blend-screen animate-pulse" style={{ animationDuration: '3.6s' }}>
        <svg viewBox="0 0 240 240" className="w-full h-full">
          <defs>
            <linearGradient id="coronalLoopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFAA00" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FFF275" stopOpacity="1" />
              <stop offset="100%" stopColor="#FF5500" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <g stroke="url(#coronalLoopGrad)" strokeWidth="2.2" fill="none" strokeLinecap="round">
            <path d="M 96,120 C 78,85 110,70 120,95" className="opacity-90" />
            <path d="M 135,115 C 165,95 170,135 142,142" className="opacity-80" />
            <path d="M 110,145 C 92,175 140,178 132,150" className="opacity-85" />
            <path d="M 95,130 C 68,140 76,108 98,114" className="opacity-75" />
          </g>
        </svg>
      </div>

      {/* ========================================================
          LAYER 3: REAL-TIME YELLOW LIGHTNING CANVAS
          (Emanating from logo and terminating at original sphere radius)
          ======================================================== */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%'
        }}
        className="absolute inset-0 pointer-events-none z-20 mix-blend-screen will-change-transform"
      />

      {/* ========================================================
          LAYER 4: THE LOGO IN THE CENTER
          (Free of any circular border, bathed in living solar fire)
          ======================================================== */}
      <div 
        className={`relative z-10 flex items-center justify-center transition-transform duration-500 ease-out ${sizeConfig.logo} ${
          isHovered ? 'scale-108' : 'group-hover:scale-104'
        }`}
      >
        <img
          src="logo.png"
          alt="TRIPPLE AI SYSTEMS Living Solar Logo"
          className="w-full h-full object-contain select-none pointer-events-none transition-all duration-300"
          style={{
            filter: isHovered
              ? 'drop-shadow(0 0 16px rgba(255, 230, 0, 1)) drop-shadow(0 0 32px rgba(255, 120, 0, 0.9)) drop-shadow(0 0 50px rgba(255, 60, 0, 0.7)) brightness(1.15)'
              : 'drop-shadow(0 0 12px rgba(255, 215, 0, 0.9)) drop-shadow(0 0 26px rgba(255, 100, 0, 0.75)) drop-shadow(0 0 42px rgba(255, 45, 0, 0.5)) brightness(1.08)'
          }}
        />
      </div>

      {/* Living pulse wave on hover (constrained to the sphere radius) */}
      {isHovered && (
        <div className="absolute inset-0 rounded-full border border-yellow-300/40 pointer-events-none animate-ping" style={{ animationDuration: '1.2s' }} />
      )}
    </div>
  );
};

export default SolarLightningLogo;
