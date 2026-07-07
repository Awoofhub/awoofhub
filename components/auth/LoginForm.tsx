import Text from '@/components/common/Text';
import LoadingModal from "@/components/modal/LoadingModal";
import { GOOGLE, WHITELOGO } from "@/config/constants";
import { useLogin } from "@/features/auth/useLogin";
import { LoginData } from "@/types/auth";
import { LoginFormProps } from "@/types/form-props";
import { Lock, Mail } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { Image, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputField } from "../common/InputField";
import { useRouter } from 'expo-router';


export default function LoginForm({ onSuccess }: LoginFormProps) {
  const login = useLogin({ onSuccess });

  const { control, handleSubmit } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginData) => {
    login.submit(data);
  };
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F15A22] px-5">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <LoadingModal visible={login.isPending} />

          <View className="h-44 bg-[#F15A22] px-5 pb-5 pt-7 items-center">
            {/* Logo */}
            <Image
              source={WHITELOGO}
              className="w-40 h-40 "
              resizeMode="contain"
            />
          </View>

          {/* Form */}
          <View className=" bg-white rounded-3xl px-5 pt-7 pb-14 gap-1">
            <View className="mb-4">
              <View className="items-center flex-row gap-2">

                <Text type={"headerBold"} className="text-[#0F172A] text-[24px]">
                  Welcome
                </Text>
                <Text type={"headerBold"} className="text-[#F15A22] text-[24px]">
                  Back!
                </Text>
              </View>

              <Text>
                Manage your offers or save offers and get personalised recommendations.
              </Text>
            </View>


            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState,
              }) => (
                <InputField
                  label="Email address"
                  type="email"
                  placeholder="john@example.com"
                  compulsory
                  icon={<Mail size={18} color="#718096" />}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={fieldState.error}
                />
              )}
            />

            {/* Password */}
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState,
              }) => (
                <InputField
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  compulsory
                  icon={<Lock size={18} color="#718096" />}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={fieldState.error}
                />
              )}
            />
            <View className="flex-row items-center justify-end mb-9">
              <TouchableOpacity>
                <Text type={"paragraphBold"} className="text-sm text-orange-500">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login button */}
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              activeOpacity={0.85}
              className="bg-orange-500 h-12 rounded-lg items-center justify-center shadow-sm"
            >
              <Text type={"headerBold"} className="text-white text-lg">
                Login
              </Text>
            </TouchableOpacity>

            {/* OR divider */}
            <View className="flex-row items-center my-5 gap-3">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="text-gray-600 text-xs font-montserrat">
                {" "}
                OR{" "}
              </Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Google SSO */}
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

            {/* Sign up link */}
            <View className="flex-row justify-center mt-6">
              <Text type={"paragraphBold"} className="text-sm text-gray-500">
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity>
                <Text type={"paragraphBold"} className="text-sm text-orange-500">
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
}
