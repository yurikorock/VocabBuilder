import type {RootState} from "../store"

export const selectIsLoggedIn = (state: {auth: RootState}) => state.auth.isLoggedIn;