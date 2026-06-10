"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(headlineRef.current, { opacity: 0, y: 28, duration: 1.0 }, 0.3)
        .from(sublineRef.current, { opacity: 0, y: 20, duration: 0.8 }, 0.55)
        .from(ctaRef.current, { opacity: 0, y: 16, duration: 0.7 }, 0.75);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/home/contemporary-villa-with-expansive-garden-water-feature.jpg"
          alt="INT.46 VizLab — contemporary residential development"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        {/* Overlay — top scrim (nav) + left darkening (text) + bottom darkening */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: [
              "linear-gradient(to bottom, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.0) 22%)",
              "linear-gradient(to right, rgba(13,13,13,0.82) 0%, rgba(13,13,13,0.55) 45%, rgba(13,13,13,0.15) 100%)",
              "linear-gradient(to bottom, rgba(13,13,13,0.2) 0%, rgba(13,13,13,0.45) 60%, rgba(13,13,13,0.92) 100%)",
            ].join(", "),
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 lg:px-16 pt-28 pb-20">
        <div className="max-w-3xl">
          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-display font-light leading-[1.05] mb-6"
            style={{
              fontSize: "clamp(2.6rem, 6vw, 5rem)",
              color: "#F2F0ED",
              letterSpacing: "-0.01em",
              textShadow: "0 2px 24px rgba(0,0,0,0.6)",
            }}
          >
            Visual Strategy
            <br />
            <em style={{ fontStyle: "italic", color: "#D4B97E" }}>That Sells</em>
            <br />
            Real Estate.
          </h1>

          {/* Subline */}
          <p
            ref={sublineRef}
            className="text-base md:text-lg font-light leading-relaxed mb-10 max-w-xl"
            style={{ color: "#D8D4CB", textWrap: "balance" }}
          >
            We help European developers secure investment, win approvals,
            and drive pre-sales.
          </p>

          {/* CTA */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm btn-gold-solid font-medium"
            >
              Start a Conversation
            </a>
            <a
              href="#work"
              className="inline-flex items-center justify-center px-7 py-3.5 text-sm link-dim"
            >
              View Selected Work ↓
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs tracking-widest uppercase" style={{ color: "#8A8680", writingMode: "vertical-rl" }}>
          Scroll
        </span>
        <div
          className="w-px animate-pulse"
          style={{ height: "48px", backgroundColor: "#8A8680" }}
        />
      </div>
    </section>
  );
}
