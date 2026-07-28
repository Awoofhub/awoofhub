import { apiClient } from "../lib/apiClient";
import { ApiResponse } from "../types/api-response";
import { UpdateUserData, User } from "../types/user";
import { UsernameCheckResult } from "../types/user";
export async function getUserByUsernameService(username: string): Promise<ApiResponse<User>> {
  const res: ApiResponse<User> = await apiClient.get(`/users/username/${username}`)

  return res;
}

export async function usernameCheckerService(username: string): Promise<ApiResponse<UsernameCheckResult>> {
  const res: ApiResponse<UsernameCheckResult> = await apiClient.get('/users/username/check/', {
    params: { username }
  })
  return res;
}

export async function updateUserService(payload: UpdateUserData): Promise<ApiResponse<User>> {
  const res: ApiResponse<User> = await apiClient.patch('/users/update/', payload)

  return res;
}

export async function getUserService(): Promise<ApiResponse<User>> {
  const res: ApiResponse<User> = await apiClient.get('/users/me')
  
  return res;
}



