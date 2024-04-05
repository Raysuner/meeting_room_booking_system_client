export interface ILoginParams {
  username: string;
  password: string;
}

export interface IRegisterParams extends ILoginParams {
  email: string;
  captcha: string;
}

export interface IResultDto<T> {
  code: number;
  success: boolean;
  data: T;
}

export interface ILoginResult {
  accessToken: string;
  refreshToken: string;
}
