export interface SkillCategory {
  key: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    key: "frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Bootstrap"],
  },
  {
    key: "backend",
    skills: ["PHP", "Symfony", "Doctrine", "REST APIs", "JWT", "PostgreSQL"],
  },
  {
    key: "mobile",
    skills: ["Flutter", "Dart", "Firebase", "Firestore", "MapLibre"],
  },
  {
    key: "ai",
    skills: ["AI APIs", "Groq", "AI Agents", "AI Chatbots", "AI Data Processing", "AI Analytics"],
  },
  {
    key: "maps",
    skills: ["Mapbox", "Google Maps", "MapLibre", "GPS", "Geolocation", "GIS"],
  },
  {
    key: "devops",
    skills: ["Docker", "Dokploy", "Cloudflare", "Cloudflare R2", "Apache", "OpenSSL", "SSL/TLS"],
  },
  {
    key: "tools",
    skills: ["Git", "GitHub", "Figma", "Canva", "VS Code"],
  },
];
