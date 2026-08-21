import { Link } from "react-router";
import { useWpData } from "../../hooks/useWpData";
import { useLanguage } from "../../i18n/LanguageContext";
import {
  getFeatureCards,
  getSiteSettings,
  getStats,
  getTeam,
  type WpFeatureCard,
  type WpSiteSettings,
  type WpStat,
  type WpTeamMember,
} from "../../service/wp";
import { FeatureIcon } from "../icons/FeatureIcon";

// ---------- Резервний контент (використовується, якщо WordPress тимчасово недоступний) ----------

const FALLBACK_SETTINGS: Record<"uk" | "en", WpSiteSettings> = {
  uk: {
    about_badge: "Заснована у 2021 році",
    about_title: "Ми будуємо інструменти, якими самі хочемо користуватись",
    about_intro:
      "Pav It з'явився з власної фрустрації: команда з трьох розробників витрачала більше часу на налаштування інфраструктури, ніж на сам продукт. Зараз нам довіряють понад 400 команд по всьому світу.",
    story_title: "Як усе починалось",
    story_p1:
      "Троє інженерів зустрілись на проєкті для фінтех-стартапу й помітили одну й ту саму проблему: кожен новий сервіс вимагав тижні на налаштування деплою, моніторингу й доступів.",
    story_p2:
      "Вони почали будувати внутрішній інструмент для власної команди — без зайвих абстракцій, з фокусом на швидкість. За рік ним зацікавились ще п'ять компаній зі схожими болями.",
    story_p3:
      "Сьогодні Pav It — окрема команда з 38 людей, що працює повністю віддалено з фокусом на надійність і простоту інтерфейсу.",
    principles_title: "Принципи, якими керуємось",
    principles_subtitle: "Не лозунги на стіні, а реальні рішення, які впливають на продукт щодня.",
    team_title: "Люди за продуктом",
    team_subtitle: "Невелика команда, що цінує прямий зв'язок з користувачами.",
    join_title: "Хочете приєднатись до команди?",
    join_subtitle: "Ми завжди шукаємо людей, яким не байдуже до деталей.",
    join_button: "Зв'язатись з нами",
  },
  en: {
    about_badge: "Founded in 2021",
    about_title: "We build the tools we want to use ourselves",
    about_intro:
      "Pav It was born out of our own frustration: a team of three developers spent more time configuring infrastructure than building the product. Today over 400 teams worldwide trust us.",
    story_title: "How it all started",
    story_p1:
      "Three engineers met on a fintech startup project and noticed the same problem: every new service took weeks to configure for deployment, monitoring, and access.",
    story_p2:
      "They started building an internal tool for their own team — no unnecessary abstractions, focused on speed. Within a year, five more companies with similar pains were interested.",
    story_p3:
      "Today Pav It is a standalone team of 38 people, working fully remotely with a focus on reliability and a simple interface.",
    principles_title: "The principles we follow",
    principles_subtitle: "Not slogans on a wall — real decisions that shape the product every day.",
    team_title: "The people behind the product",
    team_subtitle: "A small team that values a direct connection with users.",
    join_title: "Want to join the team?",
    join_subtitle: "We're always looking for people who care about the details.",
    join_button: "Get in touch",
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

const FALLBACK_PRINCIPLES: Record<"uk" | "en", WpFeatureCard[]> = {
  uk: [
    {
      id: 1,
      title: "Простота понад усе",
      description: "Якщо функцію не можна пояснити за одне речення — ми переробляємо її, а не документацію.",
      icon: "grid",
      page: "about",
      featuresList: [],
    },
    {
      id: 2,
      title: "Швидкість — це повага",
      description: "Кожна секунда очікування — це секунда чужого робочого часу. Ми ставимось до цього серйозно.",
      icon: "clock",
      page: "about",
      featuresList: [],
    },
    {
      id: 3,
      title: "Дані — лише ваші",
      description: "Ми ніколи не використовуємо клієнтський код чи дані для тренування будь-яких моделей.",
      icon: "lock",
      page: "about",
      featuresList: [],
    },
  ],
  en: [
    {
      id: 1,
      title: "Simplicity above all",
      description: "If a feature can't be explained in one sentence, we redesign the feature, not the docs.",
      icon: "grid",
      page: "about",
      featuresList: [],
    },
    {
      id: 2,
      title: "Speed is respect",
      description: "Every second of waiting is a second of someone else's working time. We take that seriously.",
      icon: "clock",
      page: "about",
      featuresList: [],
    },
    {
      id: 3,
      title: "Your data stays yours",
      description: "We never use customer code or data to train any models.",
      icon: "lock",
      page: "about",
      featuresList: [],
    },
  ],
};

const FALLBACK_TEAM: Record<"uk" | "en", WpTeamMember[]> = {
  uk: [
    { id: 1, name: "Андрій Коваль", role: "Співзасновник, CEO", color: "#c5a059" },
    { id: 2, name: "Марія Бойко", role: "Співзасновниця, CTO", color: "#e0bd7a" },
    { id: 3, name: "Дмитро Сидоренко", role: "Голова продукту", color: "#8f8a7d" },
    { id: 4, name: "Олена Ткач", role: "Голова партнерств", color: "#c5a059" },
  ],
  en: [
    { id: 1, name: "Andriy Koval", role: "Co-founder, CEO", color: "#c5a059" },
    { id: 2, name: "Maria Boyko", role: "Co-founder, CTO", color: "#e0bd7a" },
    { id: 3, name: "Dmytro Sydorenko", role: "Head of Product", color: "#8f8a7d" },
    { id: 4, name: "Olena Tkach", role: "Head of Partnerships", color: "#c5a059" },
  ],
};

export function AboutUs() {
  const { lang, localizePath } = useLanguage();
  const { data: settings } = useWpData(() => getSiteSettings(lang), FALLBACK_SETTINGS[lang]);
  const { data: stats } = useWpData(() => getStats(lang), FALLBACK_STATS[lang]);
  const { data: principles } = useWpData(() => getFeatureCards("about", lang), FALLBACK_PRINCIPLES[lang]);
  const { data: team } = useWpData(() => getTeam(lang), FALLBACK_TEAM[lang]);

  return (
    <>
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
          {settings.about_badge}
        </div>
        <h1 className="font-display font-normal text-4xl md:text-5xl leading-[1.05] tracking-[-0.5px] mb-6 text-base-content">
          {settings.about_title}
        </h1>
        <p className="text-base-content/70 text-lg leading-relaxed max-w-2xl mx-auto">{settings.about_intro}</p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-base-200 border border-primary/15 rounded-sm p-6 text-center">
              <p className="font-display text-3xl font-semibold mb-1 text-primary">{stat.value}</p>
              <p className="text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-base-200/40 border-y border-primary/15">
        <div className="max-w-5xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display font-normal text-3xl md:text-4xl mb-5 text-base-content">{settings.story_title}</h2>
            <div className="space-y-4 text-base-content/70 leading-relaxed">
              <p>{settings.story_p1}</p>
              <p>{settings.story_p2}</p>
              <p>{settings.story_p3}</p>
            </div>
          </div>
          <div className="bg-base-200 border border-primary/15 rounded-sm p-3">
            <div className="bg-base-300/60 rounded-sm p-5 space-y-3">
              <div className="bg-base-100 rounded-lg p-4 border border-primary/15 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary flex-shrink-0"></div>
                <div className="space-y-1.5 flex-1">
                  <div className="h-2 w-2/3 bg-primary/20 rounded-full"></div>
                  <div className="h-2 w-1/3 bg-primary/10 rounded-full"></div>
                </div>
              </div>
              <div className="bg-base-100 rounded-lg p-4 border border-primary/15 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-secondary flex-shrink-0"></div>
                <div className="space-y-1.5 flex-1">
                  <div className="h-2 w-3/4 bg-primary/20 rounded-full"></div>
                  <div className="h-2 w-1/2 bg-primary/10 rounded-full"></div>
                </div>
              </div>
              <div className="bg-base-100 rounded-lg p-4 border border-primary/15 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-muted-2 flex-shrink-0"></div>
                <div className="space-y-1.5 flex-1">
                  <div className="h-2 w-1/2 bg-primary/20 rounded-full"></div>
                  <div className="h-2 w-1/3 bg-primary/10 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1180px] mx-auto px-6 py-32">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="font-display font-normal text-3xl md:text-4xl mb-4 text-base-content">{settings.principles_title}</h2>
          <p className="text-base-content/70">{settings.principles_subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {principles.map((p) => (
            <div key={p.id} className="bg-base-200 border border-primary/15 rounded-sm p-7 transition-all duration-300 ease-out hover:border-primary/35 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
              <FeatureIcon icon={p.icon} size="sm" />
              <h3 className="font-display font-semibold text-lg mb-2 text-base-content">{p.title}</h3>
              <p className="text-base-content/60 text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-base-200/40 border-y border-primary/15">
        <div className="max-w-[1180px] mx-auto px-6 py-32">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="font-display font-normal text-3xl md:text-4xl mb-4 text-base-content">{settings.team_title}</h2>
            <p className="text-base-content/70">{settings.team_subtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.id} className="text-center">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                  style={{ background: member.color }}
                ></div>
                <p className="font-medium text-sm text-base-content">{member.name}</p>
                <p className="text-xs text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1180px] mx-auto px-6 py-32">
        <div className="rounded-md bg-base-200 border border-primary/20 px-8 py-16 md:py-20 text-center">
          <h2 className="font-display font-normal text-3xl md:text-4xl text-base-content mb-4">
            {settings.join_title}
          </h2>
          <p className="text-muted mb-8 max-w-md mx-auto">{settings.join_subtitle}</p>
          <Link to={localizePath("/contact-us")} className="pav-btn pav-btn-primary">
            {settings.join_button}
          </Link>
        </div>
      </section>
    </>
  );
}
