"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { founder } from "@/data/siteData";

gsap.registerPlugin(ScrollTrigger);

export default function FounderSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".founder-content", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: ".founder-content", start: "top 80%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="founder"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-10 lg:px-16"
      style={{ backgroundColor: "#0D0D0D" }}
    >
      <div className="max-w-7xl mx-auto">
        <p className="text-xs tracking-[0.2em] uppercase mb-10" style={{ color: "#4A4846" }}>
          Why INT.46 Exists
        </p>

        {/* Firm thesis — leads the section */}
        <h2
          className="font-display font-light leading-tight mb-16 max-w-3xl founder-content"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#F2F0ED" }}
        >
          Most visualizations show projects.
          <br />
          <em style={{ fontStyle: "italic", color: "#C8A96E" }}>Ours move them forward.</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-14 md:gap-20">

          {/* Portrait */}
          <div className="shrink-0">
            <div className="w-full relative overflow-hidden" style={{ aspectRatio: "3/4", maxWidth: "340px" }}>
              <Image
                src="/images/founder/7FD45239-9866-4663-87FD-ACB37919AB33.PNG"
                alt="Davide Buonocore — Founder, INT.46 VizLab"
                fill
                sizes="(max-width: 768px) 100vw, 340px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* Text — Davide as the accountable face */}
          <div className="flex flex-col justify-center">
            <h3
              className="font-display font-light mb-1"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#F2F0ED" }}
            >
              {founder.name}
            </h3>
            <p className="text-sm mb-8" style={{ color: "#C8A96E" }}>
              {founder.role}
            </p>

            <p className="text-base leading-relaxed mb-8" style={{ color: "#8A8680" }}>
              {founder.bio}
            </p>

            {/* The un-copyable promise — elevated */}
            <p
              className="font-display font-light leading-relaxed mb-8"
              style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", color: "#F2F0ED" }}
            >
              {founder.directCollab}
            </p>

            <p className="text-xs tracking-wide" style={{ color: "#4A4846" }}>
              {founder.credentialsLine}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
