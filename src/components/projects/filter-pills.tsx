"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/data/projects";

const FILTERS: (ProjectCategory | "all")[] = [
  "all",
  "web",
  "mobile",
  "ai",
  "saas",
  "gis",
  "ecommerce",
  "edtech",
  "startups",
  "experiments",
];

export function FilterPills({
  active,
  onChange,
}: {
  active: ProjectCategory | "all";
  onChange: (value: ProjectCategory | "all") => void;
}) {
  const t = useTranslations("projects.filters");

  return (
    <div
      className="flex flex-wrap gap-2 no-scrollbar"
      role="group"
      aria-label={t("all")}
    >
      {FILTERS.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => onChange(filter)}
          aria-pressed={active === filter}
          className={cn(
            "relative rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            active === filter
              ? "border-transparent text-accent-foreground"
              : "border-border text-foreground-muted hover:border-border-strong hover:text-foreground"
          )}
        >
          {active === filter && (
            <motion.span
              layoutId="filter-active"
              className="absolute inset-0 -z-10 rounded-full bg-accent"
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          )}
          <span className="relative">{t(filter)}</span>
        </button>
      ))}
    </div>
  );
}
