import type { RouteObject } from "react-router";
import { Layout } from "../components/layout/Layout.component";
import { PortfolioHome } from "../components/home/PortfolioHome.component";
import { AboutUs } from "../components/about-us/About-us.component";
import { Services } from "../components/services/Services.component";
import { ContactUs } from "../components/contact-us/Contact-Us.component";

// Окремий файл зі списком маршрутів: його використовують і браузер
// (createBrowserRouter), і prerender під час білду (createStaticHandler).

// Українська версія — маршрути без префікса (мова за замовчуванням).
const ukRoutes: RouteObject[] = [
  { index: true, element: <PortfolioHome /> },
  { path: "about-us", element: <AboutUs /> },
  { path: "services", element: <Services /> },
  { path: "contact-us", element: <ContactUs /> },
];

// Англійська версія — ті самі сторінки під префіксом /en для SEO
// (окремі індексовані URL для кожної мови).
const enRoutes: RouteObject[] = [
  { index: true, element: <PortfolioHome /> },
  { path: "about-us", element: <AboutUs /> },
  { path: "services", element: <Services /> },
  { path: "contact-us", element: <ContactUs /> },
];

export const routes: RouteObject[] = [
  { path: "/", element: <Layout />, children: ukRoutes },
  { path: "/en", element: <Layout />, children: enRoutes },
];
