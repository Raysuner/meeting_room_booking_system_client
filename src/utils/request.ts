import axios from "axios";
import { refreshToken } from "../api";
import { message } from "antd";

const request = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 2000,
});

request.interceptors.request.use(
  (config) => {
    let token = "";
    if (config.url?.includes?.("refreshToken")) {
      token = localStorage.getItem("refreshToken") || "";
    } else {
      token = localStorage.getItem("accessToken") || "";
    }
    if (token) {
      config.headers.setAuthorization(`Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const { data, config } = error.response;
    if (data.code === 10011) {
      if (!config.url.includes("/user/refreshToken")) {
        const res = await refreshToken();
        if (res.success) {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          return request({
            method: config.method,
            url: config.url,
            params: config.data,
            data: config.data,
          });
        }
      } else {
        message.error("登录态失效,将跳转到登录页,请重新登录");
        setTimeout(() => {
          location.href = "/login";
        }, 2500);
      }
    }
    return Promise.reject(data);
  }
);

export default request;
