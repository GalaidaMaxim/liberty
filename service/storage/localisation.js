import * as SecureStore from "expo-secure-store";

export const storateSetLocalistion = (item) =>
  SecureStore.setItem("language", item);
export const storageGetLocalistion = () => SecureStore.getItem("language");
