"use client";

import { useState } from "react";
import { contact } from "@/data/siteData";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to email automation / Sanity / form backend
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-6 md:px-10 lg:px-16"
      style={{ backgroundColor: "#141414", borderTop: "1px solid #2A2A2A" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-xl mb-16">
          <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "#4A4846" }}>
            Start A Conversation
          </p>
          <h2
            className="font-display font-light mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#F2F0ED" }}
          >
            Let&apos;s talk about
            <br />
            <em style={{ fontStyle: "italic", color: "#C8A96E" }}>your project.</em>
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "#8A8680" }}>
            20 minutes. No commitment. A focused conversation to understand scope,
            timelines, and how visuals can best support your project&apos;s next step.
          </p>
        </div>

        {/* Two-column layout — Book a Call is primary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Book a call — PRIMARY */}
          <div
            className="border p-8"
            style={{ borderColor: "#C8A96E", backgroundColor: "#1C1C1C" }}
          >
            <p className="text-xs tracking-[0.18em] uppercase mb-2" style={{ color: "#C8A96E" }}>
              Book a Call
            </p>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: "#8A8680" }}>
              A 20-minute strategy session with Davide. No presentation — just
              a direct conversation about your project and what visuals can
              unlock for it.
            </p>

            <a
              href="https://calendly.com/interno46"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-4 text-sm font-medium transition-all duration-200 mb-8"
              style={{ backgroundColor: "#C8A96E", color: "#0D0D0D" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#D4B97E")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#C8A96E")}
            >
              Schedule a 20-minute call →
            </a>

            {/* Direct contact */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs tracking-widest uppercase w-20 shrink-0" style={{ color: "#4A4846" }}>
                  Email
                </span>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm link-dim"
                >
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs tracking-widest uppercase w-20 shrink-0" style={{ color: "#4A4846" }}>
                  WhatsApp
                </span>
                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm link-dim"
                >
                  {contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs tracking-widest uppercase w-20 shrink-0" style={{ color: "#4A4846" }}>
                  Based
                </span>
                <span className="text-sm" style={{ color: "#8A8680" }}>
                  {contact.address}
                </span>
              </div>
            </div>
          </div>

          {/* Portfolio request — secondary */}
          <div
            className="border p-8"
            style={{ borderColor: "#2A2A2A", backgroundColor: "#1C1C1C" }}
          >
            <p className="text-xs tracking-[0.18em] uppercase mb-2" style={{ color: "#8A8680" }}>
              Request Portfolio
            </p>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: "#8A8680" }}>
              A curated selection of CGI projects across residential, PBSA,
              mixed-use, and luxury — with context and outcome for each.
            </p>

            {submitted ? (
              <div className="py-8 text-center">
                <p
                  className="font-display text-2xl font-light mb-3"
                  style={{ color: "#F2F0ED" }}
                >
                  On its way.
                </p>
                <p className="text-sm" style={{ color: "#8A8680" }}>
                  Check your inbox — it should arrive shortly.
                </p>
                <a
                  href={`https://calendly.com/interno46`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 text-sm transition-colors duration-200"
                  style={{ color: "#C8A96E" }}
                >
                  Book a 20-minute call while you wait →
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 text-sm outline-none bg-transparent border transition-colors duration-200"
                  style={{
                    borderColor: "#2A2A2A",
                    color: "#F2F0ED",
                    caretColor: "#C8A96E",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#C8A96E")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#2A2A2A")}
                />
                <input
                  type="email"
                  placeholder="Email address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-sm outline-none bg-transparent border transition-colors duration-200"
                  style={{
                    borderColor: "#2A2A2A",
                    color: "#F2F0ED",
                    caretColor: "#C8A96E",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#C8A96E")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#2A2A2A")}
                />
                <button
                  type="submit"
                  className="w-full py-3.5 text-sm btn-gold mt-1"
                >
                  Send me the portfolio →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
