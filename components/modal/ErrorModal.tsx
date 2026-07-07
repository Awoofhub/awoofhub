import { Modal, Portal } from "react-native-paper";
import { View, Text, TouchableOpacity } from "react-native";
import { CircleAlert, X } from "lucide-react-native";

interface ErrorModalProps {
  title?: string;
  visible: boolean;
  message: string;
  onDismiss: () => void;
  onRetry: () => void;
}

export default function ErrorModal({
  visible,
  message,
  onDismiss,
  onRetry,
}: ErrorModalProps) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          margin: 24,
          borderRadius: 20,
          backgroundColor: "transparent",
        }}
      >
        <View className="bg-white rounded-3xl p-6">
          {/* Close button */}

          <TouchableOpacity
            className="absolute top-4 right-4"
            onPress={onDismiss}
          >
            <X size={20} color="#6B7280" />
          </TouchableOpacity>

          {/* Icon */}

          <View className="items-center">
            <CircleAlert color="#DC2626" size={40} />
          </View>

          {/* Title */}

          <Text className="text-lg font-bold text-center mt-4">
            Couldn't log into your account!
          </Text>

          {/* Message */}

          <Text className="text-center text-red-500 mt-2">{message}</Text>

          {/* Buttons */}

          <View className="flex-row gap-3 mt-6">
            <TouchableOpacity
              className="flex-1 border border-orange-500 rounded-lg py-3 items-center"
              onPress={onDismiss}
            >
              <Text className="text-orange-500 font-semibold">Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-orange-500 rounded-lg py-3 items-center"
              onPress={onRetry}
            >
              <Text className="text-white font-semibold">Try Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
