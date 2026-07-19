import Protected from "@/components/protected/Protected";
import { SearchProvider } from "@/context/SearchContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";


export default function MainLayout() {

  return (
    <Protected>
      <SearchProvider>
        <StatusBar style="dark" />
        <Stack>
          <Stack.Screen name="offers" options={{ headerShown: false }} />
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="profile" options={{ headerShown: true, headerTitle: "", headerBackTitle: "Back" }} />
        </Stack>
      </SearchProvider>
    </Protected>
  );
}
