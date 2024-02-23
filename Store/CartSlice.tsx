import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './Store';

interface CartItem {
  ProductImages: string[];
  productId: number;
  ProductTitle: string;
  productDescription: string;
  ProductPrice: number;
  ProductDiscountPercentage: number;
  ProductRating: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    clearCart: (state) => {
      state.items = []; 
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
