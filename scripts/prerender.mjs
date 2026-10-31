/**
 * Prerender: після `vite build` створює для кожної сторінки (uk + en) окремий
 * HTML-файл із готовим контентом і правильними meta-тегами, а також sitemap.xml.
 * Завдяки цьому пошукові роботи бачать текст сторінок без виконання JavaScript.
 * React при завантаженні просто замінює цей контент на живий (createRoot).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const { render, META, PAGE_KEYS, urlFor, ORIGIN } = await import(pathToFileURL(ssrEntry).href);
const template = fs.readFileSync(path.join(dist, "index.html"), "utf-8");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function routePath(lang, key) {
  const base = lang === "en" ? "/en" : "";
  return key === "home" ? (base || "/") : `${base}/${key}`;
}

function headBlock(lang, key) {
  const meta = META[lang][key];
  const url = urlFor(lang, key);
  const lines = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<link rel="alternate" hreflang="uk" href="${urlFor("uk", key)}" />`,
    `<link rel="alternate" hreflang="en" href="${urlFor("en", key)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${urlFor("en", key)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="${lang === "en" ? "en_US" : "uk_UA"}" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
  ];
  if (key !== "home") {
    const crumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: META[lang].home.crumb, item: urlFor(lang, "home") },
        { "@type": "ListItem", position: 2, name: meta.crumb, item: url },
      ],
    };
    lines.push(`<script type="application/ld+json">${JSON.stringify(crumbs)}</script>`);
  }
  return lines.join("\n    ");
}

function buildPage(lang, key, appHtml) {
  let html = template;
  html = html.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`);
  // прибираємо загальні (українські за замовчуванням) теги з шаблону…
  html = html
    .replace(/<title>[\s\S]*?<\/title>/, "<!--SEO-HEAD-->")
    .replace(/\s*<meta\s+name="description"[^>]*>/g, "")
    .replace(/\s*<link\s+rel="canonical"[^>]*>/g, "")
    .replace(/\s*<link\s+rel="alternate"\s+hreflang=[^>]*>/g, "")
    .replace(/\s*<meta\s+property="og:(?:title|description|url|locale)"[^>]*>/g, "")
    .replace(/\s*<meta\s+name="twitter:(?:title|description)"[^>]*>/g, "");
  // …і вставляємо точні для цієї сторінки
  html = html.replace("<!--SEO-HEAD-->", headBlock(lang, key));
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  return html;
}

const sitemapEntries = [];
for (const lang of ["uk", "en"]) {
  for (const key of PAGE_KEYS) {
    const route = routePath(lang, key);
    const appHtml = await render(route);
    const html = buildPage(lang, key, appHtml);

    const outFile = route === "/" ? path.join(dist, "index.html") : path.join(dist, route, "index.html");
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, html);
    console.log(`prerender  ${route.padEnd(22)} → ${path.relative(root, outFile)}  (${(html.length / 1024).toFixed(1)} KB)`);
    sitemapEntries.push({ lang, key });
  }
}

const today = new Date().toISOString().slice(0, 10);
const urls = sitemapEntries
  .map(({ lang, key }) =>
    [
      "  <url>",
      `    <loc>${urlFor(lang, key)}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <xhtml:link rel="alternate" hreflang="uk" href="${urlFor("uk", key)}"/>`,
      `    <xhtml:link rel="alternate" hreflang="en" href="${urlFor("en", key)}"/>`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor("en", key)}"/>`,
      "  </url>",
    ].join("\n"),
  )
  .join("\n");
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
);
console.log(`sitemap    ${ORIGIN}/sitemap.xml  (${sitemapEntries.length} URL)`);
