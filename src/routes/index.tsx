import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppRoutes from './login.stack.routes';

const Routes = () => {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
};

export default Routes;
