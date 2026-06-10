"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function WorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".project-card",
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-10 lg:px-16"
      style={{ backgroundColor: "#141414" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "#4A4846" }}>
              Selected Work
            </p>
            <h2
              className="font-display font-light"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#F2F0ED" }}
            >
              Four projects.
              <br />
              <em style={{ fontStyle: "italic", color: "#C8A96E" }}>Real outcomes.</em>
            </h2>
          </div>
          <p className="hidden md:block text-sm max-w-xs text-right leading-relaxed" style={{ color: "#8A8680" }}>
            Capability demonstrated through selection,
            not volume.
          </p>
        </div>

        {/* Flagship feature — first project, full width */}
        {projects[0] && (
          <Link
            href={`/projects/${projects[0].slug}`}
            className="project-card group grid grid-cols-1 md:grid-cols-[3fr_2fr] mb-12 overflow-hidden block"
            style={{ backgroundColor: "#1C1C1C" }}
          >
            <div
              className={`w-full relative overflow-hidden${projects[0].coverImage ? "" : " img-placeholder"}`}
              style={{ aspectRatio: "16/10" }}
            >
              {projects[0].coverImage ? (
                <Image
                  src={projects[0].coverImage}
                  alt={projects[0].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 80% at 40% 60%, rgba(200,169,110,0.09) 0%, transparent 60%), linear-gradient(160deg,#1e1e1a 0%,#0e0e0c 100%)",
                  }}
                />
              )}
            </div>

            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="text-xs tracking-[0.18em] uppercase mb-5" style={{ color: "#4A4846" }}>
                {projects[0].type} · {projects[0].location} · {projects[0].year}
              </p>
              <p
                className="font-display font-light leading-tight mb-3"
                style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)", color: "#C8A96E" }}
              >
                {projects[0].outcomeMetric}
              </p>
              <h3
                className="font-display font-light mb-5"
                style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", color: "#F2F0ED" }}
              >
                {projects[0].title}
              </h3>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "#8A8680" }}>
                Built by SKANSKA, completed 2025. The visual strategy developed in the
                pre-let phase translated directly to built reality.
              </p>
              <span
                className="text-xs tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity duration-200"
                style={{ color: "#C8A96E" }}
              >
                Read the full story →
              </span>
            </div>
          </Link>
        )}

        {/* Remaining projects — quiet 3-up row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {projects.slice(1).map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="project-card group relative overflow-hidden block"
              style={{ backgroundColor: "#1C1C1C" }}
            >
              <div
                className={`w-full relative overflow-hidden${project.coverImage ? "" : " img-placeholder"}`}
                style={{ aspectRatio: "4/3" }}
              >
                {project.coverImage ? (
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 80% at 40% 60%, rgba(200,169,110,0.09) 0%, transparent 60%), linear-gradient(160deg,#1e1e1a 0%,#0e0e0c 100%)",
                    }}
                  />
                )}
              </div>

              <div className="p-6">
                <p className="text-sm mb-2" style={{ color: "#C8A96E" }}>
                  {project.outcomeMetric}
                </p>
                <h3
                  className="font-display font-light leading-tight mb-2"
                  style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.3rem)", color: "#F2F0ED" }}
                >
                  {project.title}
                </h3>
                <p className="text-xs" style={{ color: "#4A4846" }}>
                  {project.type} · {project.location} · {project.year}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
