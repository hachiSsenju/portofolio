import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/navbar/navbar";
import { Hero } from "@/components/hero/hero";
import { ProjectsSection } from "@/components/projects/projects-section";
import { AboutSection } from "@/components/about/about-section";
import { SkillsSection } from "@/components/skills/skills-section";
import { ExperienceSection } from "@/components/experience/experience-section";
import { ServicesSection } from "@/components/services/services-section";
import { ArchitectureSection } from "@/components/architecture/architecture-section";
import { AchievementsSection } from "@/components/achievements/achievements-section";
import { GithubSection } from "@/components/github/github-section";
import { ContactSection } from "@/components/contact/contact-section";
import { Footer } from "@/components/footer/footer";
import { site } from "@/data/site";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: `${site.url}/${locale}`,
    email: site.email,
    jobTitle: "Full-Stack & Mobile Developer, Product Builder",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dakar",
      addressCountry: "SN",
    },
    sameAs: [site.github, site.linkedin],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ServicesSection />
        <ArchitectureSection />
        <AchievementsSection />
        <GithubSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
