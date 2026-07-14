import { GOOGLE_IOS_ID, GOOGLE_WEB_ID } from '@/config/constants';
import AppProvider from '@/providers/app-provider';
import { FONTS } from '@/styles/fonts';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../global.css";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_ID,
  iosClientId: GOOGLE_IOS_ID,
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts(FONTS);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <AppProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView>
            <PaperProvider>
              <Stack>
                <Stack.Screen name="(main)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              </Stack>
            </PaperProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </AppProvider>
  );
}
