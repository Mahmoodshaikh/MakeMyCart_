import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DUMMY_JSON_API } from '../Src/APIs/productsAPI';

interface User {
  username: string;
  password: string;
}

interface InitialState {
  isLoading: boolean;
  authData: unknown;
  error: string;
}

const initialState: InitialState = {
  isLoading: true,
  authData: {},
  error: '',
};

interface Headers {
  'Content-Type': string;
}

export const headers: Headers = { 'Content-Type': 'application/json' };

export const userLogin = createAsyncThunk(
  'auth/login',
  async (user: User) => {
    try {
      const response = await DUMMY_JSON_API.post('/auth/login', user, { headers });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
      state.authData = {};
      state.error = '';
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authData = action.payload;
      state.error = '';
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'An error occurred';
    });
  },
});

export default authSlice.reducer;
