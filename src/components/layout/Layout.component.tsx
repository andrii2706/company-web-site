import { Outlet } from "react-router";
import { Header } from "./Header.component";
import { Footer } from "./Footer.component";
import { LanguageProvider } from "../../i18n/LanguageContext";
import { Seo } from "../../seo/Seo";

export function Layout() {
  return (
    <LanguageProvider>
      <Seo />
      <div className="antialiased">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
