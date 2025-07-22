import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createDictionary,
  getDictionary,
  deleteDictionary,
} from "../service/API/dictionary";
import {
  createType,
  getTypes,
  deleteType,
  changeType,
} from "../service/API/types";

export const createDictionaryThunk = createAsyncThunk(
  "dictionary/create",
  async ({ name, token }, { rejectWithValue }) => {
    try {
      const reusult = await createDictionary(name, token);
      return reusult;
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

export const deleteDictionaryThunk = createAsyncThunk(
  "dictionary/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const result = await deleteDictionary(id, token);
      return id;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const createTypeThunk = createAsyncThunk(
  "type/create",
  async ({ name, dictionaryID, token }, { rejectWithValue }) => {
    try {
      const reusult = await createType(name, dictionaryID, token);
      return reusult;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const getTypeThunk = createAsyncThunk(
  "type/get",
  async ({ dictionaryID, token }, { rejectWithValue }) => {
    try {
      const result = await getTypes(dictionaryID, token);
      return result;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const deleteTypeThunk = createAsyncThunk(
  "type/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const result = await deleteType(id, token);
      return id;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const changeTypeThunk = createAsyncThunk(
  "type/change",
  async ({ id, name, token }, { rejectWithValue }) => {
    try {
      const result = await changeType(id, name, token);
      return result;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
