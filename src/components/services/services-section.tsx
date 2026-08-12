import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/data/services";
import { iconRegistry } from "@/components/ui/icon-registry";

export async function ServicesSection() {
  const t = await getTranslations("services");

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconRegistry[service.icon];
            return (
              <Reveal key={service.key} delay={i * 0.05}>
                <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/40">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-transform group-hover:scale-105">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    {t(`items.${service.key}.title` as never)}
                  </h3>
                  <p className="mt-2 text-sm text-foreground-muted">
                    {t(`items.${service.key}.description` as never)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
