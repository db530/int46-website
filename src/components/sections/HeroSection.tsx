"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Staged entrance — headline lines cascade, then subline, then CTAs
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-line", { yPercent: 45, opacity: 0, duration: 0.95, stagger: 0.12 }, 0.25)
        .from(sublineRef.current, { opacity: 0, y: 20, duration: 0.8 }, "-=0.35")
        .from(ctaRef.current, { opacity: 0, y: 16, duration: 0.7 }, "-=0.45");

      // NOTE: the autonomous "alive from the first second" push-in is a CSS
      // keyframe animation (.hero-img-breathe) — compositor-driven, off the main
      // thread, and independent of GSAP's ticker. See globals.css.

      // Scroll-driven layer — desktop only (avoids scrub jank on mobile).
      // Lives on the wrapper so it composes with the breathing transform above.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const scrub = { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(".hero-bg", { scale: 1.09, ease: "none", scrollTrigger: scrub });
        gsap.to(contentRef.current, { yPercent: -10, ease: "none", scrollTrigger: scrub });
        gsap.to(".hero-scroll", {
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top top", end: "12% top", scrub: true },
        });
      });
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
        <div className="hero-bg absolute inset-0">
          <Image
            src="/images/home/Home.jpg"
            alt="INT.46 VizLab — contemporary residential development"
            fill
            sizes="100vw"
            className="hero-img hero-img-breathe object-cover object-center"
            priority
          />
        </div>
        {/* Overlay — top scrim (nav) + stronger left scrim (text) + bottom-left pool. Right side (the building) stays clear. */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: [
              "linear-gradient(to bottom, rgba(13,13,13,0.5) 0%, rgba(13,13,13,0.0) 18%)",
              "linear-gradient(to right, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.6) 34%, rgba(13,13,13,0.0) 60%)",
              "radial-gradient(ellipse 75% 65% at 16% 92%, rgba(13,13,13,0.62) 0%, rgba(13,13,13,0.0) 70%)",
            ].join(", "),
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-[102rem] mx-auto w-full px-6 md:px-10 lg:px-16 pt-28 pb-20"
      >
        <div className="max-w-3xl">
          {/* Headline — staged line reveal */}
          <h1
            className="font-display font-light leading-[1.05] mb-6"
            style={{
              fontSize: "clamp(2.6rem, 6vw, 5rem)",
              color: "#F2F0ED",
              letterSpacing: "-0.01em",
              textShadow: "0 2px 24px rgba(0,0,0,0.6)",
            }}
          >
            <span className="hero-line block">Visual Strategy</span>
            <span className="hero-line block">
              <em style={{ fontStyle: "italic", color: "#D4B97E" }}>That Sells</em>
            </span>
            <span className="hero-line block">Real Estate.</span>
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

          {/* CTA — exploration-led; the header owns "Start a Conversation" */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
            <a
              href="#work"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm btn-gold-solid font-medium"
            >
              View Selected Work
            </a>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center px-7 py-3.5 text-sm btn-gold"
            >
              Request the Portfolio
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2 opacity-40">
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
