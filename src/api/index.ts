import request from "../utils/request";
import {
  ILoginResult,
  ILoginParams,
  IResultDto,
  IRegisterParams,
  IUpdatePassword,
  IRefreshTokenResult,
} from "../types";

export async function login(params: ILoginParams) {
  const res = await request.post<IResultDto<ILoginResult>>(
    "/user/login",
    params
  );
  return res.data;
}

export async function sendCaptcha(params: { address: string }) {
  return await request.get("/user/registerCaptcha?address=" + params.address);
}

export async function register(params: IRegisterParams) {
  return await request.post("/user/register", params);
}

export async function updatePassword(params: IUpdatePassword) {
  const res = await request.post("/user/updatePassword", params);
  return res.data;
}

export async function getUserInfo() {
  const res = await request.get("/user/getUserInfo");
  return res.data;
}

export async function updateUserInfo(params: any) {
  return await request.post("/user/updateInfo", params);
}

export async function refreshToken() {
  const res = await request.get<IResultDto<IRefreshTokenResult>>(
    "/user/refreshToken"
  );
  return res.data;
}

export async function uploadFile(params: FormData) {
  const res = await request.post("/user/upload", params);
  return res.data;
}
