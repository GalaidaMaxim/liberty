import * as SecureStore from "expo-secure-store";

export const storageGetToken = () => SecureStore.getItem("authToken");
