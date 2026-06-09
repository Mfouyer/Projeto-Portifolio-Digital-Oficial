import React from 'react';

/* HeroMotion — "living grid" animado do hero (porte do architect-motion.js):
   linhas que derivam + células/quadrados aleatórios acendendo e apagando
   num <canvas> + spotlight que segue o cursor.
   Renderiza dentro do #hero (que é position:relative). */

function hexA(hex: string, a: number): string {
  let h = (hex || '#D97706').replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

const HeroMotion: React.FC<{ accent?: string; intensity?: number }> = ({
  accent = '#D97706',
  intensity = 5,
}) => {
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    const hero = root?.parentElement as HTMLElement | null;
    if (!root || !hero) return;

    root.innerHTML = '';
    let raf = 0;
    const cleanups: Array<() => void> = [];
    const maskCss = 'radial-gradient(ellipse 85% 72% at 50% 36%, #000 28%, transparent 100%)';
    const CELL = 46;

    // 1) Grade que deriva (linhas)
    const op = 0.05 + intensity * 0.013;
    const grid = document.createElement('div');
    grid.style.cssText =
      `position:absolute;inset:-80px;` +
      `background-image:linear-gradient(${hexA(accent, op)} 1px,transparent 1px),linear-gradient(90deg,${hexA(accent, op)} 1px,transparent 1px);` +
      `background-size:${CELL}px ${CELL}px;` +
      `-webkit-mask-image:${maskCss};mask-image:${maskCss};` +
      `animation:arch-mgDrift ${Math.max(18, 55 - intensity)}s linear infinite;`;
    root.appendChild(grid);

    // 2) Quadrados aleatórios (canvas) acendendo/apagando
    const cv = document.createElement('canvas');
    cv.style.cssText = `position:absolute;inset:0;width:100%;height:100%;-webkit-mask-image:${maskCss};mask-image:${maskCss};`;
    root.appendChild(cv);
    const cctx = cv.getContext('2d')!;
    let cw = 0, ch = 0, cols = 0, rows = 0;
    const cells: Array<{ col: number; row: number; age: number; life: number; peak: number }> = [];
    const resize = () => {
      const r = hero.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = r.width; ch = r.height;
      cv.width = cw * dpr; cv.height = ch * dpr;
      cctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(cw / CELL); rows = Math.ceil(ch / CELL);
    };
    resize();
    window.addEventListener('resize', resize);
    cleanups.push(() => window.removeEventListener('resize', resize));

    const maxActive = 4 + intensity * 2;
    const spawnChance = 0.018 * intensity;
    const spawn = () => cells.push({
      col: Math.floor(Math.random() * cols),
      row: Math.floor(Math.random() * rows),
      age: 0,
      life: 2400 + Math.random() * 3600,
      peak: 0.08 + Math.random() * 0.20,
    });

    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50); last = now;
      if (cells.length < maxActive && Math.random() < spawnChance * dt / 16) spawn();
      cctx.clearRect(0, 0, cw, ch);
      for (let i = cells.length - 1; i >= 0; i--) {
        const c = cells[i]; c.age += dt;
        const p = c.age / c.life;
        if (p >= 1) { cells.splice(i, 1); continue; }
        const fade = Math.sin(p * Math.PI); // 0 → 1 → 0
        cctx.fillStyle = hexA(accent, c.peak * fade);
        cctx.fillRect(c.col * CELL + 1, c.row * CELL + 1, CELL - 1.5, CELL - 1.5);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // 3) Spotlight que segue o cursor
    const spot = document.createElement('div');
    spot.style.cssText = `position:absolute;inset:0;opacity:0;transition:opacity .45s;mix-blend-mode:screen;`;
    root.appendChild(spot);
    const setSpot = (x: number, y: number) => {
      spot.style.background = `radial-gradient(280px circle at ${x}% ${y}%, ${hexA(accent, 0.20)}, transparent 62%)`;
    };
    setSpot(50, 38);
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      setSpot((e.clientX - r.left) / r.width * 100, (e.clientY - r.top) / r.height * 100);
      spot.style.opacity = '1';
    };
    const onLeave = () => { spot.style.opacity = '0'; };
    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
    });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      cleanups.forEach((fn) => { try { fn(); } catch { /* noop */ } });
      root.innerHTML = '';
    };
  }, [accent, intensity]);

  return <div className="motion-root" ref={rootRef} aria-hidden="true" />;
};

export default HeroMotion;
