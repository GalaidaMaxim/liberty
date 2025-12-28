import axios from "axios";

export const createAntonym = async (word_id, antonym_id, token) => {
  const result = await axios.post(
    "/antonyms",
    { word_id, antonym_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result.data;
};

export const getAntonyms = async (word_id, token) => {
  const result = await axios.get("/antonyms", {
    params: { word_id },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result.data;
};

export const deleteAntonyms = async (word_id, antonym_id, token) => {
  const result = await axios.delete("/antonyms", {
    data: {
      word_id,
      antonym_id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result;
};
