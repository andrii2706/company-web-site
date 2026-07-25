import { useState } from "react";
import { Link } from "react-router";
import { useWpData } from "../../hooks/useWpData";
import { useLanguage } from "../../i18n/LanguageContext";
import {
  getFaqs,
  getFeatureCards,
  getSiteSettings,
  type WpFaqItem,
  type WpFeatureCard,
  type WpSiteSettings,
} from "../../service/wp";
import { FeatureIcon, CheckIcon } from "../icons/FeatureIcon";

// ---------- Резервний контент (використовується, якщо WordPress тимчасово недоступний) ----------

const FALLBACK_SETTINGS: Record<"uk" | "en", WpSiteSettings> = {
  uk: {
    services_title: "Можливості, які закривають весь цикл розробки",
    services_subtitle:
      "Від першого компонента до моніторингу в продакшні — кожен інструмент команди в одному місці.",
    quick_contact_title: "Обговоримо ваш проєкт?",
    quick_contact_subtitle:
      "Розкажіть коротко про задачу — відповідаємо протягом одного робочого дня, без типових комерційних пропозицій навмання.",
    quick_contact_button: "Швидкий зв'язок",
    contact_email: "hello@pavit.dev",
    faq_title: "Часті запитання",
  },
  en: {
    services_title: "Capabilities that cover the whole development cycle",
    services_subtitle:
      "From the first component to production monitoring — every tool your team needs, in one place.",
    quick_contact_title: "Let's talk about your project",
    quick_contact_subtitle:
      "Tell us briefly about the task — we reply within one business day, no generic sales pitch.",
    quick_contact_button: "Quick contact",
    contact_email: "hello@pavit.dev",
    faq_title: "Frequently asked questions",
  },
};

const FALLBACK_FEATURES: Record<"uk" | "en", WpFeatureCard[]> = {
  uk: [
    {
      id: 1,
      title: "Конструктор інтерфейсів",
      description:
        "Збирайте сторінки з готових компонентів або підключайте власну дизайн-систему. Зміни видно одразу, без перезбірки проєкту.",
      icon: "grid",
      page: "services",
      featuresList: ["Бібліотека з 200+ компонентів", "Підтримка React, Vue, Svelte", "Експорт у чистий код"],
    },
    {
      id: 2,
      title: "CI/CD та деплой",
      description:
        "Кожен pull request отримує окреме preview-середовище. Продакшн-деплой — одна кнопка, з автоматичним відкатом при помилці.",
      icon: "cube",
      page: "services",
      featuresList: ["Preview-середовище для кожного PR", "Автоматичний відкат при збої", "Нульовий простій при релізі"],
    },
    {
      id: 3,
      title: "Безпека та доступи",
      description:
        "Рольова модель доступу для команд будь-якого розміру, журнал дій та шифрування даних на кожному рівні зберігання.",
      icon: "shield",
      page: "services",
      featuresList: ["SSO та двофакторна автентифікація", "Детальний журнал дій", "Шифрування даних у спокої та передачі"],
    },
    {
      id: 4,
      title: "Моніторинг і аналітика",
      description:
        "Дашборди продуктивності, сповіщення про аномалії та трасування запитів — все вже підключено, без зайвої інтеграції.",
      icon: "chart",
      page: "services",
      featuresList: ["Сповіщення в Slack та email", "Трасування запитів у реальному часі", "Історія метрик за 90 днів"],
    },
  ],
  en: [
    {
      id: 1,
      title: "Interface builder",
      description:
        "Build pages from ready-made components or plug in your own design system. Changes show up instantly, with no rebuild.",
      icon: "grid",
      page: "services",
      featuresList: ["200+ component library", "Support for React, Vue, Svelte", "Export to clean code"],
    },
    {
      id: 2,
      title: "CI/CD and deployment",
      description:
        "Every pull request gets its own preview environment. Production deploys are one click, with automatic rollback on failure.",
      icon: "cube",
      page: "services",
      featuresList: ["Preview environment for every PR", "Automatic rollback on failure", "Zero downtime releases"],
    },
    {
      id: 3,
      title: "Security and access",
      description:
        "A role-based access model for teams of any size, an activity log, and encryption at every storage layer.",
      icon: "shield",
      page: "services",
      featuresList: ["SSO and two-factor authentication", "Detailed activity log", "Encryption at rest and in transit"],
    },
    {
      id: 4,
      title: "Monitoring and analytics",
      description:
        "Performance dashboards, anomaly alerts, and request tracing — already connected, no extra integration needed.",
      icon: "chart",
      page: "services",
      featuresList: ["Slack and email alerts", "Real-time request tracing", "90-day metrics history"],
    },
  ],
};

