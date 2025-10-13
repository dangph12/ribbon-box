import { createBrowserRouter } from 'react-router';

import DesignGiftBox from '~/app/design-giftbox/page';
import HomePage from '~/app/page';
import HomepageLayout from '../layouts/homepageLayout';
import Homepage from '../app/homepage/page';
import AboutUs from '../app/main-about-us/page';
import ContactWithUs from '../app/contact/page';
import AvailableBox from '../app/available/page';
import DesignPreview from '../components/Gift-Preview';
import OrderSuccess from '../components/order-success';
import OrderFailed from '../components/order-failed';
import Payment from '../components/payment';
import Checkout from '../components/checkout';
import History from '~/app/history/page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomepageLayout />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: '/design-giftbox',
        element: <DesignGiftBox />
      },
      {
        path: 'about',
        element: <AboutUs />
      },
      {
        path: 'contact',
        element: <ContactWithUs />
      },
      {
        path: 'available',
        element: <AvailableBox />
      },
      {
        path: 'preview',
        element: <DesignPreview />
      },
      {
        path: 'order-success',
        element: <OrderSuccess />
      },
      {
        path: 'checkout',
        element: <Checkout />
      },
      {
        path: 'order-failed',
        element: <OrderFailed />
      },
      {
        path: 'payment',
        element: <Payment />
      },
      {
        path: 'history',
        element: <History />
      }
    ]
  }
]);

export default router;
