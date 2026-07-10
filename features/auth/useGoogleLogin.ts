import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { googleLoginService } from "../../services/auth-service";
import { GoogleLoginData, LoginResponse } from '../../types/auth';
import { User } from '../../types/user';

export const googleLogin = async (data: GoogleLoginData): Promise<LoginResponse> => {
  const result = await googleLoginService(data);
  await AsyncStorage.setItem('accessToken', result.data.accessToken);
  await AsyncStorage.setItem('refreshToken', result.data.refreshToken);
  return result.data;
};

type UseGoogleLoginOptions = {
  onSuccess?: (user: User) => void;
};

export const useGoogleLogin = ({ onSuccess }: UseGoogleLoginOptions = {}) => {
  const queryClient = useQueryClient();

  const { mutate: submit, isPending, isError, error } = useMutation({
    mutationFn: googleLogin,
    onSuccess: (data) => {
      queryClient.setQueryData(['auth-user'], data.user);
      onSuccess?.(data.user);
    },
  });

  return { submit, isPending, isError, error };
};
