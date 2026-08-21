import { useLanguage } from "../../i18n/LanguageContext";
import { useReveal } from "../../hooks/useReveal";
import { useWpData } from "../../hooks/useWpData";
import {
  getFeatureCards,
  getSiteSettings,
  getStats,
  type WpFeatureCard,
  type WpSiteSettings,
  type WpStat,
} from "../../service/wp";

/**
 * Домашня сторінка — верстка й стилі перенесені 1:1 з референсного
 * сайту-візитки (pav-it-portfolio.html), але контент — реальний контент
 * компанії PAV IT, підключений до WordPress (той самий бекенд/патерн
 * fallback-даних, що й на сторінках Dashboard/About Us/Services):
 *
 *  - Hero              → pav-settings (hero_*)
 *  - About / credentials → pav-settings (about_*) + pav-stat
 *  - Stack              → pav-feature (page="services", featuresList)
 *  - Expertise          → pav-feature (page="dashboard", title+description)
 *  - Work               → кроки впровадження (steps_*, ті самі тексти,
 *                          що й на Dashboard — окремого типу запису
 *                          "досвід роботи" в цьому WP немає, бо це не
 *                          особисте портфоліо, а сайт компанії)
 *  - Contact             → pav-settings (contact_*)
 */

// ---------- Резервний контент (використовується, якщо WordPress тимчасово недоступний) ----------
// Ті самі значення, що вже задані як fallback на Dashboard / About Us / Contact Us.

const FALLBACK_SETTINGS: Record<"uk" | "en", WpSiteSettings> = {
  uk: {
    hero_badge: "Новий редактор компонентів вже доступний",
    hero_title: "Збирайте веб-додатки швидше, без боротьби з інфраструктурою",
    hero_subtitle:
      "Pav It з'єднує дизайн, бекенд та деплой в одному робочому просторі — ваша команда фокусується на продукті, а не на конфігурації серверів.",
    hero_cta_primary: "Почати безкоштовно",
    hero_cta_secondary: "Подивитись можливості",
    about_title: "Ми будуємо інструменти, якими самі хочемо користуватись",
    about_intro:
      "Pav It з'явився з власної фрустрації: команда з трьох розробників витрачала більше часу на налаштування інфраструктури, ніж на сам продукт. Зараз нам довіряють понад 400 команд по всьому світу.",
    steps_title: "Від ідеї до продакшну за три кроки",
    steps_subtitle: "Реальний шлях команди, яка щойно підключила Pav It до проєкту.",
    contact_title: "Поговорімо про ваш проєкт",
    contact_subtitle: "Напишіть кілька слів про команду й задачу — відповідаємо протягом одного робочого дня.",
    contact_email: "hello@pavit.dev",
    contact_social_linkedin: "#",
    contact_social_github: "#",
  },
  en: {
    hero_badge: "New component editor is now available",
    hero_title: "Build web apps faster, without fighting your infrastructure",
    hero_subtitle:
      "Pav It brings design, backend, and deployment into one workspace — your team focuses on the product, not server configuration.",
    hero_cta_primary: "Start for free",
    hero_cta_secondary: "See what's included",
    about_title: "We build the tools we want to use ourselves",
    about_intro:
      "Pav It was born out of our own frustration: a team of three developers spent more time configuring infrastructure than building the product. Today over 400 teams worldwide trust us.",
    steps_title: "From idea to production in three steps",
    steps_subtitle: "The real path of a team that just connected Pav It to their project.",
    contact_title: "Let's talk about your project",
    contact_subtitle: "Write a few words about your team and the task — we reply within one business day.",
    contact_email: "hello@pavit.dev",
    contact_social_linkedin: "#",
    contact_social_github: "#",
  },
};

const FALLBACK_STATS: Record<"uk" | "en", WpStat[]> = {
  uk: [
    { id: 1, value: "2021", label: "Рік заснування" },
    { id: 2, value: "400+", label: "Команд-клієнтів" },
    { id: 3, value: "38", label: "Людей у команді" },
    { id: 4, value: "99.95%", label: "Аптайм платформи" },
  ],
  en: [
    { id: 1, value: "2021", label: "Year founded" },
    { id: 2, value: "400+", label: "Client teams" },
    { id: 3, value: "38", label: "People on the team" },
    { id: 4, value: "99.95%", label: "Platform uptime" },
  ],
};

