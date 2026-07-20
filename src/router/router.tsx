import { createBrowserRouter } from "react-router";
import { Layout } from "../components/layout/Layout.component";
import { Dashboard } from "../components/dashboard/Dashboard.component";
import { AboutUs } from "../components/about-us/About-us.component";
import { Services } from "../components/services/Services.component";
import { ContactUs } from "../components/contact-us/Contact-Us.component";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "services", element: <Services /> },
      { path: "contact-us", element: <ContactUs /> },
    ],
  },
]);
