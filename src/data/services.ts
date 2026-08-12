export interface Service {
  key: string;
  icon: "Globe" | "Smartphone" | "Server" | "Sparkles" | "Map" | "Rocket";
}

export const services: Service[] = [
  { key: "web", icon: "Globe" },
  { key: "mobile", icon: "Smartphone" },
  { key: "backend", icon: "Server" },
  { key: "ai", icon: "Sparkles" },
  { key: "gis", icon: "Map" },
  { key: "product", icon: "Rocket" },
];
