"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { differentiators, processSteps, serviceTiers } from "@/data/siteData";

gsap.registerPlugin(ScrollTrigger);

export default function ApproachSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".diff-item", {
        opacity: 0,
        x: -20,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: ".diff-item", start: "top 82%", once: true },
      });
      gsap.from(".process-step", {
        opacity: 0,
        y: 16,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".process-step", start: "top 85%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-10 lg:px-16"
      style={{ backgroundColor: "#141414" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Differentiators ── */}
        <div className="mb-24">
          <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "#4A4846" }}>
            Why INT.46 VizLab
          </p>
          <h2
            className="font-display font-light mb-16"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#F2F0ED" }}
          >
            A different kind of
            <br />
            <em style={{ fontStyle: "italic", color: "#C8A96E" }}>visual strategy.</em>
          </h2>

          <div className="flex flex-col divide-y" style={{ borderColor: "#2A2A2A" }}>
            {differentiators.map((d) => (
              <div
                key={d.number}
                className="diff-item grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 md:gap-12 py-8"
              >
                <span
                  className="font-display text-xl font-light"
                  style={{ color: "#C8A96E" }}
                >
                  {d.number}
                </span>
                <div>
                  <h3
                    className="font-display font-light mb-2"
                    style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "#F2F0ED" }}
                  >
                    {d.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#8A8680" }}>
                    {d.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Process ── */}
        <div className="mb-24">
          <p className="text-xs tracking-[0.2em] uppercase mb-10" style={{ color: "#4A4846" }}>
            How It Works
          </p>

          {/* Steps — horizontal on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 relative">
            {/* Connecting line on desktop */}
            <div
              className="hidden md:block absolute top-4 left-[10%] right-[10%] h-px"
              style={{ backgroundColor: "#2A2A2A" }}
            />
            {processSteps.map((step, i) => (
              <div key={step.number} className="process-step relative text-center md:text-left">
                <div
                  className="w-8 h-8 flex items-center justify-center text-xs font-medium border mx-auto md:mx-0 mb-4 relative bg-canvas"
                  style={{
                    borderColor: "#C8A96E",
                    color: "#C8A96E",
                    backgroundColor: "#141414",
                    zIndex: 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-sm font-medium mb-1.5" style={{ color: "#F2F0ED" }}>
                  {step.title}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "#8A8680" }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <p className="text-xs mt-8" style={{ color: "#4A4846" }}>
            Scope and timeline defined before production begins.
          </p>
        </div>

        {/* ── Service tiers ── */}
        <div>
          <p className="text-xs tracking-[0.2em] uppercase mb-10" style={{ color: "#4A4846" }}>
            Engagement Options
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {serviceTiers.map((tier) => (
              <div
                key={tier.name}
                className="border p-8"
                style={{ borderColor: "#2A2A2A", backgroundColor: "#1C1C1C" }}
              >
                <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "#C8A96E" }}>
                  {tier.name}
                </p>
                <p className="text-sm mb-6" style={{ color: "#8A8680" }}>
                  {tier.tagline}
                </p>

                <div className="mb-6">
                  <p className="text-xs tracking-wide uppercase mb-3" style={{ color: "#4A4846" }}>
                    Best for
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {tier.bestFor.map((item) => (
                      <li key={item} className="text-sm flex gap-2" style={{ color: "#F2F0ED" }}>
                        <span style={{ color: "#C8A96E" }}>—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-6" style={{ borderColor: "#2A2A2A" }}>
                  <p className="text-xs tracking-wide uppercase mb-3" style={{ color: "#4A4846" }}>
                    Includes
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {tier.includes.map((item) => (
                      <li key={item} className="text-sm flex gap-2" style={{ color: "#8A8680" }}>
                        <span style={{ color: "#2A2A2A" }}>·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
