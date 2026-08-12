import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { achievements } from "@/data/achievements";

export async function AchievementsSection() {
  const t = await getTranslations("achievements");

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <Reveal key={achievement.key}>
              <div className="relative overflow-hidden rounded-2xl border border-accent/25 bg-card p-6">
                <div className="relative flex h-11 w-24 items-center justify-start rounded-xl bg-[#0b0d0f] px-2">
                  <Image
                    src="/images/achievements/govathon-official.png"
                    alt="Gov'athon"
                    fill
                    sizes="96px"
                    className="object-contain p-1.5"
                  />
                </div>
                <p className="mt-5 font-mono text-xs font-medium text-accent">
                  {achievement.year}
                </p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight">
                  {t(`items.${achievement.key}.title` as never)}
                </h3>
                <p className="mt-2 text-sm text-foreground-muted">
                  {t(`items.${achievement.key}.description` as never)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
