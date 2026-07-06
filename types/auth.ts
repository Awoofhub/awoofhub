import { User } from "./user";

export interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface SignupData {
  email: string;
  password: string;
  name: string;
};
export interface EmailData {
  email: string;
};

export interface ResetPasswordData {
  token: string;
  password: string;
};


export interface VerifyEmailData {
  token: string;
};

export interface LoginData {
  email: string;
  password: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type LoginResponse = {
  user: User;
} & AuthTokens;

