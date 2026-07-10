import Text from '@/components/common/Text';
import { useSignup } from "@/features/auth/useSignup";
import { SignupFormProps } from "@/types/form-props";
import { Link } from "expo-router";
import { Lock, Mail, User } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { InputField } from "../common/InputField";
import LoadingModal from '../modal/LoadingModal';
import GoogleButton from "./GoogleButton";
import ORdivider from "./ORdivider";

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

export default function SignupForm({ onSuccess }: SignupFormProps) {

  const signup = useSignup({ onSuccess });

  const { control, handleSubmit, watch } = useForm<SignupFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    const { confirmPassword, ...signUpData } = data;

    try {
      await signup.submit(signUpData);
    } catch (error) {
      // Error is handled globally by the apiClient interceptor toast  
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <LoadingModal visible={signup.isPending} />

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

        <View className="-mt-10 mb-10 bg-white rounded-3xl mx-4 p-6">
          <View className="flex-row items-end justify-start gap-2">
            <Text className="text-[21px] text-slate-900 font-mont-bold">
              Create your
            </Text>
            <Text className="text-[21px] text-[#F15A22] font-mont-bold">
              awoof
            </Text>
            <Text className="text-[21px] text-slate-900 font-mont-bold">
              account
            </Text>
          </View>
          <Text className="text-xl text-slate-500 font-mont mb-6">
            Join the Awoofers community! Spend less, save more, publish deals
            and reach active audiences
          </Text>

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
                error={fieldState.error}
              />
            )}
          />

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

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.85}
            className="bg-primary h-12 rounded-lg items-center justify-center shadow-sm"
          >
            <Text type={"headerBold"} className="text-white text-lg">
              Create Account
            </Text>
          </TouchableOpacity>

          <ORdivider />
          
          <GoogleButton onSuccess={onSuccess} />

          <View className="flex-row justify-center mt-6">
            <Text className="text-sm text-gray-500 font-mont">
              Don't have an account?{" "}
            </Text>

            <Link href="/(auth)/login" asChild>
              <TouchableOpacity activeOpacity={0.9}>
                <Text type={"paragraphBold"} className="text-sm text-primary">
                  Login
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
