import { Header } from "@/components/header";
import { ButtonLink } from "@/components/button";
import { ProjectSection } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SocialIconButton } from "@/components/social-icon-button";
import { projects, profile } from "@/lib/portfolio";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center bg-page p-6" id="top">
      <div className="flex w-full max-w-[1200px] flex-col items-start gap-16">
        <Header />

        <section className="flex w-full flex-col items-start gap-8" aria-labelledby="intro-title">
          <div className="flex w-full flex-col items-start gap-4 text-ink">
            <Reveal as="p" className="text-xs leading-4 text-ink" delay={0} duration={700}>
              Продуктовый дизайнер <span className="mx-1">•</span> 2+ года
            </Reveal>
            <Reveal
              as="h1"
              className="max-w-[540px] text-[32px] font-semibold leading-normal desktop:max-w-[860px] desktop:text-[40px]"
              delay={90}
              duration={900}
              id="intro-title"
            >
              Проектирую сложные продукты, которыми легко пользоваться
            </Reveal>
            <Reveal
              as="p"
              className="max-w-[520px] text-base leading-5 desktop:max-w-[650px] desktop:text-xl desktop:leading-6"
              delay={180}
              duration={850}
            >
              Я Роман, продуктовый дизайнер. Работаю с бизнес-процессами, сложными пользовательскими сценариями и дизайн-системами
            </Reveal>
          </div>
          <Reveal delay={290} duration={800}>
          <ButtonLink href={profile.telegram} icon="telegram">
            Написать в тг
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
            Мои работы
          </Reveal>
          {projects.map((project) => (
            <ProjectSection key={project.title} project={project} />
          ))}
        </section>

        <Reveal as="section" className="flex w-full flex-col items-center justify-center gap-6 rounded-2xl bg-footer px-6 py-16 text-center" duration={900}>
          <Reveal
            as="h2"
            className="max-w-[420px] text-[32px] font-semibold leading-normal text-invert"
            delay={80}
            duration={850}
          >
            Спасибо за просмотр! Буду рад сотрудничеству
          </Reveal>
          <Reveal delay={180} duration={800}>
          <ButtonLink href={profile.telegram} icon="telegram">
            Написать в тг
          </ButtonLink>
          </Reveal>
          <Reveal delay={280} duration={800}>
          <ButtonLink href={profile.resume} icon="download" variant="inverted">
            Скачать резюме
          </ButtonLink>
          </Reveal>
        </Reveal>

        <Reveal
          as="footer"
          className="flex min-h-24 w-full flex-col items-center justify-center gap-6 text-center desktop:flex-row desktop:justify-center"
          duration={850}
        >
          <Reveal delay={80} duration={750}>
          <a className="whitespace-nowrap text-xl font-semibold leading-none" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          </Reveal>
          <Reveal delay={180} duration={750}>
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
