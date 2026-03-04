"use client";

import { useEffect, useRef, useCallback, type RefObject } from "react";

const CELL_SIZE = 20;
const FONT_SIZE_MIN = 9;
const FONT_SIZE_MAX = 14;
const FADE_RATE = 0.015;
const COLOR = [106, 168, 154] as const; // #6AA89A

interface Props {
  sectionRef: RefObject<HTMLElement | null>;
}

export default function HeroParticles({ sectionRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<Float32Array | null>(null);
  const valRef = useRef<Uint8Array | null>(null);
  const colsRef = useRef(0);
  const rowsRef = useRef(0);
  const mouseRef = useRef({ x: -1, y: -1 });
  const velRef = useRef({ vx: 0, vy: 0 });
  const rafRef = useRef(0);

  const initGrid = useCallback((w: number, h: number) => {
    const cols = Math.ceil(w / CELL_SIZE);
    const rows = Math.ceil(h / CELL_SIZE);
    colsRef.current = cols;
    rowsRef.current = rows;
    gridRef.current = new Float32Array(cols * rows);
    valRef.current = new Uint8Array(cols * rows);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Smoothed velocity for natural trailing
    let smoothVx = 0;
    let smoothVy = 0;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initGrid(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    let lastX = -1;
    let lastY = -1;
    let lastTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = performance.now();

      if (lastX >= 0 && now - lastTime > 0) {
        const dt = Math.max(1, now - lastTime);
        velRef.current = {
          vx: (x - lastX) / dt,
          vy: (y - lastY) / dt,
        };
      }

      lastX = x;
      lastY = y;
      lastTime = now;
      mouseRef.current = { x, y };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1, y: -1 };
      velRef.current = { vx: 0, vy: 0 };
      lastX = -1;
      lastY = -1;
    };

    // Listen on the section element so mouse tracking works even over
    // content (text, buttons, etc.). The canvas itself is pointer-events:
    // none so clicks pass through to interactive elements below.
    const section = sectionRef.current;
    if (!section) return;
    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    /* ---- helpers ---- */

    const countAlive = (
      idx: number,
      cols: number,
      rows: number,
      grid: Float32Array
    ) => {
      const r = Math.floor(idx / cols);
      const c = idx % cols;
      let alive = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            if (grid[nr * cols + nc] > 0.08) alive++;
          }
        }
      }
      return alive;
    };

    /* ---- main loop ---- */

    const loop = () => {
      const grid = gridRef.current;
      const vals = valRef.current;
      if (!grid || !vals) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      const cols = colsRef.current;
      const rows = rowsRef.current;
      const { x: mx, y: my } = mouseRef.current;
      const { vx: rawVx, vy: rawVy } = velRef.current;
      const rect = canvas.getBoundingClientRect();

      // Smooth velocity for organic feel
      smoothVx += (rawVx - smoothVx) * 0.3;
      smoothVy += (rawVy - smoothVy) * 0.3;
      const speed = Math.sqrt(smoothVx * smoothVx + smoothVy * smoothVy);

      // Spawn near cursor
      if (mx >= 0 && my >= 0) {
        const cc = Math.floor(mx / CELL_SIZE);
        const cr = Math.floor(my / CELL_SIZE);

        // Direction unit vector (or zero if barely moving)
        const hasDir = speed > 0.05;
        const dirX = hasDir ? smoothVx / speed : 0;
        const dirY = hasDir ? smoothVy / speed : 0;

        // At rest: tiny 1-cell glow. Moving: narrow 1-cell-wide streak
        // trailing behind. Scan radius adapts to speed.
        const trailLen = Math.min(6, 1 + speed * 30);
        const scanR = Math.ceil(trailLen);

        for (let dr = -scanR; dr <= scanR; dr++) {
          for (let dc = -scanR; dc <= scanR; dc++) {
            const nr = cr + dr;
            const nc = cc + dc;
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;

            let intensity: number;

            if (hasDir) {
              // Project offset onto movement axis & perpendicular
              const projAlong = dc * dirX + dr * dirY;
              const projPerp = Math.abs(-dc * dirY + dr * dirX);

              // Only the center line + 1 cell on each side
              // Perpendicular falloff is steep — thin streak
              const perpWidth = 0.8 + speed * 3;
              if (projPerp > perpWidth) continue;
              const perpFalloff = 1 - projPerp / perpWidth;

              // Trail extends backward (negative along), tight ahead
              const aheadLimit = 1.5;
              const behindLimit = trailLen;
              if (projAlong > aheadLimit || projAlong < -behindLimit) continue;

              // Along-axis falloff: brightest at cursor, fading behind
              let alongFalloff: number;
              if (projAlong >= 0) {
                alongFalloff = 1 - projAlong / aheadLimit;
              } else {
                alongFalloff = 1 - Math.abs(projAlong) / behindLimit;
                // Taper: tail cells are dimmer
                alongFalloff *= alongFalloff;
              }

              intensity = perpFalloff * alongFalloff;
            } else {
              // Stationary: soft single-cell glow
              const d = Math.sqrt(dr * dr + dc * dc);
              if (d > 1.5) continue;
              intensity = Math.max(0, 1 - d / 1.5);
              intensity *= intensity; // quadratic falloff
            }

            if (intensity < 0.01) continue;

            const idx = nr * cols + nc;
            if (grid[idx] < 0.03) {
              vals[idx] = Math.random() > 0.5 ? 1 : 0;
            }

            // Soft boost — not instant full brightness
            const boost = intensity * 0.25;
            grid[idx] = Math.min(1, grid[idx] + boost);
          }
        }

        // Interpolate: fill gaps on fast swipes
        if (hasDir && speed > 0.3) {
          const stepPx = CELL_SIZE * 0.4;
          const trailPx = trailLen * CELL_SIZE;
          const steps = Math.ceil(trailPx / stepPx);
          for (let s = 1; s <= steps; s++) {
            const bx = mx - dirX * s * stepPx;
            const by = my - dirY * s * stepPx;
            const bc = Math.floor(bx / CELL_SIZE);
            const br = Math.floor(by / CELL_SIZE);
            if (br < 0 || br >= rows || bc < 0 || bc >= cols) continue;
            const idx = br * cols + bc;
            const falloff = 1 - s / steps;
            if (grid[idx] < 0.03) {
              vals[idx] = Math.random() > 0.5 ? 1 : 0;
            }
            grid[idx] = Math.min(1, grid[idx] + falloff * falloff * 0.2);
          }
        }
      }

      // Decay velocity when mouse is still
      velRef.current = { vx: rawVx * 0.92, vy: rawVy * 0.92 };

      // CA step + fade
      const snap = new Float32Array(grid);
      for (let i = 0; i < grid.length; i++) {
        if (snap[i] <= 0) continue;

        const n = countAlive(i, cols, rows, snap);

        // Simple, tuned rules:
        //   2-3 neighbors: slow fade (structure holds briefly)
        //   1 or 4: medium fade
        //   0 or 5+: fast fade (isolated/overcrowded die quick)
        let fade: number;
        if (n >= 2 && n <= 3) {
          fade = FADE_RATE;
        } else if (n === 1 || n === 4) {
          fade = FADE_RATE * 2.5;
        } else {
          fade = FADE_RATE * 5;
        }

        grid[i] = Math.max(0, grid[i] - fade);

        // Subtle bit-flip: only when clearly outnumbered and dimming
        if (n >= 3 && grid[i] < 0.4 && Math.random() < 0.03) {
          vals[i] = vals[i] === 1 ? 0 : 1;
        }
      }

      // Rare, subtle birth — just occasional single-cell sparkles at edges
      for (let i = 0; i < grid.length; i++) {
        if (snap[i] > 0) continue;
        const n = countAlive(i, cols, rows, snap);
        if (n === 3 && Math.random() < 0.02) {
          grid[i] = 0.15;
          vals[i] = Math.random() > 0.5 ? 1 : 0;
        }
      }

      // Draw
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < grid.length; i++) {
        if (grid[i] <= 0.01) continue;
        const c = i % cols;
        const r = Math.floor(i / cols);
        const life = grid[i];

        // Size scales with life — fresh cells are bigger, dying ones shrink
        const fontSize = FONT_SIZE_MIN + (FONT_SIZE_MAX - FONT_SIZE_MIN) * life;
        ctx.font = `${fontSize}px monospace`;

        // Opacity: gentle curve so dim cells are very subtle
        const alpha = life * life * 0.65;
        ctx.fillStyle = `rgba(${COLOR[0]},${COLOR[1]},${COLOR[2]},${alpha})`;
        ctx.fillText(
          vals[i] === 1 ? "1" : "0",
          c * CELL_SIZE + CELL_SIZE / 2,
          r * CELL_SIZE + CELL_SIZE / 2
        );
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initGrid, sectionRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1]"
      style={{ pointerEvents: "none" }}
    />
  );
}
