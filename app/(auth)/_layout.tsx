import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="Welcome"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Sign-In"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default Layout;
