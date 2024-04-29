import { useAuth } from '@/contexts/AuthContext'; // Ajuste o caminho conforme necessário
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import TabRoutes from './app.routes';
import LoginRoutes from './auth.routes';

const Routes = () => {
  const {
    state: { isAuthenticated },
  } = useAuth();

  return (
    <NavigationContainer>{isAuthenticated ? <TabRoutes /> : <LoginRoutes />}</NavigationContainer>
  );
};

export default Routes;
