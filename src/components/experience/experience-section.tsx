import { getTranslations } from "next-intl/server";
import { Award, Briefcase, GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { timeline } from "@/data/experience";
import { cn } from "@/lib/utils";

const icons = {
  education: GraduationCap,
  work: Briefcase,
  achievement: Award,
};

export async function ExperienceSection() {
  const t = await getTranslations("experience");

  return (
    <section id="experience" className="py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <div className="relative mt-14 max-w-3xl">
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[19px] w-px bg-border sm:left-[23px]"
          />
          <ol className="space-y-10">
            {timeline.map((entry, i) => {
              const Icon = icons[entry.type];
              return (
                <Reveal as="li" key={entry.key} delay={i * 0.05}>
                  <div className="relative flex gap-5 sm:gap-6">
                    <div
                      className={cn(
                        "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border sm:h-12 sm:w-12",
                        entry.type === "achievement"
                          ? "border-accent bg-accent-soft text-accent"
                          : "border-border bg-card text-foreground-muted"
                      )}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-medium text-accent">
                          {entry.year}
                        </span>
                        <span className="text-xs text-foreground-muted">
                          {entry.org}
                        </span>
                      </div>
                      <h3 className="mt-1 text-lg font-semibold tracking-tight">
                        {t(`items.${entry.key}.title` as never)}
                      </h3>
                      <p className="mt-1.5 max-w-xl text-sm text-foreground-muted">
                        {t(`items.${entry.key}.description` as never)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
