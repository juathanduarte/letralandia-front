import { FontSwap } from '@/components/FontSwap/FontSwap';
import Icon from '@/components/Icon/Icon';
import { useFont } from '@/contexts/FontContext';
import colors from '@/styles/colors';
import { RootStackScreenProps } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
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
  OptionsSelect,
  Separator,
} from './style';

interface FirstGameProps {
  gameId: number;
}

const wordsData = [
  { word: 'GATO', incomplete: 'G TO', emoji: '🐈' },
  { word: 'CÃO', incomplete: 'C O', emoji: '🐕' },
  { word: 'PEIXE', incomplete: 'PEI E', emoji: '🐟' },
  { word: 'PÁSSARO', incomplete: 'PÁ SARO', emoji: '🐦' },
  { word: 'COELHO', incomplete: 'COE HO', emoji: '🐇' },
];

//TODO: Integrar com o back-end:
//TODO: - Chamar a rota localhost:3000/games/phase/1/words
//TODO: -- A rota retorna um array de objetos com as palavras, incompletas e emojis
//TODO: - Substituir o array wordsData pelo retorno da rota
//TODO: - Substituir o currentWord pelo retorno da rota
//TODO: - Substituir o currentIncomplete pelo retorno da rota
//TODO: - Substituir o currentEmoji pelo retorno da rota

export function FirstGame({ gameId }: FirstGameProps) {
  const navigation = useNavigation<RootStackScreenProps<'FirstGame'>['navigation']>();
  const { font, isUpperCase } = useFont();

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [lettersEmoji, setLettersEmoji] = useState(wordsData[0].incomplete.split(''));
  const [errors, setErrors] = useState(0);
  const [wrongWords, setWrongWords] = useState<{ word: string; count: number }[]>([]);

  const currentWordData = wordsData[currentWordIndex];
  const currentWord = currentWordData.word;
  const currentIncomplete = currentWordData.incomplete;
  const currentEmoji = currentWordData.emoji;

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

  const [options, setOptions] = useState(generateOptions(currentWord));

  useEffect(() => {
    setOptions(generateOptions(currentWord));
    setLettersEmoji(currentIncomplete.split(''));
  }, [currentWordIndex]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSelectOption = (option: string) => {
    const newLettersEmoji = [...lettersEmoji];
    const emptyIndex = newLettersEmoji.indexOf(' ');

    if (emptyIndex !== -1) {
      newLettersEmoji[emptyIndex] = option;
      setLettersEmoji(newLettersEmoji);

      const completedWord = newLettersEmoji.join('');
      if (completedWord === currentWord) {
        setTimeout(() => {
          Alert.alert('Parabéns!', 'Você acertou!');
          if (currentWordIndex < wordsData.length - 1) {
            setCurrentWordIndex(currentWordIndex + 1);
          } else {
            Alert.alert('Parabéns!', 'Você completou todas as palavras!');
          }
        }, 200);
      } else if (!newLettersEmoji.includes(' ')) {
        setTimeout(() => {
          Alert.alert('Ops!', 'Você errou!');
          setErrors(errors + 1);
          setLettersEmoji(currentIncomplete.split(''));

          setWrongWords((prevWrongWords) => {
            const existingWord = prevWrongWords.find((word) => word.word === currentWord);
            if (existingWord) {
              return prevWrongWords.map((word) =>
                word.word === currentWord ? { ...word, count: word.count + 1 } : word
              );
            } else {
              return [...prevWrongWords, { word: currentWord, count: 1 }];
            }
          });
        }, 200);
      }
    }
  };

  const formatLetter = (letter: string) => {
    return isUpperCase ? letter.toUpperCase() : letter.toLowerCase();
  };

  return (
    <Container>
      <HeaderWrapper>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon icon="arrow-left" size={24} color={colors.title} lib="FontAwesome" />
        </TouchableOpacity>
        <FontSwap />
      </HeaderWrapper>
      <HeaderGame>
        <Emoji>{currentEmoji}</Emoji>
        <LettersWrapper>
          {lettersEmoji.map((letter, index) => (
            <Options key={index} letter={letter} font={font}>
              <Letter letter={letter} font={font}>
                {formatLetter(letter)}
              </Letter>
            </Options>
          ))}
        </LettersWrapper>
      </HeaderGame>
      <Separator />
      <BodyGame>
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
      </BodyGame>
    </Container>
  );
}
