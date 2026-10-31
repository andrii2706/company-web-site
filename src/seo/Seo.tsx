import { useEffect } from "react";
import { useLocation } from "react-router";
import { META, ORIGIN, parsePath, urlFor } from "./meta";

function ensure(selector: string, create: () => HTMLElement): HTMLElement {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
}

function metaTag(attr: "name" | "property", key: string, content: string) {
  const el = ensure(`meta[${attr}="${key}"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute(attr, key);
    return m;
  });
  el.setAttribute("content", content);
}

function linkTag(rel: string, href: string, hreflang?: string) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  const el = ensure(selector, () => {
    const l = document.createElement("link");
    l.setAttribute("rel", rel);
    if (hreflang) l.setAttribute("hreflang", hreflang);
    return l;
  });
  el.setAttribute("href", href);
}

/**
 * Оновлює <title>, description, canonical, hreflang, Open Graph та <html lang>
 * під час навігації між сторінками й мовами. Початкові значення вже є
 * у статичному HTML (prerender), тут вони лише синхронізуються.
 */
export function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const { lang, key } = parsePath(pathname);
    const meta = META[lang][key];
    const current = urlFor(lang, key);

    document.documentElement.lang = lang;
    document.title = meta.title;
    metaTag("name", "description", meta.description);
    linkTag("canonical", current);
    linkTag("alternate", urlFor("uk", key), "uk");
    linkTag("alternate", urlFor("en", key), "en");
    linkTag("alternate", urlFor("en", key), "x-default");

    metaTag("property", "og:title", meta.title);
    metaTag("property", "og:description", meta.description);
    metaTag("property", "og:url", current);
    metaTag("property", "og:locale", lang === "en" ? "en_US" : "uk_UA");
    metaTag("property", "og:image", `${ORIGIN}/og-image.png`);
    metaTag("name", "twitter:title", meta.title);
    metaTag("name", "twitter:description", meta.description);
  }, [pathname]);

  return null;
}
