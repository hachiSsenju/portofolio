"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { projects } from "@/data/projects";

export function SkillPill({ skill }: { skill: string }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations();

  const matches = projects.filter((p) =>
    p.tech.some((tech) => tech.toLowerCase() === skill.toLowerCase())
  );

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <button
        type="button"
        className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground transition-colors hover:border-accent/50 hover:text-accent"
      >
        {skill}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 z-30 mb-2 w-max max-w-56 -translate-x-1/2 rounded-lg border border-border-strong bg-card px-3 py-2 text-xs shadow-xl"
          >
            {matches.length > 0 ? (
              <>
                <p className="mb-1 font-medium text-foreground-muted">
                  {t("skills.usedIn")}
                </p>
                <p className="text-foreground">
                  {matches
                    .map((p) => t(`projectItems.${p.slug}.title` as never))
                    .join(", ")}
                </p>
              </>
            ) : (
              <p className="text-foreground-muted">{t("skills.coreSkill")}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
