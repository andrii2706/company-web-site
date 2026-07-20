/**
 * Клієнт для headless WordPress.
 *
 * БЕКЕНД зібраний через звичайні плагіни адмінки — без жодного кастомного PHP:
 *  - Custom Post Type UI — реєструє типи записів (pav_faq, pav_team, pav_pricing,
 *    pav_feature, pav_stat, pav_logo, pav_testimonial) з увімкненим REST API.
 *  - ACF (Advanced Custom Fields) — додає поля до кожного типу; кожна група полів
 *    має "Show in REST API" = увімкнено, тому дані приходять в об'єкті `acf`.
 *  - Одинична (не список) інформація сайту (Hero, About, Contact, Footer тощо)
 *    зберігається в ACF-полях однієї звичайної Сторінки зі слагом "site-settings".
 *
 * Через те, що на бекенді немає кастомного коду, сортування (menu_order) і
 * фільтрацію за сторінкою (pav_feature/pav_testimonial) ми свідомо робимо
 * ТУТ, на клієнті — так само надійно, а бекенд лишається на 100% no-code.
 *
 * Базовий URL:
 * - Локально Vite сам проксує "/wp-json" на WordPress (див. vite.config.ts) —
 *   тому в розробці теж можна звертатись за відносним шляхом.
 * - У проді React і WordPress на одному сервері — теж відносний шлях "/wp-json".
 * - Якщо колись знадобиться інша адреса — можна перевизначити через VITE_WP_API_URL.
 */

const WP_BASE_URL: string =
  (import.meta.env.VITE_WP_API_URL as string | undefined)?.replace(/\/$/, "") ||
  "/wp-json";

async function wpFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${WP_BASE_URL}${path}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`WP API error ${res.status} on ${path}`);
  }
  return res.json() as Promise<T>;
}

/** Завжди просимо всі записи, відсортовані за полем "Порядок" (menu_order). */
function listQuery(extra = "") {
  return `orderby=menu_order&order=asc&per_page=100${extra}`;
}

/** Прибирає HTML-теги, які WordPress завжди додає в rendered-поля (навіть у простий текст). */
function stripHtml(html: string | undefined | null): string {
  if (!html) return "";
  return html
    .replace(/<\/?p[^>]*>/g, "")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/&#8217;|&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .trim();
}

/** Розбиває textarea-поле (по одному пункту на рядок) на масив рядків без порожніх. */
function splitLines(value: string | undefined | null): string[] {
  if (!value) return [];
  return value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

// ---------- Типи, з якими працюють компоненти (не змінювались) ----------

export interface WpFaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface WpTeamMember {
  id: number;
  name: string;
  role: string;
  color: string;
}

export interface WpPricingPlan {
  id: number;
  name: string;
  price: string;
  period: string;
  shortDesc: string;
  features: string[];
  popular: boolean;
  ctaText: string;
  ctaStyle: "primary" | "secondary";
}

export interface WpFeatureCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  page: "dashboard" | "services" | "about" | string;
  featuresList: string[];
}

export interface WpStat {
  id: number;
  value: string;
  label: string;
}

export interface WpLogo {
  id: number;
  name: string;
}

export interface WpTestimonial {
  id: number;
  quote: string;
  authorName: string;
  authorRole: string;
}

export interface WpSiteSettings {
  [key: string]: string;
}

// ---------- Внутрішні "сирі" типи від WP REST + ACF ----------

interface RawAcfPost {
  id: number;
  title: { rendered: string };
  content?: { rendered: string };
  acf?: Record<string, unknown>;
}

function acfStr(post: RawAcfPost, key: string): string {
  const v = post.acf?.[key];
  return typeof v === "string" ? v : "";
}
function acfBool(post: RawAcfPost, key: string): boolean {
  return post.acf?.[key] === true;
}

// ---------- Публічні функції для компонентів (сигнатури не змінювались) ----------

export async function getFaqs(): Promise<WpFaqItem[]> {
  const posts = await wpFetch<RawAcfPost[]>(`/wp/v2/pav-faq?${listQuery()}&_fields=id,title,content`);
  return posts.map((p) => ({
    id: p.id,
    question: stripHtml(p.title.rendered),
    answer: stripHtml(p.content?.rendered),
  }));
}

