import Icon from '@/components/Icon/Icon';
import { useUser } from '@/contexts/UserContext';
import { getInfoGameProfile } from '@/services/profile-game-info';
import colors from '@/styles/colors';
import { RootStackScreenProps } from '@/types/navigation';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import CardGameInfo from '../../../components/CardGameInfo/CardGameInfo';
import AuthModalParentArea from '../../../components/ModalAuthParentArea/ModalAuthParentArea';
import {
  BodyWrapper,
  Container,
  ContainerWrapper,
  LoadingContainer,
  WelcomeText,
  WelcomeTextContainer,
} from './style';

type GameErrors = {
  [key: string]: number;
};

interface GameSummary {
  gameId: number;
  hasInformation: boolean;
  totalCompletionTime?: number;
  timePerPhase?: number;
  totalWords?: number;
  errors?: GameErrors;
}

interface GamesSummaryResponse {
  gamesSummary: GameSummary[];
}

export function ParentArea() {
  const navigation = useNavigation<RootStackScreenProps<'ParentArea'>['navigation']>();
  const [modalVisible, setModalVisible] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const { profileId } = useUser();
  const [gamesInfos, setGamesInfos] = useState<GameSummary[]>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchInfoGameProfile = async () => {
    try {
      setLoading(true);
      const data: GamesSummaryResponse = await getInfoGameProfile({ profileId });
      setGamesInfos(data.gamesSummary);
    } catch (error) {
      console.error('Failed to get game info:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchInfoGameProfile();
    }
  }, [profileId, isAuthorized]);

  useFocusEffect(
    useCallback(() => {
      const { question, answer } = generateRandomQuestionAndAnswer();
      setQuestion(question);
      setAnswer(answer);
      setModalVisible(true);
      setIsAuthorized(false);

      return () => {
        setModalVisible(false);
        setIsAuthorized(false);
      };
    }, [])
  );

  const generateRandomQuestionAndAnswer = () => {
    const operations = [
      { op: 'x', func: (a, b) => a * b, needsSecondOperand: true },
      { op: '²', func: (a) => a * a, needsSecondOperand: false },
    ];

    const randomOperation = operations[Math.floor(Math.random() * operations.length)];
    const a = Math.floor(Math.random() * 10) + 1;
    const b = randomOperation.needsSecondOperand ? Math.floor(Math.random() * 10) + 1 : a;

    const question = randomOperation.needsSecondOperand
      ? `Quanto é \n${a} ${randomOperation.op} ${b}?`
      : `Quanto é \n${a}${randomOperation.op}?`;
    const answer = randomOperation.func(a, b).toString();

    return { question, answer };
  };

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Bom dia';
    if (hours < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const handleGoBack = () => {
    navigation.navigate('Tabs', {
      screen: 'Home',
      params: { profileId: profileId, returnToParentArea: true },
    });
  };

  const handleModalClose = (authorized: boolean) => {
    setIsAuthorized(authorized);
    setModalVisible(false);
  };

  return (
    <Container>
      <ContainerWrapper>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon icon="arrow-left" size={24} color={colors.title} lib="FontAwesome" />
        </TouchableOpacity>
        <WelcomeTextContainer>
          <WelcomeText>{getGreeting()}, bem-vindo à área dos pais/educadores!</WelcomeText>
        </WelcomeTextContainer>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator size="large" color={colors.title} />
          </LoadingContainer>
        ) : (
          <BodyWrapper>
            {isAuthorized &&
              gamesInfos.map((gameInfo) => (
                <CardGameInfo key={gameInfo.gameId} gameInfo={gameInfo} />
              ))}
          </BodyWrapper>
        )}
        <AuthModalParentArea
          question={question}
          answer={answer}
          modalVisible={modalVisible}
          setModalVisible={handleModalClose}
        />
      </ContainerWrapper>
    </Container>
  );
}
