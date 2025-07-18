import { configureStore } from "@reduxjs/toolkit";
import { userSlice, dictionatySlice, loadginSlice } from "./slices";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    dictionary: dictionatySlice.reducer,
    loading: loadginSlice.reducer,
  },
});
