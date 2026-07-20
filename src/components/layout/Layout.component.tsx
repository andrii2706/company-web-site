import { Outlet } from "react-router";
import { Header } from "./Header.component";
import { Footer } from "./Footer.component";

export function Layout() {
  return (
    <div className="antialiased">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
