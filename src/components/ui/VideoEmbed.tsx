"use client";

import { useEffect, useRef, useState } from "react";
import BrowserFrame from "./BrowserFrame";
import PhoneFrame from "./PhoneFrame";

interface VideoEmbedProps {
  src: string;
  aspectRatio?: string;
  browserChrome?: boolean;
  phoneFrame?: boolean;
  className?: string;
}

export default function VideoEmbed({
  src,
  aspectRatio = "16/9",
  browserChrome = false,
  phoneFrame = false,
  className = "",
}: VideoEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Play video when it becomes visible (autoplay may be blocked without this)
  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked — silent fail, video will show first frame
      });
    }
  }, [isVisible]);

  const video = (
    <div ref={containerRef} className={className} style={{ aspectRatio }}>
      {isVisible ? (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-surface-alt" />
      )}
    </div>
  );

  if (browserChrome) {
    return <BrowserFrame>{video}</BrowserFrame>;
  }

  if (phoneFrame) {
    return <PhoneFrame>{video}</PhoneFrame>;
  }

  return video;
}
