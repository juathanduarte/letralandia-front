import Icon from '@/components/Icon/Icon';
import colors from '@/styles/colors';
import { RootStackScreenProps } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, HeaderTitle, HeaderTitleWrapper, HeaderWrapper } from './style';

export function SelectPhaseThirdGame() {
  const navigation = useNavigation<RootStackScreenProps<'SelectPhaseThirdGame'>['navigation']>();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <HeaderWrapper>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon icon="arrow-left" size={24} color={colors.title} lib="FontAwesome" />
        </TouchableOpacity>
      </HeaderWrapper>
      <HeaderTitleWrapper>
        <HeaderTitle>Jogo 3</HeaderTitle>
      </HeaderTitleWrapper>
    </Container>
  );
}
