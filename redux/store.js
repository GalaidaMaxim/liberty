import { configureStore } from "@reduxjs/toolkit";
import { userSlice, dictionatySlice, loadginSlice, typesSlice } from "./slices";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    dictionary: dictionatySlice.reducer,
    loading: loadginSlice.reducer,
    types: typesSlice.reducer,
  },
});
