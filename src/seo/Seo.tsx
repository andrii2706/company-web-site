import { useEffect } from "react";
import { useLocation } from "react-router";
import { useLanguage } from "../i18n/LanguageContext";

const ORIGIN = "https://pav-it.ct.ws";

type PageKey = "home" | "about-us" | "services" | "contact-us";

// SEO-тексти сторінок (title + description) для кожної мови.
const META: Record<"uk" | "en", Record<PageKey, { title: string; description: string }>> = {
  uk: {
    home: {
      title: "PAV IT — розробка веб-додатків та фронтенд-агентство",
      description:
        "PAV IT — агенція фронтенд- та веб-розробки: Angular, React, Next.js, Vue.js, TypeScript, WordPress, REST API. Створюємо та підтримуємо бізнес-критичні веб-додатки.",
    },
    "about-us": {
      title: "Про нас — PAV IT",
      description: "Команда PAV IT: досвід фронтенд- та веб-розробки, підхід до архітектури, підтримуваності та якості коду.",
    },
    services: {
      title: "Послуги — розробка веб-додатків | PAV IT",
      description: "Послуги PAV IT: фронтенд-розробка, веб-додатки, інтеграція REST API, WordPress та автоматизація.",
    },
    "contact-us": {
      title: "Контакти — PAV IT",
      description: "Зв'яжіться з PAV IT, щоб обговорити ваш веб-проєкт: оцінка, терміни та формат співпраці.",
    },
  },
  en: {
    home: {
      title: "PAV IT — Front-End & Web Development Agency",
      description:
        "PAV IT is a front-end and web development agency: Angular, React, Next.js, Vue.js, TypeScript, WordPress and REST API. We build and maintain business-critical web applications.",
    },
    "about-us": {
      title: "About us — PAV IT",
      description: "Meet PAV IT: our front-end and web development experience, and how we approach architecture, maintainability and quality.",
    },
    services: {
      title: "Services — Web Development | PAV IT",
      description: "PAV IT services: front-end development, web applications, REST API integration, WordPress and automation.",
    },
    "contact-us": {
      title: "Contact — PAV IT",
      description: "Get in touch with PAV IT to discuss your web project: estimate, timeline and way of working.",
    },
  },
};

function setMeta(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function metaByName(name: string, content: string) {
  setMeta(
    `meta[name="${name}"]`,
    () => {
      const m = document.createElement("meta");
      m.setAttribute("name", name);
      return m;
    },
    "content",
    content,
  );
}

function metaByProperty(property: string, content: string) {
  setMeta(
    `meta[property="${property}"]`,
    () => {
      const m = document.createElement("meta");
      m.setAttribute("property", property);
      return m;
    },
    "content",
    content,
  );
}

function linkRel(rel: string, href: string, hreflang?: string) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  setMeta(
    selector,
    () => {
      const l = document.createElement("link");
      l.setAttribute("rel", rel);
      if (hreflang) l.setAttribute("hreflang", hreflang);
      return l;
    },
    "href",
    href,
  );
}

/**
 * Оновлює <title>, description, canonical, hreflang, Open Graph та <html lang>
 * при кожній зміні сторінки/мови. Пошукові системи (Google) виконують JS,
 * тому бачать актуальні значення для кожного URL.
 */
export function Seo() {
  const { lang } = useLanguage();
  const { pathname } = useLocation();

  useEffect(() => {
    const clean = pathname.replace(/\/+$/, "") || "/";
    const withoutLang = clean === "/en" ? "/" : clean.startsWith("/en/") ? clean.slice(3) : clean;
    const key = (withoutLang === "/" ? "home" : withoutLang.slice(1)) as PageKey;
    const meta = (META[lang] as Record<string, { title: string; description: string }>)[key] ?? META[lang].home;

    const ukUrl = ORIGIN + (withoutLang === "/" ? "/" : withoutLang);
    const enUrl = ORIGIN + (withoutLang === "/" ? "/en" : `/en${withoutLang}`);
    const current = lang === "en" ? enUrl : ukUrl;

    document.documentElement.lang = lang;
    document.title = meta.title;
    metaByName("description", meta.description);
    linkRel("canonical", current);
    linkRel("alternate", ukUrl, "uk");
    linkRel("alternate", enUrl, "en");
    linkRel("alternate", enUrl, "x-default");

    metaByProperty("og:title", meta.title);
    metaByProperty("og:description", meta.description);
    metaByProperty("og:url", current);
    metaByProperty("og:locale", lang === "en" ? "en_US" : "uk_UA");
    metaByName("twitter:title", meta.title);
    metaByName("twitter:description", meta.description);
  }, [lang, pathname]);

  return null;
}
