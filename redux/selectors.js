import { useSelector } from "react-redux";

export const useUser = () => useSelector((state) => state.user.user);
export const useDictionareis = () =>
  useSelector((state) => state.dictionary.value);

export const useLoading = () =>
  useSelector(
    (state) =>
      state.dictionary.loading || state.loading.value || state.types.loading
  );

export const useTypes = () => useSelector((state) => state.types.value);
export const useLocalisation = () =>
  useSelector((state) => state.localisation.value);
