import { SelectProfile } from '@/screens/StackAuth';
import { Home } from '@/screens/UserTab';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Icon from '../components/Icon/Icon';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabScreens() {
  return (
    <Tab.Navigator backBehavior="history">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Icon icon="search" color={color} size={size} lib="FontAwesome" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function TabRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SelectProfile" component={SelectProfile} />
      <Stack.Screen name="Tabs" component={TabScreens} />
    </Stack.Navigator>
  );
}
