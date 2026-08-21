import { useState, type FormEvent } from "react";
import { useWpData } from "../../hooks/useWpData";
import { useLanguage } from "../../i18n/LanguageContext";
import { getSiteSettings, type WpSiteSettings } from "../../service/wp";

const FALLBACK_SETTINGS: Record<"uk" | "en", WpSiteSettings> = {
  uk: {
    contact_title: "Поговорімо про ваш проєкт",
    contact_subtitle:
      "Напишіть кілька слів про команду й задачу — відповідаємо протягом одного робочого дня.",
    contact_email: "hello@pavit.dev",
    contact_support_hours: "Пн–Пт, 9:00–18:00 за Києвом",
    contact_office_city: "Львів, Україна",
    contact_office_note: "Працюємо віддалено",
    contact_social_twitter: "#",
    contact_social_linkedin: "#",
    contact_social_github: "#",
    contact_consent_text:
      "Погоджуюсь на обробку персональних даних відповідно до політики конфіденційності Pav It.",
    contact_success_title: "Повідомлення надіслано",
    contact_success_text:
      "Дякуємо за звернення. Команда відповість на вказану пошту протягом одного робочого дня.",
  },
  en: {
    contact_title: "Let's talk about your project",
    contact_subtitle:
      "Write a few words about your team and the task — we reply within one business day.",
    contact_email: "hello@pavit.dev",
    contact_support_hours: "Mon–Fri, 9:00–18:00 Kyiv time",
    contact_office_city: "Lviv, Ukraine",
    contact_office_note: "We work remotely",
    contact_social_twitter: "#",
    contact_social_linkedin: "#",
    contact_social_github: "#",
    contact_consent_text:
      "I agree to the processing of personal data in accordance with Pav It's privacy policy.",
    contact_success_title: "Message sent",
    contact_success_text:
      "Thanks for reaching out. Our team will reply to your email within one business day.",
  },
};

