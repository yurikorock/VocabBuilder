import type { RootState } from "../store";


export const selectCategories = (state: RootState) => state.words.categories;
export const selectIsLoading = (state: RootState) => state.words.isLoading;
export const selectError = (state: RootState) => state.words.error;

export const selectWords = (state:RootState) => state.words.words;
export const selectWordsLoading = (state: RootState) => state.words.isLoading;
export const selectWordsHasMore = (state: RootState) => state.words.hasMore;
export const selectWordsPage = (state: RootState) => state.words.page;
export const selectWordsTotalPage = (state: RootState) => state.words.totalPages;

export const selectWordsStatistics = (state: RootState) => state.words.totalCount;


export const selectModalWordId = (state: RootState) =>
  state.modal.wordId;