import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { projects, getProjectBySlug } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — INT.46 VizLab`,
    description: project.outcomeMetric,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <>
      <NavBar />
      <main>
        {/* Hero */}
        <div
          className={`relative min-h-[70vh] flex flex-col justify-end px-6 md:px-10 lg:px-16 pb-16 pt-28${project.coverImage ? "" : " img-placeholder"}`}
        >
          {project.coverImage && (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover z-0"
              priority
            />
          )}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.3) 60%, rgba(13,13,13,0.15) 100%)",
            }}
          />
          <div className="relative z-[2] max-w-7xl mx-auto w-full">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-8 link-faint"
            >
              ← Back to Work
            </Link>
            <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "#C8A96E" }}>
              {project.type} · {project.location} · {project.year}
            </p>
            <h1
              className="font-display font-light"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#F2F0ED" }}
            >
              {project.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="py-20 px-6 md:px-10 lg:px-16" style={{ backgroundColor: "#0D0D0D" }}>
          <div className="max-w-7xl mx-auto">

            {/* Situation / Approach */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20 border-b pb-20" style={{ borderColor: "#2A2A2A" }}>
              <div>
                <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "#C8A96E" }}>
                  Situation
                </p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#8A8680" }}>
                  {project.context}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#8A8680" }}>
                  {project.challenge}
                </p>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "#C8A96E" }}>
                  Approach
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#8A8680" }}>
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Gallery */}
            {project.images && project.images.length > 0 ? (
              <>
                <div className="relative w-full mb-4 overflow-hidden" style={{ aspectRatio: "16/7" }}>
                  <Image
                    src={project.images[0]}
                    alt={`${project.title} — image 1`}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
                {project.images.length > 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
                    {project.images.slice(1).map((src, i) => (
                      <div key={i} className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
                        <Image
                          src={src}
                          alt={`${project.title} — image ${i + 2}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
                {project.images.length === 1 && <div className="mb-20" />}
              </>
            ) : (
              <>
                <div className="img-placeholder w-full mb-4" style={{ aspectRatio: "16/7" }}>
                  <div className="w-full h-full flex items-end p-6" style={{ color: "#4A4846" }}>
                    <span className="text-xs">Hero image — {project.title}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
                  {[1, 2].map((n) => (
                    <div key={n} className="img-placeholder w-full" style={{ aspectRatio: "4/3" }}>
                      <div className="w-full h-full flex items-end p-5" style={{ color: "#4A4846" }}>
                        <span className="text-xs">Project image {n}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Outcome */}
            <div
              className="border p-8 md:p-12 mb-20"
              style={{ borderColor: "#2A2A2A", backgroundColor: "#141414" }}
            >
              <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "#4A4846" }}>
                Outcome
              </p>
              <p
                className="font-display font-light mb-4"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", color: "#C8A96E" }}
              >
                {project.outcomeMetric}
              </p>
              <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "#8A8680" }}>
                {project.result}
              </p>
              {project.client && (
                <p className="text-xs mt-4" style={{ color: "#4A4846" }}>
                  Client: {project.client}
                </p>
              )}
            </div>

            {/* Testimonial */}
            {project.testimonial && (
              <div className="max-w-2xl mb-20">
                <p
                  className="font-display font-light leading-relaxed mb-5"
                  style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", color: "#F2F0ED" }}
                >
                  &ldquo;{project.testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-px" style={{ backgroundColor: "#C8A96E" }} />
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#F2F0ED" }}>
                      {project.testimonial.name}
                    </p>
                    <p className="text-xs" style={{ color: "#8A8680" }}>
                      {project.testimonial.role}, {project.testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Related projects */}
            {related.length > 0 && (
              <div>
                <p className="text-xs tracking-[0.2em] uppercase mb-8" style={{ color: "#4A4846" }}>
                  More Projects
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {related.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/projects/${rel.slug}`}
                      className="card-hover block"
                      style={{ backgroundColor: "#141414" }}
                    >
                      <div className="img-placeholder w-full" style={{ aspectRatio: "16/9" }} />
                      <div className="p-5">
                        <p className="text-xs mb-1" style={{ color: "#8A8680" }}>
                          {rel.location} · {rel.year}
                        </p>
                        <p className="font-display font-light text-lg mb-1" style={{ color: "#F2F0ED" }}>
                          {rel.title}
                        </p>
                        <p className="text-xs" style={{ color: "#C8A96E" }}>
                          {rel.outcomeMetric}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA strip */}
        <div
          className="py-16 px-6 md:px-10 lg:px-16 border-t"
          style={{ backgroundColor: "#141414", borderColor: "#2A2A2A" }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p
                className="font-display font-light mb-1"
                style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", color: "#F2F0ED" }}
              >
                Working on a project that requires investor-grade visuals?
              </p>
              <p className="text-sm" style={{ color: "#8A8680" }}>
                20 minutes. No commitment. Direct conversation.
              </p>
            </div>
            <a href="/#contact" className="shrink-0 px-7 py-3.5 text-sm btn-gold">
              Start a Conversation →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
