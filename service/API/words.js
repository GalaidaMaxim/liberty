import axios from "axios";

export const getWords = async ({ typeID, token, dictionaryID }) => {
  let result;
  if (!typeID) {
    result = await axios.get("/words", {
      params: {
        dictionaryID,
      },
      headers: { Authorization: `Bearer ${token}` },
    });
  } else {
    result = await axios.get("/words", {
      params: {
        typeID,
        dictionaryID,
      },
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  return result.data;
};

export const createWord = async ({
  word,
  translation,
  type_id,
  dictionaryID,
  token,
}) => {
  const result = await axios.post(
    "/words",
    {
      word,
      translation,
      type_id,
      dictionaryID,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return result.data;
};
