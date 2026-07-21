"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { ButtonLink } from "@/components/button";
import { ProjectSection } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SocialIconButton } from "@/components/social-icon-button";
import { projects, profile, siteCopy, type Language } from "@/lib/portfolio";

export default function Home() {
  const [language, setLanguage] = useState<Language>("ru");
  const copy = siteCopy[language];
  const currentProjects = projects[language];
  const toggleLanguage = () => setLanguage((currentLanguage) => (currentLanguage === "ru" ? "en" : "ru"));

  return (
    <main className="flex min-h-screen justify-center bg-page p-6" id="top" lang={language}>
      <div className="flex w-full max-w-[1200px] flex-col items-start gap-16">
        <Header copy={copy} language={language} onChangeLanguage={toggleLanguage} />

        <section className="flex w-full flex-col items-start gap-8" aria-labelledby="intro-title">
          <div className="flex w-full flex-col items-start gap-4 text-ink">
            <Reveal
              as="h1"
              className="max-w-[540px] text-[32px] font-semibold leading-[40px] desktop:max-w-[670px] desktop:text-[40px] desktop:leading-normal"
              delay={0}
              duration={900}
              id="intro-title"
            >
              {copy.heroTitle}
            </Reveal>
            <Reveal
              as="p"
              className="max-w-[520px] text-base leading-5 desktop:max-w-[680px] desktop:text-xl desktop:leading-6"
              delay={120}
              duration={850}
            >
              {copy.heroDescription}
            </Reveal>
          </div>
          <Reveal delay={290} duration={800}>
            <ButtonLink href={profile.telegram} icon="telegram">
              {copy.telegramCta}
            </ButtonLink>
          </Reveal>
        </section>

        <section className="flex w-full flex-col items-start gap-8" aria-labelledby="portfolio-title">
          <Reveal
            as="h2"
            className="text-xl font-medium leading-6 text-muted desktop:text-2xl desktop:leading-[30px]"
            duration={800}
            id="portfolio-title"
          >
            {copy.portfolioTitle}
          </Reveal>
          {currentProjects.map((project) => (
            <ProjectSection copy={copy.projectLabels} key={project.title} project={project} />
          ))}
        </section>

        <Reveal
          as="section"
          className="flex w-full flex-col items-center justify-center gap-6 rounded-2xl bg-footer px-6 py-16 text-center"
          duration={900}
        >
          <Reveal
            as="h2"
            className="max-w-[420px] text-[32px] font-semibold leading-normal text-invert"
            delay={80}
            duration={850}
          >
            {copy.closingTitle}
          </Reveal>
          <Reveal delay={180} duration={800}>
            <ButtonLink href={profile.telegram} icon="telegram">
              {copy.telegramCta}
            </ButtonLink>
          </Reveal>
          <Reveal delay={280} duration={800}>
            <ButtonLink href={profile.resume} icon="download" variant="inverted">
              {copy.resumeCta}
            </ButtonLink>
          </Reveal>
        </Reveal>

        <Reveal
          as="footer"
          className="flex min-h-24 w-full flex-col items-center justify-center gap-6 text-center desktop:flex-row desktop:justify-between desktop:gap-6 desktop:text-left"
          duration={850}
        >
          <Reveal className="order-3 desktop:order-none desktop:flex-1" delay={40} duration={750}>
            <p className="inline-flex items-center justify-center gap-1 whitespace-nowrap text-base font-semibold leading-5 desktop:justify-start">
              <span aria-hidden>&copy;</span>
              <span>Roman Ushakov 2026</span>
            </p>
          </Reveal>
          <Reveal className="order-1 desktop:order-none" delay={80} duration={750}>
            <a className="whitespace-nowrap text-xl font-semibold leading-none" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </Reveal>
          <Reveal className="order-2 desktop:order-none" delay={180} duration={750}>
            <div className="flex items-center">
              <SocialIconButton href={profile.telegram} label="Telegram" type="telegram" />
              <SocialIconButton href={profile.vk} label="VK" type="vk" />
            </div>
          </Reveal>
        </Reveal>
      </div>
    </main>
  );
}
