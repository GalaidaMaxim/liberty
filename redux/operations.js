import { createAsyncThunk } from "@reduxjs/toolkit";
import { createDictionary, getDictionary } from "../service/API/dictionary";

export const createDictionaryThunk = createAsyncThunk(
  "dictionary/create",
  async ({ name, token }, { rejectWithValue }) => {
    try {
      console.log(name, token);

      await createDictionary(name, token);
      return name;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const getDictionaryThunk = createAsyncThunk(
  "dictionary/get",
  async ({ token }, { rejectWithValue }) => {
    try {
      const result = await getDictionary(token);
      return result;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
