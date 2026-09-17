"use client";
import { useState } from "react";

type ImageSlotProps = { src: string; alt: string; label: string; className?: string; priority?: boolean };

export function ImageSlot({ src, alt, label, className = "", priority = false }: ImageSlotProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`image-slot ${className} ${loaded ? "is-loaded" : ""}`}>
      <span className="image-placeholder" aria-hidden="true">{label}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} onLoad={() => setLoaded(true)} onError={() => setLoaded(false)} fetchPriority={priority ? "high" : "auto"} />
    </div>
  );
}
