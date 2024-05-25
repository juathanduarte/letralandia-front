import { CardGame } from '@/components/CardGame/CardGame';
import Icon from '@/components/Icon/Icon';
import colors from '@/styles/colors';
import { RootStackScreenProps } from '@/types/navigation';
import { playAudio } from '@/utils/playAudio';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import {
  BodyWrapper,
  Container,
  HeaderTitle,
  HeaderTitleAuxWrapper,
  HeaderTitleWrapper,
  HeaderWrapper,
} from './style';

export function SelectPhaseFirstGame({ route }) {
  const navigation = useNavigation<RootStackScreenProps<'SelectPhaseFirstGame'>['navigation']>();

  const { profileGender } = route.params;

  useEffect(() => {
    playAudio(profileGender, 'jogo_1_bem_vindo');
  }, [route]);

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
      <HeaderTitleAuxWrapper>
        <HeaderTitleWrapper>
          <HeaderTitle>Jogo 1</HeaderTitle>
        </HeaderTitleWrapper>
      </HeaderTitleAuxWrapper>
      <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
        <BodyWrapper>
          {[1, 2, 3, 4, 5].map((gameId) => (
            <CardGame
              id={gameId}
              key={gameId}
              onPress={() => handleSelectGame(gameId)}
              backgroundColor={colors.yellow}
              borderColor={colors.yellowLight}
              title={`${gameId}º nível`}
              rating={Math.floor(Math.random() * 3) + 1}
            />
          ))}
        </BodyWrapper>
      </ScrollView>
    </Container>
  );
}
