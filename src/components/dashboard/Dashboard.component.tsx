import { Link } from "react-router";
import { useWpData } from "../../hooks/useWpData";
import { useLanguage } from "../../i18n/LanguageContext";
import {
  getFeatureCards,
  getLogos,
  getSiteSettings,
  getTestimonials,
  type WpFeatureCard,
  type WpLogo,
  type WpSiteSettings,
  type WpTestimonial,
} from "../../service/wp";
import { FeatureIcon } from "../icons/FeatureIcon";
import { CodeConsole } from "./CodeConsole";

// ---------- Резервний контент (використовується, якщо WordPress тимчасово недоступний) ----------

const FALLBACK_SETTINGS: Record<"uk" | "en", WpSiteSettings> = {
  uk: {
    hero_badge: "Новий редактор компонентів вже доступний",
    hero_title: "Збирайте веб-додатки швидше, без боротьби з інфраструктурою",
    hero_subtitle:
      "Pav It з'єднує дизайн, бекенд та деплой в одному робочому просторі — ваша команда фокусується на продукті, а не на конфігурації серверів.",
    hero_cta_primary: "Почати безкоштовно",
    hero_cta_secondary: "Подивитись можливості",
    hero_benefit_1: "14 днів безкоштовно",
    hero_benefit_2: "Без банківської картки",
    hero_mock_url: "app.pavit.dev/dashboard",
    hero_mock_status: "Деплой успішний",
    hero_mock_build_time: "Час білда: 12с",
    logos_title: "Команди, що вже будують на Pav It",
    steps_title: "Від ідеї до продакшну за три кроки",
    steps_subtitle: "Реальний шлях команди, яка щойно підключила Pav It до проєкту.",
    features_title: "Усе, що потрібно команді розробки",
    features_subtitle: "Від першого компонента до продакшн-релізу — без перемикання між десятком окремих сервісів.",
    cta_title: "Готові спробувати Pav It?",
    cta_subtitle: "Підключіть перший проєкт за кілька хвилин. Картка не потрібна.",
    cta_button: "Почати безкоштовно",
  },
  en: {
    hero_badge: "New component editor is now available",
    hero_title: "Build web apps faster, without fighting your infrastructure",
    hero_subtitle:
      "Pav It brings design, backend, and deployment into one workspace — your team focuses on the product, not server configuration.",
    hero_cta_primary: "Start for free",
    hero_cta_secondary: "See what's included",
    hero_benefit_1: "14 days free",
    hero_benefit_2: "No credit card required",
    hero_mock_url: "app.pavit.dev/dashboard",
    hero_mock_status: "Deploy successful",
    hero_mock_build_time: "Build time: 12s",
    logos_title: "Teams already building on Pav It",
    steps_title: "From idea to production in three steps",
    steps_subtitle: "The real path of a team that just connected Pav It to their project.",
    features_title: "Everything your dev team needs",
    features_subtitle: "From the first component to a production release — without switching between a dozen separate services.",
    cta_title: "Ready to try Pav It?",
    cta_subtitle: "Connect your first project in a few minutes. No card required.",
    cta_button: "Start for free",
  },
};

