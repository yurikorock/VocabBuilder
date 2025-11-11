import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://vocab-builder-backend.p.goit.global/api";

export const fetchWordsCategories = createAsyncThunk(
  "words/fetchCategories",
  async (_, thunkAPI) => {
    try {
        const res = await axios.get("/words/categories");
        return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch categories");
    }
  }
);


