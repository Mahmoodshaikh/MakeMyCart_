import { configureStore } from '@reduxjs/toolkit';
import productReducer from './ProductSlice';
import CartReducer from './CartSlice'

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: CartReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
