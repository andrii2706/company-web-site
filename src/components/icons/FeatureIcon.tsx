/**
 * Копірайтер у WordPress обирає іконку зі списку (ключ рядком: "grid", "cube"...),
 * а сам SVG-дизайн лишається в коді — так неможливо випадково "зламати" вигляд сайту.
 */
export type FeatureIconKey = "grid" | "cube" | "shield" | "clock" | "lock" | "heart" | "chart";

const ICON_BG: Record<FeatureIconKey, string> = {
  grid: "#F4EBDD",
  cube: "#ECFDF5",
  shield: "#FEF2F2",
  clock: "#ECFDF5",
  lock: "#FEF2F2",
  heart: "#F4EBDD",
  chart: "#FFFBEB",
};

const ICON_STROKE: Record<FeatureIconKey, string> = {
  grid: "#8A5A2B",
  cube: "#10B981",
  shield: "#EF4444",
  clock: "#10B981",
  lock: "#EF4444",
  heart: "#8A5A2B",
  chart: "#F59E0B",
};

function IconSvg({ iconKey, stroke }: { iconKey: FeatureIconKey; stroke: string }) {
  switch (iconKey) {
    case "grid":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="3" width="6" height="6" rx="1.5" stroke={stroke} strokeWidth="1.6" />
          <rect x="11" y="3" width="6" height="6" rx="1.5" stroke={stroke} strokeWidth="1.6" />
          <rect x="3" y="11" width="6" height="6" rx="1.5" stroke={stroke} strokeWidth="1.6" />
          <rect x="11" y="11" width="6" height="6" rx="1.5" stroke={stroke} strokeWidth="1.6" />
        </svg>
      );
    case "cube":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L3 6V14L10 18L17 14V6L10 2Z" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M10 10L17 6" stroke={stroke} strokeWidth="1.6" />
          <path d="M10 10V18" stroke={stroke} strokeWidth="1.6" />
          <path d="M10 10L3 6" stroke={stroke} strokeWidth="1.6" />
        </svg>
      );
    case "shield":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 18C10 18 17 14 17 8.5V4L10 2L3 4V8.5C3 14 10 18 10 18Z" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "clock":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="7" stroke={stroke} strokeWidth="1.6" />
          <path d="M10 6V10L13 12" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "lock":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="4" y="9" width="12" height="8" rx="1.5" stroke={stroke} strokeWidth="1.6" />
          <path d="M6.5 9V6.5C6.5 4.5 8 3 10 3C12 3 13.5 4.5 13.5 6.5V9" stroke={stroke} strokeWidth="1.6" />
        </svg>
      );
    case "heart":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 17.5C10 17.5 3 13 3 7.8C3 5.1 5.1 3 7.6 3C8.9 3 10 3.6 10 3.6C10 3.6 11.1 3 12.4 3C14.9 3 17 5.1 17 7.8C17 13 10 17.5 10 17.5Z"
            stroke={stroke}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "chart":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 17V11M10 17V3M17 17V8" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

export function FeatureIcon({
  icon,
  size = "md",
}: {
  icon: string;
  size?: "sm" | "md";
}) {
  const key: FeatureIconKey = (["grid", "cube", "shield", "clock", "lock", "heart", "chart"] as const).includes(
    icon as FeatureIconKey
  )
    ? (icon as FeatureIconKey)
    : "grid";

  const box = size === "sm" ? "w-11 h-11" : "w-12 h-12";

  return (
    <div className={`${box} rounded-xl flex items-center justify-center mb-5`} style={{ background: ICON_BG[key] }}>
      <IconSvg iconKey={key} stroke={ICON_STROKE[key]} />
    </div>
  );
}

/** Маленька галочка, що використовується у чек-листах (тарифи, картки можливостей). */
export function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
      <path d="M3 8.5L6 11.5L13 4.5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
