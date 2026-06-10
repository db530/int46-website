"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { contact } from "@/data/siteData";

export default function PortfolioPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", company: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to email automation / CMS
    router.push("/thank-you");
  };

  return (
    <>
      <NavBar />
      <main
        className="min-h-screen flex flex-col justify-center py-28 px-6 md:px-10 lg:px-16"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <div className="max-w-lg mx-auto w-full">
          <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "#4A4846" }}>
            Portfolio Request
          </p>
          <h1
            className="font-display font-light mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F2F0ED" }}
          >
            Request the
            <br />
            <em style={{ fontStyle: "italic", color: "#C8A96E" }}>full portfolio.</em>
          </h1>
          <p className="text-sm leading-relaxed mb-10" style={{ color: "#8A8680" }}>
            A curated selection of CGI projects across residential, PBSA,
            mixed-use, and luxury real estate — with context, challenge,
            and outcome for each project.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {[
              { name: "name",    placeholder: "Name (optional)",    type: "text",  required: false },
              { name: "email",   placeholder: "Email address *",    type: "email", required: true },
              { name: "company", placeholder: "Company (optional)", type: "text",  required: false },
            ].map((field) => (
              <input
                key={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                value={form[field.name as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                className="w-full px-4 py-3.5 text-sm bg-transparent border outline-none transition-colors duration-200"
                style={{ borderColor: "#2A2A2A", color: "#F2F0ED", caretColor: "#C8A96E" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#C8A96E")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#2A2A2A")}
              />
            ))}

            <button
              type="submit"
              className="w-full py-4 text-sm font-medium mt-2 transition-all duration-200"
              style={{ backgroundColor: "#C8A96E", color: "#0D0D0D" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#D4B97E")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#C8A96E")}
            >
              Send me the portfolio →
            </button>
          </form>

          <div className="mt-10 pt-8 border-t" style={{ borderColor: "#2A2A2A" }}>
            <p className="text-sm mb-4" style={{ color: "#8A8680" }}>
              Prefer to talk first?
            </p>
            <a
              href="https://calendly.com/interno46"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors duration-200"
              style={{ color: "#C8A96E" }}
            >
              Book a 20-minute call with Davide →
            </a>
          </div>

          <p className="text-xs mt-8" style={{ color: "#4A4846" }}>
            {contact.email} · {contact.phone}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
