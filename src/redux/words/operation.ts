import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";


axios.defaults.baseURL = "https://vocab-builder-backend.p.goit.global/api";

type Token = string;

// Utility to add JWT
const setAuthHeader = (token: Token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const fetchWordsCategories = createAsyncThunk(
  "words/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        return thunkAPI.rejectWithValue("No token found");
      }
      setAuthHeader(token);
      const res = await axios.get("/words/categories");

      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

export const addOwnWordsTable = createAsyncThunk(
  "words/addOwnWord",
  async (newWordData: any, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        return thunkAPI.rejectWithValue("No token found");
      }
      setAuthHeader(token);
      const res = await axios.post("/words/create", newWordData);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Bad request (invalid request body)"
      );
    }
  }
);
