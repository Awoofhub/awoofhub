import Text from '@/components/common/Text';
import LoadingModal from "@/components/modal/LoadingModal";
import { WHITELOGO } from "@/config/constants";
import { useLogin } from "@/features/auth/useLogin";
import { LoginData } from "@/types/auth";
import { LoginFormProps } from "@/types/form-props";
import { Link } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputField } from "../common/InputField";
import GoogleButton from './GoogleButton';
import ORdivider from './ORdivider';



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

  return (
    <ImageBackground
      source={require("@/assets/images/loginvectorbgshape.png")}
      className="flex-1 bg-primary"
      resizeMode='contain'  
      >

    <SafeAreaView className="flex-1 px-5">
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

          <View className="h-44 px-5 pb-5 pt-7 items-center">
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
                <Text type={"headerBold"} className="text-primary text-[24px]">
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
                <Text type={"paragraphBold"} className="text-sm text-primary">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login button */}
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              activeOpacity={0.85}
              className="bg-primary h-12 rounded-lg items-center justify-center shadow-sm"
            >
              <Text type={"headerBold"} className="text-white text-lg">
                Login
              </Text>
            </TouchableOpacity>

            <ORdivider />

            <GoogleButton onSuccess={onSuccess} />

            {/* Sign up link */}
            <View className="flex-row justify-center mt-6">
              <Text type={"paragraphBold"} className="text-sm text-gray-500">
                Don't have an account?{" "}
              </Text>

              <Link href="/(auth)/signup" asChild>
                <TouchableOpacity activeOpacity={0.9}>
                  <Text type={"paragraphBold"} className="text-sm text-primary">
                    Sign up
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView >
    </ImageBackground>

  );
}
