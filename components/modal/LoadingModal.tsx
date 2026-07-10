import { colors } from "@/styles/colors";
import { Text, View } from "react-native";
import { ActivityIndicator, Modal, Portal } from "react-native-paper";

interface Props {
  visible: boolean;
}

export default function LoadingModal({ visible }: Props) {
  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        contentContainerStyle={{
          backgroundColor: "white",
          alignSelf: "center", 
          paddingVertical: 24,
          paddingHorizontal: 24,
          borderRadius: 24,
          alignItems: "center",
        }}
      >

        <View className="flex-row items-center justify-center">
          <ActivityIndicator
            animating
            size="small"
            color={colors.primary}
          />

          <Text
            style={{
              marginLeft: 12,
              fontSize: 18,
              fontWeight: "700",
              color: "#0F172A",
            }}
          >
            Loading...
          </Text>
        </View>
      </Modal>
    </Portal>
  );
}