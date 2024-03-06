import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Login } from '../screens/StackAuth';

import { Welcome } from '../screens/WelcomeScreen/Welcome';

const Stack = createNativeStackNavigator();

export const LoginRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};
