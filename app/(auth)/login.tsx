import LoginForm from "@/components/auth/LoginForm";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const onSuccess = () => {
    router.replace("/(main)/(drawer)/(tabs)/(home)");
  }

  return <LoginForm onSuccess={onSuccess} />
}
