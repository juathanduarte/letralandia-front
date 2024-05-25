import { FontSwap } from '@/components/FontSwap/FontSwap';
import Icon from '@/components/Icon/Icon';
import { useFont } from '@/contexts/FontContext';
import colors from '@/styles/colors';
import { RootStackScreenProps } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import {
  Container,
  GameWrapper,
  HeaderGame,
  HeaderWrapper,
  ImageGame,
  Letter,
  LettersGame,
  LettersWrapper,
  Options,
  OptionsSelect,
  Separator,
} from './style';

import { gamePhase } from '@/services/phase';

interface FirstGameProps {
  gameId: number;
}

interface WordData {
  word: string;
  incomplete: string;
  image: string; //base64
}

export function FirstGame({ gameId }: FirstGameProps) {
  const navigation = useNavigation<RootStackScreenProps<'FirstGame'>['navigation']>();
  const { font, isUpperCase } = useFont();
  const [gameData, setGameData] = useState<WordData[]>([]);
  const [lettersView, setLettersView] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);

  const getGamePhase = async () => {
    const words = await gamePhase('1', '1');
    setGameData(words);
  };

  useEffect(() => {
    getGamePhase();
  }, []);

  useEffect(() => {
    if (gameData.length > 0) {
      const currentWordData = gameData[currentWordIndex];
      const { incomplete } = generateArrayWord(currentWordData.word);
      setLettersView(incomplete);
      setOptions(generateOptions(currentWordData.word));
    }
  }, [currentWordIndex, gameData]);

  const generateArrayWord = (word: string) => {
    const arrayWord = word.split('');
    const incompleteWord = arrayWord.map((letter, index) => {
      if (index === 0 || index === arrayWord.length - 1) {
        return ' ';
      }
      return letter;
    });
    return { word: arrayWord, incomplete: incompleteWord };
  };

  const generateOptions = (word: string) => {
    const uniqueLetters = Array.from(new Set(word.replace(/ /g, '')));
    while (uniqueLetters.length < 9) {
      const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      if (!uniqueLetters.includes(randomLetter)) {
        uniqueLetters.push(randomLetter);
      }
    }
    return uniqueLetters.sort(() => Math.random() - 0.5);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const formatLetter = (letter: string) => {
    return isUpperCase ? letter.toUpperCase() : letter.toLowerCase();
  };

  const handleSelectOption = (option: string) => {
    const newlettersView = [...lettersView];
    const emptyIndex = newlettersView.indexOf(' ');

    if (emptyIndex !== -1) {
      newlettersView[emptyIndex] = option;
      setLettersView(newlettersView);

      const completedWord = newlettersView.join('');
      if (completedWord === gameData[currentWordIndex].word) {
        setTimeout(() => {
          Alert.alert('Parabéns!', 'Você acertou!');
          if (currentWordIndex < gameData.length - 1) {
            setCurrentWordIndex(currentWordIndex + 1);
          } else {
            Alert.alert('Parabéns!', 'Você completou todas as palavras!');
          }
        }, 200);
      } else if (!newlettersView.includes(' ')) {
        setTimeout(() => {
          Alert.alert('Ops!', 'Você errou!');
          setLettersView(generateArrayWord(gameData[currentWordIndex].word).incomplete);
        }, 200);
      }
    }
  };

  const currentWordData = gameData[currentWordIndex] || { word: '', incomplete: '', image: '' };

  return (
    <Container>
      <HeaderWrapper>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon icon="arrow-left" size={24} color={colors.title} lib="FontAwesome" />
        </TouchableOpacity>
        <FontSwap />
      </HeaderWrapper>
      <GameWrapper>
        <HeaderGame>
          <ImageGame source={{ uri: `data:image/png;base64,${currentWordData.image}` }} />
          <LettersWrapper>
            {lettersView.map((letter, index) => (
              <Options key={index} letter={letter} font={font}>
                <Letter letter={letter} font={font}>
                  {formatLetter(letter)}
                </Letter>
              </Options>
            ))}
          </LettersWrapper>
        </HeaderGame>
        <Separator />
        <LettersGame>
          {options.map((option, index) => (
            <OptionsSelect
              key={index}
              letter={option}
              font={font}
              onPress={() => handleSelectOption(option)}
            >
              <Letter letter={option} font={font}>
                {formatLetter(option)}
              </Letter>
            </OptionsSelect>
          ))}
        </LettersGame>
      </GameWrapper>
    </Container>
  );
}
