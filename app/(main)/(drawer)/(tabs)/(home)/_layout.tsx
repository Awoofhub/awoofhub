import Header from "@/components/header/Header";
import { Stack } from "expo-router";


export default function HomeLayout() {
  
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          header: () => <Header />
        }} 
      />
    </Stack>
  );
}