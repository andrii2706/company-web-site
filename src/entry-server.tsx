import { renderToString } from "react-dom/server";
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router";
import { routes } from "./router/routes";

export { META, ORIGIN, PAGE_KEYS, urlFor } from "./seo/meta";
export type { Lang, PageKey } from "./seo/meta";

/**
 * Рендерить сторінку в HTML-рядок на етапі білду (без браузера).
 * Дані з WordPress у цей момент не завантажуються — компоненти
 * показують свої вбудовані fallback-тексти, яких достатньо для індексації.
 */
export async function render(path: string): Promise<string> {
  const { query, dataRoutes } = createStaticHandler(routes);
  const context = await query(new Request(`http://localhost${path}`));
  if (context instanceof Response) {
    throw new Error(`Prerender ${path}: неочікувана відповідь ${context.status}`);
  }
  const router = createStaticRouter(dataRoutes, context);
  return renderToString(<StaticRouterProvider router={router} context={context} hydrate={false} />);
}
