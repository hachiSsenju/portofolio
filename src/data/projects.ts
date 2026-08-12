import type { StaticImageData } from "next/image";
import ekoloImage from "@/assets/images/ekolo.png";
import komiziImage from "@/assets/images/KOMIZI.png";
import schoolImage from "@/assets/images/Gerex SCHOOL.png";
import farmingImage from "@/assets/images/farming Africa.png";
import senagrixImage from "@/assets/images/senagrix.png";

export type ProjectCategory =
  | "web"
  | "mobile"
  | "ai"
  | "saas"
  | "gis"
  | "ecommerce"
  | "edtech"
  | "startups"
  | "experiments";

export interface Project {
  slug: string;
  name: string;
  featured?: boolean;
  categories: ProjectCategory[];
  tech: string[];
  website?: string;
  hasCaseStudy: boolean;
  achievement?: {
    icon: "award";
  };
  accentImage: string;
  heroImage?: string | StaticImageData;
  screenshots?: (string | StaticImageData)[];
}

export const projects: Project[] = [
  {
    slug: "ekolo",
    name: "EKOLO",
    featured: true,
    categories: ["ai", "gis", "mobile", "web", "startups"],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Symfony",
      "PostgreSQL",
      "Flutter",
      "MapLibre",
      "Mapbox",
      "AI",
      "Docker",
    ],
    website: "https://ekoloafrica.com/",
    hasCaseStudy: true,
    achievement: { icon: "award" },
    accentImage: "ekolo",
    heroImage: ekoloImage,
    screenshots: [ekoloImage],
  },
  {
    slug: "senagrix",
    name: "Senagrix",
    categories: ["web", "startups", "ecommerce"],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    website: "https://senagrix.com",
    hasCaseStudy: true,
    accentImage: "senagrix",
    heroImage: senagrixImage,
    screenshots: [senagrixImage],
  },
  {
    slug: "farmingafrica",
    name: "FarmingAfrica",
    categories: ["ecommerce", "web", "startups"],
    tech: ["Next.js", "React", "Tailwind CSS", "PostgreSQL"],
    website: "https://farmingafrica.com",
    hasCaseStudy: true,
    accentImage: "farmingafrica",
    heroImage: farmingImage,
    screenshots: [farmingImage],
  },
  {
    slug: "school-management",
    name: "School Management Platform",
    categories: ["edtech", "saas", "web"],
    tech: ["Symfony", "PHP", "Doctrine", "PostgreSQL", "JWT", "AI"],
    hasCaseStudy: true,
    accentImage: "school",
    heroImage: schoolImage,
    screenshots: [schoolImage],
  },
  {
    slug: "komizi",
    name: "Komizi",
    categories: ["web"],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    website: "https://komizi.com",
    hasCaseStudy: true,
    accentImage: "komizi",
    heroImage: komiziImage,
    screenshots: [komiziImage],
  },
  {
    slug: "ekolo-mobile",
    name: "EKOLO Mobile",
    categories: ["mobile", "gis"],
    tech: ["Flutter", "Dart", "MapLibre", "GPS", "REST API"],
    hasCaseStudy: true,
    accentImage: "ekolo-mobile",
    heroImage: "/images/projects/ekolo-mobile/home.png",
    screenshots: [
      "/images/projects/ekolo-mobile/home.png",
      "/images/projects/ekolo-mobile/map.png",
      "/images/projects/ekolo-mobile/missions.png",
      "/images/projects/ekolo-mobile/profile.png",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
