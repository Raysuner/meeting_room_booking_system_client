import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 2000,
});

// request.interceptors.request.use(
//   (config) => {
//     config.headers.setAuthorization(localStorage.getItem("accessToken"));
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default request;
