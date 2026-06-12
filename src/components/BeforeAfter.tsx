"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

interface BeforeAfterProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  /** Optional CSS filter applied to the "before" image (e.g. simulate a clay/draft pass) */
  beforeFilter?: string;
}

export default function BeforeAfter({
  before,
  after,
  beforeLabel = "Concept",
  afterLabel = "Final",
  beforeFilter,
}: BeforeAfterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(50);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden select-none cursor-ew-resize"
      style={{ aspectRatio: "16/9", touchAction: "none" }}
      onPointerDown={(e) => {
        dragging.current = true;
        update(e.clientX);
        try {
          (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
        } catch {
          /* ignore capture failures */
        }
      }}
      onPointerMove={(e) => {
        if (dragging.current) update(e.clientX);
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      {/* After (full bleed) */}
      <Image
        src={after}
        alt={afterLabel}
        fill
        sizes="100vw"
        className="object-cover pointer-events-none"
        draggable={false}
        unoptimized
      />

      {/* Before (clipped from the left to the handle) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image
          src={before}
          alt={beforeLabel}
          fill
          sizes="100vw"
          className="object-cover pointer-events-none"
          draggable={false}
          style={beforeFilter ? { filter: beforeFilter } : undefined}
          unoptimized
        />
      </div>

      {/* Labels */}
      <span
        className="absolute top-4 left-4 text-xs tracking-widest uppercase px-2.5 py-1"
        style={{ backgroundColor: "rgba(13,13,13,0.6)", color: "#F2F0ED", backdropFilter: "blur(6px)" }}
      >
        {beforeLabel}
      </span>
      <span
        className="absolute top-4 right-4 text-xs tracking-widest uppercase px-2.5 py-1"
        style={{ backgroundColor: "rgba(13,13,13,0.6)", color: "#C8A96E", backdropFilter: "blur(6px)" }}
      >
        {afterLabel}
      </span>

      {/* Divider + handle */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-px h-full" style={{ backgroundColor: "#C8A96E" }} />
        <div
          className="absolute top-1/2 left-1/2 flex items-center justify-center rounded-full"
          style={{
            width: 46,
            height: 46,
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(13,13,13,0.72)",
            border: "1px solid #C8A96E",
            backdropFilter: "blur(6px)",
            color: "#C8A96E",
          }}
        >
          <span className="text-sm tracking-tighter">↔</span>
        </div>
      </div>

      {/* Hint */}
      <span
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[0.7rem] tracking-[0.18em] uppercase opacity-70 pointer-events-none"
        style={{ color: "#F2F0ED" }}
      >
        Drag to compare
      </span>
    </div>
  );
}
