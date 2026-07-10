import Text from '@/components/common/Text';
import { GOOGLE } from "@/config/constants";
import { useGoogleLogin } from '@/features/auth/useGoogleLogin';
import { LoginFormProps } from '@/types/form-props';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Image, TouchableOpacity } from "react-native";

export default function GoogleButton({ onSuccess }: LoginFormProps) {

    const googleLogin = useGoogleLogin({ onSuccess });

    const handleGoogleLoginAndSubmit = async () => {
        if (googleLogin.isPending) return;

        try {
            await GoogleSignin.hasPlayServices();

            await GoogleSignin.signOut();

            const response = await GoogleSignin.signIn();

            const idToken = response.data?.idToken;

            if (!idToken) {
                console.error("No ID token returned from Google Sign-In");
                return;
            }

            googleLogin.submit({ idToken });

        } catch (error) {
            console.error("Google Sign-In Failed:", error);
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleGoogleLoginAndSubmit}
            className="flex-row items-center justify-center border border-gray-200 rounded-lg h-12 gap-3"
        >
            <Image
                source={GOOGLE}
                className="w-6 h-6"
            />
            <Text type={"paragraphBold"} className="text-sm text-gray-700">
                Continue with Google
            </Text>
        </TouchableOpacity>
    )

}