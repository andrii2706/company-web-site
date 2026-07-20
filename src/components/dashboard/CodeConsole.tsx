import { useEffect, useState } from "react";

interface CodeConsoleProps {
  deployedUrl: string;
  finalStatus: string;
  buildTime: string;
}

/**
 * Рядки коду, що "друкуються" один за одним у консолі. Це реалістичний
 * приклад деплою через Pav It — показує сам продукт у дії замість
 * абстрактного макета-скріншота.
 *
 * Кожен елемент — масив "токенів" з класом підсвітки синтаксису.
 */
type Token = { t: string; c: string };

const CODE_LINES: Token[][] = [
  [{ t: "// pav-it: деплой проєкту", c: "code-com" }],
  [
    { t: "import", c: "code-kw" },
    { t: " { deploy } ", c: "code-txt" },
    { t: "from", c: "code-kw" },
    { t: " ", c: "code-txt" },
    { t: "'@pavit/cli'", c: "code-str" },
  ],
  [{ t: "", c: "code-txt" }],
  [
    { t: "await", c: "code-kw" },
    { t: " ", c: "code-txt" },
    { t: "deploy", c: "code-fn" },
    { t: "({", c: "code-txt" },
  ],
  [
    { t: "  project", c: "code-txt" },
    { t: ": ", c: "code-txt" },
    { t: "'company-web-app'", c: "code-str" },
    { t: ",", c: "code-txt" },
  ],
  [
    { t: "  target", c: "code-txt" },
    { t: ": ", c: "code-txt" },
    { t: "'production'", c: "code-str" },
    { t: ",", c: "code-txt" },
  ],
  [
    { t: "  rollback", c: "code-txt" },
    { t: ": ", c: "code-txt" },
    { t: "true", c: "code-kw" },
    { t: ",", c: "code-txt" },
  ],
  [{ t: "})", c: "code-txt" }],
];

export function CodeConsole({ deployedUrl, finalStatus, buildTime }: CodeConsoleProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisibleLines(CODE_LINES.length);
      setShowResult(true);
      return;
    }

    let cancelled = false;
    let delay = 350;

    CODE_LINES.forEach((_, i) => {
      delay += 260;
      setTimeout(() => {
        if (!cancelled) setVisibleLines(i + 1);
      }, delay);
    });

    setTimeout(() => {
      if (!cancelled) setShowResult(true);
    }, delay + 500);

    return () => {
      cancelled = true;
    };
  }, []);

  const cleanBuildTime = buildTime.replace(/^[^:]*:\s*/i, "");

  return (
    <div
      className="code-console float-card"
      role="img"
      aria-label={`Консоль деплою: ${finalStatus}, ${buildTime}, ${deployedUrl}`}
    >
      <div className="code-console-bar flex items-center gap-1.5 px-4 py-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#4A3D30]"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-[#4A3D30]"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-[#4A3D30]"></span>
        <span className="code-line code-dim ml-3">deploy.ts</span>
      </div>

      <div className="p-5 min-h-[280px]">
        {CODE_LINES.map((line, i) => (
          <div
            key={i}
            className="code-line flex"
            style={{ opacity: i < visibleLines ? 1 : 0, transition: "opacity 0.15s ease" }}
          >
            <span className="code-dim select-none pr-4 text-right" style={{ minWidth: "1.5rem" }}>
              {i + 1}
            </span>
            <span>
              {line.length === 1 && line[0].t === "" ? (
                <span>&nbsp;</span>
              ) : (
                line.map((tok, j) => (
                  <span key={j} className={tok.c}>
                    {tok.t}
                  </span>
                ))
              )}
              {i === visibleLines - 1 && !showResult && <span className="code-cursor"></span>}
            </span>
          </div>
        ))}

        <div
          className="mt-4 pt-4 border-t border-[#3D3228] space-y-1.5"
          style={{ opacity: showResult ? 1 : 0, transition: "opacity 0.35s ease" }}
        >
          <div className="code-line flex items-center gap-2">
            <span className="code-ok">✓</span>
            <span className="code-txt">{finalStatus}</span>
            <span className="code-dim">— {cleanBuildTime}</span>
          </div>
          <div className="code-line code-dim">
            → {deployedUrl}
            {showResult && <span className="code-cursor"></span>}
          </div>
        </div>
      </div>
    </div>
  );
}
