"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { metrics, primaryTestimonial } from "@/data/siteData";

gsap.registerPlugin(ScrollTrigger);

export default function TrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // #2 Chapter cut — the taupe band content rises deliberately into view
      gsap.from(".trust-band-el", {
        opacity: 0,
        y: 26,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ".trust-band", start: "top 90%", once: true },
      });

      // #6 Metric blocks reveal + count-up
      gsap.from(".metric-item", {
        opacity: 0,
        y: 22,
        duration: 0.7,
        stagger: 0.14,
        ease: "power2.out",
        scrollTrigger: { trigger: ".metric-item", start: "top 85%", once: true },
      });

      const metricEls = sectionRef.current?.querySelectorAll(".metric-value");
      metricEls?.forEach((el) => {
        const target = el.getAttribute("data-target") || "";
        const numericPart = parseFloat(target.replace(/[^0-9.]/g, ""));
        const suffix = target.replace(/[0-9.]/g, "");

        if (!isNaN(numericPart)) {
          const obj = { val: 0 };
          el.textContent = "0" + suffix;
          gsap.to(obj, {
            val: numericPart,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            onUpdate: () => {
              el.textContent =
                (Number.isInteger(numericPart)
                  ? Math.round(obj.val)
                  : obj.val.toFixed(0)) + suffix;
            },
          });
        }
      });

      // Eyebrow + scale line reveal
      gsap.from([".trust-eyebrow", ".scale-line"], {
        opacity: 0,
        y: 16,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: ".trust-eyebrow", start: "top 88%", once: true },
      });

      // Fade in testimonial
      gsap.from(".trust-quote", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: ".trust-quote", start: "top 80%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="trust" ref={sectionRef} style={{ backgroundColor: "#0D0D0D" }}>
      {/* ── Taupe client-logo band (full bleed) ── */}
      <div
        className="trust-band px-6 md:px-10 lg:px-16 py-12 md:py-16"
        style={{ backgroundColor: "#C9C1B3" }}
      >
        <div className="max-w-[96rem] mx-auto">
          <p
            className="trust-band-el text-sm tracking-[0.28em] uppercase mb-10 text-center font-medium"
            style={{ color: "#4A443B" }}
          >
            Trusted by
          </p>
          <Image
            src="/images/clients/client-logos.png"
            alt="Solida Capital · XIOR Student Housing · SKANSKA · I Asset Management · SHED Co-living"
            width={2903}
            height={236}
            sizes="(max-width: 768px) 100vw, 1536px"
            className="logo-strip trust-band-el w-full h-auto"
            style={{ filter: "grayscale(1)", opacity: 0.88 }}
            priority
          />
        </div>
      </div>

      {/* ── Dark content ── */}
      <div className="py-24 md:py-32 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Centered eyebrow */}
        <p
          className="trust-eyebrow text-sm tracking-[0.28em] uppercase text-center mb-14"
          style={{ color: "#8A8680" }}
        >
          Proven in market
        </p>

        {/* Metrics — centered */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
          {metrics.map((m) => (
            <div key={m.label} className="metric-item text-center">
              <p
                className="metric-value font-display font-light mb-2"
                data-target={m.value}
                style={{
                  fontSize: "clamp(2.4rem, 4vw, 3.5rem)",
                  color: "#C8A96E",
                  lineHeight: 1,
                }}
              >
                {m.value}
              </p>
              <p className="text-sm leading-snug" style={{ color: "#8A8680" }}>
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {/* Scale line — legally cautious, associative framing; centered, single line, elevated */}
        <p
          className="scale-line font-display font-light leading-relaxed text-center whitespace-normal md:whitespace-nowrap mb-20"
          style={{ fontSize: "clamp(1.1rem, 1.9vw, 1.5rem)", color: "#B8B3AB" }}
        >
          Visual strategy supporting developments that represent
          <span style={{ color: "#C8A96E" }}> tens of millions of euros</span> in asset value.
        </p>

        {/* Divider */}
        <div className="h-px mb-20" style={{ backgroundColor: "#2A2A2A" }} />

        {/* Testimonial + image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Left — quote + certifications */}
          <div className="trust-quote">
            <p
              className="font-display font-light leading-relaxed mb-6"
              style={{
                fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                color: "#F2F0ED",
              }}
            >
              &ldquo;{primaryTestimonial.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-8 h-px" style={{ backgroundColor: "#C8A96E" }} />
              <div>
                <p className="text-sm font-medium" style={{ color: "#F2F0ED" }}>
                  {primaryTestimonial.name}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#8A8680" }}>
                  {primaryTestimonial.role}, {primaryTestimonial.company}
                </p>
              </div>
            </div>

            {/* Certifications — one quiet line */}
            <p className="text-xs tracking-wide" style={{ color: "#4A4846" }}>
              Chaos / Corona certified — photographic lighting standards
            </p>
          </div>

          {/* Right — image */}
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <Image
              src="/images/home/IMG_1420.jpg"
              alt="INT.46 VizLab — luxury interior CGI"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
              unoptimized
            />
          </div>

        </div>
      </div>
      </div>
    </section>
  );
}
