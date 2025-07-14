import axios from "axios";

axios.defaults.baseURL = "http://192.168.1.219:3000/api";

export const googleRegistration = async (token) => {
  const result = await axios.post("/auth/google-registration", {
    token,
  });
  return result.data;
};
