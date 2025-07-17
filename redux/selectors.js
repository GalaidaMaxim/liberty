import { useSelector } from "react-redux";

export const useUser = () => useSelector((state) => state.user.user);
export const useDictionareis = () =>
  useSelector((state) => state.dictionary.value);
