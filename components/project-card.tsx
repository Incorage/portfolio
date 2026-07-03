import { DragScroll } from "@/components/drag-scroll";
import { Reveal } from "@/components/reveal";
import type { Project } from "@/lib/portfolio";

export function ProjectSection({ project }: { project: Project }) {
  return (
    <section className="flex w-full flex-col gap-8" aria-labelledby={`${project.year}-${project.logoAlt}`}>
      <Reveal duration={700}>
      <div className={`${project.colorClass} flex w-full flex-col gap-6 overflow-hidden rounded-2xl p-8 max-[599px]:p-6`}>
        <Reveal delay={90} duration={650}>
        <div className="flex w-full items-center gap-6">
          <div className="min-w-0 flex-1">
            <div
              className={
                project.logoAlt === "КУРТ"
                  ? "relative h-[60px] w-full max-w-[235px]"
                  : "relative h-[60px] w-full max-w-[100px] overflow-hidden"
              }
            >
              <img
                alt={project.logoAlt}
                className="size-full object-contain object-left"
                src={project.logo}
              />
            </div>
          </div>
          <p className="shrink-0 text-base leading-5 desktop:text-xl desktop:leading-6">{project.year}</p>
        </div>
        </Reveal>

        <Reveal delay={180} duration={650}>
        <div className="flex w-full flex-col gap-1 text-ink">
          <h2
            className="max-w-[460px] text-2xl font-medium leading-[30px] desktop:text-[32px] desktop:leading-10"
            id={`${project.year}-${project.logoAlt}`}
          >
            {project.title}
          </h2>
          {project.note ? (
            <p className="text-xs leading-4">
              <span className="text-danger">*</span>
              {project.note}
            </p>
          ) : null}
        </div>
        </Reveal>

        <Reveal delay={290} duration={750}>
        <DragScroll className="scrollbar-none -mx-8 flex w-[calc(100%+64px)] items-start gap-6 overflow-x-auto px-8 max-[599px]:-mx-6 max-[599px]:w-[calc(100%+48px)] max-[599px]:px-6">
          {project.images.map((src, index) => (
            <div
              className={
                project.imageKind === "phone"
                  ? "relative aspect-[1940/4096] min-h-[422px] min-w-[200px] flex-[1_0_200px] overflow-hidden"
                  : "relative h-[377.554px] min-w-[700px] flex-[1_0_700px] overflow-hidden"
              }
              key={src}
            >
              <img
                alt={`${project.title}, экран ${index + 1}`}
                className="size-full object-cover"
                draggable={false}
                loading={index === 0 ? "eager" : "lazy"}
                src={src}
              />
            </div>
          ))}
        </DragScroll>
        </Reveal>
      </div>
      </Reveal>

      <Reveal delay={120} duration={650}>
      <ProjectDetails project={project} />
      </Reveal>
    </section>
  );
}

function ProjectDetails({ project }: { project: Project }) {
  const blocks = [
    {
      title: "Результат",
      content: <p>{project.result}</p>
    },
    {
      title: "Роль",
      content: (
        <>
          <p>{project.role.title}</p>
          <p>{project.role.details}</p>
        </>
      )
    },
    {
      title: "Навыки",
      content: <BulletList items={project.skills} />
    },
    {
      title: "Команда",
      content: <BulletList items={project.team} />
    }
  ];

  return (
    <div className="project-details-grid w-full">
      {blocks.map((block, index) => (
        <Reveal delay={index * 110} duration={650} key={block.title}>
          <InfoBlock title={block.title}>{block.content}</InfoBlock>
        </Reveal>
      ))}
    </div>
  );
}

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="project-info-block flex flex-col items-start gap-4">
      <h3 className="text-xl font-medium leading-6 text-muted desktop:text-2xl desktop:leading-[30px]">{title}</h3>
      <div className="flex w-full flex-col gap-4 text-sm leading-4 desktop:text-base desktop:leading-5">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex list-disc flex-col gap-1 pl-[21px] text-sm leading-4 desktop:pl-6 desktop:text-base desktop:leading-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
