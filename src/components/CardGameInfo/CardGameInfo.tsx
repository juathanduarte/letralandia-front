import colors from '@/styles/colors';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import {
  CardContainer,
  CardInfo,
  CardInfoNoInfo,
  CardTitle,
  CardTitleWrapper,
  ChartWrapper,
  Container,
  ErrorText,
  ErrorTextWrapper,
  InfoText,
  InfoTextWrapper,
  TitleInfo,
} from './style';

interface GameErrors {
  [key: string]: number;
}

interface GameSummary {
  gameId: number;
  hasInformation: boolean;
  totalCompletionTime?: number;
  timePerPhase?: number;
  totalWords?: number;
  errors?: GameErrors;
}

interface CardGameInfoProps {
  gameInfo: GameSummary;
}

const CardGameInfo: React.FC<CardGameInfoProps> = ({ gameInfo }) => {
  const formatTime = (timeInSeconds?: number) => {
    if (timeInSeconds === undefined) return 'false';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = (timeInSeconds % 60).toFixed(2);
    if (minutes > 0 && parseFloat(seconds) === 0) {
      return `${minutes}m`;
    }
    return minutes > 0 ? `${minutes}m ${parseFloat(seconds)}s` : `${parseFloat(seconds)}s`;
  };

  const totalWords = gameInfo.totalWords || 0;
  const totalErrors = gameInfo.errors
    ? Object.values(gameInfo.errors).reduce((a, b) => a + b, 0)
    : 0;
  const correctWords = totalWords - totalErrors;

  const data = [
    {
      population: correctWords,
      color: `${colors.greenLight}`,
    },
    {
      population: totalErrors,
      color: `${colors.redLight}`,
    },
  ];

  const screenWidth = Dimensions.get('window').width;
  const chartSize = screenWidth * 0.3;
  const paddingLeft = screenWidth > 600 ? '53' : '29';

  const getCardColors = (gameId: number) => {
    switch (gameId) {
      case 1:
        return { background: colors.yellowBackground, border: colors.yellowLight };
      case 2:
        return { background: colors.pinkBackground, border: colors.pinkLight };
      case 3:
        return { background: colors.blueBackground, border: colors.blueLight };
      default:
        return { background: colors.yellowBackground, border: colors.yellowLight };
    }
  };

  const { background, border } = getCardColors(gameInfo.gameId);

  return (
    <Container>
      <CardTitle>Jogo {gameInfo.gameId}</CardTitle>
      {!gameInfo.hasInformation ? (
        <CardContainer backgroundColor={background} borderColor={border}>
          <CardInfoNoInfo>
            <InfoText>O usuário deve jogar o jogo para ter informações. 🙂</InfoText>
          </CardInfoNoInfo>
        </CardContainer>
      ) : (
        <CardContainer backgroundColor={background} borderColor={border}>
          <View style={{ flex: 1 }}>
            <CardInfo>
              <CardTitleWrapper>
                <TitleInfo>Informações</TitleInfo>
              </CardTitleWrapper>
              <InfoTextWrapper>
                <InfoText>Tempo de jogo:</InfoText>
                <InfoText>{formatTime(gameInfo.totalCompletionTime)}</InfoText>
              </InfoTextWrapper>
              <InfoTextWrapper>
                <InfoText>Tempo por fase:</InfoText>
                <InfoText>{formatTime(gameInfo.timePerPhase)}</InfoText>
              </InfoTextWrapper>
            </CardInfo>
            <CardInfo>
              <CardTitleWrapper>
                <TitleInfo>Progresso</TitleInfo>
              </CardTitleWrapper>
              <ChartWrapper>
                <PieChart
                  data={data}
                  width={chartSize}
                  height={chartSize}
                  chartConfig={{
                    backgroundColor: '#fff',
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
                  }}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft={paddingLeft}
                  hasLegend={false}
                />
              </ChartWrapper>
            </CardInfo>
          </View>
          <View style={{ flex: 1 }}>
            <CardInfo>
              <CardTitleWrapper>
                <TitleInfo>Erros</TitleInfo>
              </CardTitleWrapper>
              <View>
                {gameInfo.errors && Object.entries(gameInfo.errors).length > 0 ? (
                  Object.entries(gameInfo.errors).map(([error, count], index) => (
                    <InfoTextWrapper key={index}>
                      <InfoText>
                        {index + 1}. {error}
                      </InfoText>
                      <InfoText>{count}x</InfoText>
                    </InfoTextWrapper>
                  ))
                ) : (
                  <ErrorTextWrapper>
                    <ErrorText>Sem erros ✅</ErrorText>
                  </ErrorTextWrapper>
                )}
              </View>
            </CardInfo>
          </View>
        </CardContainer>
      )}
    </Container>
  );
};

export default CardGameInfo;
