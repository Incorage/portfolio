"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { DragScroll } from "@/components/drag-scroll";
import { Reveal } from "@/components/reveal";
import type { Project } from "@/lib/portfolio";

export function ProjectSection({ project }: { project: Project }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImageOnTouch = (src: string) => {
    if (!window.matchMedia("(pointer: coarse)").matches) return;
    setSelectedImage(src);
  };

  useEffect(() => {
    if (!selectedImage) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedImage]);

  return (
    <section className="flex w-full flex-col gap-8" aria-labelledby={`${project.year}-${project.logoAlt}`}>
      <Reveal duration={900}>
      <div className={`${project.colorClass} flex w-full flex-col gap-6 overflow-hidden rounded-2xl p-8 max-[599px]:p-6`}>
        <Reveal delay={90} duration={850}>
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

        <Reveal delay={180} duration={850}>
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

        <Reveal delay={260} duration={520}>
        <DragScroll className="project-scroll-track scrollbar-none -mx-8 flex w-[calc(100%+64px)] items-start gap-6 overflow-x-auto px-8 py-3 max-[599px]:-mx-6 max-[599px]:w-[calc(100%+48px)] max-[599px]:px-6">
          {project.images.map((src, index) => (
            <button
              aria-label={`Открыть скрин ${index + 1} проекта ${project.title}`}
              className={
                project.imageKind === "phone"
                  ? "project-screen group/screen relative aspect-[1940/4096] min-h-[422px] min-w-[200px] flex-[1_0_200px] cursor-zoom-in desktop:cursor-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  : "project-screen group/screen relative h-[377.554px] min-w-[700px] flex-[1_0_700px] cursor-zoom-in desktop:cursor-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              }
              key={src}
              onClick={() => openImageOnTouch(src)}
              style={{ "--screen-reveal-delay": `${index * 70}ms` } as React.CSSProperties}
              type="button"
            >
              <span
                className={`absolute inset-0 overflow-hidden rounded-sm transition-[border-radius,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] desktop:group-hover/screen:scale-[1.025] desktop:group-hover/screen:shadow-[0_14px_34px_rgba(45,44,58,0.16)] desktop:group-focus-visible/screen:scale-[1.025] desktop:group-focus-visible/screen:shadow-[0_14px_34px_rgba(45,44,58,0.16)] ${
                  project.colorClass === "bg-case-1" || project.colorClass === "bg-case-2"
                    ? "desktop:group-hover/screen:rounded-[34px] desktop:group-focus-visible/screen:rounded-[34px]"
                    : ""
                }`}
              >
                <img
                  alt={`${project.title}, экран ${index + 1}`}
                  className="size-full object-cover"
                  draggable={false}
                  loading={index === 0 ? "eager" : "lazy"}
                  src={src}
                />
              </span>
            </button>
          ))}
        </DragScroll>
        <p
          className={`inline-flex items-center gap-2 text-xs leading-4 text-muted ${
            project.imageKind === "phone" ? "desktop:hidden" : ""
          }`}
        >
          <img alt="" aria-hidden className="size-4" src="drag-icon.svg" />
          <span>Потяните в сторону, чтобы посмотреть все скрины</span>
        </p>
        </Reveal>
      </div>
      </Reveal>

      <Reveal delay={120} duration={850}>
      <ProjectDetails project={project} />
      </Reveal>

      {selectedImage && typeof document !== "undefined" ? createPortal(
        <div
          aria-modal="true"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
          role="dialog"
        >
          <button
            aria-label="Закрыть просмотр"
            className="absolute right-4 top-4 inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={() => setSelectedImage(null)}
            type="button"
          >
            <X aria-hidden className="size-6" />
          </button>
          <img
            alt={`${project.title}, полный скрин`}
            className="max-h-[92vh] max-w-[92vw] object-contain"
            onClick={(event) => event.stopPropagation()}
            src={selectedImage}
          />
        </div>,
        document.body
      ) : null}
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
        <Reveal delay={index * 110} duration={850} key={block.title}>
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
