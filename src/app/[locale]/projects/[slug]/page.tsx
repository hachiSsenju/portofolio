import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowUpRight, Award } from "lucide-react";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { projects, getProject } from "@/data/projects";
import { ProjectVisual } from "@/components/projects/project-visual";
import {
  CaseStudySection,
  CaseStudyList,
} from "@/components/projects/case-study-section";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const t = await getTranslations({ locale, namespace: "projectItems" });
  const title = t(`${slug}.title` as never);
  const description = t(`${slug}.description` as never);

  return {
    title,
    description,
    alternates: { canonical: `/${locale}/projects/${slug}` },
    openGraph: { title, description },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  setRequestLocale(locale);

  const t = await getTranslations();
  const item = `projectItems.${slug}` as const;
  const cs = `caseStudies.${slug}` as const;

  const otherProjects = projects.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="pt-40 pb-24 sm:pt-48">
        <Container className="max-w-4xl">
          <Reveal>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground-muted transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {t("caseStudy.backToProjects")}
            </Link>
          </Reveal>

          <Reveal delay={0.05} className="mt-6">
            {project.achievement && (
              <div className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                <Award className="h-3.5 w-3.5" />
                {t("projects.achievementBadge")}
              </div>
            )}
            <p className="mb-3 font-mono text-xs font-medium tracking-[0.15em] text-accent uppercase">
              {t(`${item}.category`)}
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {t(`${item}.title`)}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-foreground-muted text-balance">
              {t(`${item}.description`)}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={buttonVariants({ className: "gap-1.5" })}
                >
                  {t("caseStudy.liveWebsite")}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              <a
                href={`/${locale}#contact`}
                className={buttonVariants({
                  variant: "secondary",
                  className: "gap-1.5",
                })}
              >
                {t("contact.title")} {t("contact.titleHighlight")}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <ProjectVisual
              variant={project.accentImage}
              name={project.name}
              src={project.heroImage}
              priority
              className="aspect-[16/9] w-full"
              iconClassName="h-16 w-16"
            />
          </Reveal>

          <div className="mt-4">
            <CaseStudySection title={t("caseStudy.overview")}>
              <p>{t(`${cs}.overview`)}</p>
            </CaseStudySection>

            <CaseStudySection title={t("caseStudy.problem")}>
              <p>{t(`${cs}.problem`)}</p>
            </CaseStudySection>

            <CaseStudySection title={t("caseStudy.solution")}>
              <p>{t(`${cs}.solution`)}</p>
            </CaseStudySection>

            <CaseStudySection title={t("caseStudy.features")}>
              <CaseStudyList items={t.raw(`${cs}.features`) as string[]} />
            </CaseStudySection>

            <CaseStudySection title={t("caseStudy.myRole")}>
              <p>{t(`${cs}.role`)}</p>
            </CaseStudySection>

            <CaseStudySection title={t("caseStudy.technology")}>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CaseStudySection>

            <CaseStudySection title={t("caseStudy.architecture")}>
              <p>{t(`${cs}.architecture`)}</p>
            </CaseStudySection>

            {project.screenshots && project.screenshots.length > 0 && (
              <CaseStudySection title={t("caseStudy.screenshots")}>
                <div
                  className={
                    project.screenshots.length > 1
                      ? "grid gap-4 sm:grid-cols-2"
                      : ""
                  }
                >
                  {project.screenshots.map((shot, i) => (
                    <div
                      key={i}
                      className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-background-alt"
                    >
                      <Image
                        src={shot}
                        alt={`${t(`${item}.title`)} screenshot`}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-contain p-4"
                      />
                    </div>
                  ))}
                </div>
              </CaseStudySection>
            )}

            <CaseStudySection title={t("caseStudy.challenges")}>
              <CaseStudyList items={t.raw(`${cs}.challenges`) as string[]} />
            </CaseStudySection>

            <CaseStudySection title={t("caseStudy.results")}>
              <CaseStudyList items={t.raw(`${cs}.results`) as string[]} />
            </CaseStudySection>

            <CaseStudySection title={t("caseStudy.lessonsLearned")}>
              <CaseStudyList items={t.raw(`${cs}.lessons`) as string[]} />
            </CaseStudySection>
          </div>

          {otherProjects.length > 0 && (
            <Reveal className="mt-16 border-t border-border pt-12">
              <h2 className="mb-6 font-mono text-xs font-medium tracking-[0.15em] text-accent uppercase">
                {t("caseStudy.otherProjects")}
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {otherProjects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="group rounded-xl border border-border p-4 transition-colors hover:border-accent/40"
                  >
                    <p className="font-mono text-[10px] font-medium tracking-[0.12em] text-accent uppercase">
                      {t(`projectItems.${p.slug}.category` as never)}
                    </p>
                    <p className="mt-1.5 flex items-center gap-1 text-sm font-medium">
                      {t(`projectItems.${p.slug}.title` as never)}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </p>
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
