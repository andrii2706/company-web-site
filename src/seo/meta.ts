/**
 * Єдине джерело SEO-даних: використовується і в браузері (Seo.tsx),
 * і під час білду (prerender), щоб title/description/canonical
 * завжди збігались у статичному HTML та після завантаження React.
 */
export const ORIGIN = "https://pav-it.ct.ws";

export type Lang = "uk" | "en";
export type PageKey = "home" | "about-us" | "services" | "contact-us";

export const PAGE_KEYS: PageKey[] = ["home", "about-us", "services", "contact-us"];

export interface PageMeta {
  title: string;
  description: string;
  /** Назва сторінки для хлібних крихт (BreadcrumbList). */
  crumb: string;
}

// Бренд пишемо двома способами — «PAV IT» та «ПАВ ІТ», бо українці шукають і так, і так.
export const META: Record<Lang, Record<PageKey, PageMeta>> = {
  uk: {
    home: {
      title: "PAV IT (ПАВ ІТ) — створення сайтів та розробка веб-додатків",
      description:
        "PAV IT (ПАВ ІТ) — агенція веб-розробки: створення сайтів і веб-додатків на Angular, React, Next.js, Vue.js, інтеграції REST API, WordPress. Замовте розробку для бізнесу.",
      crumb: "Головна",
    },
    "about-us": {
      title: "Про нас — PAV IT (ПАВ ІТ), агенція веб-розробки",
      description:
        "Про агенцію PAV IT (ПАВ ІТ): досвід у веб- та фронтенд-розробці, підхід до архітектури, якості коду та підтримки проєктів.",
      crumb: "Про нас",
    },
    services: {
      title: "Послуги: розробка сайтів і веб-додатків — PAV IT (ПАВ ІТ)",
      description:
        "Послуги PAV IT (ПАВ ІТ): розробка сайтів, веб-додатків і дашбордів, фронтенд на Angular, React, Next.js, Vue.js, інтеграція REST API, WordPress, автоматизація.",
      crumb: "Послуги",
    },
    "contact-us": {
      title: "Контакти — замовити розробку сайту | PAV IT (ПАВ ІТ)",
      description:
        "Зв'яжіться з PAV IT (ПАВ ІТ), щоб замовити розробку сайту чи веб-додатка: обговоримо задачу, терміни та вартість.",
      crumb: "Контакти",
    },
  },
  en: {
    home: {
      title: "PAV IT — Front-End & Web Development Agency (Angular, React, Next.js)",
      description:
        "PAV IT (ПАВ ІТ) is a front-end and web development agency: websites and web applications with Angular, React, Next.js, Vue.js, REST API and WordPress.",
      crumb: "Home",
    },
    "about-us": {
      title: "About us — PAV IT, Web Development Agency",
      description:
        "Meet PAV IT: our front-end and web development experience and how we approach architecture, code quality and long-term support.",
      crumb: "About us",
    },
    services: {
      title: "Services: Web & Front-End Development — PAV IT",
      description:
        "PAV IT services: website and web application development, dashboards, front-end with Angular, React, Next.js and Vue.js, REST API integration, WordPress.",
      crumb: "Services",
    },
    "contact-us": {
      title: "Contact — Hire a Web Development Team | PAV IT",
      description:
        "Contact PAV IT to discuss your website or web application: scope, timeline and estimate.",
      crumb: "Contact",
    },
  },
};

/** Канонічна адреса сторінки (завжди зі слешем в кінці — так її віддає сервер). */
export function urlFor(lang: Lang, key: PageKey): string {
  const base = lang === "en" ? `${ORIGIN}/en/` : `${ORIGIN}/`;
  return key === "home" ? base : `${base}${key}/`;
}

/** Визначає мову та ключ сторінки за pathname. Невідомий шлях → головна. */
export function parsePath(pathname: string): { lang: Lang; key: PageKey } {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const isEn = clean === "/en" || clean.startsWith("/en/");
  const rest = isEn ? clean.slice(3) || "/" : clean;
  const slug = rest === "/" ? "home" : rest.slice(1);
  const key = (PAGE_KEYS as string[]).includes(slug) ? (slug as PageKey) : "home";
  return { lang: isEn ? "en" : "uk", key };
}
