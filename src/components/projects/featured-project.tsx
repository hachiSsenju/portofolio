"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight, Award } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ProjectVisual } from "./project-visual";
import type { Project } from "@/data/projects";

export function FeaturedProject({ project }: { project: Project }) {
  const t = useTranslations();
  const item = `projectItems.${project.slug}` as const;

  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-3xl border border-accent/25 bg-card">
        <div className="relative grid gap-0 lg:grid-cols-2">
          <ProjectVisual
            variant={project.accentImage}
            name={project.name}
            src={project.heroImage}
            priority
            className="aspect-[16/11] rounded-none border-0 border-b border-border lg:aspect-auto lg:border-b-0 lg:border-r"
            iconClassName="h-16 w-16"
          />

          <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
            {project.achievement && (
              <div className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                <Award className="h-3.5 w-3.5" />
                {t("projects.achievementBadge")}
              </div>
            )}

            <p className="mb-2 font-mono text-xs font-medium tracking-[0.15em] text-accent uppercase">
              {t(`${item}.category`)}
            </p>
            <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {t(`${item}.title`)}
            </h3>
            <p className="mt-4 text-base text-foreground-muted">
              {t(`${item}.description`)}
            </p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <Badge key={tech} variant="outline" className="text-[11px]">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={`/projects/${project.slug}`}
                className={buttonVariants({ className: "gap-1.5" })}
              >
                {t("projects.viewCaseStudy")}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              {project.website ? (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm font-medium text-foreground-muted underline-offset-4 hover:text-accent hover:underline"
                >
                  {t("projects.visitWebsite")}
                </a>
              ) : (
                <span className="text-sm text-foreground-muted/60">
                  {t("projects.comingSoon")}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
