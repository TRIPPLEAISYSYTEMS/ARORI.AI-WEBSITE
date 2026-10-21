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

  // Size configuration: Logo covers most of the space (~86%), with subtle outer solar & lightning rim
  const sizeConfig = {
    sm: { 
      container: 'w-24 h-24', 
      logo: 'w-20 h-20', 
      canvasSize: 96,
      logoRadius: 36,
      maxRadius: 46
    },
    md: { 
      container: 'w-36 h-36', 
      logo: 'w-30 h-30', 
      canvasSize: 144,
      logoRadius: 54,
      maxRadius: 70
    },
    lg: { 
      // Original sphere dimensions: w-44 h-44 sm:w-56 sm:h-56.
      // Logo covers most of space: w-36 h-36 sm:w-48 sm:h-48
      container: 'w-44 h-44 sm:w-56 sm:h-56', 
      logo: 'w-36 h-36 sm:w-48 sm:h-48', 
      canvasSize: 224,
      logoRadius: 84,
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
    let nextBoltInterval = 140; // subtle intermittent pacing

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canvasDim = sizeConfig.canvasSize;
    canvas.width = canvasDim * dpr;
    canvas.height = canvasDim * dpr;
    ctx.scale(dpr, dpr);

    const centerX = canvasDim / 2;
    const centerY = canvasDim / 2;
    const { logoRadius, maxRadius } = sizeConfig;

    // Helper: midpoint displacement for delicate electric lightning
    const generateJaggedLine = (
      x1: number, 
      y1: number, 
      x2: number, 
      y2: number, 
      displace: number, 
      minDisplace: number = 2.5
    ): { x: number; y: number }[] => {
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < minDisplace || displace < 1.5) {
        return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
      }

      const nx = -dy / dist;
      const ny = dx / dist;
      const offset = (Math.random() - 0.5) * displace * 2;

      const pX = midX + nx * offset;
      const pY = midY + ny * offset;

      const left = generateJaggedLine(x1, y1, pX, pY, displace * 0.52, minDisplace);
      const right = generateJaggedLine(pX, pY, x2, y2, displace * 0.52, minDisplace);

      return left.slice(0, left.length - 1).concat(right);
    };

    // Spawn a subtle, delicate lightning bolt right at the logo perimeter
    const spawnBolt = (targetAngle?: number) => {
      const angle = targetAngle !== undefined 
        ? targetAngle + (Math.random() - 0.5) * 0.3
        : Math.random() * Math.PI * 2;

      // Starts right along the logo contour
      const startDist = logoRadius * (0.92 + Math.random() * 0.08);
      const startX = centerX + Math.cos(angle) * startDist;
      const startY = centerY + Math.sin(angle) * startDist;

      // Reaches subtly outward towards the sphere rim
      const boltReach = logoRadius + (maxRadius - logoRadius) * (0.55 + Math.random() * 0.4);
      const clampedReach = Math.min(boltReach, maxRadius - 2);
      const endAngle = angle + (Math.random() - 0.5) * 0.35;
      const endX = centerX + Math.cos(endAngle) * clampedReach;
      const endY = centerY + Math.sin(endAngle) * clampedReach;

      const segments = generateJaggedLine(startX, startY, endX, endY, 9, 2.5);

      // 1 subtle fork branch
      const branches: { segments: { x: number; y: number }[]; alpha: number }[] = [];
      if (segments.length > 3 && Math.random() > 0.4) {
        const splitIdx = Math.floor(Math.random() * (segments.length - 2)) + 1;
        const splitPt = segments[splitIdx];
        const branchAngle = angle + (Math.random() > 0.5 ? 1 : -1) * (0.3 + Math.random() * 0.3);
        const branchLen = 6 + Math.random() * 10;
        let bEndX = splitPt.x + Math.cos(branchAngle) * branchLen;
        let bEndY = splitPt.y + Math.sin(branchAngle) * branchLen;

        const bDist = Math.sqrt((bEndX - centerX) ** 2 + (bEndY - centerY) ** 2);
        if (bDist > maxRadius) {
          bEndX = centerX + ((bEndX - centerX) / bDist) * (maxRadius - 2);
          bEndY = centerY + ((bEndY - centerY) / bDist) * (maxRadius - 2);
        }

        const branchSegs = generateJaggedLine(splitPt.x, splitPt.y, bEndX, bEndY, 5, 2);
        branches.push({ segments: branchSegs, alpha: 0.65 });
      }

      bolts.push({
        id: Math.random(),
        segments,
        branches,
        life: 0,
        maxLife: 3 + Math.floor(Math.random() * 3), // quick, crisp, subtle crackle
        width: 0.85 + Math.random() * 0.4, // delicate slender electric filament
        color: Math.random() > 0.25 ? '#FFE500' : '#FFF385'
      });
    };

    // Render loop
    const render = (now: number) => {
      ctx.clearRect(0, 0, canvasDim, canvasDim);

      // 1. Spontaneous subtle lightning
      const interval = isHovered ? 80 : nextBoltInterval;
      if (now - lastBoltTime > interval) {
        lastBoltTime = now;
        nextBoltInterval = 120 + Math.random() * 160; // elegant periodic pacing

        if (mousePosRef.current.active && isHovered) {
          const dx = mousePosRef.current.x - centerX;
          const dy = mousePosRef.current.y - centerY;
          const mouseAngle = Math.atan2(dy, dx);
          spawnBolt(mouseAngle);
        } else {
          spawnBolt();
        }

        // Occasional micro-spark hugging the rim
        if (Math.random() > 0.5) {
          const mAngle = Math.random() * Math.PI * 2;
          const mDist = logoRadius * (0.96 + Math.random() * 0.06);
          const mStartX = centerX + Math.cos(mAngle) * mDist;
          const mStartY = centerY + Math.sin(mAngle) * mDist;
          const mEndX = mStartX + (Math.random() - 0.5) * 10;
          const mEndY = mStartY + (Math.random() - 0.5) * 10;
          bolts.push({
            id: Math.random(),
            segments: generateJaggedLine(mStartX, mStartY, mEndX, mEndY, 4, 1.8),
            branches: [],
            life: 0,
            maxLife: 3,
            width: 0.7,
            color: '#FFFFB0'
          });
        }
      }

      // 2. Subtle solar embers (tiny delicate sparks drifting just off the edge)
      if (Math.random() > 0.65) {
        const emberAngle = Math.random() * Math.PI * 2;
        const emberDist = logoRadius * (0.95 + Math.random() * 0.08);
        const speed = 0.3 + Math.random() * 0.5;
        embers.push({
          x: centerX + Math.cos(emberAngle) * emberDist,
          y: centerY + Math.sin(emberAngle) * emberDist,
          vx: Math.cos(emberAngle) * speed + (Math.random() - 0.5) * 0.15,
          vy: Math.sin(emberAngle) * speed + (Math.random() - 0.5) * 0.15,
          size: 0.7 + Math.random() * 1.1,
          life: 0,
          maxLife: 18 + Math.random() * 24,
          color: Math.random() > 0.4 ? '#FFD700' : '#FFA000'
        });
      }

      // Draw Embers
      ctx.save();
      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.x += e.vx;
        e.y += e.vy;
        e.life++;

        const currentDist = Math.sqrt((e.x - centerX) ** 2 + (e.y - centerY) ** 2);
        const progress = e.life / e.maxLife;

        if (progress >= 1 || currentDist >= maxRadius) {
          embers.splice(i, 1);
          continue;
        }

        const alpha = Math.sin((1 - progress) * Math.PI * 0.5) * 0.55;
        ctx.fillStyle = e.color;
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 4;
        ctx.shadowColor = e.color;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * (1 - progress * 0.3), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 3. Draw Lightning Bolts (Subtle, crisp, noticeable electric yellow)
      ctx.save();
      for (let i = bolts.length - 1; i >= 0; i--) {
        const bolt = bolts[i];
        bolt.life++;

        if (bolt.life >= bolt.maxLife) {
          bolts.splice(i, 1);
          continue;
        }

        const fade = 1 - (bolt.life / bolt.maxLife);

        // PASS 1: Soft warm electric aura
        ctx.lineWidth = bolt.width * 2.0;
        ctx.strokeStyle = '#FFA000';
        ctx.shadowColor = '#FFE500';
        ctx.shadowBlur = 6;
        ctx.globalAlpha = fade * 0.45;
        ctx.beginPath();
        for (let s = 0; s < bolt.segments.length; s++) {
          const pt = bolt.segments[s];
          if (s === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();

        // PASS 2: Crisp vivid electric yellow filament
        ctx.lineWidth = bolt.width;
        ctx.strokeStyle = bolt.color;
        ctx.shadowColor = '#FFFFFF';
        ctx.shadowBlur = 3;
        ctx.globalAlpha = fade * 0.85;
        ctx.beginPath();
        for (let s = 0; s < bolt.segments.length; s++) {
          const pt = bolt.segments[s];
          if (s === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();

        // Draw branch if any
        for (const branch of bolt.branches) {
          ctx.lineWidth = Math.max(0.6, bolt.width * 0.7);
          ctx.strokeStyle = bolt.color;
          ctx.shadowColor = '#FFE500';
          ctx.shadowBlur = 3;
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
      className={`relative flex items-center justify-center select-none group cursor-pointer transition-transform duration-500 hover:scale-103 ${sizeConfig.container} ${className}`}
      aria-label="TRIPPLE AI SYSTEMS Living Solar Logo"
    >
      {/* ========================================================
          LAYER 1: VERY SUBTLE SOLAR AMBIENT GLOW
          Soft, refined star radiance hugging the logo
          ======================================================== */}
      {/* Subtle outer solar glow */}
      <div 
        className="absolute inset-[3%] rounded-full pointer-events-none transition-all duration-700 blur-[20px]"
        style={{
          background: 'radial-gradient(circle, rgba(255,160,0,0.38) 0%, rgba(255,210,40,0.22) 50%, rgba(255,80,0,0.08) 78%, transparent 100%)',
          transform: isHovered ? 'scale(1.08)' : 'scale(1.0)'
        }}
      />

      {/* Gentle living pulse in the core */}
      <div 
        className="absolute inset-[15%] rounded-full pointer-events-none blur-[14px] animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,220,0.45) 0%, rgba(255,190,30,0.25) 55%, transparent 100%)',
          animationDuration: '3.5s'
        }}
      />

      {/* ========================================================
          LAYER 2: SUBTLE SOLAR FLARES & CORONA FRINGES
          Delicate flame tips licking out right from the logo rim
          ======================================================== */}
      {/* Solar Flare Layer 1: Clockwise rotation */}
      <div className="absolute inset-0 pointer-events-none animate-[spin_40s_linear_infinite] opacity-50 mix-blend-screen">
        <svg viewBox="0 0 240 240" className="w-full h-full">
          <defs>
            <radialGradient id="solarSubtleGrad1" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="#FFF2A0" stopOpacity="0.8" />
              <stop offset="82%" stopColor="#FFA500" stopOpacity="0.5" />
              <stop offset="96%" stopColor="#FF4500" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#800000" stopOpacity="0" />
            </radialGradient>
            <filter id="solarSubtleBlur1" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="1.6" />
            </filter>
          </defs>
          {/* Subtle flare tips hugging the logo radius (flare length 92 - 105) */}
          <g filter="url(#solarSubtleBlur1)" fill="url(#solarSubtleGrad1)">
            {Array.from({ length: 16 }).map((_, i) => {
              const rot = (i * 360) / 16;
              const flareLen = 92 + (i % 2 === 0 ? 12 : 5);
              return (
                <path
                  key={i}
                  transform={`rotate(${rot} 120 120)`}
                  d={`M 116,120 C 114,${120 - flareLen * 0.6} 112,${120 - flareLen * 0.85} 120,${120 - flareLen} C 128,${120 - flareLen * 0.85} 126,${120 - flareLen * 0.6} 124,120 Z`}
                />
              );
            })}
          </g>
        </svg>
      </div>

      {/* Solar Flare Layer 2: Counter-clockwise subtle curved prominences */}
      <div className="absolute inset-0 pointer-events-none animate-[spin_26s_linear_infinite_reverse] opacity-40 mix-blend-screen">
        <svg viewBox="0 0 240 240" className="w-full h-full">
          <defs>
            <radialGradient id="solarSubtleGrad2" cx="50%" cy="50%" r="50%">
              <stop offset="65%" stopColor="#FFFFFF" stopOpacity="0.75" />
              <stop offset="85%" stopColor="#FFC830" stopOpacity="0.45" />
              <stop offset="98%" stopColor="#FF6600" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#660000" stopOpacity="0" />
            </radialGradient>
            <filter id="solarSubtleBlur2" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="1.2" />
            </filter>
          </defs>
          <g filter="url(#solarSubtleBlur2)" fill="url(#solarSubtleGrad2)">
            {Array.from({ length: 12 }).map((_, i) => {
              const rot = (i * 360) / 12 + 15;
              const flareLen = 94 + (i % 2 === 0 ? 10 : 4);
              return (
                <path
                  key={i}
                  transform={`rotate(${rot} 120 120)`}
                  d={`M 117,120 Q 110,${120 - flareLen * 0.7} 118,${120 - flareLen} Q 128,${120 - flareLen * 0.75} 123,120 Z`}
                />
              );
            })}
          </g>
        </svg>
      </div>

      {/* ========================================================
          LAYER 3: PROCEDURAL SUBTLE YELLOW LIGHTNING CANVAS
          Slender, crisp electric filaments crackling along the rim
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
          LAYER 4: LOGO COVERING MOST OF THE SPACE
          Prominent, high-clarity, with subtle living golden glow
          ======================================================== */}
      <div 
        className={`relative z-10 flex items-center justify-center transition-transform duration-500 ease-out ${sizeConfig.logo} ${
          isHovered ? 'scale-104' : 'group-hover:scale-102'
        }`}
      >
        <img
          src="logo.png"
          alt="TRIPPLE AI SYSTEMS Living Solar Logo"
          className="w-full h-full object-contain select-none pointer-events-none transition-all duration-300"
          style={{
            filter: isHovered
              ? 'drop-shadow(0 0 12px rgba(255, 215, 0, 0.75)) drop-shadow(0 0 24px rgba(255, 130, 0, 0.45)) brightness(1.08)'
              : 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 18px rgba(255, 120, 0, 0.3)) brightness(1.03)'
          }}
        />
      </div>
    </div>
  );
};

export default SolarLightningLogo;
