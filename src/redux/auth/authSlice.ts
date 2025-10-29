import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  email: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  email: null,
};

interface SetUserPayload {
  email: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<SetUserPayload>) {
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    removeUser(state) {
      state.isLoggedIn = false;
    },
  },
});
export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
