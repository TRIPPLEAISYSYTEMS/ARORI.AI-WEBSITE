import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
  speed: number;
}

interface StarNode {
  baseX: number;
  baseY: number;
  baseZ: number;
  currentX: number;
  currentY: number;
  currentZ: number;
  phase: number;
  freq: number;
  amp: number;
  size: number;
  twinkleSpeed: number;
  vx: number;
  vy: number;
  activation: number; // 0 to 1 when near cursor or during shockwaves
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  life: number;
  maxLife: number;
  active: boolean;
}

const ConstellationSystem: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1 unit = 1 pixel via Orthographic Camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      0.1,
      1000
    );
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // High Density: ~5 particles per 1cm cubic density factor
    // Desktop generates ~750 to 1200 interlocked constellation stars
    const nodeCount = Math.min(1300, Math.max(500, Math.round(((width * height) / (37.8 * 37.8)) * 2.6)));

    const stars: StarNode[] = [];
    const positions = new Float32Array(nodeCount * 3);
    const aSizes = new Float32Array(nodeCount);
    const aPhases = new Float32Array(nodeCount);
    const aTwinkleSpeeds = new Float32Array(nodeCount);
    const aActivations = new Float32Array(nodeCount);

    for (let i = 0; i < nodeCount; i++) {
      const bx = (Math.random() - 0.5) * (width + 160);
      const by = (Math.random() - 0.5) * (height + 160);
      const bz = (Math.random() - 0.5) * 200; // Volumetric depth -100 to +100

      const phase = Math.random() * Math.PI * 2;
      const freq = (0.35 + Math.random() * 0.7) * 0.70;
      const amp = 10 + Math.random() * 24;
      // Prominent constellation stars mixed with finer stars
      const isMajor = Math.random() < 0.22;
      const size = isMajor ? 26 + Math.random() * 22 : 14 + Math.random() * 16;
      const twinkleSpeed = (1.0 + Math.random() * 2.5) * 0.70;

      stars.push({
        baseX: bx,
        baseY: by,
        baseZ: bz,
        currentX: bx,
        currentY: by,
        currentZ: bz,
        phase,
        freq,
        amp,
        size,
        twinkleSpeed,
        vx: 0,
        vy: 0,
        activation: 0,
      });

      positions[i * 3 + 0] = bx;
      positions[i * 3 + 1] = by;
      positions[i * 3 + 2] = bz;

      aSizes[i] = size;
      aPhases[i] = phase;
      aTwinkleSpeeds[i] = twinkleSpeed;
      aActivations[i] = 0.0;
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('aSize', new THREE.BufferAttribute(aSizes, 1));
    starGeometry.setAttribute('aPhase', new THREE.BufferAttribute(aPhases, 1));
    starGeometry.setAttribute('aTwinkleSpeed', new THREE.BufferAttribute(aTwinkleSpeeds, 1));
    starGeometry.setAttribute('aActivation', new THREE.BufferAttribute(aActivations, 1));

    // Luminous Star Shader with Glimmering Diffraction Glints and Ambient Glow
    const starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aPhase;
        attribute float aTwinkleSpeed;
        attribute float aActivation;
        uniform float uTime;
        varying vec3 vColor;
        varying float vAlpha;
        varying float vActivation;
        varying float vTwinkle;

        void main() {
          vActivation = aActivation;
          // Sinusoidal twinkle rhythm
          float twinkle = 0.45 + 0.55 * sin(uTime * aTwinkleSpeed + aPhase);
          vTwinkle = twinkle;
          
          // Enhanced visibility: base alpha 0.40 to 1.0 when active
          vAlpha = clamp(twinkle * 0.75 + aActivation * 0.85 + 0.25, 0.35, 1.0);
          
          // Warm amber gold with champagne radiant boost when lit up
          vec3 baseGold = vec3(0.98, 0.82, 0.42);
          vec3 brightChampagne = vec3(1.0, 0.96, 0.78);
          vColor = mix(baseGold, brightChampagne, aActivation * 0.75);

          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          // Scale star point size dynamically when glimmering or hovered
          gl_PointSize = (aSize * (0.8 + 0.35 * twinkle) + aActivation * 24.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec3 vColor;
        varying float vAlpha;
        varying float vActivation;
        varying float vTwinkle;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;

          // 1. Central Core with Soft Falloff
          float core = 1.0 - smoothstep(0.0, 0.42, dist);
          core = pow(core, 2.2);

          // 2. Soft Radiant Outer Glow Halo
          float halo = exp(-dist * 6.5) * 0.85;

          // 3. 4-Ray Glimmering Diffraction Flare (Cross glint)
          float rayW = 0.038;
          float rayX = max(0.0, 1.0 - abs(coord.x) / 0.5) * max(0.0, 1.0 - abs(coord.y) / rayW);
          float rayY = max(0.0, 1.0 - abs(coord.y) / 0.5) * max(0.0, 1.0 - abs(coord.x) / rayW);
          float glint = pow(max(rayX, rayY), 1.8) * (0.9 + vActivation * 1.5 + vTwinkle * 0.5);

          // 4. Diagonal secondary glints for major sparkling stars
          vec2 diag1 = vec2(coord.x + coord.y, coord.y - coord.x) * 0.7071;
          float rayD = max(0.0, 1.0 - abs(diag1.x) / 0.4) * max(0.0, 1.0 - abs(diag1.y) / (rayW * 1.4));
          float diagGlint = pow(rayD, 2.0) * (0.4 + vActivation * 0.8);

          float totalGlow = core * 0.9 + halo * 0.7 + glint * 1.2 + diagGlint * 0.6;
          gl_FragColor = vec4(vColor * totalGlow, vAlpha * clamp(totalGlow, 0.0, 1.0));
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starPoints = new THREE.Points(starGeometry, starMaterial);
    scene.add(starPoints);

    // Sparkling Fine Stardust Background Layer (~1200 micro-particles)
    const dustCount = 1200;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustSizes = new Float32Array(dustCount);
    const dustPhases = new Float32Array(dustCount);

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3 + 0] = (Math.random() - 0.5) * (width + 200);
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * (height + 200);
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 300;
      dustSizes[i] = 8 + Math.random() * 14;
      dustPhases[i] = Math.random() * Math.PI * 2;
    }

    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    dustGeometry.setAttribute('aSize', new THREE.BufferAttribute(dustSizes, 1));
    dustGeometry.setAttribute('aPhase', new THREE.BufferAttribute(dustPhases, 1));

    const dustMaterial = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        attribute float aSize;
        attribute float aPhase;
        uniform float uTime;
        varying float vAlpha;

        void main() {
          float twinkle = 0.35 + 0.65 * sin(uTime * 2.2 + aPhase);
          vAlpha = twinkle * 0.75;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (0.8 + 0.4 * twinkle);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        precision highp float;
        varying float vAlpha;
        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;
          float core = 1.0 - smoothstep(0.0, 0.48, dist);
          vec3 goldDust = vec3(0.96, 0.88, 0.68);
          gl_FragColor = vec4(goldDust * core, vAlpha * core * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const dustPoints = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustPoints);

    // Dynamic Interlocking Constellation Links: THREE.LineSegments
    const MAX_LINES = 2200;
    const linePositions = new Float32Array(MAX_LINES * 6);
    const lineColors = new Float32Array(MAX_LINES * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const constellationLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(constellationLines);

    // Shooting Stars / Meteor Trails
    const shootingStars: ShootingStar[] = [];
    for (let k = 0; k < 3; k++) {
      shootingStars.push({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        length: 120,
        life: 0,
        maxLife: 1.0,
        active: false,
      });
    }

    const meteorPositions = new Float32Array(6 * 3);
    const meteorColors = new Float32Array(6 * 3);
    const meteorGeometry = new THREE.BufferGeometry();
    meteorGeometry.setAttribute('position', new THREE.BufferAttribute(meteorPositions, 3).setUsage(THREE.DynamicDrawUsage));
    meteorGeometry.setAttribute('color', new THREE.BufferAttribute(meteorColors, 3).setUsage(THREE.DynamicDrawUsage));

    const meteorMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const meteorLines = new THREE.LineSegments(meteorGeometry, meteorMaterial);
    scene.add(meteorLines);

    let nextMeteorTimer = 2.0;

    // Pointer, Touch, and Shockwave Physics
    let pointerX = -99999;
    let pointerY = -99999;
    let isPointerActive = false;
    const shockwaves: Shockwave[] = [];

    const updatePointerPos = (clientX: number, clientY: number) => {
      isPointerActive = true;
      pointerX = clientX - width / 2;
      pointerY = height / 2 - clientY;
    };

    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      updatePointerPos(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        updatePointerPos(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handlePointerLeave = () => {
      isPointerActive = false;
      pointerX = -99999;
      pointerY = -99999;
    };

    const triggerShockwave = (clientX: number, clientY: number) => {
      const clickX = clientX - width / 2;
      const clickY = height / 2 - clientY;

      shockwaves.push({
        x: clickX,
        y: clickY,
        radius: 0,
        maxRadius: 280,
        strength: 28.0,
        speed: 294, // 30% slower propagation
      });
    };

    const handlePointerDown = (e: MouseEvent | PointerEvent) => {
      triggerShockwave(e.clientX, e.clientY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        updatePointerPos(e.touches[0].clientX, e.touches[0].clientY);
        triggerShockwave(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    // Attach listeners across window for seamless interactivity
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('touchend', handlePointerLeave);
    window.addEventListener('mousedown', handlePointerDown, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Scroll Parallax
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();

    const posAttr = starGeometry.getAttribute('position') as THREE.BufferAttribute;
    const actAttr = starGeometry.getAttribute('aActivation') as THREE.BufferAttribute;
    const linePosAttr = lineGeometry.getAttribute('position') as THREE.BufferAttribute;
    const lineColAttr = lineGeometry.getAttribute('color') as THREE.BufferAttribute;
    const meteorPosAttr = meteorGeometry.getAttribute('position') as THREE.BufferAttribute;
    const meteorColAttr = meteorGeometry.getAttribute('color') as THREE.BufferAttribute;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const now = performance.now();
      // Scale dt by 0.70 for 30% slower physics and movement
      const dt = Math.min((now - lastTime) / 1000, 0.1) * 0.70;
      lastTime = now;

      // 30% slower shader time progression
      const time = prefersReducedMotion ? 0 : now * 0.0007;
      starMaterial.uniforms.uTime.value = time;
      dustMaterial.uniforms.uTime.value = time;

      // Autonomous gentle ambient constellation wandering locus (30% slower)
      const ambientX = Math.sin(time * 0.32) * (width * 0.32);
      const ambientY = Math.cos(time * 0.25) * (height * 0.28);

      // Update shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += sw.speed * dt;
        sw.strength *= Math.pow(0.1, dt);
        if (sw.radius >= sw.maxRadius || sw.strength < 0.04) {
          shockwaves.splice(s, 1);
        }
      }

      // Update Shooting Stars (30% slower spawn & velocity)
      nextMeteorTimer -= dt;
      if (nextMeteorTimer <= 0) {
        nextMeteorTimer = 5.0 + Math.random() * 5.0;
        // Spawn a shooting star
        for (const ms of shootingStars) {
          if (!ms.active) {
            ms.active = true;
            ms.x = (Math.random() - 0.5) * width;
            ms.y = height / 2 + 50;
            const angle = Math.PI * 1.25 + (Math.random() - 0.5) * 0.4;
            const spd = (700 + Math.random() * 400) * 0.70;
            ms.vx = Math.cos(angle) * spd;
            ms.vy = Math.sin(angle) * spd;
            ms.life = 0;
            ms.maxLife = 1.3 + Math.random() * 0.7;
            ms.length = 100 + Math.random() * 80;
            break;
          }
        }
      }

      let meteorVertCount = 0;
      for (let k = 0; k < shootingStars.length; k++) {
        const ms = shootingStars[k];
        if (!ms.active) continue;

        ms.x += ms.vx * dt;
        ms.y += ms.vy * dt;
        ms.life += dt;

        if (ms.life >= ms.maxLife) {
          ms.active = false;
          continue;
        }

        const progress = ms.life / ms.maxLife;
        const meteorAlpha = Math.sin(progress * Math.PI) * 0.9;

        const tailX = ms.x - (ms.vx / 800) * ms.length;
        const tailY = ms.y - (ms.vy / 800) * ms.length;

        // Head (bright gold white)
        meteorPositions[meteorVertCount * 3 + 0] = ms.x;
        meteorPositions[meteorVertCount * 3 + 1] = ms.y;
        meteorPositions[meteorVertCount * 3 + 2] = 50;
        meteorColors[meteorVertCount * 3 + 0] = 1.0 * meteorAlpha;
        meteorColors[meteorVertCount * 3 + 1] = 0.95 * meteorAlpha;
        meteorColors[meteorVertCount * 3 + 2] = 0.75 * meteorAlpha;
        meteorVertCount++;

        // Tail (fading gold)
        meteorPositions[meteorVertCount * 3 + 0] = tailX;
        meteorPositions[meteorVertCount * 3 + 1] = tailY;
        meteorPositions[meteorVertCount * 3 + 2] = 50;
        meteorColors[meteorVertCount * 3 + 0] = 0.8 * meteorAlpha * 0.1;
        meteorColors[meteorVertCount * 3 + 1] = 0.6 * meteorAlpha * 0.1;
        meteorColors[meteorVertCount * 3 + 2] = 0.2 * meteorAlpha * 0.1;
        meteorVertCount++;
      }

      meteorGeometry.setDrawRange(0, meteorVertCount);
      meteorPosAttr.needsUpdate = true;
      meteorColAttr.needsUpdate = true;

      const halfW = width / 2 + 80;
      const halfH = height / 2 + 80;

      // Update Constellation Star Nodes
      for (let i = 0; i < nodeCount; i++) {
        const s = stars[i];

        if (!prefersReducedMotion) {
          // Autonomous Lissajous Sway
          const t = time * s.freq + s.phase;
          const lissajousX = s.baseX + Math.sin(t) * s.amp;
          const lissajousY = s.baseY + Math.sin(2.0 * t) * (s.amp * 0.5);

          // Volumetric Scroll Parallax
          const parallaxY = -(scrollY * (s.baseZ / 100.0) * 0.3);

          let targetX = lissajousX;
          let targetY = lissajousY + parallaxY;

          // Screen Wrap with smooth margin
          while (targetX > halfW) targetX -= halfW * 2;
          while (targetX < -halfW) targetX += halfW * 2;
          while (targetY > halfH) targetY -= halfH * 2;
          while (targetY < -halfH) targetY += halfH * 2;

          // Dampen velocity impulses
          s.vx *= Math.pow(0.06, dt);
          s.vy *= Math.pow(0.06, dt);

          // Shockwave Interaction: lights up & pushes outward
          let shockActivation = 0.0;
          for (let swIdx = 0; swIdx < shockwaves.length; swIdx++) {
            const sw = shockwaves[swIdx];
            const dx = targetX - sw.x;
            const dy = targetY - sw.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const shockBand = 55;
            if (dist > 0 && Math.abs(dist - sw.radius) < shockBand) {
              const factor = (1.0 - Math.abs(dist - sw.radius) / shockBand) * (sw.strength / 28.0);
              shockActivation = Math.max(shockActivation, factor);
              s.vx += (dx / dist) * factor * 22.0;
              s.vy += (dy / dist) * factor * 22.0;
            }
          }

          // Cursor / Touch Constellation Activation
          let hoverActivation = 0.0;
          if (isPointerActive) {
            const pDx = targetX - pointerX;
            const pDy = targetY - pointerY;
            const pDist = Math.sqrt(pDx * pDx + pDy * pDy);

            if (pDist < 200) {
              hoverActivation = 1.0 - pDist / 200;
              // Gentle magnetic attraction to pointer
              s.vx -= (pDx / (pDist || 1)) * hoverActivation * 3.5;
              s.vy -= (pDy / (pDist || 1)) * hoverActivation * 3.5;
            }
          } else {
            // Ambient wandering locus activates subtle constellation glimmering
            const ambDx = targetX - ambientX;
            const ambDy = targetY - ambientY;
            const ambDist = Math.sqrt(ambDx * ambDx + ambDy * ambDy);
            if (ambDist < 140) {
              hoverActivation = (1.0 - ambDist / 140) * 0.45;
            }
          }

          const targetAct = Math.min(1.0, hoverActivation + shockActivation);
          s.activation += (targetAct - s.activation) * Math.min(1.0, dt * 8.5);

          s.currentX = targetX + s.vx;
          s.currentY = targetY + s.vy;
        }

        positions[i * 3 + 0] = s.currentX;
        positions[i * 3 + 1] = s.currentY;
        positions[i * 3 + 2] = s.currentZ;

        aActivations[i] = s.activation;
      }

      posAttr.needsUpdate = true;
      actAttr.needsUpdate = true;

      // Interlocked Constellation Links (Illuminates & Connects)
      let lineVertexIndex = 0;
      const threshold = 85;
      const thresholdSq = threshold * threshold;

      for (let i = 0; i < nodeCount && lineVertexIndex < MAX_LINES * 6; i++) {
        const s1 = stars[i];

        // Direct Constellation Beam from cursor/touch to active stars
        if (isPointerActive && s1.activation > 0.08 && lineVertexIndex + 6 <= MAX_LINES * 6) {
          const pDx = s1.currentX - pointerX;
          const pDy = s1.currentY - pointerY;
          const pDist = Math.sqrt(pDx * pDx + pDy * pDy);
          if (pDist < 150) {
            const alpha = (1.0 - pDist / 150) * (0.65 + s1.activation * 0.35);
            const r = 1.0 * alpha;
            const g = 0.90 * alpha;
            const b = 0.55 * alpha;

            linePositions[lineVertexIndex + 0] = s1.currentX;
            linePositions[lineVertexIndex + 1] = s1.currentY;
            linePositions[lineVertexIndex + 2] = s1.currentZ;
            lineColors[lineVertexIndex + 0] = r;
            lineColors[lineVertexIndex + 1] = g;
            lineColors[lineVertexIndex + 2] = b;

            linePositions[lineVertexIndex + 3] = pointerX;
            linePositions[lineVertexIndex + 4] = pointerY;
            linePositions[lineVertexIndex + 5] = s1.currentZ;
            lineColors[lineVertexIndex + 3] = r;
            lineColors[lineVertexIndex + 4] = g;
            lineColors[lineVertexIndex + 5] = b;

            lineVertexIndex += 6;
          }
        }

        // Interconnected Constellation Network between neighboring stars
        for (let j = i + 1; j < nodeCount && lineVertexIndex + 6 <= MAX_LINES * 6; j++) {
          const s2 = stars[j];
          const dx = s1.currentX - s2.currentX;
          if (Math.abs(dx) > threshold) continue;

          const dy = s1.currentY - s2.currentY;
          if (Math.abs(dy) > threshold) continue;

          const distSq = dx * dx + dy * dy;
          if (distSq < thresholdSq) {
            const dist = Math.sqrt(distSq);
            const baseAlpha = 1.0 - dist / threshold;
            // Shimmering constellation link intensity
            const actBoost = (s1.activation + s2.activation) * 0.75;
            // Ambient breathing pulse for constantly glimmering constellations
            const ambientPulse = 0.15 + 0.1 * Math.sin(time * 1.8 + s1.phase);
            const alpha = Math.min(1.0, (baseAlpha * ambientPulse + actBoost));

            const r = 1.0 * alpha;
            const g = (0.84 + actBoost * 0.14) * alpha;
            const b = (0.45 + actBoost * 0.3) * alpha;

            linePositions[lineVertexIndex + 0] = s1.currentX;
            linePositions[lineVertexIndex + 1] = s1.currentY;
            linePositions[lineVertexIndex + 2] = s1.currentZ;
            lineColors[lineVertexIndex + 0] = r;
            lineColors[lineVertexIndex + 1] = g;
            lineColors[lineVertexIndex + 2] = b;

            linePositions[lineVertexIndex + 3] = s2.currentX;
            linePositions[lineVertexIndex + 4] = s2.currentY;
            linePositions[lineVertexIndex + 5] = s2.currentZ;
            lineColors[lineVertexIndex + 3] = r;
            lineColors[lineVertexIndex + 4] = g;
            lineColors[lineVertexIndex + 5] = b;

            lineVertexIndex += 6;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineVertexIndex / 3);
      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('touchend', handlePointerLeave);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);

      starGeometry.dispose();
      starMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      meteorGeometry.dispose();
      meteorMaterial.dispose();
      renderer.dispose();

      if (container && renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    />
  );
};

export default ConstellationSystem;
