export interface IResultDto<T> {
  code: number;
  success: boolean;
  data: T;
}

export interface ILoginParams {
  username: string;
  password: string;
}

export interface IRegisterParams extends ILoginParams {
  email: string;
  captcha: string;
}

export interface ILoginResult {
  accessToken: string;
  refreshToken: string;
}

export interface IUpdatePassword {
  password: string;
  email: string;
  captcha: string;
}

export interface IRefreshTokenResult extends ILoginResult {}
