"use client"
import { getUserByUsernameService } from '@/services/user-service';
import { User } from '@/types/user';
import { useQuery } from '@tanstack/react-query';


type GetUserOptions = {
    username: string;
};

export const getUserByUsername = async ({username}: GetUserOptions): Promise<User> => {
    const result = await getUserByUsernameService(username);
    return result.data; 
}; 

export const useUserByUsername = ({username}: GetUserOptions) => {
    const { data, isLoading } = useQuery({
        queryKey: ["user", username],
        queryFn: () => getUserByUsername({username}),
    });
    
    return { data, isLoading };
};