export async function getTeam(): Promise<WpTeamMember[]> {
  const posts = await wpFetch<RawAcfPost[]>(`/wp/v2/pav-team?${listQuery()}&_fields=id,title,acf`);
  return posts.map((p) => ({
    id: p.id,
    name: stripHtml(p.title.rendered),
    role: acfStr(p, "role"),
    color: acfStr(p, "color") || "#8A5A2B",
  }));
}

export async function getPricingPlans(): Promise<WpPricingPlan[]> {
  const posts = await wpFetch<RawAcfPost[]>(`/wp/v2/pav-pricing?${listQuery()}&_fields=id,title,acf`);
  return posts.map((p) => ({
    id: p.id,
    name: stripHtml(p.title.rendered),
    price: acfStr(p, "price"),
    period: acfStr(p, "price_period"),
    shortDesc: acfStr(p, "short_desc"),
    features: splitLines(acfStr(p, "features")),
    popular: acfBool(p, "popular"),
    ctaText: acfStr(p, "cta_text") || "Обрати тариф",
    ctaStyle: acfStr(p, "cta_style") === "secondary" ? "secondary" : "primary",
  }));
}

/**
 * Картки-можливості. Оскільки на бекенді немає кастомного PHP-фільтра за
 * "pav_page", тягнемо всі записи одним запитом і фільтруємо тут — записів
 * там небагато (десяток), тож зайвого навантаження це не створює.
 */
export async function getFeatureCards(page?: "dashboard" | "services" | "about"): Promise<WpFeatureCard[]> {
  const posts = await wpFetch<RawAcfPost[]>(`/wp/v2/pav-feature?${listQuery()}&_fields=id,title,content,acf`);
  const mapped = posts.map((p) => ({
    id: p.id,
    title: stripHtml(p.title.rendered),
    description: stripHtml(p.content?.rendered),
    icon: acfStr(p, "icon") || "grid",
    page: acfStr(p, "page") || "dashboard",
    featuresList: splitLines(acfStr(p, "features_list")),
  }));
  return page ? mapped.filter((f) => f.page === page) : mapped;
}

export async function getStats(): Promise<WpStat[]> {
  const posts = await wpFetch<RawAcfPost[]>(`/wp/v2/pav-stat?${listQuery()}&_fields=id,title,acf`);
  return posts.map((p) => ({
    id: p.id,
    value: stripHtml(p.title.rendered),
    label: acfStr(p, "stat_label"),
  }));
}

export async function getLogos(): Promise<WpLogo[]> {
  const posts = await wpFetch<RawAcfPost[]>(`/wp/v2/pav-logo?${listQuery()}&_fields=id,title`);
  return posts.map((p) => ({ id: p.id, name: stripHtml(p.title.rendered) }));
}

export async function getTestimonials(): Promise<WpTestimonial[]> {
  const posts = await wpFetch<RawAcfPost[]>(`/wp/v2/pav-testimonial?${listQuery()}&_fields=id,title,content,acf`);
  return posts.map((p) => ({
    id: p.id,
    quote: stripHtml(p.content?.rendered),
    authorName: stripHtml(p.title.rendered),
    authorRole: acfStr(p, "author_role"),
  }));
}

/**
 * Всі "одиничні" тексти сайту зберігаються в ACF-полях ОДНОГО запису типу
 * pav_settings (окремий тип, а не сторінка — щоб не прив'язуватись до
 * конкретного ID). Беремо перший (і єдиний) запис і повертаємо його
 * acf-об'єкт як є (ключі полів у ACF = ключі, яких очікують компоненти).
 */
export async function getSiteSettings(): Promise<WpSiteSettings> {
  const posts = await wpFetch<RawAcfPost[]>(`/wp/v2/pav-settings?per_page=1&_fields=id,acf`);
  const settings = posts[0]?.acf ?? {};
  const result: WpSiteSettings = {};
  for (const [key, value] of Object.entries(settings)) {
    if (typeof value === "string") result[key] = value;
  }
  return result;
}
