import {
  Alphabet,
  SelectPhaseFirstGame,
  SelectPhaseSecondGame,
  SelectPhaseThirdGame,
} from '@/screens/Games';
import { SelectProfile } from '@/screens/StackAuth';
import { Home, ParentArea } from '@/screens/UserTab';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Icon from '../components/Icon/Icon';
import { CreateProfile, Login, Register } from '../screens/StackAuth';
import { Welcome } from '../screens/Welcome/Welcome';

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
            <Icon icon="home" color={color} size={size} lib="FontAwesome" />
          ),
        }}
      />
      <Tab.Screen
        name="ParentArea"
        component={ParentArea}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Icon icon="list-alt" color={color} size={size} lib="FontAwesome" />
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
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="SelectProfile" component={SelectProfile} />
      <Stack.Screen name="Tabs" component={TabScreens} />
      <Stack.Screen name="Alphabet" component={Alphabet} />
      <Stack.Screen name="SelectPhaseFirstGame" component={SelectPhaseFirstGame} />
      <Stack.Screen name="SelectPhaseSecondGame" component={SelectPhaseSecondGame} />
      <Stack.Screen name="SelectPhaseThirdGame" component={SelectPhaseThirdGame} />
    </Stack.Navigator>
  );
}
