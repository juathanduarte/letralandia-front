import { CardGame } from '@/components/CardGame/CardGame';
import Icon from '@/components/Icon/Icon';
import colors from '@/styles/colors';
import { RootStackScreenProps } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { BodyWrapper, Container, HeaderTitle, HeaderTitleWrapper, HeaderWrapper } from './style';

export function SelectPhaseFirstGame() {
  const navigation = useNavigation<RootStackScreenProps<'SelectPhaseFirstGame'>['navigation']>();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSelectGame = (gameId: number) => {
    console.log('Selected game -- ', gameId);
    navigation.navigate('FirstGame', { gameId });
  };

  return (
    <Container>
      <HeaderWrapper>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon icon="arrow-left" size={24} color={colors.title} lib="FontAwesome" />
        </TouchableOpacity>
      </HeaderWrapper>
      <HeaderTitleWrapper>
        <HeaderTitle>Jogo 1</HeaderTitle>
      </HeaderTitleWrapper>
      <BodyWrapper>
        {/* TODO: implementar a lógica do jogo! */}
        {[1, 2, 3, 4, 5].map((gameId) => (
          <CardGame
            id={gameId}
            key={gameId}
            onPress={() => handleSelectGame(gameId)}
            backgroundColor={colors.yellow}
            title={`Fase ${gameId}`}
            rating={Math.floor(Math.random() * 3) + 1}
          />
        ))}
      </BodyWrapper>
    </Container>
  );
}
