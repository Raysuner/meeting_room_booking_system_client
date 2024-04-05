import request from "../utils/request";

export async function login(data: any) {
  return await request({
    method: "post",
    url: "/user/login",
    data,
  });
}

export async function register(data: any) {
  return await request({
    method: "post",
    url: "/user/register",
    data,
  });
}
