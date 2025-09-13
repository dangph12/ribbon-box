import { createBrowserRouter } from "react-router";

import DesignGiftBox from "~/app/design-giftbox/page";
import HomePage from "~/app/page";
import HomepageLayout from "../layouts/homepageLayout";
import Homepage from "../app/homepage/page";
import AboutUs from "../app/main-about-us/page";
import ContactWithUs from "../app/contact/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/design-giftbox",
    element: <DesignGiftBox />,
  },
  {
    path: "/home",
    element: <HomepageLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <ContactWithUs />,
      },
    ],
  },
]);

export default router;
