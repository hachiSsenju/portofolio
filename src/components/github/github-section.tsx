"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Star, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { GithubIcon } from "@/components/ui/icons";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/data/site";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  PHP: "#4F5D95",
  Dart: "#00B4AB",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

type Status = "loading" | "success" | "error";

export function GithubSection() {
  const t = useTranslations("github");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;
    fetch(
      `https://api.github.com/users/${site.githubUsername}/repos?sort=updated&per_page=6`
    )
      .then((res) => {
        if (!res.ok) throw new Error("GitHub API error");
        return res.json();
      })
      .then((data: Repo[]) => {
        if (!cancelled) {
          setRepos(data);
          setStatus("success");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
          <Reveal>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer noopener"
              className={buttonVariants({ variant: "secondary", className: "gap-1.5 shrink-0" })}
            >
              <GithubIcon className="h-4 w-4" />
              {t("viewGithub")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Reveal>
        </div>

        {status === "loading" && (
          <p className="mt-12 text-sm text-foreground-muted">{t("loading")}</p>
        )}

        {status === "error" && (
          <p className="mt-12 text-sm text-foreground-muted">{t("error")}</p>
        )}

        {status === "success" && (
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <RevealItem key={repo.id}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent/40"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-sm font-medium text-foreground group-hover:text-accent">
                      {repo.name}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-foreground-muted opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <p className="mt-2 flex-1 line-clamp-2 text-sm text-foreground-muted">
                    {repo.description || t("noDescription")}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-foreground-muted">
                    {repo.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{
                            backgroundColor:
                              languageColors[repo.language] ?? "var(--foreground-muted)",
                          }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {repo.stargazers_count}
                    </span>
                  </div>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </Container>
    </section>
  );
}
