import { createSlice } from '@reduxjs/toolkit';

interface QuantityState {
  [productId: number]: number; 
}

const initialState: QuantityState = {};

const quantitySlice = createSlice({
  name: 'quantity',
  initialState,
  reducers: {
    setQuantity(state, action) {
      const { productId, quantity } = action.payload;
      state[productId] = quantity;
    },
    incrementQuantity(state, action) {
      const productId = action.payload;
      if (state[productId] === undefined) {
        state[productId] = 1;
      } else {
        state[productId]++;
      }
    },
    decrementQuantity(state, action) {
      const productId = action.payload;
      if (state[productId] !== undefined && state[productId] > 0) {
        state[productId]--;
      }
    },
  },
});

export const { setQuantity, incrementQuantity, decrementQuantity } = quantitySlice.actions;

export default quantitySlice.reducer;
