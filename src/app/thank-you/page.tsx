import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Portfolio sent — INT.46 VizLab",
};

export default function ThankYouPage() {
  return (
    <>
      <NavBar />
      <main
        className="min-h-screen flex flex-col justify-center py-28 px-6 md:px-10 lg:px-16"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <div className="max-w-xl mx-auto w-full">
          <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "#C8A96E" }}>
            ✓ Request received
          </p>
          <h1
            className="font-display font-light mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#F2F0ED" }}
          >
            The portfolio
            <br />
            <em style={{ fontStyle: "italic", color: "#C8A96E" }}>is on its way.</em>
          </h1>
          <p className="text-sm leading-relaxed mb-12" style={{ color: "#8A8680" }}>
            Check your inbox — it should arrive within a few minutes.
            While you wait, book a 20-minute strategy call with Davide.
            No commitment. Just a direct conversation about your project.
          </p>

          {/* Calendly CTA */}
          <a
            href="https://calendly.com/interno46"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full py-4 text-sm mb-4 btn-gold"
          >
            Schedule a 20-minute call →
          </a>

          <Link href="/" className="block text-center text-sm link-faint">
            ← Back to INT.46 VizLab
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
