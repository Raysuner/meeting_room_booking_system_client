export interface ILoginParams {
  username: string;
  password: string;
}

export interface ILoginResult {
  accessToken: string;
  refreshToken: string;
}
