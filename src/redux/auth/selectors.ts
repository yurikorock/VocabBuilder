import type {RootState} from "../store"

export const selectIsLoggedIn = (state:  RootState) => state.auth.isLoggedIn;