import { Link, NavLink } from "react-router";
import { useState } from "react";

function PavItLogo({ className = "h-11 w-auto" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 56"
      className={className}
      role="img"
      aria-label="ПАВ IT — IT Solutions & Technology"
    >
      <defs>
        <style>{`
          .brown-text { fill: #6B4520; font-family: 'Montserrat', 'Segoe UI', sans-serif; }
          .gold-text { fill: #B08A3E; font-family: 'Montserrat', 'Segoe UI', sans-serif; }
          .brand-title { font-size: 26px; font-weight: 500; letter-spacing: 1px; }
          .brand-subtitle { font-size: 5.5px; font-weight: 600; letter-spacing: 1.6px; }
          .line-separator { stroke: #C5A059; stroke-width: 1.6; stroke-linecap: round; }
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

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? "active" : ""}`;

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur border-b border-[#E6DFD3]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <PavItLogo className="h-11 md:h-12 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <NavLink to="/" end className={navLinkClass}>
            Головна
          </NavLink>
          <NavLink to="/about-us" className={navLinkClass}>
            Про нас
          </NavLink>
          <NavLink to="/services" className={navLinkClass}>
            Послуги
          </NavLink>
          <NavLink to="/contact-us" className={navLinkClass}>
            Контакти
          </NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/contact-us"
            className="px-4 py-2 text-sm font-medium btn-secondary"
          >
            Contact Us
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden p-2"
          aria-label="Відкрити меню"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="#221D17"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[#E6DFD3] px-6 py-4 space-y-3">
          <NavLink
            to="/"
            end
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            <span className="block">Головна</span>
          </NavLink>
          <NavLink
            to="/about-us"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            <span className="block">Про нас</span>
          </NavLink>
          <NavLink
            to="/services"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            <span className="block">Послуги</span>
          </NavLink>
          <NavLink
            to="/contact-us"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            <span className="block">Контакти</span>
          </NavLink>
          <Link
            to="/contact-us"
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-2 text-sm font-medium btn-primary text-center mt-3"
          >
            Спробувати безкоштовно
          </Link>
        </div>
      )}
    </header>
  );
}
