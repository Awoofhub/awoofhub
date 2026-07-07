import { useLogin } from "@/features/auth/useLogin";
import { useState } from "react";
import { LoginData } from "@/types/auth";
import { LoginFormProps } from "@/types/form-props";
import { Lock, Mail } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Checkbox } from "react-native-paper";
import LoadingModal from "@/components/modal/LoadingModal";
import { InputField } from "../common/InputField";

// ─── Component ───────────────────────────────────────────────────────────────
export default function LoginForm({ onSuccess }: LoginFormProps) {
  const login = useLogin({ onSuccess});
  const [rememberMe, setRememberMe] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginData) => {
    login.submit(data);
  };

  return (
    <>
      {/* ── Loading modal ─────────────────────────────────────────────────── */}
      <LoadingModal visible={login.isPending} />

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
            {/* Orange Background */}
            <View className="h-44 bg-[#F15A22] px-5 pb-5 pt-7 items-center">
              {/* Logo */}
              <Image
                source={require("./../../assets/images/whitelogo.png")}
                className="w-40 h-40 "
                resizeMode="contain"
              />
            </View>

            {/* Form */}
            <View className="flex-1 bg-white rounded-3xl px-5 pb-5 pt-7 gap-6 ">
              <View className="items-center flex-row gap-2">

              <Text className="text-[#0F172A] text-[24px] font-bold mb-2">
                {/* heading and form */}
                Welcome
              </Text>
              <Text className="text-[#F15A22] text-[24px] font-bold mb-2">
                Back!
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
              <View className="flex-row items-center justify-between mt-2 mb-4">
                <TouchableOpacity
                  className="flex-row items-center gap-2"
                  onPress={() => setRememberMe((prev) => !prev)}
                  activeOpacity={0.7}
                >
                  <Checkbox
                    status={rememberMe ? "checked" : "unchecked"}
                    onPress={() => setRememberMe((prev) => !prev)}
                    color="#f97316"
                  />
                  <Text className="text-sm text-gray-600 font-montserrat">
                    Remember me
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text className="text-sm text-orange-500 font-semibold font-montserrat">
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
                <Text className="text-white text-base font-semibold font-baloo">
                  Login
                </Text>
              </TouchableOpacity>

              {/* OR divider */}
              <View className="flex-row items-center my-5 gap-3">
                <View className="flex-1 h-px bg-gray-200" />
                <Text className="text-gray-400 text-xs font-montserrat">
                  {" "}
                  OR{" "}
                </Text>
                <View className="flex-1 h-px bg-gray-200" />
              </View>

              {/* Google SSO */}
              <TouchableOpacity
                activeOpacity={0.8}
                className="flex-row items-center justify-center border border-gray-200 rounded-lg h-12 gap-3"
              >
                {/* Swap for actual Google SVG icon */}
                <Image
                  source={require("./../../assets/images/google.png")}
                  className="w-6 h-6"
                />
                <Text className="text-sm font-semibold text-gray-700 font-montserrat">
                  Continue with Google
                </Text>
              </TouchableOpacity>

              {/* Sign up link */}
              <View className="flex-row justify-center mt-6">
                <Text className="text-sm text-gray-500 font-montserrat">
                  Don't have an account?{" "}
                </Text>
                <TouchableOpacity>
                  <Text className="text-sm text-orange-500 font-semibold font-montserrat">
                    Sign up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
