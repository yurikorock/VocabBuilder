import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import type { Word, WordsResponse } from "./types";

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
//додавання власного слова
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
      console.log(error.response?.data);
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
//отримання всіх слів словника
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
    // console.log("🔥 BACKEND RESPONSE:", res.data);
    return res.data as WordsResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ||
        error.message ||
        "Bad request (invalid request body)"
    );
  }
});

//     !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!     //
//отримання власних слів на вивчення

export const getWordsOwnAll = createAsyncThunk<
  WordsResponse,
  WordsQuery,
  { state: RootState }
>("words/getWordsOwnAll", async (params, thunkAPI) => {
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

    const res = await axios.get<WordsResponse>("/words/own", {
      params: query,
    });
    // console.log("🔥 BACKEND RESPONSE:", res.data);
    return res.data as WordsResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ||
        error.message ||
        "Bad request (invalid request body)"
    );
  }
});

// отримання статистики кількості слів для вивчення
interface WordsStatisticsResponse {
  totalCount: number;
}

export const getWordsStatistics = createAsyncThunk<WordsStatisticsResponse>(
  "words/getWordsStatistics",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get<WordsStatisticsResponse>("/words/statistics");
      // console.log("🔥 BACKEND RESPONSE:", res.data);
      return res.data as WordsStatisticsResponse;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// редагувати власні слова

type EditWordPayload = {
  id: string;
  en: string;
  ua: string;
  category?: string;
};

export const editOwnWord = createAsyncThunk<
  Word,
  EditWordPayload,
  { rejectValue: string }
>("words/editWords", async ({ id, ...data }, thunkAPI) => {
  try {
    const response = await axios.patch(`words/edit/${id}`, data);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Edit word failed"
    );
  }
});
// видалити власні слова
export const deleteOwnWord = createAsyncThunk<
  string, // 👉 повертаємо id
  string, // 👉 приймаємо id
  { rejectValue: string }
>("words/deleteWord", async (id, thunkAPI) => {
  try {
    await axios.delete(`words/delete/${id}`);
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Delete word failed"
    );
  }
});
