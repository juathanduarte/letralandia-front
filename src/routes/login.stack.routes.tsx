import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Login, Register } from '../screens/StackAuth';
import { Welcome } from '../screens/WelcomeScreen/Welcome';
import TabRoutes from './user.tabs.routes';

const Stack = createNativeStackNavigator();

export default function AppRoutes(){
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="SelectProfile" component={TabRoutes} />
    </Stack.Navigator>
  );
};
