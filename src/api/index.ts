import request from "../utils/request";
import {
  ILoginResult,
  ILoginParams,
  IResultDto,
  IRegisterParams,
} from "../types";

export async function login(params: ILoginParams) {
  const res = await request.post<IResultDto<ILoginResult>>(
    "/user/login",
    params
  );
  return res.data;
}

export async function sendCaptcha(params: { address: string }) {
  await request.get("/user/register-captcha?address=" + params.address);
}

export async function register(params: IRegisterParams) {
  return await request.post("/user/register", params);
}
