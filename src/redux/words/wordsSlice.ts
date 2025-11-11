import { createSlice } from "@reduxjs/toolkit";
import { fetchWordsCategories } from "./operation";

interface WordState {
  categories: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WordState = {
  categories: [],
  isLoading: false,
  error: null,
};

const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWordsCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWordsCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchWordsCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
export const wordsReducer = wordsSlice.reducer;