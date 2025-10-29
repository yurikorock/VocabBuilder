import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isLoggedIn: boolean,
}

const initialState: AuthState = {
  isLoggedIn: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<void>) {
      state.isLoggedIn = true;
    },
    removeUser(state) {
      state.isLoggedIn = false;
    },
  },
});
export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
