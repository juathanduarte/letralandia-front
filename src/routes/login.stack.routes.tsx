import { useAuth } from '@/contexts/AuthContext'; // Ajuste o caminho de importação conforme necessário
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { CreateProfile, Login, Register, SelectProfile } from '../screens/StackAuth';
import { Welcome } from '../screens/WelcomeScreen/Welcome';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  const {
    state: { isAuthenticated },
  } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="SelectProfile" component={SelectProfile} />
          <Stack.Screen name="CreateProfile" component={CreateProfile} />
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="CreateProfile" component={CreateProfile} />
          <Stack.Screen name="SelectProfile" component={SelectProfile} />
        </>
      )}
    </Stack.Navigator>
  );
}
