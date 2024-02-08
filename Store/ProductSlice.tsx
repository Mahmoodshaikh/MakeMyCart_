import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { DUMMY_JSON_API } from '../Src/APIs/productsAPI';

export type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};


type ProductsDataType = {
  isLoading: boolean;
  productsData: ProductType[];
  error: string;
};

const initialProductsState: ProductsDataType = {
  isLoading: false,
  productsData: [],
  error: '',
};

export const AllProductsDetails = createAsyncThunk(
  'product/allproducts',
  async () => {
    try {
      const response = await axios.get(DUMMY_JSON_API);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState: initialProductsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AllProductsDetails.pending, (state) => {
      state.isLoading = true;
      state.productsData = [];
      state.error = '';
    });
    builder.addCase(AllProductsDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productsData = action.payload.products;
      state.error = '';
    });
  },
});

export default productSlice.reducer;
