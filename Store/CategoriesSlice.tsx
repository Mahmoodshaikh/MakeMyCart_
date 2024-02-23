import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './Store';

interface Category {
  name: string;
}

interface CategoriesState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetchCategories',
  async () => {
    const response = await fetch('https://dummyjson.com/products/categories');
    return response.json();
  }
);

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      });
  },
});

export default categoriesSlice.reducer;


