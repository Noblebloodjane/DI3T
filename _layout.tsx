import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState, useRef } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import LottieView from 'lottie-react-native';
import NSAnimation from '../assets/animations/NS.json';
import { View, StyleSheet } from 'react-native';
import Onboarding from '@/components/onboarding/onboarding';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const animationRef = useRef<LottieView>(null);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        {!isAnimationFinished ? (
          <View style={styles.splashScreen}>
            <LottieView
              ref={animationRef}
              source={NSAnimation}
              autoPlay
              loop={false}
              style={styles.animation}
              resizeMode="cover"
              onAnimationFinish={() => setIsAnimationFinished(true)}
            />
          </View>
        ) : showOnboarding ? (
          <Onboarding onComplete={() => setShowOnboarding(false)} />
        ) : (
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="reg" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        )}
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashScreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    zIndex: 1,
  },
  animation: {
    flex: 1,
  },
});