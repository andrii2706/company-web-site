import { Link } from "react-router";
import { useWpData } from "../../hooks/useWpData";
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

const FALLBACK_SETTINGS: WpSiteSettings = {
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
};

const FALLBACK_FEATURES: WpFeatureCard[] = [
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
];

const FALLBACK_LOGOS: WpLogo[] = [
  { id: 1, name: "Vertex" },
  { id: 2, name: "Norvik" },
  { id: 3, name: "Plexa" },
  { id: 4, name: "Heliosoft" },
  { id: 5, name: "Cobalt" },
];

const FALLBACK_TESTIMONIAL: WpTestimonial[] = [
  {
    id: 1,
    quote:
      "Ми скоротили час від коміту до продакшну з сорока хвилин до менш ніж двох. Команда нарешті фокусується на продукті, а не на CI-конфігах.",
    authorName: "Олена Ткач",
    authorRole: "CTO, Norvik",
  },
];

export function Dashboard() {
  const { data: settings } = useWpData(getSiteSettings, FALLBACK_SETTINGS);
  const { data: features } = useWpData(() => getFeatureCards("dashboard"), FALLBACK_FEATURES);
  const { data: logos } = useWpData(getLogos, FALLBACK_LOGOS);
  const { data: testimonials } = useWpData(getTestimonials, FALLBACK_TESTIMONIAL);
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
            <Link to="/contact-us" className="px-6 py-3 font-medium btn-primary">
              {settings.hero_cta_primary}
            </Link>
            <Link to="/services" className="px-6 py-3 font-medium btn-secondary">
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
              <h3 className="font-display font-semibold text-lg mb-2">Підключіть репозиторій</h3>
              <p className="text-[#4B4238] text-sm leading-relaxed">
                Pav It розпізнає стек проєкту й налаштовує середовище збірки автоматично.
              </p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-[#221D17] text-white flex items-center justify-center font-display font-semibold mb-5 relative z-10">
                2
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Збирайте інтерфейс</h3>
              <p className="text-[#4B4238] text-sm leading-relaxed">
                Команда працює в одному просторі: дизайнер, фронтенд і бекенд бачать ті самі зміни в реальному часі.
              </p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-[#221D17] text-white flex items-center justify-center font-display font-semibold mb-5 relative z-10">
                3
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Публікуйте без простою</h3>
              <p className="text-[#4B4238] text-sm leading-relaxed">
                Кожен реліз перевіряється автоматично, а відкат на попередню версію займає секунди.
              </p>
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
          <Link to="/contact-us" className="inline-block px-7 py-3.5 font-medium btn-primary">
            {settings.cta_button}
          </Link>
        </div>
      </section>
    </section>
  );
}
