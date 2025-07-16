import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../api/comments';
import type { Comment } from '../types/types';

export const fetchComments = createAsyncThunk('comments/fetch', api.getCommentsByProductId);
export const createComment = createAsyncThunk('comments/create', api.addComment);
export const removeComment = createAsyncThunk('comments/delete', api.deleteComment);

interface CommentsState {
  list: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  list: [],
  loading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load comments';
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.list = state.list.filter(c => c.id !== action.meta.arg);
      });
  },
});

export default commentsSlice.reducer;