import axios from "axios";
export const getUser = async (token) => {
  const data = await axios.get("/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};
