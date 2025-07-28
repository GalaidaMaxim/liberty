import axios from "axios";

export const createNote = async (text, word_id, token) => {
  const result = await axios.post(
    "/notes",
    { text, word_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result.data;
};

export const getNotes = async (word_id, token) => {
  const result = await axios.get("/notes", {
    params: {
      word_id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result.data;
};

export const deleteNote = async (id, token) => {
  const result = await axios.delete("/notes", {
    data: {
      note_id: id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result.data;
};
