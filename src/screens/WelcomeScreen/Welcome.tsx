import letralandiaLogo from '@/assets/letralandiaLogo.png';
import ufpelLogo from '@/assets/ufpelLogo.png';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Container, ImageContainer, LogoImage } from './style';

export function Welcome() {
  const navigation = useNavigation();
  const [showUfpelLogo, setShowUfpelLogo] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowUfpelLogo(false);
    }, 3000);

    if (!showUfpelLogo) {
      const loginTimer = setTimeout(() => {
        navigation.navigate('Login' as never);
      }, 2000);

      return () => clearTimeout(loginTimer);
    }

    return () => clearTimeout(splashTimer);
  }, [showUfpelLogo, navigation]);

  return (
    <Container>
      <ImageContainer>
        <LogoImage source={showUfpelLogo ? ufpelLogo : letralandiaLogo} resizeMode="contain" />
      </ImageContainer>
    </Container>
  );
}
