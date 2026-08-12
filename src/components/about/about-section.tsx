import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { AboutPortrait } from "./about-portrait";

export async function AboutSection() {
  const t = await getTranslations("about");
  const focusAreas = t.raw("focusAreas") as string[];

  return (
    <section id="about" className="py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16">
          <Reveal>
            <AboutPortrait />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mb-3 font-mono text-xs font-medium tracking-[0.2em] text-accent uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("title")}
            </h2>
            <div className="mt-6 space-y-4 text-base text-foreground-muted sm:text-lg">
              <p>{t("paragraph1")}</p>
              <p>{t("paragraph2")}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {focusAreas.map((area) => (
                <Badge key={area} variant="accent">
                  {area}
                </Badge>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
