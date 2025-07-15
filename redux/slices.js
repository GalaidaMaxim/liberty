import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "token",
  initialState: {
    user: {},
    token: "",
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setToken } = userSlice.actions;