const FALLBACK_FAQS: Record<"uk" | "en", WpFaqItem[]> = {
  uk: [
    {
      id: 1,
      question: "Чи можна перейти на інший тариф пізніше?",
      answer:
        "Так, перехід між тарифами доступний у будь-який момент із панелі керування, без втрати даних чи простою проєкту.",
    },
    {
      id: 2,
      question: "Які мови та фреймворки підтримуються?",
      answer:
        "Pav It підтримує React, Vue, Svelte та Node.js на бекенді. Підтримку інших мов додаємо за запитами Enterprise-клієнтів.",
    },
    {
      id: 3,
      question: "Чи є знижка для команд з відкритим кодом?",
      answer:
        "Так, для активних open-source проєктів тариф Бізнес надається безкоштовно. Напишіть нам на пошту з посиланням на репозиторій.",
    },
  ],
  en: [
    {
      id: 1,
      question: "Can I switch plans later?",
      answer:
        "Yes, switching between plans is available at any time from the control panel, without losing data or any project downtime.",
    },
    {
      id: 2,
      question: "Which languages and frameworks are supported?",
      answer:
        "Pav It supports React, Vue, Svelte, and Node.js on the backend. We add support for other languages based on Enterprise customer requests.",
    },
    {
      id: 3,
      question: "Is there a discount for open-source teams?",
      answer:
        "Yes, active open-source projects get the Business plan for free. Email us with a link to your repository.",
    },
  ],
};

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="font-medium text-sm">{question}</span>
        <span
          className="text-xl text-[#9C9186] transition-transform"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? "200px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.25s ease",
        }}
      >
        <p className="px-6 pb-5 text-sm text-[#4B4238] leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function Services() {
  const { lang, localizePath } = useLanguage();
  const { data: settings } = useWpData(() => getSiteSettings(lang), FALLBACK_SETTINGS[lang]);
  const { data: features } = useWpData(
    () => getFeatureCards("services", lang),
    FALLBACK_FEATURES[lang],
  );
  const { data: faqs } = useWpData(() => getFaqs(lang), FALLBACK_FAQS[lang]);

  return (
    <>
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-semibold leading-[1.15] mb-6">
          {settings.services_title}
        </h1>
        <p className="text-[#4B4238] text-lg leading-relaxed max-w-2xl mx-auto">
          {settings.services_subtitle}
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f) => (
            <div key={f.id} className="card p-8">
              <FeatureIcon icon={f.icon} />
              <h3 className="font-display font-semibold text-xl mb-3">
                {f.title}
              </h3>
              <p className="text-[#4B4238] text-sm leading-relaxed mb-5">
                {f.description}
              </p>
              {f.featuresList.length > 0 && (
                <ul className="space-y-2 text-sm">
                  {f.featuresList.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="rounded-3xl bg-[#221D17] px-8 py-14 md:py-16 grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">
              {settings.quick_contact_title}
            </h2>
            <p className="text-[#B0A69A] mb-2 max-w-md">
              {settings.quick_contact_subtitle}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              to={localizePath("/contact-us")}
              className="w-full px-6 py-3.5 font-medium btn-primary text-center"
            >
              {settings.quick_contact_button}
            </Link>
            <a
              href={`mailto:${settings.contact_email}`}
              className="w-full px-6 py-3.5 font-medium text-center rounded-xl border border-[#4A3D30] text-white hover:bg-[#2E251D] transition-colors flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M3 5L10 11L17 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="3" y="4" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              {settings.contact_email}
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-24">
        <h2 className="font-display text-3xl font-semibold text-center mb-12">
          {settings.faq_title}
        </h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <FaqItem key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>
    </>
  );
}
