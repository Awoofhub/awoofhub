"use client";
import { usernameCheckerService } from "@/services/user-service";
import { UsernameCheckResult } from "@/types/user";
import { useMutation } from "@tanstack/react-query";

export const checkUsername = async (
  username: string,
): Promise<UsernameCheckResult> => {
  const result = await usernameCheckerService(username);
  return result.data;
};

type UseUsernameCheckerOptions = {
  onSuccess?: (data: UsernameCheckResult) => void;
};

export const useUsernameChecker = ({
  onSuccess,
}: UseUsernameCheckerOptions = {}) => {
  const {
    mutate: submit,
    isPending,
    data,
    reset,
  } = useMutation({
    mutationFn: checkUsername,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });

  return {
    submit,
    isPending,
    result: data,
    reset,
  };
};