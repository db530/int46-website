"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Work",    href: "/#work" },
  { label: "Outcomes", href: "/#outcomes" },
  { label: "Approach", href: "/#approach" },
  { label: "About",   href: "/#founder" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const prevY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      prevY.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(13,13,13,0.96)" : "transparent",
          borderBottom: scrolled ? "1px solid #2A2A2A" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <nav className="mx-auto flex items-center justify-between px-6 md:px-10 lg:px-16 h-16 max-w-7xl">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-lg tracking-wider font-medium"
            style={{ color: "#F2F0ED", letterSpacing: "0.08em" }}
          >
            INT.46 VizLab
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm transition-colors duration-200"
                style={{ color: "#8A8680" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F2F0ED")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8680")}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/#contact"
              className="text-sm px-5 py-2.5 border transition-all duration-200"
              style={{
                borderColor: "#C8A96E",
                color: "#C8A96E",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#C8A96E";
                (e.currentTarget as HTMLElement).style.color = "#0D0D0D";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLElement).style.color = "#C8A96E";
              }}
            >
              Start a Conversation
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                backgroundColor: "#F2F0ED",
                transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                backgroundColor: "#F2F0ED",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                backgroundColor: "#F2F0ED",
                transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
              }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-40 flex flex-col justify-center px-10 transition-all duration-400 md:hidden"
        style={{
          backgroundColor: "#0D0D0D",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <div className="flex flex-col gap-8 mt-16">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-display text-4xl font-light"
              style={{ color: "#F2F0ED" }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#contact"
            className="font-display text-4xl font-light"
            style={{ color: "#C8A96E" }}
            onClick={() => setMenuOpen(false)}
          >
            Start a Conversation
          </a>
        </div>
        <div className="mt-12">
          <p className="text-sm" style={{ color: "#4A4846" }}>
            db@interno46.com
          </p>
        </div>
      </div>
    </>
  );
}
