import { CardGame } from '@/components/CardGame/CardGame';
import Icon from '@/components/Icon/Icon';
import { getPhases } from '@/services/game';
import { getInfoGame } from '@/services/profile-game-info';
import colors from '@/styles/colors';
import { RootStackScreenProps } from '@/types/navigation';
import { playAudio } from '@/utils/playAudio';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import {
  BodyWrapper,
  Container,
  ContainerWrapper,
  HeaderTitle,
  HeaderTitleAuxWrapper,
  HeaderTitleWrapper,
  HeaderWrapper,
  MarginBottom,
} from './style';

interface PhasesProps {
  id: number;
  name: string;
  rating?: number;
}

export function SelectPhaseSecondGame({ route }) {
  const navigation = useNavigation<RootStackScreenProps<'SelectPhaseSecondGame'>['navigation']>();
  const [phases, setPhases] = useState<PhasesProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { profileGender, gameId, returnData, profileId } = route.params;

  useEffect(() => {
    async function fetchPhases() {
      try {
        const data = await getPhases(gameId);
        setPhases(data);
        await fetchInfoGame(data);
      } catch (error) {
        console.error('Erro ao buscar fases', error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchInfoGame(phases: PhasesProps[]) {
      try {
        const data = await getInfoGame({ profileId, gameId });
        const updatedPhases = phases.map((phase) => {
          const phaseData = data.find((item) => item.phaseId === phase.id);
          if (phaseData) {
            return { ...phase, rating: phaseData.rating };
          }
          return { ...phase, rating: 0 };
        });
        setPhases(updatedPhases);
      } catch (error) {
        console.error('Erro ao buscar informações do jogo', error);
      }
    }

    fetchPhases();
    if (!returnData) playAudio(profileGender, 'jogo_2_bem_vindo');
  }, [route]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSelectGame = (gameId: number, phaseId: number) => {
    navigation.navigate('SecondGame', {
      gameId: gameId,
      phaseId: phaseId,
      profileGender: profileGender,
      profileId,
    });
  };

  return (
    <Container>
      <ContainerWrapper>
        <HeaderWrapper>
          <TouchableOpacity onPress={handleGoBack}>
            <Icon icon="arrow-left" size={24} color={colors.title} lib="FontAwesome" />
          </TouchableOpacity>
        </HeaderWrapper>
        <HeaderTitleAuxWrapper>
          <HeaderTitleWrapper>
            <HeaderTitle>Formule a palavra</HeaderTitle>
          </HeaderTitleWrapper>
        </HeaderTitleAuxWrapper>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.title}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          />
        ) : (
          <ScrollView>
            <BodyWrapper>
              {phases.map((phase) => (
                <CardGame
                  id={phase.id}
                  key={phase.id}
                  onPress={() => handleSelectGame(gameId, phase.id)}
                  backgroundColor={colors.blue}
                  borderColor={colors.blueLight}
                  title={phase.name}
                  rating={phase.rating ?? 0}
                />
              ))}
              <MarginBottom />
            </BodyWrapper>
          </ScrollView>
        )}
      </ContainerWrapper>
    </Container>
  );
}
