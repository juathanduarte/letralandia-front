import { AuthProvider } from '@/contexts/AuthContext';
import { FontProvider } from '@/contexts/FontContext';
import { UserProvider } from '@/contexts/UserContext';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';

import {
  Nunito_200ExtraLight,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/nunito';
import Entypo from '@expo/vector-icons/Entypo';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import Routes from './src/routes';

const AppNavigator = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Pacifico_400Regular,
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(Entypo.font);

        if (appIsReady && fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, [appIsReady, fontsLoaded]);

  React.useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <FontProvider>
        <UserProvider>
          <Routes />
        </UserProvider>
      </FontProvider>
    </AuthProvider>
  );
};

export default AppNavigator;
