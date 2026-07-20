import { Link } from "react-router";
import { useWpData } from "../../hooks/useWpData";
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

const FALLBACK_SETTINGS: WpSiteSettings = {
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
};

const FALLBACK_STATS: WpStat[] = [
  { id: 1, value: "2021", label: "Рік заснування" },
  { id: 2, value: "400+", label: "Команд-клієнтів" },
  { id: 3, value: "38", label: "Людей у команді" },
  { id: 4, value: "99.95%", label: "Аптайм платформи" },
];

const FALLBACK_PRINCIPLES: WpFeatureCard[] = [
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
];

const FALLBACK_TEAM: WpTeamMember[] = [
  { id: 1, name: "Андрій Коваль", role: "Співзасновник, CEO", color: "#8A5A2B" },
  { id: 2, name: "Марія Бойко", role: "Співзасновниця, CTO", color: "#10B981" },
  { id: 3, name: "Дмитро Сидоренко", role: "Голова продукту", color: "#EF4444" },
  { id: 4, name: "Олена Ткач", role: "Голова партнерств", color: "#F59E0B" },
];

export function AboutUs() {
  const { data: settings } = useWpData(getSiteSettings, FALLBACK_SETTINGS);
  const { data: stats } = useWpData(getStats, FALLBACK_STATS);
  const { data: principles } = useWpData(() => getFeatureCards("about"), FALLBACK_PRINCIPLES);
  const { data: team } = useWpData(getTeam, FALLBACK_TEAM);

  return (
    <>
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F4EBDD] text-[#8A5A2B] text-xs font-medium mb-6">
          {settings.about_badge}
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-semibold leading-[1.15] mb-6">
          {settings.about_title}
        </h1>
        <p className="text-[#4B4238] text-lg leading-relaxed max-w-2xl mx-auto">{settings.about_intro}</p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.id} className="card p-6 text-center">
              <p className="font-display text-3xl font-semibold mb-1">{stat.value}</p>
              <p className="text-sm text-[#9C9186]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-[#E6DFD3]">
        <div className="max-w-5xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold mb-5">{settings.story_title}</h2>
            <div className="space-y-4 text-[#4B4238] leading-relaxed">
              <p>{settings.story_p1}</p>
              <p>{settings.story_p2}</p>
              <p>{settings.story_p3}</p>
            </div>
          </div>
          <div className="card p-3">
            <div className="bg-[#F2ECE1] rounded-xl p-5 space-y-3">
              <div className="bg-white rounded-lg p-4 border border-[#E6DFD3] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#8A5A2B] flex-shrink-0"></div>
                <div className="space-y-1.5 flex-1">
                  <div className="h-2 w-2/3 bg-[#E6DFD3] rounded-full"></div>
                  <div className="h-2 w-1/3 bg-[#F2ECE1] rounded-full"></div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-[#E6DFD3] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#10B981] flex-shrink-0"></div>
                <div className="space-y-1.5 flex-1">
                  <div className="h-2 w-3/4 bg-[#E6DFD3] rounded-full"></div>
                  <div className="h-2 w-1/2 bg-[#F2ECE1] rounded-full"></div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-[#E6DFD3] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#EF4444] flex-shrink-0"></div>
                <div className="space-y-1.5 flex-1">
                  <div className="h-2 w-1/2 bg-[#E6DFD3] rounded-full"></div>
                  <div className="h-2 w-1/3 bg-[#F2ECE1] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="font-display text-3xl font-semibold mb-4">{settings.principles_title}</h2>
          <p className="text-[#4B4238]">{settings.principles_subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {principles.map((p) => (
            <div key={p.id} className="card p-7">
              <FeatureIcon icon={p.icon} size="sm" />
              <h3 className="font-display font-semibold text-lg mb-2">{p.title}</h3>
              <p className="text-[#4B4238] text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-[#E6DFD3]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="font-display text-3xl font-semibold mb-4">{settings.team_title}</h2>
            <p className="text-[#4B4238]">{settings.team_subtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.id} className="text-center">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                  style={{ background: member.color }}
                ></div>
                <p className="font-medium text-sm">{member.name}</p>
                <p className="text-xs text-[#9C9186]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="rounded-3xl bg-[#221D17] px-8 py-16 md:py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">
            {settings.join_title}
          </h2>
          <p className="text-[#9C9186] mb-8 max-w-md mx-auto">{settings.join_subtitle}</p>
          <Link to="/contact-us" className="inline-block px-7 py-3.5 font-medium btn-primary">
            {settings.join_button}
          </Link>
        </div>
      </section>
    </>
  );
}
