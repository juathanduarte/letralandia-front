import { CreateProfile } from '@/screens/UserTab';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from '../components/Icon/Icon';
// import { useAuthContext } from '../contexts/AuthContext';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  // const { signOut } = useAuthContext();

  return (
    <Tab.Navigator backBehavior="history">
      <Tab.Screen
        name="Selecionar perfil"
        component={CreateProfile}
        initialParams={{ initialRouteName: 'SelectProfile' }}
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
