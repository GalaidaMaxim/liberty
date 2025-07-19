import axios from "axios";

export const createType = async (name, dictionaryId, token) => {
  const result = await axios.post(
    "/types",
    { name, dictionaryId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result.data;
};

export const getTypes = async (dictionaryId, token) => {
  const result = await axios.get("/types", {
    params: { dictionaryId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result.data;
};
