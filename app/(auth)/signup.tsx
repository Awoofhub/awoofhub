import { useRouter } from "expo-router";
import SignupForm from "../../components/auth/SignupForm";

export default function SignupScreen() {
  const router = useRouter();
  const onSuccess = () => {
    router.replace("/(main)/(drawer)/(tabs)/(home)");
  }
  return (
    <SignupForm onSuccess={onSuccess}/>
  );
}