const FALLBACK_EXPERTISE: Record<"uk" | "en", WpFeatureCard[]> = {
  uk: [
    {
      id: 1,
      title: "Візуальний редактор",
      description: "Збирайте інтерфейс з готових компонентів і одразу бачите, як він поводиться з реальними даними.",
      icon: "grid",
      page: "dashboard",
      featuresList: [],
    },
    {
      id: 2,
      title: "Автоматичний деплой",
      description: "Кожен пуш у репозиторій збирається й публікується сам — окреме середовище під кожен pull request.",
      icon: "cube",
      page: "dashboard",
      featuresList: [],
    },
    {
      id: 3,
      title: "Контроль доступу",
      description: "Гнучкі ролі для команди й окреме середовище для тестування без ризику для продакшну.",
      icon: "shield",
      page: "dashboard",
      featuresList: [],
    },
  ],
  en: [
    {
      id: 1,
      title: "Visual editor",
      description: "Build interfaces from ready-made components and see instantly how they behave with real data.",
      icon: "grid",
      page: "dashboard",
      featuresList: [],
    },
    {
      id: 2,
      title: "Automatic deployment",
      description: "Every push to the repository builds and ships itself — a separate environment for every pull request.",
      icon: "cube",
      page: "dashboard",
      featuresList: [],
    },
    {
      id: 3,
      title: "Access control",
      description: "Flexible roles for your team and a separate environment for testing without risking production.",
      icon: "shield",
      page: "dashboard",
      featuresList: [],
    },
  ],
};

const FALLBACK_STACK: Record<"uk" | "en", WpFeatureCard[]> = {
  uk: [
    {
      id: 1,
      title: "Конструктор інтерфейсів",
      description: "",
      icon: "grid",
      page: "services",
      featuresList: ["Бібліотека з 200+ компонентів", "Підтримка React, Vue, Svelte", "Експорт у чистий код"],
    },
    {
      id: 2,
      title: "CI/CD та деплой",
      description: "",
      icon: "cube",
      page: "services",
      featuresList: ["Preview-середовище для кожного PR", "Автоматичний відкат при збої", "Нульовий простій при релізі"],
    },
    {
      id: 3,
      title: "Безпека та доступи",
      description: "",
      icon: "shield",
      page: "services",
      featuresList: ["SSO та двофакторна автентифікація", "Детальний журнал дій", "Шифрування даних у спокої та передачі"],
    },
    {
      id: 4,
      title: "Моніторинг і аналітика",
      description: "",
      icon: "chart",
      page: "services",
      featuresList: ["Сповіщення в Slack та email", "Трасування запитів у реальному часі", "Історія метрик за 90 днів"],
    },
  ],
  en: [
    {
      id: 1,
      title: "Interface builder",
      description: "",
      icon: "grid",
      page: "services",
      featuresList: ["200+ component library", "Support for React, Vue, Svelte", "Export to clean code"],
    },
    {
      id: 2,
      title: "CI/CD and deployment",
      description: "",
      icon: "cube",
      page: "services",
      featuresList: ["Preview environment for every PR", "Automatic rollback on failure", "Zero downtime releases"],
    },
    {
      id: 3,
      title: "Security and access",
      description: "",
      icon: "shield",
      page: "services",
      featuresList: ["SSO and two-factor authentication", "Detailed activity log", "Encryption at rest and in transit"],
    },
    {
      id: 4,
      title: "Monitoring and analytics",
      description: "",
      icon: "chart",
      page: "services",
      featuresList: ["Slack and email alerts", "Real-time request tracing", "90-day metrics history"],
    },
  ],
};

const LABELS = {
  uk: {
    aboutLabel: "Про нас",
    stackLabel: "Можливості",
    stackTitle: "Все, що потрібно для запуску продукту.",
    expertiseLabel: "Експертиза",
    expertiseTitle: "Де ми додаємо найбільше цінності.",
    workLabel: "Процес",
    contactLabel: "Контакти",
    emailCta: "Написати нам",
    heroCtaGhostAnchor: "#stack",
  },
  en: {
    aboutLabel: "About",
    stackLabel: "Capabilities",
    stackTitle: "Everything you need to ship.",
    expertiseLabel: "Expertise",
    expertiseTitle: "Where we add the most value.",
    workLabel: "Process",
    contactLabel: "Contact",
    emailCta: "Email us",
    heroCtaGhostAnchor: "#stack",
  },
};

