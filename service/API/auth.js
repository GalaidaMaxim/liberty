import axios from "axios";

axios.defaults.baseURL = "http://192.168.1.219:3000/api";

export const googleRegistration = async ({
  name,
  sername,
  googleID,
  email,
}) => {
  await axios.post("/auth/google-registration", {
    name,
    sername,
    googleID,
    email,
  });
};
