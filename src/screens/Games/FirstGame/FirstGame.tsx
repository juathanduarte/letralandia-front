import { FontSwap } from '@/components/FontSwap/FontSwap';
import Icon from '@/components/Icon/Icon';
import { useFont } from '@/contexts/FontContext'; // Certifique-se de que o caminho esteja correto
import colors from '@/styles/colors';
import { RootStackScreenProps } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  BodyGame,
  Container,
  Emoji,
  HeaderGame,
  HeaderWrapper,
  Letter,
  LettersGame,
  LettersWrapper,
  Options,
  Separator,
} from './style';

interface FirstGameProps {
  gameId: number;
}

export function FirstGame({ gameId }: FirstGameProps) {
  const navigation = useNavigation<RootStackScreenProps<'FirstGame'>['navigation']>();
  const { font } = useFont();

  const lettersEmoji = ['G', ' ', 'T', 'O'];
  const options = ['G', 'A', 'T', 'O', 'E', 'U', 'X', 'L', 'M'];

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <HeaderWrapper>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon icon="arrow-left" size={24} color={colors.title} lib="FontAwesome" />
        </TouchableOpacity>
        <FontSwap />
      </HeaderWrapper>
      <BodyGame>
        <HeaderGame>
          <Emoji>🐈</Emoji>
          <LettersWrapper>
            {lettersEmoji.map((letter, index) => (
              <Options key={index} letter={letter} font={font}>
                <Letter letter={letter} font={font}>
                  {letter}
                </Letter>
              </Options>
            ))}
          </LettersWrapper>
        </HeaderGame>
        <Separator />
        <LettersGame></LettersGame>
      </BodyGame>
    </Container>
  );
}
