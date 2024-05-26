import { FontSwap } from '@/components/FontSwap/FontSwap';
import Icon from '@/components/Icon/Icon';
import { useFont } from '@/contexts/FontContext';
import colors from '@/styles/colors';
import { RootStackScreenProps } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
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
import { playAudio } from '@/utils/playAudio';

interface FirstGameProps {
  gameId: number;
  phaseId: number;
}

interface WordData {
  word: string;
  syllabes: string;
  size: number;
  image: string;
}

export function FirstGame({ route }) {
  const navigation = useNavigation<RootStackScreenProps<'FirstGame'>['navigation']>();
  const { gameId, phaseId, profileGender } = route.params;
  const { font, isUpperCase } = useFont();
  const [gameData, setGameData] = useState<WordData[]>([]);
  const [lettersView, setLettersView] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [fixedLetters, setFixedLetters] = useState<string[]>([]);

  useEffect(() => {
    const fetchGamePhase = async () => {
      setLoading(true);
      try {
        const words = await gamePhase(gameId, phaseId);
        setGameData(words);
      } catch (error) {
        console.error('Failed to fetch game phase:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGamePhase();
  }, [gameId, phaseId]);

  useEffect(() => {
    if (gameData.length > 0) {
      const { word } = gameData[currentWordIndex];
      const incomplete = generateArrayWord(word);
      setFixedLetters(incomplete);
      setLettersView(incomplete);
      setOptions(generateOptions(word));
    }
  }, [currentWordIndex, gameData]);

  const generateArrayWord = (word: string) => {
    const arrayWord = word.split('');
    const incompleteWord = arrayWord.map(() => ' ');
    const indicesToShow = [];

    while (indicesToShow.length < 2) {
      const randomIndex = Math.floor(Math.random() * arrayWord.length);
      if (!indicesToShow.includes(randomIndex)) {
        indicesToShow.push(randomIndex);
      }
    }

    indicesToShow.forEach((index) => {
      incompleteWord[index] = arrayWord[index];
    });

    return incompleteWord;
  };

  const generateOptions = (word: string) => {
    const uniqueLetters = Array.from(new Set(word.replace(/ /g, '')));
    const allLetters = [...uniqueLetters];

    while (allLetters.length < 9) {
      const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      if (!allLetters.includes(randomLetter)) {
        allLetters.push(randomLetter);
      }
    }

    return allLetters.sort(() => Math.random() - 0.5);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const formatLetter = (letter: string) => {
    return isUpperCase ? letter.toUpperCase() : letter.toLowerCase();
  };

  const handleSelectOption = (option: string) => {
    const newLettersView = [...lettersView];
    const emptyIndex = newLettersView.indexOf(' ');

    if (emptyIndex !== -1) {
      newLettersView[emptyIndex] = option;
      setLettersView(newLettersView);

      if (!newLettersView.includes(' ')) {
        const completedWord = newLettersView.join('');
        const completedWordLowerCase = completedWord.toLowerCase();
        const gameDataLowerCase = gameData[currentWordIndex].word.toLowerCase();
        setTimeout(() => {
          if (completedWordLowerCase === gameDataLowerCase) {
            playAudio(profileGender, 'parabens_acertou');
            Alert.alert('Parabéns!', 'Você acertou!');
            setCurrentWordIndex((prevIndex) =>
              prevIndex < gameData.length - 1 ? prevIndex + 1 : prevIndex
            );
          } else {
            playAudio(profileGender, 'ops_errou');
            Alert.alert('Ops!', 'Você errou!');
            setLettersView(fixedLetters);
          }
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
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.title}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      ) : (
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
      )}
    </Container>
  );
}
