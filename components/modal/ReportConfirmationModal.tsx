import EditSuccess from "@/assets/images/EditSuccess.svg";
import { Text, TouchableOpacity, View } from "react-native";
import { Modal, Portal } from "react-native-paper";

interface Props {
    isOpen: boolean;
    onDone: () => void;
}

export default function ReportConfirmationModal({ isOpen, onDone }: Props) {
    return (
        <Portal>
            <Modal
                visible={isOpen}
                onDismiss={onDone}
                contentContainerStyle={{
                    marginHorizontal: 20,
                }}
            >
                <View className="items-center rounded-3xl bg-white p-6">
                    <View className="w-[150px] h-[150px] items-center justify-center">
                        <EditSuccess width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />
                    </View>

                    <Text className="mt-2 text-center text-3xl font-bold text-black">
                        Report successful!
                    </Text>

                    <Text className="mt-3 text-center text-base text-gray-500">
                        Your report is well received and our support team
                        will look into it.
                    </Text>

                    <TouchableOpacity
                        onPress={onDone}
                        className="mt-6 w-full rounded-xl bg-primary py-4"
                    >
                        <Text className="text-center font-semibold text-white">
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </Portal>
    );
}