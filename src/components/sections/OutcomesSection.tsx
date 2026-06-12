"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { outcomes } from "@/data/siteData";

gsap.registerPlugin(ScrollTrigger);

export default function OutcomesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Left column — staged reveal
      gsap.from(".outcomes-left > *", {
        opacity: 0,
        y: 24,
        stagger: 0.12,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: { trigger: ".outcomes-left", start: "top 80%", once: true },
      });

      // Image — subtle parallax (pre-scaled so edges never show)
      gsap.fromTo(
        ".outcomes-img",
        { yPercent: -6, scale: 1.12 },
        {
          yPercent: 6,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: ".outcomes-img-wrap",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Outcome categories — stagger
      gsap.from(".outcome-card", {
        opacity: 0,
        y: 24,
        stagger: 0.14,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: ".outcome-card", start: "top 82%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="outcomes"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-10 lg:px-16"
      style={{ backgroundColor: "#F2F0ED" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Two-column: text left, image right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start mb-20">

          {/* Left — header + testimonial */}
          <div className="outcomes-left">
            <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "#9A958C" }}>
              Built Outcomes
            </p>
            <h2
              className="font-display font-light leading-tight mb-5"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#0D0D0D" }}
            >
              Visualizations that don&apos;t just
              <br />
              show a project —&nbsp;
              <em style={{ fontStyle: "italic", color: "#A8854B" }}>they advance it.</em>
            </h2>
            <p className="text-sm leading-relaxed mb-10" style={{ color: "#5A574F" }}>
              We support projects at the stages where clear visual communication
              matters most: planning approvals, investor decks, pre-let campaigns,
              and presales launches.
            </p>

            {/* Testimonial pull quote */}
            <div className="pl-6 border-l-2" style={{ borderColor: "#A8854B" }}>
              <p
                className="font-display font-light leading-relaxed mb-6"
                style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)", color: "#1A1916" }}
              >
                &ldquo;The visuals helped us communicate the project&apos;s value clearly —
                not only to buyers, but internally and with external partners.
                They reduced uncertainty, supported faster decisions, and elevated
                how the project was perceived from the very first presentation.&rdquo;
              </p>
              <p className="text-xs tracking-wide" style={{ color: "#5A574F" }}>
                Asset Owner — Luxury Residential Development, Milan
              </p>
            </div>
          </div>

          {/* Right — image */}
          <div className="outcomes-img-wrap relative w-full overflow-hidden" style={{ aspectRatio: "3/4" }}>
            <Image
              src="/images/home/image0.jpeg"
              alt="INT.46 VizLab — premium CGI render"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="outcomes-img object-cover object-[30%]"
              unoptimized
            />
          </div>

        </div>

        {/* Three outcome categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t" style={{ borderColor: "#D8D4CB" }}>
          {outcomes.map((o, i) => (
            <div
              key={o.category}
              className="outcome-card pt-8 pb-8 pr-8"
              style={{
                borderRight: i < outcomes.length - 1 ? "1px solid #D8D4CB" : "none",
                paddingLeft: i > 0 ? "2rem" : "0",
              }}
            >
              <p className="text-xs tracking-[0.18em] uppercase mb-4" style={{ color: "#A8854B" }}>
                {o.category}
              </p>
              <h3
                className="font-display font-light mb-3"
                style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)", color: "#0D0D0D" }}
              >
                {o.headline}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#5A574F" }}>
                {o.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
