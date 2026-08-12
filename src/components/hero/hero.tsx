"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { HeroBanner } from "./hero-banner";
import { Stats } from "./stats";
import { site } from "@/data/site";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="home" className="pt-36 pb-20 sm:pt-44 sm:pb-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase"
          >
            {t("eyebrow")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl xl:text-[4rem] xl:leading-[1.05]"
          >
            {t("headlineStart")}{" "}
            <span className="text-gradient-accent">
              {t("headlineHighlight1")}
            </span>{" "}
            {t("headlineMiddle")}{" "}
            <span className="text-gradient-accent">
              {t("headlineHighlight2")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-base text-foreground-muted text-balance sm:text-lg"
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <Magnetic>
              <Button
                size="lg"
                className="group"
                onClick={() => {
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("ctaPrimary")}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("ctaSecondary")}
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex items-center justify-center gap-6 text-sm text-foreground-muted"
          >
            <a
              href={site.resumeUrl}
              download
              className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
            >
              <Download className="h-4 w-4" />
              {t("resume")}
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
            >
              <GithubIcon className="h-4 w-4" />
              {t("github")}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
            >
              <LinkedinIcon className="h-4 w-4" />
              {t("linkedin")}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 sm:mt-20"
        >
          <HeroBanner />
        </motion.div>

        <div className="mt-16 sm:mt-20">
          <Stats />
        </div>
      </Container>
    </section>
  );
}
