import { getTranslations } from "next-intl/server";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { ContactForm } from "./contact-form";
import { site } from "@/data/site";

export async function ContactSection() {
  const t = await getTranslations("contact");

  const methods = [
    { label: t("emailLabel"), value: site.email, href: `mailto:${site.email}`, icon: Mail },
    { label: t("githubLabel"), value: "@" + site.githubUsername, href: site.github, icon: GithubIcon },
    { label: t("linkedinLabel"), value: "LinkedIn", href: site.linkedin, icon: LinkedinIcon },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="mb-3 font-mono text-xs font-medium tracking-[0.2em] text-accent uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {t("title")}{" "}
                <span className="text-gradient-accent">{t("titleHighlight")}</span>
              </h2>
              <p className="mt-5 max-w-md text-base text-foreground-muted">
                {t("description")}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 space-y-4">
              {methods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent/40"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <method.icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-xs text-foreground-muted">
                      {method.label}
                    </span>
                    <span className="block text-sm font-medium text-foreground group-hover:text-accent">
                      {method.value}
                    </span>
                  </span>
                </a>
              ))}
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
