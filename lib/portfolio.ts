import { assets } from "@/lib/assets";

export type Language = "ru" | "en";

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

export type SiteCopy = {
  heroTitle: string;
  heroDescription: string;
  telegramCta: string;
  portfolioTitle: string;
  closingTitle: string;
  resumeCta: string;
  mailCta: string;
  copiedMail: string;
  mainNav: string;
  mobileNav: string;
  openMenu: string;
  closeMenu: string;
  switchLanguage: string;
  projectLabels: {
    result: string;
    role: string;
    skills: string;
    team: string;
    dragHint: string;
    openImage: (index: number, title: string) => string;
    closeImage: string;
    fullImage: (title: string) => string;
  };
};

export const profile = {
  name: {
    ru: "Роман Ушаков",
    en: "Roman Ushakov"
  },
  email: "ushakoffroman@gmail.com",
  location: {
    ru: "Россия, г. Самара",
    en: "Russia, Samara"
  },
  telegram: "https://t.me/romashiro",
  vk: "https://vk.com/roman_ushakoff",
  resume: "https://drive.google.com/file/d/1oJE9aK4fnsiGPYTrmjAMpWAreDDBD0RA/view?usp=sharing"
} as const;

export const siteCopy: Record<Language, SiteCopy> = {
  ru: {
    heroTitle: "Проектирую цифровые продукты для бизнеса",
    heroDescription:
      "UX/UI-дизайнер с опытом 2+ года. Создаю CRM-системы, корпоративные сервисы и мобильные приложения",
    telegramCta: "Написать в тг",
    portfolioTitle: "Мои работы",
    closingTitle: "Спасибо за просмотр! Буду рад сотрудничеству",
    resumeCta: "Скачать резюме",
    mailCta: "Почта",
    copiedMail: "Почта скопирована",
    mainNav: "Основная навигация",
    mobileNav: "Мобильная навигация",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    switchLanguage: "Сменить язык",
    projectLabels: {
      result: "Результат",
      role: "Роль",
      skills: "Навыки",
      team: "Команда",
      dragHint: "Потяните в сторону, чтобы посмотреть все скрины",
      openImage: (index, title) => `Открыть скрин ${index} проекта ${title}`,
      closeImage: "Закрыть просмотр",
      fullImage: (title) => `${title}, полный скрин`
    }
  },
  en: {
    heroTitle: "Designing digital products for business",
    heroDescription:
      "UX/UI designer with 2+ years of experience. I create CRM systems, corporate services, and mobile applications",
    telegramCta: "Message me on Telegram",
    portfolioTitle: "My work",
    closingTitle: "Thanks for watching! I’d be happy to collaborate",
    resumeCta: "Download resume",
    mailCta: "Email",
    copiedMail: "Email copied",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLanguage: "Switch language",
    projectLabels: {
      result: "Result",
      role: "Role",
      skills: "Skills",
      team: "Team",
      dragHint: "Drag sideways to see all screens",
      openImage: (index, title) => `Open screen ${index} from ${title}`,
      closeImage: "Close preview",
      fullImage: (title) => `${title}, full-size screen`
    }
  }
};

export const projects = {
  ru: [
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
        title: "UX/UI-дизайнер",
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
        title: "UX/UI-дизайнер",
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
  ],
  en: [
    {
      title: "Franchise store management system",
      year: "2026",
      logo: assets.logoKurt,
      logoAlt: "KURT",
      colorClass: "bg-case-1",
      images: assets.project1,
      imageKind: "phone",
      note: "All names and records are fictional",
      result:
        "Designed a unified interface for managing the operational processes of a franchise network, bringing together requests, HR applications, time tracking, and internal communications",
      role: {
        title: "UX/UI designer",
        details:
          "Responsible for user flows, interface design, design system development, and implementation support together with the development team"
      },
      skills: ["UX design", "UI design", "Design system", "Prototyping"],
      team: ["Me", "3 backend developers", "2 frontend developers", "QA"]
    },
    {
      title: "Job search service for self-employed workers",
      year: "2025",
      logo: assets.logoFlow,
      logoAlt: "Flow",
      colorClass: "bg-case-2",
      images: assets.project2,
      imageKind: "phone",
      result:
        "Designed a mobile service for finding and booking shifts with geolocation and support for remote sites. Users can independently find available jobs and take shifts without manager involvement",
      role: {
        title: "UI designer",
        details: "Worked on user flows and the mobile interface for the service"
      },
      skills: ["UI design", "Design system", "Prototyping"],
      team: ["Me", "2 backend developers", "1 frontend developer", "QA"]
    },
    {
      title: "CRM system for personnel management",
      year: "2024",
      logo: assets.logoCentr,
      logoAlt: "CUP",
      colorClass: "bg-case-3",
      images: assets.project3,
      imageKind: "desktop",
      note: "All records in the table are fictional",
      result:
        "Redesigned key CRM sections and improved personnel management workflows, helping unify internal processes and make everyday work easier for users",
      role: {
        title: "UX/UI designer",
        details: "Responsible for analyzing existing scenarios and designing new user flows"
      },
      skills: [
        "UI design",
        "UX design",
        "Design system",
        "Prototyping",
        "Business process design",
        "Tables and data-heavy interfaces"
      ],
      team: ["Me", "4 backend developers", "3 frontend developers", "2 QA"]
    }
  ]
} satisfies Record<Language, readonly Project[]>;
