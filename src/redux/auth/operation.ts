import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://vocab-builder-backend.p.goit.global/api";

type Token = string;

// Utility to add JWT
const setAuthHeader = (token: Token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = (): void => {
  axios.defaults.headers.common.Authorization = "";
};

interface User {
  _id?: string;
  name: string;
  email: string;
}

interface Credentials {
  name: string;
  email: string;
  password: string;
}
interface AuthResponse {
  token: string;
  user: User;
}

/* REGISTER
 * POST @ /users/register
 * body: { name, email, password }
 */
export const register = createAsyncThunk<
  AuthResponse,
  Credentials,
  { rejectValue: string }
>("auth/register", async (credentials, thunkApi) => {
  try {
    const res = await axios.post<AuthResponse>("/users/signup", credentials);
    // After successful registration, add the token to the HTTP header
    setAuthHeader(res.data.token);
    return res.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message || "Registration failed");
  }
});

/* LOGOUT
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 */

export const logOut = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await axios.post("/users/signout");
      // After a successful logout, remove the token from the HTTP header
      clearAuthHeader();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Logout failed");
    }
  }
);

/* LOGIN
 * POST @ /users/login
 * body: { email, password }
 */

interface CredentialsLogIn {
  email: string;
  password: string;
}

export const logIn = createAsyncThunk<
  AuthResponse,
  CredentialsLogIn,
  { rejectValue: string }
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const res = await axios.post<AuthResponse>("/users/signin", credentials);
    // After successful login, add the token to the HTTP header
    setAuthHeader(res.data.token);
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || "Log in failed");
  }
});

/* REFRESH
 * GET @ /users/current
 * headers: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk<
  AuthResponse,
  void,
  { rejectValue: string; state: { auth: { token: string | null } } }
>("auth/refresh", async (_, thunkAPI) => {
  // Reading the token from the state via getState()
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    // If there is no token, exit without performing any request
    return thunkAPI.rejectWithValue("Unable to fetch user");
  }
  try {
    // If there is a token, add it to the HTTP header and perform the request
    setAuthHeader(persistedToken);
    const res = await axios.get<AuthResponse>("/users/current");
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || "Refresh failed");
  }
});
