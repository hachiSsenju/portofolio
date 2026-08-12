"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FilterPills } from "./filter-pills";
import { ProjectCard } from "./project-card";
import { FeaturedProject } from "./featured-project";
import { projects, type ProjectCategory } from "@/data/projects";

export function ProjectsSection() {
  const t = useTranslations("projects");
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  const filtered = useMemo(() => {
    const list = filter === "all" ? rest : projects.filter((p) => p.categories.includes(filter));
    return list;
  }, [filter, rest]);

  return (
    <section id="projects" className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </div>

        <div className="mt-10 overflow-x-auto no-scrollbar">
          <FilterPills active={filter} onChange={setFilter} />
        </div>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            {filter === "all" && featured && (
              <motion.div
                key="featured"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-8"
              >
                <FeaturedProject project={featured} />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="py-16 text-center text-sm text-foreground-muted">—</p>
          )}
        </div>
      </Container>
    </section>
  );
}
