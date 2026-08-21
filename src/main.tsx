import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router/router";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// Ховаємо boot-лоадер одразу після монтування React-застосунку.
// Мінімальний час показу (450ms) — щоб анімація встигла бути поміченою
// оком і не виглядала як випадкове блимання на дуже швидких з'єднаннях.
const MIN_VISIBLE_MS = 450;
const bootStart = window.performance?.now?.() ?? 0;

function hideBootLoader() {
  const el = document.getElementById("boot-loader");
  if (!el) return;

  const elapsed = (window.performance?.now?.() ?? 0) - bootStart;
  const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);

  window.setTimeout(() => {
    el.classList.add("is-hidden");
    el.addEventListener(
      "transitionend",
      () => el.remove(),
      { once: true }
    );
    // Резервне видалення, якщо transitionend з якоїсь причини не спрацює.
    window.setTimeout(() => el.remove(), 800);
  }, remaining);
}

// requestAnimationFrame двічі — гарантує, що перший React-рендер
// уже реально відмальований у DOM перед тим, як ми ховаємо лоадер.
requestAnimationFrame(() => requestAnimationFrame(hideBootLoader));
