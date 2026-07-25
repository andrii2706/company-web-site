import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocation } from "react-router";
import { translations, type Lang, type Translations } from "./translations";

interface LanguageContextValue {
  lang: Lang;
  t: Translations;
  /** Перетворює звичайний шлях ("/services") на шлях поточної мови ("/en/services"). */
  localizePath: (path: string) => string;
  /** Шлях поточної сторінки іншою мовою — для перемикача мов. */
  otherLangPath: string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();

  const value = useMemo<LanguageContextValue>(() => {
    const isEn = location.pathname === "/en" || location.pathname.startsWith("/en/");
    const lang: Lang = isEn ? "en" : "uk";
    const t = translations[lang];

    const localizePath = (path: string) => {
      const clean = path.startsWith("/") ? path : `/${path}`;
      if (lang !== "en") return clean;
      return clean === "/" ? "/en" : `/en${clean}`;
    };

    const pathWithoutLangPrefix = isEn ? location.pathname.slice(3) || "/" : location.pathname;
    const otherLangPath = isEn
      ? pathWithoutLangPrefix
      : pathWithoutLangPrefix === "/"
        ? "/en"
        : `/en${pathWithoutLangPrefix}`;

    return { lang, t, localizePath, otherLangPath };
  }, [location.pathname]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage() має викликатись всередині <LanguageProvider>");
  }
  return ctx;
}
