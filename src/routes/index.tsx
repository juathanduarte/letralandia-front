import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { LoginRoutes } from './login.stack.routes';

const Routes = () => {
  return (
    <NavigationContainer>
      <LoginRoutes />
    </NavigationContainer>
  );
};

export default Routes;
