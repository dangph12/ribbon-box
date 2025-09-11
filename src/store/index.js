import { configureStore } from '@reduxjs/toolkit';
import giftBoxReducer from './features/gift-box-slice';
import giftItemsReducer from './features/gift-items-slice';

const store = configureStore({
  reducer: {
    giftBox: giftBoxReducer,
    giftItems: giftItemsReducer
  }
});

export default store;