const FALLBACK_FEATURES: Record<"uk" | "en", WpFeatureCard[]> = {
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

const FALLBACK_LOGOS: WpLogo[] = [
  { id: 1, name: "Vertex" },
  { id: 2, name: "Norvik" },
  { id: 3, name: "Plexa" },
  { id: 4, name: "Heliosoft" },
  { id: 5, name: "Cobalt" },
];

const FALLBACK_TESTIMONIAL: Record<"uk" | "en", WpTestimonial[]> = {
  uk: [
    {
      id: 1,
      quote:
        "Ми скоротили час від коміту до продакшну з сорока хвилин до менш ніж двох. Команда нарешті фокусується на продукті, а не на CI-конфігах.",
      authorName: "Олена Ткач",
      authorRole: "CTO, Norvik",
    },
  ],
  en: [
    {
      id: 1,
      quote:
        "We cut the time from commit to production from forty minutes to under two. The team finally focuses on the product, not CI configs.",
      authorName: "Olena Tkach",
      authorRole: "CTO, Norvik",
    },
  ],
};

export function Dashboard() {
  const { lang, t, localizePath } = useLanguage();
  const { data: settings } = useWpData(() => getSiteSettings(lang), FALLBACK_SETTINGS[lang]);
  const { data: features } = useWpData(() => getFeatureCards("dashboard", lang), FALLBACK_FEATURES[lang]);
  const { data: logos } = useWpData(getLogos, FALLBACK_LOGOS);
  const { data: testimonials } = useWpData(() => getTestimonials(lang), FALLBACK_TESTIMONIAL[lang]);
  const testimonial = testimonials[0];

  return (
    <section>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F4EBDD] text-[#8A5A2B] text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8A5A2B]"></span>
            {settings.hero_badge}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold leading-[1.15] mb-6">
            {settings.hero_title}
          </h1>
          <p className="text-[#4B4238] text-lg leading-relaxed mb-8 max-w-md">{settings.hero_subtitle}</p>
          <div className="flex flex-wrap gap-3 mb-8">
            <Link to={localizePath("/contact-us")} className="px-6 py-3 font-medium btn-primary">
              {settings.hero_cta_primary}
            </Link>
            <Link to={localizePath("/services")} className="px-6 py-3 font-medium btn-secondary">
              {settings.hero_cta_secondary}
            </Link>
          </div>
          <div className="flex items-center gap-6 text-sm text-[#9C9186]">
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8.5L6 11.5L13 4.5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {settings.hero_benefit_1}
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8.5L6 11.5L13 4.5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {settings.hero_benefit_2}
            </span>
          </div>
        </div>

        <div className="relative">
          <CodeConsole
            deployedUrl={settings.hero_mock_url}
            finalStatus={settings.hero_mock_status}
            buildTime={settings.hero_mock_build_time}
            comment={t.console.comment}
          />
        </div>
      </section>

      <section className="border-y border-[#E6DFD3] bg-white/50">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-6">
          <span className="text-sm text-[#9C9186]">{settings.logos_title}</span>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-3 text-[#9C9186] font-display font-medium">
            {logos.map((logo) => (
              <span key={logo.id}>{logo.name}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="font-display text-3xl font-semibold mb-4">{settings.features_title}</h2>
          <p className="text-[#4B4238]">{settings.features_subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.id} className="card p-7">
              <FeatureIcon icon={f.icon} size="sm" />
              <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-[#4B4238] text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-[#E6DFD3]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="font-display text-3xl font-semibold mb-4">{settings.steps_title}</h2>
            <p className="text-[#4B4238]">{settings.steps_subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-6 left-[16.5%] right-[16.5%] h-px bg-[#E6DFD3]"></div>
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-[#221D17] text-white flex items-center justify-center font-display font-semibold mb-5 relative z-10">
                1
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{t.steps.step1Title}</h3>
              <p className="text-[#4B4238] text-sm leading-relaxed">{t.steps.step1Desc}</p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-[#221D17] text-white flex items-center justify-center font-display font-semibold mb-5 relative z-10">
                2
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{t.steps.step2Title}</h3>
              <p className="text-[#4B4238] text-sm leading-relaxed">{t.steps.step2Desc}</p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-[#221D17] text-white flex items-center justify-center font-display font-semibold mb-5 relative z-10">
                3
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{t.steps.step3Title}</h3>
              <p className="text-[#4B4238] text-sm leading-relaxed">{t.steps.step3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {testimonial && (
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="card p-10 md:p-14 grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="mb-5">
                <path
                  d="M0 24V14.4C0 6.4 4.8 1.2 13.6 0L14.8 3.2C9.6 4.4 7.2 7.6 6.8 11.6H13.6V24H0ZM18.4 24V14.4C18.4 6.4 23.2 1.2 32 0L33.2 3.2C28 4.4 25.6 7.6 25.2 11.6H32V24H18.4Z"
                  fill="#F4EBDD"
                />
              </svg>
              <p className="font-display text-xl md:text-2xl leading-snug mb-6">{testimonial.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#8A5A2B]"></div>
                <div>
                  <p className="font-medium text-sm">{testimonial.authorName}</p>
                  <p className="text-[#9C9186] text-sm">{testimonial.authorRole}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="rounded-3xl bg-[#221D17] px-8 py-16 md:py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">{settings.cta_title}</h2>
          <p className="text-[#9C9186] mb-8 max-w-md mx-auto">{settings.cta_subtitle}</p>
          <Link to={localizePath("/contact-us")} className="inline-block px-7 py-3.5 font-medium btn-primary">
            {settings.cta_button}
          </Link>
        </div>
      </section>
    </section>
  );
}
