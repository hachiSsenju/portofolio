export type TimelineType = "education" | "work" | "achievement";

export interface TimelineItem {
  key: string;
  year: string;
  org: string;
  type: TimelineType;
}

export const timeline: TimelineItem[] = [
  { key: "upsSuptech", year: "2021 – 2024", org: "UPS Suptech, Sousse", type: "education" },
  { key: "groupeIsi", year: "2024 – 2026", org: "Groupe ISI", type: "education" },
  { key: "sklManager", year: "2025 – Present", org: "skl-manager", type: "work" },
  { key: "aihorizon", year: "2025 – Present", org: "AIHorizon ConsultingPlus", type: "work" },
  { key: "govathon", year: "2025", org: "Govathon", type: "achievement" },
  { key: "ekolo", year: "2026 – Present", org: "EKOLO Africa", type: "work" },
];
