import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import type { WordsResponse } from "./types";

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

export interface WordsQuery {
  category?: string; // optional
  verbType?: "regular" | "irregular" | null; // optional
  keyword?: string;
  page?: number;
  limit?: number;
}

export const getWordsAll = createAsyncThunk<
  WordsResponse,
  WordsQuery,
  { state: RootState }
>("words/getWordsAll", async (params, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    setAuthHeader(token);

    const query: Record<string, string | number> = {};
    if (params.category && params.category !== "all") {
      query.category = params.category;
    }
    if (params.verbType && params.category === "verb") {
      query.verbType = params.verbType; // "regular" | "irregular"
    }
    if (params.keyword?.trim()) {
     
      query.keyword = params.keyword.trim();
    }

      // Pagination (backend requires these)
    query.page = params.page ?? 1;
    query.limit = params.limit ?? 7; // pick your default

    const res = await axios.get<WordsResponse>("/words/all", {
      params: query,
    });
    console.log("🔥 BACKEND RESPONSE:", res.data);
    return res.data as WordsResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ||
        error.message ||
        "Bad request (invalid request body)"
    );
  }
});
