import Text from '@/components/common/Text';
import { GOOGLE } from "@/config/constants";
import { Image, TouchableOpacity } from "react-native";

export default function GoogleButton() {

    return (
        <TouchableOpacity
            activeOpacity={0.8}
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