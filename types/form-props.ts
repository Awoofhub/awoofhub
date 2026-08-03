import { User } from "./user";

export type SignupFormProps = {
    onSuccess: () => void;
};


export type LoginFormProps = {
    onSuccess: () => void;
};



export type EditProfileFormProps = {
    onSuccess: (user:User) => void;
};


export type CreateOfferFormProps = {
    onSuccess: () => void;
};


