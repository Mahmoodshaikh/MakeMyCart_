import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DUMMY_JSON_API } from '../Src/APIs/productsAPI';
import { RootState } from './Store';

export const fetchCategoryData = createAsyncThunk<any, string>(
  'selectedCategory/fetchCategoryData',
  async (category: string) => {
    try {
      const response = await DUMMY_JSON_API.get(`/products/category/${category}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch category : ' + error.message);
    }
  }
);

interface SelectedCategoryState {
  categoryData: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: SelectedCategoryState = {
  categoryData: null,
  isLoading: false,
  error: null,
};

const selectedCategorySlice = createSlice({
  name: 'selectedCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryData.pending, (state) => {
        state.isLoading = true;
        state.error = null; 
      })
      .addCase(fetchCategoryData.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.categoryData = action.payload;
        console.log('Fetched category data:', action.payload);
      })
      .addCase(fetchCategoryData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch category data';
        console.error('Failed to fetch category data:', action.error.message);
      });
  },
});

export default selectedCategorySlice.reducer;

export const selectedCategoryTitle = (state: RootState) => state.categories.categories[6];
