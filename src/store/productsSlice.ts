import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../api/product';
import type { Product } from '../types/types';

export const fetchProducts = createAsyncThunk('products/fetchAll', api.getProducts);
export const createProduct = createAsyncThunk('products/create', api.addProduct);
export const removeProduct = createAsyncThunk('products/delete', api.deleteProduct);

interface ProductsState {
  list: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  list: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.list = state.list.filter(p => p.id !== action.meta.arg);
      });
  }
});

export default productsSlice.reducer;