import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import TabRoutes from './app.routes';

const Routes = () => {
  return (
    <NavigationContainer>
      <TabRoutes />
    </NavigationContainer>
  );
};

export default Routes;
