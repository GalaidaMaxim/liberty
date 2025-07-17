import axios from "axios";

export const createDictionary = async (name, token) => {
  const result = await axios.post(
    "/dictionary",
    { name },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  console.log(result.data);

  return result.data;
};

export const getDictionary = async (token) => {
  const result = await axios.get("/dictionary", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data;
};
