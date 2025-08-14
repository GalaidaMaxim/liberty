import axios from "axios";

export const createSynonym = async (word_id, sysnonym_id, token) => {
  const result = await axios.post(
    "/synonyms",
    { word_id, sysnonym_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result.data;
};

export const getSynonyms = async (word_id, token) => {
  const result = await axios.get("/synonyms", {
    params: { word_id },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result.data;
};

export const deleteSynonym = async (word_id, sysnonym_id, token) => {
  const result = await axios.delete("/synonyms", {
    data: {
      word_id,
      sysnonym_id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result;
};
