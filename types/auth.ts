import { User } from "./user";

export interface SignupData {
  email: string;
  password: string;
  name: string;
};
export interface SignupFormData 
  extends SignupData {
  confirmPassword: string;
  }

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

