import {
  Alphabet,
  FirstGame,
  SecondGame,
  SelectPhaseFirstGame,
  SelectPhaseSecondGame,
  SelectPhaseThirdGame,
  ThirdGame,
} from '@/screens/Games';
import { SelectProfile } from '@/screens/StackAuth';
import { Home, ParentArea } from '@/screens/UserTab';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Icon from '../components/Icon/Icon';
import { CreateProfile, Login, Register } from '../screens/StackAuth';
import { Welcome } from '../screens/Welcome/Welcome';

import colors from '@/styles/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabScreens() {
  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          let iconLib: 'FontAwesome' = 'FontAwesome';

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'ParentArea') {
            iconName = 'list-alt';
          }

          return <Icon icon={iconName} color={color} size={size} lib={iconLib} />;
        },
        tabBarActiveTintColor: colors.title,
        tabBarInactiveTintColor: colors.gray,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="ParentArea"
        component={ParentArea}
        options={{
          tabBarLabel: () => null,
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
      <Stack.Screen name="FirstGame" component={FirstGame} />
      <Stack.Screen name="SecondGame" component={SecondGame} />
      <Stack.Screen name="ThirdGame" component={ThirdGame} />
    </Stack.Navigator>
  );
}
