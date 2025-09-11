import { createSlice } from '@reduxjs/toolkit';
import giftItemsData from '../../api/gift-items.json';

const initialState = {
  items: giftItemsData,
  loading: false,
  error: null
};

const giftItemsSlice = createSlice({
  name: 'giftItems',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    loadItems: (state, action) => {
      state.items = action.payload;
    }
  }
});

export const { setLoading, setError, loadItems } = giftItemsSlice.actions;
export default giftItemsSlice.reducer;
