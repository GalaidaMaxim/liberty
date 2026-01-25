import { configureStore } from "@reduxjs/toolkit";
import {
	userSlice,
	dictionatySlice,
	loadingSlice,
	typesSlice,
	localisationSlice,
} from "./slices";

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		dictionary: dictionatySlice.reducer,
		loading: loadingSlice.reducer,
		types: typesSlice.reducer,
		localisation: localisationSlice.reducer,
	},
});
