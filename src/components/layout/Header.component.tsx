import { Link, NavLink } from "react-router";
import { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";

function PavItLogo({ className = "h-11 w-auto" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 56"
      className={className}
      role="img"
      aria-label="PAV IT — IT Solutions & Technology"
    >
      <defs>
        <style>{`
          .brown-text { fill: #f0ead9; font-family: 'Montserrat', 'Segoe UI', sans-serif; }
          .gold-text { fill: #c5a059; font-family: 'Montserrat', 'Segoe UI', sans-serif; }
          .brand-title { font-size: 26px; font-weight: 500; letter-spacing: 1px; }
          .brand-subtitle { font-size: 5.5px; font-weight: 600; letter-spacing: 1.6px; }
          .line-separator { stroke: #c5a059; stroke-width: 1.6; stroke-linecap: round; }
        `}</style>
      </defs>

      <g transform="translate(110, 22)">
        <text x="-6" y="0" className="brown-text brand-title" textAnchor="end">
          PAV
        </text>
        <line x1="0" y1="-18" x2="0" y2="6" className="line-separator" />
        <text x="6" y="0" className="gold-text brand-title" textAnchor="start">
          IT
        </text>
        <text
          x="0"
          y="20"
          className="brown-text brand-subtitle"
          textAnchor="middle"
        >
          IT SOLUTIONS &amp; TECHNOLOGY
        </text>
      </g>
    </svg>
  );
}

/** Перемикач UA / EN — веде на ту саму сторінку іншою мовою. */
function LanguageSwitch() {
  const { lang, t, otherLangPath } = useLanguage();
  return (
    <Link
      to={otherLangPath}
      className="pav-btn pav-btn-ghost pav-btn-sm"
      aria-label={lang === "uk" ? "Switch to English" : "Перемкнути на українську"}
    >
      {lang === "uk" ? t.langSwitch.en : t.langSwitch.uk}
    </Link>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, localizePath } = useLanguage();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `pav-nav-link ${isActive ? "active" : ""}`;

  return (
    <header className="sticky top-0 z-50 bg-base-100/90 backdrop-blur border-b border-primary/15">
      <div className="max-w-[1180px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link to={localizePath("/")} className="flex items-center">
          <PavItLogo className="h-11 md:h-12 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <NavLink to={localizePath("/")} end className={navLinkClass}>
            {t.nav.home}
          </NavLink>
          <NavLink to={localizePath("/about-us")} className={navLinkClass}>
            {t.nav.about}
          </NavLink>
          <NavLink to={localizePath("/services")} className={navLinkClass}>
            {t.nav.services}
          </NavLink>
          <NavLink to={localizePath("/contact-us")} className={navLinkClass}>
            {t.nav.contact}
          </NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitch />
          <Link to={localizePath("/contact-us")} className="pav-btn pav-btn-ghost pav-btn-sm">
            {t.header.login}
          </Link>
          <Link to={localizePath("/contact-us")} className="pav-btn pav-btn-primary pav-btn-sm">
            {t.header.tryFree}
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden p-2 text-base-content"
          aria-label="Menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-primary/15 px-6 py-4 space-y-3">
          <NavLink
            to={localizePath("/")}
            end
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            <span className="block">{t.nav.home}</span>
          </NavLink>
          <NavLink
            to={localizePath("/about-us")}
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            <span className="block">{t.nav.about}</span>
          </NavLink>
          <NavLink
            to={localizePath("/services")}
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            <span className="block">{t.nav.services}</span>
          </NavLink>
          <NavLink
            to={localizePath("/contact-us")}
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            <span className="block">{t.nav.contact}</span>
          </NavLink>
          <div className="pt-2">
            <LanguageSwitch />
          </div>
          <Link
            to={localizePath("/contact-us")}
            onClick={() => setMenuOpen(false)}
            className="pav-btn pav-btn-primary w-full mt-3"
          >
            {t.header.tryFree}
          </Link>
        </div>
      )}
    </header>
  );
}
