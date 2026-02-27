"use client";

import { useRef, useEffect } from "react";

interface PixelatedVideoProps {
  src: string;
  poster?: string;
  pixelSize?: number;
  revealRadius?: number;
}

export default function PixelatedVideo({
  src,
  poster,
  pixelSize = 20,
  revealRadius = 160,
}: PixelatedVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const container = containerRef.current;
    if (!canvas || !video || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Pixelation downsampling canvas
    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return;

    // Mobile detection — lower sample resolution to reduce Dijkstra work
    const isMobile =
      "ontouchstart" in window || window.innerWidth < 768;
    const SW = isMobile ? 120 : 240,
      SH = isMobile ? 68 : 135,
      SN = SW * SH;
    const sampleCanvas = document.createElement("canvas");
    sampleCanvas.width = SW;
    sampleCanvas.height = SH;
    const sampleCtx = sampleCanvas.getContext("2d", {
      willReadFrequently: true,
    });
    if (!sampleCtx) return;

    // Mask canvas for flood-fill reveal shape
    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = SW;
    maskCanvas.height = SH;
    const maskCtx = maskCanvas.getContext("2d");
    if (!maskCtx) return;
    const maskImageData = maskCtx.createImageData(SW, SH);

    // Offscreen canvas for grayscale layer compositing
    const grayCanvas = document.createElement("canvas");
    const grayCtx = grayCanvas.getContext("2d");
    if (!grayCtx) return;

    // Pre-allocated arrays (no GC pressure in draw loop)
    const dist = new Float32Array(SN);
    const costArr = new Float32Array(SN);
    const brightnessArr = new Float32Array(SN);
    const smoothBrightness = new Float32Array(SN);
    let smoothBrightnessInit = false;
    let smoothCursorBrightness = -1;
    const visited = new Uint8Array(SN);

    // Binary min-heap for Dijkstra
    const HEAP_CAP = SN * 2;
    const hDist = new Float32Array(HEAP_CAP);
    const hIdx = new Uint32Array(HEAP_CAP);
    let hLen = 0;

    const hPush = (d: number, i: number) => {
      if (hLen >= HEAP_CAP) return;
      let pos = hLen++;
      hDist[pos] = d;
      hIdx[pos] = i;
      while (pos > 0) {
        const p = (pos - 1) >> 1;
        if (hDist[p] <= hDist[pos]) break;
        const td = hDist[p];
        hDist[p] = hDist[pos];
        hDist[pos] = td;
        const ti = hIdx[p];
        hIdx[p] = hIdx[pos];
        hIdx[pos] = ti;
        pos = p;
      }
    };

    const hPop = (): number => {
      const idx = hIdx[0];
      hLen--;
      if (hLen > 0) {
        hDist[0] = hDist[hLen];
        hIdx[0] = hIdx[hLen];
        let pos = 0;
        for (;;) {
          let min = pos;
          const l = 2 * pos + 1,
            r = l + 1;
          if (l < hLen && hDist[l] < hDist[min]) min = l;
          if (r < hLen && hDist[r] < hDist[min]) min = r;
          if (min === pos) break;
          const td = hDist[pos];
          hDist[pos] = hDist[min];
          hDist[min] = td;
          const ti = hIdx[pos];
          hIdx[pos] = hIdx[min];
          hIdx[min] = ti;
          pos = min;
        }
      }
      return idx;
    };

    // 8-connected neighbors
    const NDX = [-1, 1, 0, 0, -1, -1, 1, 1];
    const NDY = [0, 0, -1, 1, -1, 1, -1, 1];
    const NDW = [1, 1, 1, 1, 1.414, 1.414, 1.414, 1.414];

    // object-cover source rect (mirrors CSS object-fit: cover)
    const coverRect = (vw: number, vh: number, cw: number, ch: number) => {
      const videoRatio = vw / vh;
      const containerRatio = cw / ch;
      if (videoRatio > containerRatio) {
        const sw = vh * containerRatio;
        return { sx: (vw - sw) / 2, sy: 0, sw, sh: vh };
      } else {
        const sh = vw / containerRatio;
        return { sx: 0, sy: (vh - sh) / 2, sw: vw, sh };
      }
    };

    // State
    let width = 0,
      height = 0,
      raf = 0;
    const mouse = { x: -9999, y: -9999 };
    const smooth = { x: -9999, y: -9999 };
    let canDrawVideo = true;

    // Frame throttling — 30fps when idle, 60fps when interacting
    let lastDrawTime = 0;
    const ACTIVE_INTERVAL = 1000 / 60;
    const IDLE_INTERVAL = 1000 / 30;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
      grayCanvas.width = width;
      grayCanvas.height = height;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= width && y >= 0 && y <= height) {
        mouse.x = x;
        mouse.y = y;
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const rect = container.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      if (x >= 0 && x <= width && y >= 0 && y <= height) {
        mouse.x = x;
        mouse.y = y;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const rect = container.getBoundingClientRect();
      mouse.x = touch.clientX - rect.left;
      mouse.y = touch.clientY - rect.top;
    };
    const onTouchEnd = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // --- Draw loop ---
    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      if (video.readyState < 2 || width === 0 || height === 0) return;

      // Frame throttling — 30fps when idle, 60fps during interaction
      const isInteracting = mouse.x > -500;
      const frameInterval = isInteracting ? ACTIVE_INTERVAL : IDLE_INTERVAL;
      if (time - lastDrawTime < frameInterval) return;
      lastDrawTime = time;

      // Determine reveal target
      let targetX = mouse.x;
      let targetY = mouse.y;
      const mouseIsActive = targetX > -500;

      if (!mouseIsActive) {
        targetX = width * 0.45;
        targetY = height * 0.45;
      }

      // Snap on first frame to avoid flying in from off-screen
      if (smooth.x < -9000) {
        smooth.x = targetX;
        smooth.y = targetY;
      }

      // Smooth lerp
      smooth.x += (targetX - smooth.x) * 0.1;
      smooth.y += (targetY - smooth.y) * 0.1;
      const mx = smooth.x;
      const my = smooth.y;

      // --- Compute object-cover crop (shared by all draws) ---
      const cr = coverRect(video.videoWidth, video.videoHeight, width, height);

      // Early cursor bounds check — skip expensive work when not revealing
      const sx = Math.round((mx / width) * (SW - 1));
      const sy = Math.round((my / height) * (SH - 1));
      const cursorInBounds = sx >= 0 && sx < SW && sy >= 0 && sy < SH;

      if (!cursorInBounds) {
        // Draw grayscale directly — skip brightness sampling, Dijkstra, mask
        ctx.clearRect(0, 0, width, height);
        try {
          ctx.save();
          ctx.filter = "grayscale(1)";
          ctx.drawImage(
            video,
            cr.sx,
            cr.sy,
            cr.sw,
            cr.sh,
            0,
            0,
            width,
            height
          );
          ctx.restore();
        } catch {
          if (canDrawVideo) {
            canDrawVideo = false;
            canvas.style.display = "none";
          }
        }
        return;
      }

      // --- Sample video brightness ---
      try {
        sampleCtx.drawImage(video, cr.sx, cr.sy, cr.sw, cr.sh, 0, 0, SW, SH);
      } catch {
        if (canDrawVideo) {
          canDrawVideo = false;
          canvas.style.display = "none";
        }
        return;
      }

      let pixels: Uint8ClampedArray;
      try {
        pixels = sampleCtx.getImageData(0, 0, SW, SH).data;
      } catch {
        if (canDrawVideo) {
          canDrawVideo = false;
          canvas.style.display = "none";
        }
        return;
      }

      // Compute per-pixel brightness + find min/max for contrast stretch
      let bMin = 1,
        bMax = 0;
      for (let i = 0; i < SN; i++) {
        const idx = i * 4;
        const b =
          (pixels[idx] * 0.299 +
            pixels[idx + 1] * 0.587 +
            pixels[idx + 2] * 0.114) /
          255;
        brightnessArr[i] = b;
        if (b < bMin) bMin = b;
        if (b > bMax) bMax = b;
      }
      const bRange = Math.max(0.001, bMax - bMin);

      // Temporal smoothing of brightness (lerp toward current frame)
      const bLerp = 0.08;
      if (!smoothBrightnessInit) {
        for (let i = 0; i < SN; i++) smoothBrightness[i] = brightnessArr[i];
        smoothBrightnessInit = true;
      } else {
        for (let i = 0; i < SN; i++) {
          smoothBrightness[i] +=
            (brightnessArr[i] - smoothBrightness[i]) * bLerp;
        }
      }

      // --- Draw color video as base layer ---
      ctx.clearRect(0, 0, width, height);
      try {
        ctx.drawImage(
          video,
          cr.sx,
          cr.sy,
          cr.sw,
          cr.sh,
          0,
          0,
          width,
          height
        );
      } catch {
        if (canDrawVideo) {
          canDrawVideo = false;
          canvas.style.display = "none";
        }
        return;
      }

      // --- Draw grayscale on offscreen canvas ---
      grayCtx.clearRect(0, 0, width, height);
      grayCtx.save();
      grayCtx.filter = "grayscale(1)";
      grayCtx.drawImage(
        video,
        cr.sx,
        cr.sy,
        cr.sw,
        cr.sh,
        0,
        0,
        width,
        height
      );
      grayCtx.restore();

      // --- Dijkstra flood fill from cursor ---
      // Compute traversal cost: similarity to cursor brightness (using smoothed values)
      const rawCursorB = (smoothBrightness[sy * SW + sx] - bMin) / bRange;
      if (smoothCursorBrightness < 0) {
        smoothCursorBrightness = rawCursorB;
      } else {
        smoothCursorBrightness +=
          (rawCursorB - smoothCursorBrightness) * 0.12;
      }
      for (let i = 0; i < SN; i++) {
        const stretched = (smoothBrightness[i] - bMin) / bRange;
        const diff = Math.abs(stretched - smoothCursorBrightness);
        costArr[i] = 0.5 + diff * diff * 15.0;
      }

      dist.fill(1e9);
      visited.fill(0);
      hLen = 0;

      const si = sy * SW + sx;
      dist[si] = 0;
      hPush(0, si);

      // Threshold in sample-pixel cost units
      const threshold = revealRadius * (SW / width) * 2.0;
      const cutoff = threshold * 1.5;

      while (hLen > 0) {
        const ci = hPop();
        if (visited[ci]) continue;
        visited[ci] = 1;
        if (dist[ci] > cutoff) break;

        const cx = ci % SW;
        const cy = (ci / SW) | 0;

        for (let d = 0; d < 8; d++) {
          const nx = cx + NDX[d];
          const ny = cy + NDY[d];
          if (nx < 0 || nx >= SW || ny < 0 || ny >= SH) continue;
          const ni = ny * SW + nx;
          if (visited[ni]) continue;
          const newDist = dist[ci] + costArr[ni] * NDW[d];
          if (newDist < dist[ni]) {
            dist[ni] = newDist;
            hPush(newDist, ni);
          }
        }
      }

      // --- Build reveal mask from distance field ---
      const feather = threshold * 0.3;
      const md = maskImageData.data;

      for (let i = 0; i < SN; i++) {
        const d = dist[i];
        let alpha: number;
        if (d <= threshold - feather) {
          alpha = 255;
        } else if (d <= threshold + feather) {
          alpha =
            255 * (1 - (d - (threshold - feather)) / (2 * feather));
        } else {
          alpha = 0;
        }
        const idx = i * 4;
        md[idx] = 0;
        md[idx + 1] = 0;
        md[idx + 2] = 0;
        md[idx + 3] = alpha | 0;
      }

      maskCtx.putImageData(maskImageData, 0, 0);

      // Punch reveal shape through the grayscale offscreen canvas
      grayCtx.save();
      grayCtx.globalCompositeOperation = "destination-out";
      grayCtx.imageSmoothingEnabled = true;
      grayCtx.filter = "blur(8px)";
      grayCtx.drawImage(maskCanvas, 0, 0, SW, SH, 0, 0, width, height);
      grayCtx.restore();

      // Draw grayscale (with hole) over the color base
      ctx.drawImage(grayCanvas, 0, 0);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [pixelSize, revealRadius]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        crossOrigin="anonymous"
        poster={poster}
        className="absolute inset-0 w-full h-full object-cover opacity-0"
      >
        <source src={src} type="video/mp4" />
      </video>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      />
    </div>
  );
}
