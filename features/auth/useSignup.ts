import { useMutation } from '@tanstack/react-query';
import { signupService } from "../../services/auth-service";
import { SignupData } from '../../types/auth';
import { User } from '../../types/user';

export const signup = async (data: SignupData): Promise<any> => {
    const result = await signupService(data);
    return result.data;
};

type UseSignupOptions = {
    onSuccess?: (user: User) => void;
};

export const useSignup = ({ onSuccess }: UseSignupOptions = {}) => {
    
    const { mutateAsync: submit, isPending } = useMutation({
        mutationFn: signup,
        onSuccess: (data) => {
            onSuccess?.(data);
        },
    });
    return { submit, isPending };
};

