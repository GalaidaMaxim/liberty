import * as SecureStore from "expo-secure-store";

SecureStore.setItem("language", "ukrainian");
export const storageGetLocalistion = () => SecureStore.getItem("language");