function HeroVisual() {
  return (
    <div className="relative h-[260px] md:h-[460px] order-first md:order-none opacity-50 md:opacity-100" aria-hidden="true">
      <svg viewBox="0 0 480 460" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <g stroke="#c5a059" strokeWidth="1" opacity="0.35">
          <line x1="60" y1="80" x2="180" y2="150" />
          <line x1="180" y1="150" x2="140" y2="270" />
          <line x1="180" y1="150" x2="320" y2="120" />
          <line x1="320" y1="120" x2="410" y2="220" />
          <line x1="140" y1="270" x2="260" y2="330" />
          <line x1="260" y1="330" x2="410" y2="220" />
          <line x1="260" y1="330" x2="200" y2="420" />
          <line x1="60" y1="80" x2="140" y2="270" />
          <line x1="320" y1="120" x2="260" y2="330" />
        </g>
        <g fill="#c5a059">
          <circle cx="60" cy="80" r="4" opacity="0.85" />
          <circle cx="180" cy="150" r="5.5" opacity="0.9" />
          <circle cx="320" cy="120" r="4" opacity="0.7" />
          <circle cx="410" cy="220" r="5" opacity="0.85" />
          <circle cx="140" cy="270" r="4.5" opacity="0.75" />
          <circle cx="260" cy="330" r="6" opacity="0.95" />
          <circle cx="200" cy="420" r="4" opacity="0.6" />
        </g>
        <g fill="none" stroke="#c5a059" opacity="0.18" strokeWidth="1">
          <circle cx="260" cy="330" r="14" />
          <circle cx="180" cy="150" r="12" />
        </g>
      </svg>
    </div>
  );
}

