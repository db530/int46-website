"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { metrics, clientLogos, primaryTestimonial } from "@/data/siteData";

gsap.registerPlugin(ScrollTrigger);

export default function TrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animate metric numbers counting up
      const metricEls = sectionRef.current?.querySelectorAll(".metric-value");
      metricEls?.forEach((el) => {
        const target = el.getAttribute("data-target") || "";
        const numericPart = parseFloat(target.replace(/[^0-9.]/g, ""));
        const suffix = target.replace(/[0-9.]/g, "");

        if (!isNaN(numericPart)) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: numericPart,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
            onUpdate: () => {
              el.textContent =
                (Number.isInteger(numericPart)
                  ? Math.round(obj.val)
                  : obj.val.toFixed(0)) + suffix;
            },
          });
        }
      });

      // Fade in logos
      gsap.from(".logo-item", {
        opacity: 0,
        y: 12,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ".logo-item", start: "top 85%", once: true },
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
    <section
      id="trust"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-10 lg:px-16"
      style={{ backgroundColor: "#0D0D0D" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <p className="text-xs tracking-[0.2em] uppercase mb-14" style={{ color: "#4A4846" }}>
          Trusted by
        </p>

        {/* Client logos */}
        <div className="flex flex-wrap gap-x-12 gap-y-6 mb-20">
          {clientLogos.map((logo) => (
            <div
              key={logo.name}
              className="logo-item text-sm font-medium tracking-widest uppercase"
              style={{ color: "#4A4846" }}
            >
              {logo.name}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px mb-20" style={{ backgroundColor: "#2A2A2A" }} />

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-20">
          {metrics.map((m) => (
            <div key={m.label}>
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
    </section>
  );
}
