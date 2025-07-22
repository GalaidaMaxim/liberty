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

export const deleteType = async (id, token) => {
  const result = await axios.delete("/types", {
    data: {
      typesID: id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result;
};

export const changeType = async (id, name, token) => {
  const result = await axios.patch(
    "/types",
    {
      id,
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result.data;
};
