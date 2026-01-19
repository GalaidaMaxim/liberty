import axios from "axios";

axios.defaults.baseURL = "https://liberty-server.vercel.app/api";

export const googleRegistration = async (token) => {
  const result = await axios.post("/auth/google-registration", {
    token,
  });
  return result.data;
};

export const loginWithPasword = async (email, password) => {
  const response = await axios.post("/auth/signin", {
    email,
    password,
  });
  return response.data;
};

export const logout = async (token) => {
  const data = await axios.get("/auth/logout", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};
