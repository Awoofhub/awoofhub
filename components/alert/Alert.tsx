import { useAlert } from "@/features/alert/useAlert";
import { Pressable, View } from "react-native";

interface Props {
  contributorId: string;
}

export default function AlertButton({ contributorId }: Props) {
  const { isSubscribed, toggleAlert } = useAlert(contributorId);

  return (
    <Pressable
      onPress={toggleAlert}
      accessibilityRole="switch"
      accessibilityState={{ checked: isSubscribed }}
      className={`relative h-6 w-11 rounded-full ${
        isSubscribed ? "bg-primary" : "bg-[#CCCCCC]"
      }`}
    >
      <View
        className={`absolute top-1 h-4 w-5 rounded-full border border-[#F7D9CC] bg-white shadow ${
          isSubscribed ? "left-5" : "left-1"
        }`}
      />
    </Pressable>
  );
}