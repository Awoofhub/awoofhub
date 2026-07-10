import { refreshClient } from '@/lib/refreshClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from "../lib/apiClient";
import { ApiResponse } from "../types/api-response";
import { AuthTokens, EmailData, GoogleLoginData, LoginData, LoginResponse, ResetPasswordData, SignupData, VerifyEmailData } from "../types/auth";


// Login
export async function loginService(payload: LoginData): Promise<ApiResponse<LoginResponse>> {
  const res: ApiResponse<LoginResponse> = await apiClient.post('/auth/login/', payload)

  return res;
}

export async function googleLoginService(payload: GoogleLoginData): Promise<ApiResponse<LoginResponse>> {
  const res: ApiResponse<LoginResponse> = await apiClient.post('/auth/mobile/google/', payload)

  return res;
}

// Register
export async function signupService(payload: SignupData): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.post('/auth/signup/', payload)

  return res;
}


export async function forgotPasswordService(payload: EmailData): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.post('/auth/forgot-password/', payload)

  return res;
}


export async function resetPasswordService(payload: ResetPasswordData): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.post('/auth/reset-password/', payload)

  return res;
}

export async function verifyEmailService(payload: VerifyEmailData): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.post('/auth/verify-email/', payload)

  return res;
}

export async function refreshTokenService(): Promise<ApiResponse<AuthTokens>> {
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  const res: ApiResponse<AuthTokens> = await refreshClient.post('/auth/refresh/', {
    refreshToken
  })

  await AsyncStorage.setItem("accessToken", res.data.accessToken);
  await AsyncStorage.setItem("refreshToken", res.data.refreshToken);

  return res;
}

// Logout
export async function logoutService(): Promise<ApiResponse<{}>> {
  const res: ApiResponse<{}> = await apiClient.post('/auth/logout/')

  return res;
}
