import { CardGame } from '@/components/CardGame/CardGame';
import Icon from '@/components/Icon/Icon';
import colors from '@/styles/colors';
import { RootStackScreenProps } from '@/types/navigation';
import { playAudio } from '@/utils/playAudio';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import {
  BodyWrapper,
  Container,
  HeaderTitle,
  HeaderTitleAuxWrapper,
  HeaderTitleWrapper,
  HeaderWrapper,
} from './style';

import { getPhases } from '@/services/game';

interface PhasesProps {
  id: number;
  name: string;
}

export function SelectPhaseFirstGame({ route }) {
  const navigation = useNavigation<RootStackScreenProps<'SelectPhaseFirstGame'>['navigation']>();
  const [phases, setPhases] = useState<PhasesProps[]>([]);
  const [loading, setLoading] = useState(true);

  const { profileGender, gameId } = route.params;

  useEffect(() => {
    async function fetchPhases() {
      try {
        const data = await getPhases(gameId);
        setPhases(data);
      } catch (error) {
        console.error('Erro ao buscar fases', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPhases();
    playAudio(profileGender, 'jogo_1_bem_vindo');
  }, [route]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSelectGame = (gameId: number, phaseId: number) => {
    navigation.navigate('FirstGame', {
      gameId: gameId,
      phaseId: phaseId,
      profileGender: profileGender,
    });
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
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.title}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
          <BodyWrapper>
            {phases.map((phase) => (
              <CardGame
                id={phase.id}
                key={phase.id}
                onPress={() => handleSelectGame(gameId, phase.id)}
                backgroundColor={colors.yellow}
                borderColor={colors.yellowLight}
                title={phase.name}
                // TODO: implementar a lógica do rating [pegar do backend]
                rating={Math.floor(Math.random() * 3) + 1}
              />
            ))}
          </BodyWrapper>
        </ScrollView>
      )}
    </Container>
  );
}
