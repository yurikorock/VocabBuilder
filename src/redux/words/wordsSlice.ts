import { createSlice } from "@reduxjs/toolkit";
import {
  addOwnWordsTable,
  editOwnWord,
  fetchWordsCategories,
  getWordsAll,
  getWordsOwnAll,
  getWordsStatistics,
} from "./operation";
import type { Word } from "./types";

interface WordState {
  categories: string[];
  words: Word[];
  page: number;
  totalPages: number;
  perPage: number;
  hasMore: boolean;
  totalCount: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: WordState = {
  categories: [],
  words: [],
  page: 1,
  totalPages: 1,
  perPage: 7,
  hasMore: false,
  totalCount: 0,
  isLoading: false,
  error: null,
};

const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
    resetWords(state) {
      state.words = [];
      state.page = 1;
      state.totalPages = 1;
      state.hasMore = false;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
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
      })
      .addCase(addOwnWordsTable.fulfilled, (state, action) => {
        state.isLoading = false;
        state.words.push(action.payload);
      })
      .addCase(addOwnWordsTable.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // ➕ отримання всіх слів
      .addCase(getWordsAll.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWordsAll.fulfilled, (state, action) => {
        const payload = action.payload;
        state.isLoading = false;

        state.words = payload.results;

        state.page = payload.page;
        state.totalPages = payload.totalPages;
        state.perPage = payload.perPage;

        state.hasMore = payload.page < payload.totalPages;
      })
      .addCase(getWordsAll.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // ➕ отримання власних слів
      .addCase(getWordsOwnAll.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWordsOwnAll.fulfilled, (state, action) => {
        const payload = action.payload;
        state.isLoading = false;

        state.words = payload.results;

        state.page = payload.page;
        state.totalPages = payload.totalPages;
        state.perPage = payload.perPage;

        state.hasMore = payload.page < payload.totalPages;
      })
      .addCase(getWordsOwnAll.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getWordsStatistics.fulfilled, (state, action) => {
        state.totalCount = action.payload.totalCount;
      })
      // ➕ редагування свого слова
      .addCase(editOwnWord.fulfilled, (state, action) => {
        const updatedWord = action.payload;

        const index = state.words.findIndex(
          (word) => word._id === updatedWord._id
        );

        if (index !== -1) {
          state.words[index] = updatedWord;
        }
      });
  },
});
export const { resetWords, setPage } = wordsSlice.actions;
export const wordsReducer = wordsSlice.reducer;
