import { Image, Modal, View, Text, TouchableOpacity } from "react-native";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditSuccessModal({ isOpen, onClose }: Props) {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 items-center justify-center bg-black/50 px-4">
        <View className="w-full max-w-[500px] bg-white rounded-2xl p-6 items-center">
          <Image
            source={require("@/assets/images/EditSuccess.svg")}
            style={{ width: 150, height: 150, marginBottom: 8 }}
            resizeMode="contain"
          />
          <Text className="text-xl font-bold text-gray-900 mb-2 text-center">
            Success!
          </Text>
          <Text className="text-gray-500 text-sm mb-8 text-center">
            Changes saved successfully.
          </Text>
          <TouchableOpacity
            onPress={onClose}
            className="w-full bg-primary py-3 rounded-md active:bg-orange-700"
          >
            <Text className="text-white text-sm font-semibold text-center font-baloo">
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}