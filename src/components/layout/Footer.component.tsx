import { Link } from "react-router";
import { useWpData } from "../../hooks/useWpData";
import { getSiteSettings, type WpSiteSettings } from "../../service/wp";

const FALLBACK_SETTINGS: WpSiteSettings = {
  site_name: "Pav It",
  footer_tagline: "Платформа для команд, що будують і запускають веб-додатки швидше.",
  footer_copyright: "© 2026 Pav It. Усі права захищено.",
  contact_email: "hello@pavit.dev",
  contact_office_city: "Львів, Україна",
};

export function Footer() {
  const { data: settings } = useWpData(getSiteSettings, FALLBACK_SETTINGS);

  return (
    <footer className="border-t border-[#E6DFD3]">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-[#8A5A2B] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 8C2 4.5 4.5 2 8 2C11.5 2 14 4.5 14 8C14 11.5 11.5 14 8 14"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="font-display font-semibold">{settings.site_name}</span>
          </div>
          <p className="text-sm text-[#9C9186] max-w-xs">{settings.footer_tagline}</p>
        </div>

        <div>
          <p className="font-medium text-sm mb-3">Продукт</p>
          <div className="space-y-2 text-sm text-[#4B4238]">
            <Link to="/services" className="block hover:text-[#221D17]">
              Можливості
            </Link>
            <Link to="/services" className="block hover:text-[#221D17]">
              Тарифи
            </Link>
            <Link to="/contact-us" className="block hover:text-[#221D17]">
              Демо
            </Link>
          </div>
        </div>

        <div>
          <p className="font-medium text-sm mb-3">Компанія</p>
          <div className="space-y-2 text-sm text-[#4B4238]">
            <Link to="/about-us" className="block hover:text-[#221D17]">
              Про нас
            </Link>
            <Link to="/contact-us" className="block hover:text-[#221D17]">
              Контакти
            </Link>
          </div>
        </div>

        <div>
          <p className="font-medium text-sm mb-3">Контакти</p>
          <div className="space-y-2 text-sm text-[#4B4238]">
            <p>{settings.contact_email}</p>
            <p>{settings.contact_office_city}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E6DFD3]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-3 text-xs text-[#9C9186]">
          <span>{settings.footer_copyright}</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-[#221D17]">
              Конфіденційність
            </a>
            <a href="#" className="hover:text-[#221D17]">
              Умови використання
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
