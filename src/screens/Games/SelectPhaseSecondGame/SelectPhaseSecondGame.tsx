import { CardGame } from '@/components/CardGame/CardGame';
import Icon from '@/components/Icon/Icon';
import colors from '@/styles/colors';
import { RootStackScreenProps } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { BodyWrapper, Container, HeaderTitle, HeaderTitleWrapper, HeaderWrapper } from './style';

export function SelectPhaseSecondGame() {
  const navigation = useNavigation<RootStackScreenProps<'SelectPhaseSecondGame'>['navigation']>();

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
        <HeaderTitle>Jogo 2</HeaderTitle>
      </HeaderTitleWrapper>
      <BodyWrapper>
        {/* TODO: implementar a lógica do jogo! */}
        {[1, 2, 3, 4, 5].map((gameId) => (
          <CardGame
            id={gameId}
            key={gameId}
            onPress={() => console.log('Selected game:', gameId)}
            backgroundColor={colors.blue}
            title={`Fase ${gameId}`}
            rating={Math.floor(Math.random() * 3) + 1}
          />
        ))}
      </BodyWrapper>
    </Container>
  );
}
