import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme, View, Text } from 'react-native';
import 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // 👈 novo import

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      <Stack
        screenOptions={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <MaterialCommunityIcons name="heart-pulse" size={22} color="#00bfff" />
              <Text
                style={{
                  fontFamily: 'Inter_700Bold',
                  fontSize: 20,
                  color: isDark ? '#fff' : '#000',
                }}
              >
                FitPlus
              </Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: isDark ? '#1e1e1e' : '#f2f2f2',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
          headerTitleAlign: 'center',
          headerTintColor: isDark ? '#fff' : '#000',
          contentStyle: {
            backgroundColor: isDark ? '#121212' : '#ffffff',
          },
        }}
      >
      </Stack>

      <StatusBar style={isDark ? 'light' : 'dark'} />
    </>
  );
}
