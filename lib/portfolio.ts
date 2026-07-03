import { assets } from "@/lib/assets";

export type Project = {
  title: string;
  year: string;
  logo: string;
  logoAlt: string;
  colorClass: string;
  images: readonly string[];
  imageKind: "phone" | "desktop";
  note?: string;
  result: string;
  role: {
    title: string;
    details: string;
  };
  skills: readonly string[];
  team: readonly string[];
};

export const profile = {
  name: "Роман Ушаков",
  email: "ushakoffroman@gmail.com",
  location: "Россия, г. Самара",
  telegram: "https://t.me/romashiro",
  vk: "https://vk.com/roman_ushakoff",
  resume: "https://drive.google.com/file/d/1oJE9aK4fnsiGPYTrmjAMpWAreDDBD0RA/view?usp=sharing"
} as const;

export const projects: readonly Project[] = [
  {
    title: "Система управления магазинами по франшизе",
    year: "2026",
    logo: assets.logoKurt,
    logoAlt: "КУРТ",
    colorClass: "bg-case-1",
    images: assets.project1,
    imageKind: "phone",
    note: "Все имена и записи являются вымышленными",
    result:
      "Разработан единый интерфейс для управления операционными процессами франчайзинговой сети, объединивший обращения, кадровые заявки, учёт рабочего времени и внутренние коммуникации",
    role: {
      title: "Продуктовый дизайнер",
      details:
        "Отвечал за проектирование пользовательских сценариев, разработку интерфейсов, развитие дизайн-системы и сопровождение реализации совместно с командой разработки"
    },
    skills: ["UX-дизайн", "UI-дизайн", "Дизайн-система", "Прототипирование"],
    team: ["Я", "3 бэкендера", "2 фронтендера", "QA"]
  },
  {
    title: "Сервис поиска подработки для самозанятых",
    year: "2025",
    logo: assets.logoFlow,
    logoAlt: "Flow",
    colorClass: "bg-case-2",
    images: assets.project2,
    imageKind: "phone",
    result:
      "Спроектирован мобильный сервис для поиска и бронирования смен с геолокацией и поддержкой удалённых объектов. Пользователи получили возможность самостоятельно находить доступные вакансии и выходить на смены без участия менеджеров",
    role: {
      title: "UI-дизайнер",
      details:
        "Участвовал в проектировании пользовательских сценариев, разработке интерфейса мобильной версии сервиса"
    },
    skills: ["UI-дизайн", "Дизайн-система", "Прототипирование"],
    team: ["Я", "2 бэкендера", "1 фронтендер", "QA"]
  },
  {
    title: "CRM-система управления персоналом",
    year: "2024",
    logo: assets.logoCentr,
    logoAlt: "ЦУП",
    colorClass: "bg-case-3",
    images: assets.project3,
    imageKind: "desktop",
    note: "Все записи в таблице вымышленные",
    result:
      "Проведён редизайн ключевых разделов CRM и улучшены сценарии работы с персоналом, что позволило унифицировать внутренние процессы и повысить удобство ежедневной работы пользователей",
    role: {
      title: "Продуктовый дизайнер",
      details: "Отвечал за анализ существующих сценариев, проектирование новых пользовательских путей"
    },
    skills: [
      "UI-дизайн",
      "UX-дизайн",
      "Дизайн-система",
      "Прототипирование",
      "Проектирование бизнес-процессов",
      "Таблицы и data-heavy интерфейсы"
    ],
    team: ["Я", "4 бэкендера", "3 фронтендера", "2 QA"]
  }
] as const;
