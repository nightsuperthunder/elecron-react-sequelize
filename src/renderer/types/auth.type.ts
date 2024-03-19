export interface ILoginForm {
  email: string;
  password: string;
}

export interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ISignupForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}
