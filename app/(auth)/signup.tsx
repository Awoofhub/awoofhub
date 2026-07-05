import { View } from "react-native";
import SignupForm from "../../components/auth/SignupForm";  
import { useRouter } from "expo-router";

export default function SignupScreen() {
  const router = useRouter();
  const onSuccess = () => {
    router.replace("/(main)/(drawer)/(tabs)/(home)");}
  return (
    <SignupForm onSuccess={onSuccess}/>
  );
}
