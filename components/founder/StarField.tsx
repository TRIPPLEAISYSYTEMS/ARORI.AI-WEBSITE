import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// ~1 star per square centimetre of screen (96 CSS px per inch ≈ 37.8 px per cm).
const PX_PER_CM = 37.8;
const LINK_DIST = 75;

export const StarField: React.FC = () => {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = window.innerWidth;
    let h = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, w, 0, h, -500, 500);

    const count = Math.min(Math.round((w * h) / (PX_PER_CM * PX_PER_CM)), 800);
    const base = new Float32Array(count * 3);
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 2);
    const phase = new Float32Array(count);
    const size = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      base[i * 3] = pos[i * 3] = Math.random() * w;
      base[i * 3 + 1] = pos[i * 3 + 1] = Math.random() * h;
      base[i * 3 + 2] = pos[i * 3 + 2] = Math.random() * 200 - 100;
      phase[i] = Math.random() * Math.PI * 2;
      size[i] = 1.2 + Math.random() ** 3 * 3.5;
    }

    const geo = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(pos, 3);
    geo.setAttribute("position", posAttr);
    geo.setAttribute("phase", new THREE.BufferAttribute(phase, 1));
    geo.setAttribute("size", new THREE.BufferAttribute(size, 1));

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uDpr: { value: renderer.getPixelRatio() } },
      vertexShader: `
        attribute float phase;
        attribute float size;
        uniform float uTime;
        uniform float uDpr;
        varying float vA;
        void main() {
          float t = sin(uTime * 1.6 + phase * 3.0) * 0.5 + 0.5;
          vA = 0.35 + 0.65 * pow(t, 3.0);
          gl_PointSize = size * uDpr * (0.8 + 0.6 * vA);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying float vA;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          float core = smoothstep(0.5, 0.0, d);
          float ray = max(0.0, 1.0 - abs(c.x) * 14.0) * max(0.0, 1.0 - abs(c.y) * 2.0)
                    + max(0.0, 1.0 - abs(c.y) * 14.0) * max(0.0, 1.0 - abs(c.x) * 2.0);
          gl_FragColor = vec4(vec3(1.0, 0.82, 0.45) * (core + ray * 0.4 * vA), (core * core + ray * 0.3) * vA);
        }
      `,
    });

    scene.add(new THREE.Points(geo, mat));

    const maxLines = 600;
    const linePos = new Float32Array(maxLines * 6);
    const lineCol = new Float32Array(maxLines * 6);
    const lineGeo = new THREE.BufferGeometry();
    const lineAttrPos = new THREE.BufferAttribute(linePos, 3);
    const lineAttrCol = new THREE.BufferAttribute(lineCol, 3);
    lineGeo.setAttribute("position", lineAttrPos);
    lineGeo.setAttribute("color", lineAttrCol);

    const lines = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    scene.add(lines);

    const mouse = { x: -9999, y: -9999, active: false };
    let scroll = window.scrollY;

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const onClick = (e: PointerEvent) => {
      for (let i = 0; i < count; i++) {
        const dx = pos[i * 3] - e.clientX;
        const dy = pos[i * 3 + 1] - e.clientY;
        const d = Math.hypot(dx, dy) || 1;
        if (d < 220) {
          const f = ((220 - d) / 220) * 9;
          vel[i * 2] += (dx / d) * f;
          vel[i * 2 + 1] += (dy / d) * f;
        }
      }
    };
    const onScroll = () => {
      scroll = window.scrollY;
    };
    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      renderer.setSize(w, h);
      camera.right = w;
      camera.bottom = h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onClick);
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let raf = 0;

    const tick = () => {
      const t = clock.getElapsedTime();
      mat.uniforms.uTime.value = reduce ? 0 : t;
      let n = 0;

      for (let i = 0; i < count; i++) {
        const z = base[i * 3 + 2];
        const lt = t * (0.12 + size[i] * 0.03) + phase[i];
        const amp = reduce ? 0 : 10 + (z + 100) * 0.08;
        let bx = base[i * 3] + Math.sin(lt) * amp;
        let by = base[i * 3 + 1] + Math.sin(lt * 2) * amp * 0.5 - scroll * (0.05 + (z + 100) / 1200);
        by = ((by % h) + h) % h;
        bx = ((bx % w) + w) % w;

        let x = pos[i * 3];
        let y = pos[i * 3 + 1];
        if (Math.abs(x - bx) > w / 2) x = bx;
        if (Math.abs(y - by) > h / 2) y = by;

        if (mouse.active) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < 90) {
            const f = ((90 - d) / 90) * 1.2;
            vel[i * 2] += (dx / d) * f;
            vel[i * 2 + 1] += (dy / d) * f;
          }
        }

        vel[i * 2] = (vel[i * 2] + (bx - x) * 0.01) * 0.9;
        vel[i * 2 + 1] = (vel[i * 2 + 1] + (by - y) * 0.01) * 0.9;
        pos[i * 3] = x + vel[i * 2];
        pos[i * 3 + 1] = y + vel[i * 2 + 1];
      }

      // Constellation links around cursor
      if (mouse.active) {
        const near: number[] = [];
        for (let i = 0; i < count; i++) {
          if (Math.hypot(pos[i * 3] - mouse.x, pos[i * 3 + 1] - mouse.y) < 240) {
            near.push(i);
          }
        }
        for (let a = 0; a < near.length && n < maxLines; a++) {
          for (let b = a + 1; b < near.length && n < maxLines; b++) {
            const i = near[a];
            const j = near[b];
            const d = Math.hypot(pos[i * 3] - pos[j * 3], pos[i * 3 + 1] - pos[j * 3 + 1]);
            if (d < LINK_DIST) {
              const md = Math.hypot(
                (pos[i * 3] + pos[j * 3]) / 2 - mouse.x,
                (pos[i * 3 + 1] + pos[j * 3 + 1]) / 2 - mouse.y
              );
              const k = (1 - d / LINK_DIST) * Math.max(0, 1 - md / 240) * 0.55;
              linePos.set([pos[i * 3], pos[i * 3 + 1], 0, pos[j * 3], pos[j * 3 + 1], 0], n * 6);
              lineCol.set([k, k * 0.78, k * 0.4, k, k * 0.78, k * 0.4], n * 6);
              n++;
            }
          }
        }
      }

      lineGeo.setDrawRange(0, n * 2);
      lineAttrPos.needsUpdate = true;
      lineAttrCol.needsUpdate = true;
      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onClick);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      geo.dispose();
      lineGeo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mount} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10" />;
};

export default StarField;
