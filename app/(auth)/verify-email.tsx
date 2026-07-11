import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Text from "@/components/common/Text";
import {ArrowRightIcon, Mail } from "lucide-react-native";

export default function VerifyEmail() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-5 justify-center items-center gap-4">
      <View className="justify-center items-center mb-4">
        <Text
          type={"headerBold"}
          className="text-[#0F172A] text-[24px] text-center"
        >
          Check your {""}
          <Text
            type={"headerBold"}
            className="text-primary text-[24px] text-center"
          >
            inbox!
          </Text>
        </Text>
        <Text
          type={"paragraph"}
          className="text-gray-600 text-[16px] text-center leading-8"
        >
          We have sent a verification link to the email {'\n'}
          <Text
            type={"paragraph"}
            className="text-[#0F172A] text-[16px] text-center leading-8"
          >
            example@email.com
          </Text>

        </Text>
      </View>

      <View className="justify-center items-center gap-4">
        <View className="bg-[#FFD5C3] p-4 rounded-full">
          <Mail size={40} strokeWidth={1} />
        </View>
        <Text
          type={"paragraph"}
          className="text-[#0F172A] text-[16px] text-center leading-8"
        >
          Do {""}
          <Text
            type={"paragraphBold"}
            className="text-[#0F172A] text-[16px] text-center leading-8"
          >
            check your spam folder {"\n"}
          </Text>
          <Text
            type={"paragraph"}
            className="text-[#0F172A] text-[16px] text-center"
          ></Text>
          sometimes it likes to hide there.
        </Text>
        <Text
          type={"paragraph"}
          className="text-[#0F172A] text-[16px] text-center"
        >
          Click on the link to complete the verification process.
        </Text>
      </View>
      <View className=" gap-4 w-full mt-4">
        <TouchableOpacity
          className="bg-[#FE4F04] w-full px-4 py-4"
          onPress={() => router.push("/(auth)/verify-email")}
        >
          <Text
            type={"paragraphBold"}
            className="text-white text-[16px] text-center gap-2"
          >
            Resend Email
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full px-4 py-4 flex-row justify-center items-center gap-2"
          onPress={() => router.push("/(auth)/verify-email")}
        >
          <Text
            type={"paragraphBold"}
            className="text-[#FE4F04] text-[16px] text-center gap-2"
          >
            Wrong Email 
          </Text>
            <ArrowRightIcon size={30} strokeWidth={2} color="#FE4F04" /> 
        </TouchableOpacity>
      </View>
    </View>
  );
}