export function PortfolioHome() {
  const { lang, t } = useLanguage();
  const l = LABELS[lang];

  const { data: settings } = useWpData(() => getSiteSettings(lang), FALLBACK_SETTINGS[lang]);
  const { data: stats } = useWpData(() => getStats(lang), FALLBACK_STATS[lang]);
  const { data: expertise } = useWpData(() => getFeatureCards("dashboard", lang), FALLBACK_EXPERTISE[lang]);
  const { data: stack } = useWpData(() => getFeatureCards("services", lang), FALLBACK_STACK[lang]);

  const aboutRef = useReveal<HTMLDivElement>();
  const stackRef = useReveal<HTMLDivElement>();
  const expertiseRef = useReveal<HTMLDivElement>();
  const timelineRef = useReveal<HTMLDivElement>();
  const contactRef = useReveal<HTMLDivElement>();

  const steps = [
    { title: t.steps.step1Title, text: t.steps.step1Desc },
    { title: t.steps.step2Title, text: t.steps.step2Desc },
    { title: t.steps.step3Title, text: t.steps.step3Desc },
  ];

  return (
    <div className="relative">
      <div className="pav-grain"></div>

      {/* ---------- Hero ---------- */}
      <section className="relative z-[2] min-h-[92vh] flex items-center overflow-hidden">
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 grid md:grid-cols-[1.15fr_0.85fr] gap-10 items-center w-full">
          <div>
            <div className="pav-eyebrow mb-6">
              <span className="dot"></span>
              {settings.hero_badge}
            </div>
            <h1 className="font-display font-normal leading-[1.08] tracking-[-0.5px] mb-7 text-[clamp(2.4rem,4.6vw,3.9rem)] text-base-content">
              {settings.hero_title}
            </h1>
            <p className="max-w-[480px] text-base-content/70 text-[17.5px] leading-[1.7] mb-10">{settings.hero_subtitle}</p>
            <div className="flex flex-wrap gap-4 mb-14">
              <a className="pav-btn pav-btn-primary" href="#contact">
                {settings.hero_cta_primary} <span className="pav-btn-arrow">→</span>
              </a>
              <a className="pav-btn pav-btn-ghost" href={l.heroCtaGhostAnchor}>
                {settings.hero_cta_secondary}
              </a>
            </div>
          </div>

          <HeroVisual />
        </div>
      </section>

      {/* ---------- About ---------- */}
      <section id="about" className="relative z-[2] pt-[90px] pb-[130px]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-10">
          <div className="pav-label mb-6">
            <span className="bar"></span>
            {l.aboutLabel}
          </div>
          <div ref={aboutRef} className="grid md:grid-cols-2 gap-[60px]">
            <div>
              <h2 className="font-display font-normal text-[clamp(1.9rem,3.4vw,2.6rem)] tracking-[-0.3px] mb-0 text-base-content">
                {settings.about_title}
              </h2>
            </div>
            <div>
              <p className="text-base-content/70 text-[16.5px] mb-5 max-w-[520px]">{settings.about_intro}</p>
              <ul className="pav-credentials">
                {stats.map((s) => (
                  <li key={s.id}>
                    <span className="tag">→</span>
                    <span>
                      <b>{s.value}</b> {s.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Stack / Capabilities ---------- */}
      <section id="stack" className="relative z-[2] py-[130px]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-10">
          <div className="pav-label mb-6">
            <span className="bar"></span>
            {l.stackLabel}
          </div>
          <h2 className="font-display font-normal text-[clamp(1.9rem,3.4vw,2.6rem)] tracking-[-0.3px] text-base-content">
            {l.stackTitle}
          </h2>
          <div ref={stackRef} className="pav-stack-grid mt-[50px]">
            {stack.map((group) => (
              <div key={group.id} className="pav-stack-col">
                <h4>{group.title}</h4>
                <ul>
                  {group.featuresList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Expertise ---------- */}
      <section id="expertise" className="relative z-[2] py-[130px]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-10">
          <div className="pav-label mb-6">
            <span className="bar"></span>
            {l.expertiseLabel}
          </div>
          <h2 className="font-display font-normal text-[clamp(1.9rem,3.4vw,2.6rem)] tracking-[-0.3px] text-base-content">
            {l.expertiseTitle}
          </h2>
          <div ref={expertiseRef} className="pav-expertise-list mt-[50px]">
            {expertise.map((row) => (
              <div key={row.id} className="pav-exp-row">
                <h3>
                  <span className="n">→</span>
                  {row.title}
                </h3>
                <p>{row.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Work / Process ---------- */}
      <section id="work" className="relative z-[2] py-[130px]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-10">
          <div className="pav-label mb-6">
            <span className="bar"></span>
            {l.workLabel}
          </div>
          <h2 className="font-display font-normal text-[clamp(1.9rem,3.4vw,2.6rem)] tracking-[-0.3px] text-base-content mb-2">
            {settings.steps_title}
          </h2>
          <p className="text-base-content/70">{settings.steps_subtitle}</p>
          <div ref={timelineRef} className="mt-[50px] flex flex-col">
            {steps.map((step, i) => (
              <div key={step.title} className="pav-t-row">
                <div className="when">{`0${i + 1}`}</div>
                <div className="rail"></div>
                <div className="content">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section id="contact" className="relative z-[2] py-[130px] text-center">
        <div ref={contactRef} className="max-w-[640px] mx-auto px-6">
          <div className="pav-label mb-6 justify-center">
            <span className="bar"></span>
            {l.contactLabel}
          </div>
          <h2 className="font-display font-normal text-[clamp(2.1rem,5vw,3.5rem)] text-base-content">{settings.contact_title}</h2>
          <p className="text-base-content/70 text-[17px] my-6 mx-auto max-w-[460px]">{settings.contact_subtitle}</p>
          <a className="pav-btn pav-btn-primary" href={`mailto:${settings.contact_email}`}>
            {l.emailCta} <span className="pav-btn-arrow">→</span>
          </a>
          <div className="flex justify-center gap-8 flex-wrap mt-[50px]">
            <a href={settings.contact_social_linkedin} className="pav-contact-link">
              LinkedIn
            </a>
            <a href={settings.contact_social_github} className="pav-contact-link">
              GitHub
            </a>
            <a href={`mailto:${settings.contact_email}`} className="pav-contact-link">
              {settings.contact_email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
