import { Link, NavLink } from "react-router";
import { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";

function PavItLogo({ className = "h-11 w-auto" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 230 56"
      className={className}
      role="img"
      aria-label="PAV IT (ПАВ ІТ) — IT Solutions & Technology"
    >
      <defs>
        <style>{`
          .brown-text { fill: #f0ead9; font-family: 'Montserrat', 'Segoe UI', sans-serif; }
          .gold-text { fill: #c5a059; font-family: 'Montserrat', 'Segoe UI', sans-serif; }
          .brand-title { font-size: 25px; font-weight: 500; letter-spacing: 1px; }
          .brand-subtitle { font-size: 5.2px; font-weight: 600; letter-spacing: 1.5px; }
          .line-separator { stroke: #c5a059; stroke-width: 1.6; stroke-linecap: round; }
        `}</style>
      </defs>

      {/* Знак: мережа з вузлів */}
      <g>
        <polygon points="30.00,11.00 44.72,19.50 44.72,36.50 30.00,45.00 15.28,36.50 15.28,19.50" fill="none" stroke="#c5a059" strokeOpacity=".45" strokeWidth="1.43" strokeLinejoin="round"/><line x1="30.00" y1="28.00" x2="30.00" y2="11.00" stroke="#c5a059" strokeWidth="2.60" strokeLinecap="round"/><line x1="30.00" y1="28.00" x2="44.72" y2="19.50" stroke="#c5a059" strokeWidth="2.60" strokeLinecap="round"/><line x1="30.00" y1="28.00" x2="44.72" y2="36.50" stroke="#c5a059" strokeWidth="2.60" strokeLinecap="round"/><line x1="30.00" y1="28.00" x2="30.00" y2="45.00" stroke="#c5a059" strokeWidth="2.60" strokeLinecap="round"/><line x1="30.00" y1="28.00" x2="15.28" y2="36.50" stroke="#c5a059" strokeWidth="2.60" strokeLinecap="round"/><line x1="30.00" y1="28.00" x2="15.28" y2="19.50" stroke="#c5a059" strokeWidth="2.60" strokeLinecap="round"/><circle cx="30.00" cy="11.00" r="3.60" fill="#c5a059"/><circle cx="44.72" cy="19.50" r="3.60" fill="#c5a059"/><circle cx="44.72" cy="36.50" r="3.60" fill="#c5a059"/><circle cx="30.00" cy="45.00" r="3.60" fill="#c5a059"/><circle cx="15.28" cy="36.50" r="3.60" fill="#c5a059"/><circle cx="15.28" cy="19.50" r="3.60" fill="#c5a059"/><circle cx="30.00" cy="28.00" r="5.00" fill="#e0bd7a"/>
      </g>

      {/* Напис */}
      <g transform="translate(64, 31)">
        <text x="0" y="0" className="brown-text brand-title">PAV</text>
        <line x1="62" y1="-18" x2="62" y2="5" className="line-separator" />
        <text x="70" y="0" className="gold-text brand-title">IT</text>
        <text x="0" y="14" className="gold-text brand-subtitle">
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
          aria-expanded={menuOpen}
        >
          <span className={`pav-burger ${menuOpen ? "is-open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      <div className={`pav-mobile-panel md:hidden ${menuOpen ? "is-open" : ""}`}>
        <div>
          <div className="border-t border-primary/15 px-6 py-4 space-y-3">
            <div className="pav-mobile-item">
              <NavLink to={localizePath("/")} end className={navLinkClass} onClick={() => setMenuOpen(false)}>
                <span className="block">{t.nav.home}</span>
              </NavLink>
            </div>
            <div className="pav-mobile-item">
              <NavLink to={localizePath("/about-us")} className={navLinkClass} onClick={() => setMenuOpen(false)}>
                <span className="block">{t.nav.about}</span>
              </NavLink>
            </div>
            <div className="pav-mobile-item">
              <NavLink to={localizePath("/services")} className={navLinkClass} onClick={() => setMenuOpen(false)}>
                <span className="block">{t.nav.services}</span>
              </NavLink>
            </div>
            <div className="pav-mobile-item">
              <NavLink to={localizePath("/contact-us")} className={navLinkClass} onClick={() => setMenuOpen(false)}>
                <span className="block">{t.nav.contact}</span>
              </NavLink>
            </div>
            <div className="pav-mobile-item pt-2">
              <LanguageSwitch />
            </div>
            <div className="pav-mobile-item">
              <Link
                to={localizePath("/contact-us")}
                onClick={() => setMenuOpen(false)}
                className="pav-btn pav-btn-primary w-full mt-3"
              >
                {t.header.tryFree}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
