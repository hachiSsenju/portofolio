import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArchitectureDiagram } from "./architecture-diagram";

export async function ArchitectureSection() {
  const t = await getTranslations("architecture");

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
        />
        <div className="mt-16">
          <ArchitectureDiagram />
        </div>
      </Container>
    </section>
  );
}
