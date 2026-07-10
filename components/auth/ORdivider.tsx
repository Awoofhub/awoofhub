import Text from '@/components/common/Text';
import { View } from "react-native";

export default function ORdivider() {
    return (
        <View className="flex-row items-center my-5 gap-3">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="text-gray-600 text-sm font-montserrat">
                {" "}
                OR{" "}
            </Text>
            <View className="flex-1 h-px bg-gray-300" />
        </View>
    )
}
