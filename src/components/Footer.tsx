import Link from "next/link";
import { contact } from "@/data/siteData";

export default function Footer() {
  return (
    <footer
      className="border-t py-10 px-6 md:px-10 lg:px-16"
      style={{ borderColor: "#2A2A2A", backgroundColor: "#0D0D0D" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="font-display text-base tracking-wider" style={{ color: "#F2F0ED" }}>
            INT.46 VizLab
          </p>
          <p className="text-sm mt-1" style={{ color: "#4A4846" }}>
            Sales-Driven Visuals for Real Estate Developers
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm" style={{ color: "#8A8680" }}>
          <a href={`mailto:${contact.email}`} className="hover:text-[#F2F0ED] transition-colors">
            {contact.email}
          </a>
          <a href={`tel:${contact.phone}`} className="hover:text-[#F2F0ED] transition-colors">
            {contact.phone}
          </a>
          <span>{contact.address}</span>
        </div>

        <p className="text-xs" style={{ color: "#4A4846" }}>
          © {new Date().getFullYear()} INT.46 VizLab
        </p>
      </div>
    </footer>
  );
}
