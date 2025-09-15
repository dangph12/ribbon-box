import { createBrowserRouter } from "react-router";

import DesignGiftBox from "~/app/design-giftbox/page";
import HomePage from "~/app/page";
import HomepageLayout from "../layouts/homepageLayout";
import Homepage from "../app/homepage/page";
import AboutUs from "../app/main-about-us/page";
import ContactWithUs from "../app/contact/page";
import AvailableBox from "../app/available/page";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <HomePage />,
  // },
  // {
  //   path: "/design-giftbox",
  //   element: <DesignGiftBox />,
  // },
  {
    path: "/",
    element: <HomepageLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/design-giftbox",
        element: <DesignGiftBox />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <ContactWithUs />,
      },
      {
        path: "available",
        element: <AvailableBox />,
      },
    ],
  },
]);

export default router;
