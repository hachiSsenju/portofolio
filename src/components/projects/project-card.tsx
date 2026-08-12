"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { ProjectVisual } from "./project-visual";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations();
  const item = `projectItems.${project.slug}` as const;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-border-strong"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 z-10"
        aria-label={t(`${item}.title`)}
      />

      <ProjectVisual
        variant={project.accentImage}
        name={project.name}
        src={project.heroImage}
        className="aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.02]"
      />

      <div className="flex flex-1 flex-col p-6">
        <p className="mb-2 font-mono text-[10px] font-medium tracking-[0.15em] text-accent uppercase">
          {t(`${item}.category`)}
        </p>
        <h3 className="text-lg font-semibold tracking-tight">
          {t(`${item}.title`)}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-foreground-muted">
          {t(`${item}.description`)}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 3).map((tech) => (
            <Badge key={tech} className="text-[10px]">
              {tech}
            </Badge>
          ))}
          {project.tech.length > 3 && (
            <Badge className="text-[10px]">+{project.tech.length - 3}</Badge>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-accent">
            {t("projects.viewCaseStudy")}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noreferrer noopener"
              onClick={(e) => e.stopPropagation()}
              className="relative z-20 text-xs font-medium text-foreground-muted underline-offset-4 hover:text-accent hover:underline"
            >
              {t("projects.visitWebsite")}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
