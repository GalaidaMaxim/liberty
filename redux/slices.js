import { createSlice } from "@reduxjs/toolkit";
import {
  createDictionaryThunk,
  getDictionaryThunk,
  deleteDictionaryThunk,
  getTypeThunk,
  createTypeThunk,
  deleteTypeThunk,
  changeTypeThunk,
} from "./operations";

export const loadginSlice = createSlice({
  name: "loading",
  initialState: {
    value: false,
  },
  reducers: {
    enableLoading: (state) => {
      state.value = true;
    },
    disableLoadgin: (state) => {
      state.value = false;
    },
  },
});

export const userSlice = createSlice({
  name: "token",
  initialState: {
    user: null,
    token: "",
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    removeUser(state, action) {
      state.user = null;
      state.token = "";
    },
  },
});

export const dictionatySlice = createSlice({
  name: "dictionary",
  initialState: {
    loading: false,
    value: [],
    error: null,
  },
  extraReducers: (builder) => {
    //createDictionary
    builder.addCase(createDictionaryThunk.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(createDictionaryThunk.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.value.push(action.payload);
    });
    builder.addCase(createDictionaryThunk.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //getDictionary
    builder.addCase(getDictionaryThunk.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(getDictionaryThunk.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(getDictionaryThunk.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //deleteDictionaty
    builder.addCase(deleteDictionaryThunk.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(deleteDictionaryThunk.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.value = state.value.filter((item) => item.id !== action.payload);
    });
    builder.addCase(deleteDictionaryThunk.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const typesSlice = createSlice({
  name: "types",
  initialState: {
    loading: false,
    value: [],
    error: null,
  },
  extraReducers: (builder) => {
    //createtype
    builder.addCase(createTypeThunk.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(createTypeThunk.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.value.push(action.payload);
    });
    builder.addCase(createTypeThunk.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //getType
    builder.addCase(getTypeThunk.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(getTypeThunk.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(getTypeThunk.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //deleteType
    builder.addCase(deleteTypeThunk.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(deleteTypeThunk.fulfilled, (state, action) => {
      state.error = null;
      state.value = state.value.filter((item) => item.id !== action.payload);
      state.loading = false;
    });

    builder.addCase(deleteTypeThunk.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //changeType
    builder.addCase(changeTypeThunk.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(changeTypeThunk.fulfilled, (state, action) => {
      state.error = null;
      const index = state.value.findIndex(
        (item) => item.id === action.payload.id
      );
      state.value.splice(index, 1, action.payload);
      state.loading = false;
    });
    builder.addCase(changeTypeThunk.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { setToken, setUser, removeUser } = userSlice.actions;
export const { enableLoading, disableLoadgin } = loadginSlice.actions;
