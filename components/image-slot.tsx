"use client";
import { useEffect, useRef, useState } from "react";

type ImageSlotProps = { src: string; alt: string; placeholderLabel: string; className?: string; priority?: boolean };

export function ImageSlot({ src, alt, placeholderLabel, className = "", priority = false }: ImageSlotProps) {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    const timer = window.setTimeout(() => {
      setLoaded(Boolean(image?.complete && image.naturalWidth > 0));
    }, 0);
    return () => window.clearTimeout(timer);
  }, [src]);

  return (
    <div className={`image-slot ${className} ${loaded ? "is-loaded" : ""}`}>
      <span className="image-placeholder" aria-hidden="true">{placeholderLabel}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />
    </div>
  );
}
