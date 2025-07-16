import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice.ts';
import commentsReducer from './commentsSlice.ts';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
