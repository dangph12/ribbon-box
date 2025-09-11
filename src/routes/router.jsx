import { createBrowserRouter } from 'react-router';

import DesignGiftBox from '~/app/design-giftbox/page';
import HomePage from '~/app/page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/design-giftbox',
    element: <DesignGiftBox />
  }
]);
export default router;
