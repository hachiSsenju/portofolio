"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SkillPill } from "./skill-pill";
import { skillCategories } from "@/data/skills";

export function SkillsSection() {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <RevealGroup className="mt-14 space-y-10" staggerDelay={0.06}>
          {skillCategories.map((category) => (
            <RevealItem key={category.key}>
              <h3 className="mb-4 text-sm font-medium text-foreground-muted">
                {t(`categories.${category.key}` as never)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <SkillPill key={skill} skill={skill} />
                ))}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
