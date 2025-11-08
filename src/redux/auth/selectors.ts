import type {RootState} from "../store"

export const selectIsLoggedIn = (state:  RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user;
export const selectUserName = (state: RootState) => state.auth.user?.name ?? "User";
export const selectIsRefreshing = (state: RootState)=> state.auth.isRefreshing;
export const selectToken = (state: RootState) => state.auth.token;