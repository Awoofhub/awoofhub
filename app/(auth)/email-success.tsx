import Text from "@/components/common/Text";
import { useRouter } from "expo-router";
import { Image, View } from "react-native";

export default function EmailSuccess() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-5 justify-center items-center gap-4">
      
      <View className="justify-center items-center gap-4">
        <Image
            source={require("@/assets/images/success.png")}
            className="w-70 h-70"
            resizeMode="contain"
          />    
    
          <Text
            type={"paragraphBold"}
            className="text-[#0F172A] text-[16px] text-center leading-8"
          >
            Email Verified!
          </Text>
        <Text
          type={"paragraph"}
          className="text-[#0F172A] text-center"
        >
          Your account have been created successfully.
        </Text>
      </View>
    </View>
  );
}
