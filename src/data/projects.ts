export interface Project {
  slug: string;
  title: string;
  location: string;
  year: string;
  type: string;
  outcomeMetric: string;
  context: string;
  challenge: string;
  solution: string;
  result: string;
  client?: string;
  /** Main image — used in the Work grid thumbnail and case study hero */
  coverImage?: string;
  /** Additional images shown in the case study gallery */
  images?: string[];
  testimonial?: {
    quote: string;
    name: string;
    role: string;
    company: string;
  };
}

export const projects: Project[] = [
  {
    slug: "xior-student-housing-warsaw",
    title: "XIOR Student Housing",
    location: "Warsaw, Poland",
    year: "2023",
    type: "PBSA",
    outcomeMetric: "Pre-let secured before construction began",
    context:
      "XIOR Student Housing and its investors (Solida Capital) required a visual strategy to strengthen pre-let activity and investor communication for a premium private student accommodation project in Warsaw.",
    challenge:
      "Aligning the visual narrative to both institutional investors and prospective tenants — communicating long-term value, lifestyle appeal, and premium positioning in a competitive PBSA market.",
    solution:
      "We developed a coherent visual strategy combining refined CGI, lifestyle-focused scenes, and contextual aerial views. Each visualization was composed to support investor presentations, pre-let campaigns, and planning communications.",
    result:
      "The visual strategy developed in the pre-let phase directly translated to built reality, confirming architectural intent and lifestyle positioning originally communicated through CGI. Construction completed by SKANSKA in 2025.",
    client: "XIOR Student Housing / Solida Capital",
  },
  {
    slug: "shed-living-warsaw",
    title: "SHED Living",
    location: "Warsaw, Poland",
    year: "2024",
    type: "Student Housing",
    outcomeMetric: "97% occupancy · 280 rooms · 6 months",
    context:
      "High-quality interior and exterior visualizations for a private student accommodation project, supporting early marketing, generating tenant interest, and enabling a timely market launch.",
    challenge:
      "Frequent design changes meant visualization production had to work against a moving target — with repeated revisions threatening to slow marketing momentum in a critical pre-let phase.",
    solution:
      "With strong technical knowledge and PBSA experience, we responded rapidly to changes. A flexible production process ensured visual consistency and quality despite the evolving design.",
    result:
      "After delivery of visual materials and the start of marketing, the development reached 97% occupancy within the first six months — across 280 rooms. The visual strategy played a key role in supporting early letting momentum.",
    client: "Solida Capital / 1 Asset Management",
    coverImage: "/images/projects/shed-living-warsaw/IMG_2800.jpeg",
    images: ["/images/projects/shed-living-warsaw/IMG_2800.jpeg"],
  },
  {
    slug: "milan-luxury-apartment",
    title: "Milan Luxury Apartment",
    location: "Milan, Italy",
    year: "2024",
    type: "Luxury Residential",
    outcomeMetric: "Premium lifestyle narrative · Italian residential market",
    context:
      "An exclusive interior visualization for a luxury apartment in central Milan, emphasising prestige, quality, and property value for a competitive Italian residential market.",
    challenge:
      "Communicating the emotional and exclusive quality of a premium property where buyers make decisions based on lifestyle aspiration and material quality — not floor plans alone.",
    solution:
      "A refined visual strategy built around atmosphere, material texture, and narrative consistency. Hero-grade CGI visualizations for sales materials, supported by lifestyle and exterior assets.",
    result:
      "Visual materials that communicated the project's value clearly — to buyers, internally, and with external partners. Reduced uncertainty and elevated project perception from the very first presentation.",
    testimonial: {
      quote:
        "The visuals helped us communicate the project's value clearly — not only to buyers, but internally and with external partners. They reduced uncertainty, supported faster decisions, and elevated how the project was perceived.",
      name: "Asset Owner",
      role: "Luxury Residential Development",
      company: "Milan, Italy",
    },
  },
  {
    slug: "premium-residential-2026",
    title: "Premium Residential",
    location: "United Arab Emirates",
    year: "2026",
    type: "Luxury Residential",
    outcomeMetric: "Presales visual package · 2026 launch",
    context:
      "A premium residential development in the UAE requiring investor-grade CGI to support a presales launch. Materials that communicate architectural quality, lifestyle appeal, and investment confidence.",
    challenge:
      "Establishing visual trust and market positioning for a presales campaign in an internationally competitive luxury residential segment, before construction begins.",
    solution:
      "Full exterior, interior, and lifestyle CGI production with consistent visual direction across all campaign touchpoints. Aerial context visuals and investor presentation assets.",
    result:
      "Complete presales visual package delivered and in active use for the 2026 campaign launch.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
