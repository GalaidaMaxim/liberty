import { createSlice } from "@reduxjs/toolkit";

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

export const { setToken, setUser, removeUser } = userSlice.actions;
