"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { LanguageSwitcher } from "@/components/navbar/language-switcher";
import { site } from "@/data/site";

const SECTION_IDS = [
  "home",
  "about",
  "projects",
  "skills",
  "experience",
  "contact",
] as const;

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const isHome = pathname === "/";

  function sectionHref(id: string) {
    return isHome ? `#${id}` : `/${locale}#${id}`;
  }

  return (
    <footer className="border-t border-border py-14">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_auto]">
          <div>
            <a
              href={sectionHref("home")}
              className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground font-mono text-sm font-bold">
                M
              </span>
              Mahdi Ibrahim
            </a>
            <p className="mt-4 max-w-xs text-sm text-foreground-muted">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium text-foreground">
              {t("footer.navigationTitle")}
            </p>
            <ul className="space-y-2.5">
              {SECTION_IDS.filter((id) => id !== "home").map((id) => (
                <li key={id}>
                  <a
                    href={sectionHref(id)}
                    className="text-sm text-foreground-muted transition-colors hover:text-accent"
                  >
                    {t(`nav.${id}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium text-foreground">
              {t("footer.socialTitle")}
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-sm text-foreground-muted transition-colors hover:text-accent"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-sm text-foreground-muted transition-colors hover:text-accent"
                >
                  <LinkedinIcon className="h-3.5 w-3.5" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1 lg:flex lg:items-start lg:justify-end">
            <LanguageSwitcher />
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-foreground-muted">
            &copy; {new Date().getFullYear()} Mahdi Ibrahim. {t("footer.rights")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
