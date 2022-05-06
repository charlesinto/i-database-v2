import Axios from "axios";

const apiUrl =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3004";

export const login = (payload) => {
  return Axios.post(`${apiUrl}/api/v1/auth/login`, payload);
};
