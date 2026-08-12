export interface Achievement {
  key: string;
  year: string;
  project?: string;
}

export const achievements: Achievement[] = [
  { key: "govathon", year: "2025", project: "EKOLO" },
];
