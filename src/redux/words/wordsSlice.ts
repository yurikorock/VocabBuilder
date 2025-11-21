import { createSlice } from "@reduxjs/toolkit";
import { addOwnWordsTable, fetchWordsCategories } from "./operation";

interface WordState {
  categories: string[];
  words: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WordState = {
  categories: [],
  words: [],
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
      })
      // ➕ додавання нового власного слова
      .addCase(addOwnWordsTable.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      }).addCase(addOwnWordsTable.fulfilled, (state, action) => {
        state.isLoading = false;
        state.words.push(action.payload);
      }).addCase(addOwnWordsTable.rejected, (state, action)=>{
        state.isLoading = false;
        state.error = action.payload as string;
      })
  },
});
export const wordsReducer = wordsSlice.reducer;
