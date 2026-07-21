import { Pressable, Text, View } from "react-native";
import AlertButton from "../alert/Alert";
import ChatButton from "../chat/ChatButton";

interface Props {
    targetUserId: string;
}

export default function ProfileActionButtons({targetUserId}: Props) {
    return (
        <View className="flex-row items-center gap-2">
            <AlertButton contributorId={targetUserId} />

            <ChatButton targetUserId={targetUserId}>
                <Pressable className="rounded-lg bg-gray-200 px-4 py-2 active:bg-gray-300">
                    <Text className="text-sm font-medium text-black">
                        Message
                    </Text>
                </Pressable>
            </ChatButton>
        </View>
    );
}