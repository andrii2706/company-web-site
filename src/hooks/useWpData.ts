import { useEffect, useState } from "react";

/**
 * Універсальний хук для завантаження контенту з WordPress.
 *
 * Якщо WP недоступний (наприклад, ще не піднятий локально, або тимчасово впав),
 * компонент не "ламається" — просто показує fallback (той самий текст,
 * що був захардкоджений раніше), щоб сайт завжди залишався робочим.
 */
export function useWpData<T>(fetcher: () => Promise<T>, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetcher()
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setIsFallback(false);
      })
      .catch((err) => {
        if (cancelled) return;
        console.warn("[Pav It] Не вдалося завантажити контент з WordPress, показуємо резервний текст:", err);
        setData(fallback);
        setIsFallback(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, isFallback };
}
