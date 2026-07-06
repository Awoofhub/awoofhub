import { LoginFormProps,SignupFormProps } from "@/types/form-props";
import { Lock, Mail, User } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { useSignup } from "@/features/auth/useSignup";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import { InputField } from "../common/InputField";
import { useRouter } from "expo-router";
import { SignupData, SignupFormData } from "@/types/auth";

export default function SignupForm({ onSuccess }: SignupFormProps) {
  // 1. Initialize useForm with your fieldsY
  const signup = useSignup({ onSuccess });

  const {
    control,
    handleSubmit,
    watch,
  } = useForm<SignupFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    const { confirmPassword, ...signUpData } = data;
    await signup.submit(signUpData as SignupData);
  };
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* bg-image */}
        <ImageBackground
          source={require("@/assets/images/awoofhubimage-background.png")}
          className="h-80 bg-[#F15A22] px-5 pb-12 pt-7 items-center"
        >
          <View className="flex-1 justify-end items-center p-4">
            <Text className="text-white text-4xl text-center font-baloo-bold">
              WELCOME TO AWOOFHUB
            </Text>
            <Text className="text-white text-xl text-center font-mont mt-2">
              Deals discovery made simpler
            </Text>
          </View>
        </ImageBackground>

        {/* Form */}
        <View className="-mt-10 bg-white rounded-3xl mx-4 p-6">
          <View className="flex-row items-end justify-start mb-6 gap-2">
            <Text className="text-3xl text-slate-900 font-mont-bold mb-2">
              Create your
            </Text>
            <Text className="text-3xl text-[#F15A22] font-mont-bold mb-2">
              awoof
            </Text>
            <Text className="text-3xl text-slate-900 font-mont-bold mb-2">
              account
            </Text>
          </View>
          <Text className="text-xl text-slate-500 font-mont mb-8">
            Join the Awoofers community! Spend less, save more, publish deals
            and reach active audiences
          </Text>

          {/* --- FULL NAME FIELD --- */}
          <Controller
            control={control}
            name="name"
            rules={{ required: "Full name is required" }}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <InputField
                label="Full Name"
                placeholder="John Doe"
                compulsory
                icon={<User size={20} color="#F15A22" />}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={fieldState.error} // Pass down the error state object
              />
            )}
          />

          {/* --- EMAIL FIELD --- */}
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
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <InputField
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                compulsory
                icon={<Mail size={20} color="#F15A22" />}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={fieldState.error}
              />
            )}
          />

          {/* --- PASSWORD FIELD --- */}
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
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <InputField
                label="Password"
                type="password"
                placeholder="••••••••"
                compulsory
                icon={<Lock size={20} color="#F15A22" />}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={fieldState.error}
              />
            )}
          />

          {/* --- CONFIRM PASSWORD FIELD --- */}
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            }}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <InputField
                label="Confirm Password"
                type="confirmPassword"
                placeholder="••••••••"
                compulsory
                icon={<Lock size={20} color="#F15A22" />}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={fieldState.error}
              />
            )}
          />

          {/* --- SUBMIT BUTTON --- */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={signup.isPending}
            className="mt-4 bg-orange-500 h-12 gap-3 mb-3 rounded-md items-center justify-center shadow-sm active:opacity-80"
          >
            {signup.isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-base font-semibold font-mont-bold">
                Create Account
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            className="flex-row items-center justify-center border border-gray-200 rounded-lg h-12 gap-3"
          >
            <Text className="text-sm  text-gray-700 font-mont-bold">
              Continue As Guest
            </Text>
          </TouchableOpacity>

          {/* OR divider */}
          <View className="flex-row items-center my-5 gap-3">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="text-gray-400 text-xs font-montserrat"> OR </Text>
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
            <Text className="text-sm text-gray-700 font-mont-bold">
              Continue with Google
            </Text>
          </TouchableOpacity>

          {/* Sign up link */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-sm text-gray-500 font-mont">
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text className="text-sm text-orange-500 font-mont-bold">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
