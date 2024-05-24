import { useAuth } from '@/contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import letralandiaLogo from '../../../assets/logos/letralandiaLogo.png';
import ufpelLogo from '../../../assets/logos/ufpelLogo.png';
import type { RootStackScreenProps } from '../../types/navigation';
import { Container, ImageContainer, LogoImage } from './style';

export function Welcome() {
  const navigation = useNavigation<RootStackScreenProps<'Welcome'>['navigation']>();
  const [showUfpelLogo, setShowUfpelLogo] = useState(true);
  const {
    state: { isAuthenticated },
  } = useAuth();

  useEffect(() => {
    let splashTimer = setTimeout(() => {
      setShowUfpelLogo(false);
    }, 3000);

    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    if (!showUfpelLogo) {
      const loginTimer = setTimeout(() => {
        // Redireciona baseado no estado de autenticação
        if (isAuthenticated) {
          navigation.navigate('SelectProfile');
        } else {
          navigation.navigate('Login');
        }
      }, 2000);

      return () => clearTimeout(loginTimer);
    }
  }, [showUfpelLogo, navigation, isAuthenticated]);

  return (
    <Container>
      <ImageContainer>
        <LogoImage source={showUfpelLogo ? ufpelLogo : letralandiaLogo} resizeMode="contain" />
      </ImageContainer>
    </Container>
  );
}