export function ContactUs() {
  const [submitted, setSubmitted] = useState(false);
  const { lang, t } = useLanguage();
  const { data: settings } = useWpData(() => getSiteSettings(lang), FALLBACK_SETTINGS[lang]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
        <h1 className="font-display font-normal text-4xl md:text-5xl leading-[1.05] tracking-[-0.5px] mb-6 text-base-content">
          {settings.contact_title}
        </h1>
        <p className="text-base-content/70 text-lg leading-relaxed max-w-xl mx-auto">{settings.contact_subtitle}</p>
      </section>

      <section className="max-w-[1180px] mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-8">
          <div className="space-y-4">
            <div className="bg-base-200 border border-primary/15 rounded-sm p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M3 5L10 11L17 5" stroke="#c5a059" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="3" y="4" width="14" height="12" rx="1.5" stroke="#c5a059" strokeWidth="1.6" />
                </svg>
              </div>
              <p className="font-medium text-sm mb-1 text-base-content">{t.contactInfo.email}</p>
              <p className="text-sm text-base-content/70">{settings.contact_email}</p>
            </div>

            <div className="bg-base-200 border border-primary/15 rounded-sm p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 18C10 18 17 14 17 8.5V4L10 2L3 4V8.5C3 14 10 18 10 18Z"
                    stroke="#8fce8a"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="font-medium text-sm mb-1 text-base-content">{t.contactInfo.support}</p>
              <p className="text-sm text-base-content/70">{settings.contact_support_hours}</p>
            </div>

            <div className="bg-base-200 border border-primary/15 rounded-sm p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 18C10 18 17 13 17 8C17 4.5 13.5 2 10 2C6.5 2 3 4.5 3 8C3 13 10 18 10 18Z"
                    stroke="#d98a7a"
                    strokeWidth="1.6"
                  />
                  <circle cx="10" cy="8" r="2.5" stroke="#d98a7a" strokeWidth="1.6" />
                </svg>
              </div>
              <p className="font-medium text-sm mb-1 text-base-content">{t.contactInfo.office}</p>
              <p className="text-sm text-base-content/70">
                {settings.contact_office_city}
                <br />
                {settings.contact_office_note}
              </p>
            </div>

            <div className="bg-base-200 border border-primary/15 rounded-sm p-6">
              <p className="font-medium text-sm mb-3 text-base-content">{t.contactInfo.social}</p>
              <div className="flex gap-3">
                <a
                  href={settings.contact_social_twitter}
                  className="btn btn-square btn-ghost btn-sm border border-primary/15 hover:border-primary hover:bg-primary/10"
                  aria-label="X (Twitter)"
                >
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                    <path d="M3 3L17 17M17 3L3 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </a>
                <a
                  href={settings.contact_social_linkedin}
                  className="btn btn-square btn-ghost btn-sm border border-primary/15 hover:border-primary hover:bg-primary/10"
                  aria-label="LinkedIn"
                >
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                    <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="7" cy="7.5" r="0.8" fill="currentColor" />
                    <path
                      d="M7 10V14M10 10V14M10 11.5C10 10.5 10.7 10 11.5 10C12.3 10 13 10.5 13 11.5V14"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>
                <a
                  href={settings.contact_social_github}
                  className="btn btn-square btn-ghost btn-sm border border-primary/15 hover:border-primary hover:bg-primary/10"
                  aria-label="GitHub"
                >
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 2C5.6 2 2 5.6 2 10C2 13.5 4.3 16.5 7.4 17.6C7.8 17.7 7.9 17.4 7.9 17.2V15.6C5.7 16.1 5.2 14.6 5.2 14.6C4.8 13.7 4.3 13.4 4.3 13.4C3.6 13 4.4 13 4.4 13C5.1 13.1 5.5 13.7 5.5 13.7C6.2 14.9 7.3 14.5 7.7 14.3C7.8 13.8 8 13.5 8.2 13.3C6.5 13.1 4.7 12.4 4.7 9.4C4.7 8.6 5 7.9 5.5 7.4C5.4 7.2 5.2 6.4 5.6 5.4C5.6 5.4 6.2 5.2 7.9 6.3C8.6 6.1 9.3 6 10 6C10.7 6 11.4 6.1 12.1 6.3C13.8 5.2 14.4 5.4 14.4 5.4C14.8 6.4 14.6 7.2 14.5 7.4C15 7.9 15.3 8.6 15.3 9.4C15.3 12.4 13.5 13.1 11.8 13.3C12.1 13.6 12.3 14.1 12.3 14.9V17.2C12.3 17.4 12.5 17.7 12.9 17.6C16 16.5 18 13.5 18 10C18 5.6 14.4 2 10 2Z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-base-200 border border-primary/15 rounded-sm p-8 md:p-10">
            {!submitted ? (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-base-content">
                      {t.contactForm.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="input input-bordered w-full bg-base-100 border-primary/20 focus:border-primary"
                      placeholder={t.contactForm.namePlaceholder}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-base-content">
                      {t.contactForm.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="input input-bordered w-full bg-base-100 border-primary/20 focus:border-primary"
                      placeholder={t.contactForm.emailPlaceholder}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="company" className="block text-sm font-medium mb-1.5 text-base-content">
                    {t.contactForm.company}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="input input-bordered w-full bg-base-100 border-primary/20 focus:border-primary"
                    placeholder={t.contactForm.companyPlaceholder}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="topic" className="block text-sm font-medium mb-1.5 text-base-content">
                    {t.contactForm.topic}
                  </label>
                  <select id="topic" name="topic" className="select select-bordered w-full bg-base-100 border-primary/20 focus:border-primary">
                    {t.contactForm.topicOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-1.5 text-base-content">
                    {t.contactForm.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="textarea textarea-bordered w-full resize-none bg-base-100 border-primary/20 focus:border-primary"
                    placeholder={t.contactForm.messagePlaceholder}
                  ></textarea>
                </div>

                <label className="flex items-start gap-2.5 mb-6 cursor-pointer">
                  <input type="checkbox" required className="checkbox checkbox-sm border-primary/30 [--chkbg:var(--color-primary)] [--chkfg:var(--color-primary-content)] mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-muted leading-relaxed">{settings.contact_consent_text}</span>
                </label>

                <button type="submit" className="pav-btn pav-btn-primary w-full">
                  {t.contactForm.submit}
                </button>
              </form>
            ) : (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12.5L10 17.5L19 7.5" stroke="#8fce8a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-xl mb-2 text-base-content">{settings.contact_success_title}</h3>
                <p className="text-base-content/70 text-sm max-w-xs mx-auto">{settings.contact_success_text}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
