/**
 * Словник статичних текстів інтерфейсу (навігація, кнопки, підписи форми).
 *
 * Основний маркетинговий контент (заголовки, описи, FAQ, тарифи тощо) живе
 * у WordPress і перекладається там через поле "lang" на кожному записі —
 * цей файл лише для "хрому" сайту, який ніколи не редагує копірайтер
 * через адмінку (лейбли форм, навігація, службові підписи).
 */

export type Lang = "uk" | "en";

export interface Translations {
  nav: { home: string; about: string; services: string; contact: string };
  header: { login: string; tryFree: string };
  footer: {
    product: string;
    features: string;
    pricing: string;
    demo: string;
    company: string;
    aboutUs: string;
    contacts: string;
    privacy: string;
    terms: string;
  };
  contactForm: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    company: string;
    companyPlaceholder: string;
    topic: string;
    topicOptions: string[];
    message: string;
    messagePlaceholder: string;
    submit: string;
  };
  contactInfo: { email: string; support: string; office: string; social: string };
  steps: {
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  console: { comment: string };
  langSwitch: { uk: string; en: string };
}

export const translations: Record<Lang, Translations> = {
  uk: {
    nav: { home: "Головна", about: "Про нас", services: "Послуги", contact: "Контакти" },
    header: { login: "Увійти", tryFree: "Спробувати безкоштовно" },
    footer: {
      product: "Продукт",
      features: "Можливості",
      pricing: "Тарифи",
      demo: "Демо",
      company: "Компанія",
      aboutUs: "Про нас",
      contacts: "Контакти",
      privacy: "Конфіденційність",
      terms: "Умови використання",
    },
    contactForm: {
      name: "Ім'я",
      namePlaceholder: "Андрій Петренко",
      email: "Робоча пошта",
      emailPlaceholder: "name@company.com",
      company: "Компанія",
      companyPlaceholder: "Назва компанії",
      topic: "Тема звернення",
      topicOptions: ["Запит на демо", "Питання щодо тарифів", "Технічна підтримка", "Партнерство", "Інше"],
      message: "Повідомлення",
      messagePlaceholder: "Розкажіть коротко про вашу задачу...",
      submit: "Надіслати повідомлення",
    },
    contactInfo: {
      email: "Електронна пошта",
      support: "Підтримка клієнтів",
      office: "Офіс",
      social: "Соціальні мережі",
    },
    steps: {
      step1Title: "Підключіть репозиторій",
      step1Desc: "Pav It розпізнає стек проєкту й налаштовує середовище збірки автоматично.",
      step2Title: "Збирайте інтерфейс",
      step2Desc:
        "Команда працює в одному просторі: дизайнер, фронтенд і бекенд бачать ті самі зміни в реальному часі.",
      step3Title: "Публікуйте без простою",
      step3Desc: "Кожен реліз перевіряється автоматично, а відкат на попередню версію займає секунди.",
    },
    console: { comment: "// pav-it: деплой проєкту" },
    langSwitch: { uk: "UA", en: "EN" },
  },
  en: {
    nav: { home: "Home", about: "About", services: "Services", contact: "Contact" },
    header: { login: "Sign in", tryFree: "Start for free" },
    footer: {
      product: "Product",
      features: "Features",
      pricing: "Pricing",
      demo: "Demo",
      company: "Company",
      aboutUs: "About us",
      contacts: "Contact",
      privacy: "Privacy",
      terms: "Terms of use",
    },
    contactForm: {
      name: "Name",
      namePlaceholder: "John Carter",
      email: "Work email",
      emailPlaceholder: "name@company.com",
      company: "Company",
      companyPlaceholder: "Company name",
      topic: "Subject",
      topicOptions: ["Request a demo", "Pricing question", "Technical support", "Partnership", "Other"],
      message: "Message",
      messagePlaceholder: "Briefly describe your project...",
      submit: "Send message",
    },
    contactInfo: {
      email: "Email",
      support: "Customer support",
      office: "Office",
      social: "Social media",
    },
    steps: {
      step1Title: "Connect your repository",
      step1Desc: "Pav It detects your stack and configures the build environment automatically.",
      step2Title: "Build the interface",
      step2Desc:
        "The whole team works in one space: designer, frontend, and backend see the same changes in real time.",
      step3Title: "Ship without downtime",
      step3Desc: "Every release is checked automatically, and rolling back to a previous version takes seconds.",
    },
    console: { comment: "// pav-it: project deploy" },
    langSwitch: { uk: "UA", en: "EN" },
  },
};
