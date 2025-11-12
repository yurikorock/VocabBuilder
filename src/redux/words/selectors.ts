import type { RootState } from "../store";


export const selectCategories = (state: RootState) => state.words.categories;
export const selectIsLoading = (state: RootState) => state.words.isLoading;
export const selectError = (state: RootState) => state.words.error;




