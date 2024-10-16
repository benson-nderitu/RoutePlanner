import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { LogBox, useColorScheme } from 'react-native';

import { tokenCache } from '@/lib/auth';
// import {
//   DarkTheme,
//   ThemeProvider,
//   DefaultTheme,
// } from '@react-navigation/native';
// import { ColorProperties } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
// import { DefaultTheme } from 'react-native-paper';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  );
}

LogBox.ignoreLogs(['Clerk:']);

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'Microsoft-SansSerif': require('../assets/fonts/microsoftsansserif.ttf'),
    'Inter-Black': require('../assets/fonts/Inter-Black.otf'),
    'Jakarta-Bold': require('../assets/fonts/selawkb.ttf'),
    'Jakarta-ExtraBold': require('../assets/fonts/selawksb.ttf'),
    'Jakarta-ExtraLight': require('../assets/fonts/selawksl.ttf'),
    'Jakarta-Light': require('../assets/fonts/selawkl.ttf'),
    'Jakarta-Medium': require('../assets/fonts/selawk.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={publishableKey}>
      <ClerkLoaded>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(auth)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(root)"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
    // </ThemeProvider>
  );
}
