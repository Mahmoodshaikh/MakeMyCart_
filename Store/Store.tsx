import { configureStore } from '@reduxjs/toolkit';
import productReducer from './ProductSlice';
import CartReducer from './CartSlice'
import userLoginReducer from './AuthSlice'
import categoriesReducer from './CategoriesSlice'
import selectedCategoryReducer from './selectedCategorySlice'
import quantityReducer from './QuantitySlice'
import orderReducer from './OrderSlice'

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: CartReducer,
    userLogin: userLoginReducer,
    categories: categoriesReducer,
    selectedCategory: selectedCategoryReducer,
    quantity: quantityReducer,
    order: orderReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
