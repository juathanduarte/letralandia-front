import { FontSwap } from '@/components/FontSwap/FontSwap';
import Icon from '@/components/Icon/Icon';
import { useFont } from '@/contexts/FontContext';
import colors from '@/styles/colors';
import { RootStackScreenProps } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import {
  Container,
  GameWrapper,
  HeaderGame,
  HeaderWrapper,
  ImageGame,
  Letter,
  LetterContainer,
  LettersGame,
  LettersWrapper,
  Options,
  OptionsSelect,
  PencilIcon,
  Separator,
} from './style';

import ModalInfo from '@/components/ModalInfo/ModalInfo';
import { gamePhase } from '@/services/phase';
import { postInfoGame } from '@/services/profile-game-info';
import { playAudio } from '@/utils/playAudio';

interface WordData {
  word: string;
  syllables: string;
  size: number;
  image: string;
}

interface ErrorData {
  word: string;
  count: number;
}

export function FirstGame({ route }) {
  const navigation = useNavigation<RootStackScreenProps<'FirstGame'>['navigation']>();
  const { gameId, phaseId, profileGender, profileId } = route.params;
  const { font, isUpperCase } = useFont();
  const [gameData, setGameData] = useState<WordData[]>([]);
  const [lettersView, setLettersView] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fixedLetters, setFixedLetters] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [errors, setErrors] = useState<ErrorData[]>([]);
  const [openModalInfo, setOpenModalInfo] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<string>('');
  const [editableIndices, setEditableIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchGamePhase = async () => {
      setLoading(true);
      try {
        const words = await gamePhase(gameId, phaseId);
        setGameData(words);
        setStartTime(Date.now());
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
      const { incompleteWord, editableIndices } = generateArrayWord(word, phaseId);
      setFixedLetters(incompleteWord);
      setLettersView(incompleteWord);
      setEditableIndices(editableIndices);
      setOptions(generateOptions(word));
    }
  }, [currentWordIndex, gameData, phaseId]);

  const generateArrayWord = useCallback((word: string, phaseId: number) => {
    const arrayWord = word.split('');
    const incompleteWord = arrayWord.map(() => ' ');
    const arrayWordLength = arrayWord.length;

    let lettersToHide;
    if (phaseId === 1) {
      lettersToHide = arrayWordLength >= 4 ? 2 : 1;
    } else if (phaseId === 2) {
      lettersToHide = arrayWordLength >= 4 ? 2 : 1;
    } else if (phaseId === 3) {
      lettersToHide = arrayWordLength >= 5 ? 3 : 2;
    } else if (phaseId === 4) {
      lettersToHide = arrayWordLength >= 5 ? 3 : 2;
    } else if (phaseId === 5) {
      lettersToHide = arrayWordLength >= 5 ? 4 : 3;
    } else {
      lettersToHide = 2;
    }

    const indicesToShow = new Set<number>();

    while (indicesToShow.size < arrayWord.length - lettersToHide) {
      indicesToShow.add(Math.floor(Math.random() * arrayWord.length));
    }

    indicesToShow.forEach((index) => {
      incompleteWord[index] = arrayWord[index];
    });

    const editableIndices = new Set<number>(
      arrayWord
        .map((_, index) => (incompleteWord[index] === ' ' ? index : -1))
        .filter((index) => index !== -1)
    );

    return { incompleteWord, editableIndices };
  }, []);

  const generateOptions = useCallback((word: string) => {
    const uniqueLetters = Array.from(new Set(word.replace(/ /g, '')));
    const allLetters = [...uniqueLetters];

    while (allLetters.length < 9) {
      const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      if (!allLetters.includes(randomLetter)) {
        allLetters.push(randomLetter);
      }
    }

    return allLetters.sort(() => Math.random() - 0.5);
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const formatLetter = useCallback(
    (letter: string) => {
      return isUpperCase ? letter.toUpperCase() : letter.toLowerCase();
    },
    [isUpperCase]
  );

  const finalizeGame = useCallback(async () => {
    const endTime = Date.now();
    const timeTaken = Math.round((endTime - startTime) / 1000);

    const gameInfo = {
      profileId,
      gameId,
      phaseId,
      wordsInfo: errors,
      completionTime: timeTaken,
    };

    try {
      await postInfoGame(gameInfo);
    } catch (error) {
      console.error('Error posting game info:', error);
    }

    setTypeModal('success_end');
    setOpenModalInfo(true);
    playAudio(profileGender, 'parabens_completou');
    setShowConfetti(true);
    setTimeout(() => {
      navigation.navigate('SelectPhaseFirstGame', {
        profileGender,
        gameId,
        returnData: true,
        profileId,
      });
    }, 3500);
  }, [errors, startTime, profileId, gameId, phaseId, profileGender, navigation]);

  const handleSelectOption = useCallback(
    (option: string) => {
      const newLettersView = [...lettersView];
      const emptyIndex = newLettersView.indexOf(' ');

      if (emptyIndex !== -1) {
        newLettersView[emptyIndex] = option;
        setLettersView(newLettersView);

        if (!newLettersView.includes(' ')) {
          const completedWord = newLettersView.join('');
          const completedWordLowerCase = completedWord.toLowerCase();
          const gameDataLowerCase = gameData[currentWordIndex].word.toLowerCase();

          if (completedWordLowerCase === gameDataLowerCase) {
            if (currentWordIndex === 0) {
              playAudio(profileGender, 'parabens_acertou');
            } else {
              playAudio(profileGender, 'sucesso');
            }
            if (currentWordIndex < gameData.length - 1) {
              setTypeModal('success');
              setOpenModalInfo(true);
              setCurrentWordIndex((prevIndex) => prevIndex + 1);
            } else {
              finalizeGame();
            }
          } else {
            setTypeModal('error');
            setOpenModalInfo(true);
            if (currentWordIndex === 0) {
              playAudio(profileGender, 'ops_errou');
            } else {
              playAudio(profileGender, 'som_erro');
            }
            const word = gameData[currentWordIndex].word;
            setErrors((prevErrors) => {
              const errorIndex = prevErrors.findIndex((error) => error.word === word);
              if (errorIndex === -1) {
                return [...prevErrors, { word, count: 1 }];
              } else {
                const newErrors = [...prevErrors];
                newErrors[errorIndex].count += 1;
                return newErrors;
              }
            });
            setLettersView(fixedLetters);
          }
        }
      }
    },
    [lettersView, gameData, currentWordIndex, profileGender, finalizeGame, fixedLetters]
  );

  const handleEditLetter = useCallback(
    (index: number) => {
      const newLettersView = [...lettersView];
      newLettersView[index] = ' ';
      setLettersView(newLettersView);
    },
    [lettersView]
  );

  const currentWordData = gameData[currentWordIndex] || { word: '', incomplete: '', image: '' };

  return (
    <Container>
      <ModalInfo type={typeModal} modalVisible={openModalInfo} setModalVisible={setOpenModalInfo} />
      <HeaderWrapper>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon icon="arrow-left" size={24} color={colors.title} lib="FontAwesome" />
        </TouchableOpacity>
        <FontSwap color="yellow" />
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
                  <LetterContainer>
                    <Letter
                      letter={letter}
                      font={font}
                      onPress={() => {
                        if (editableIndices.has(index)) {
                          handleEditLetter(index);
                        }
                      }}
                    >
                      {formatLetter(letter)}
                    </Letter>
                    {editableIndices.has(index) && letter !== ' ' && (
                      <PencilIcon>
                        <Icon icon="pencil" size={16} color={colors.title} lib="FontAwesome" />
                      </PencilIcon>
                    )}
                  </LetterContainer>
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
      {showConfetti && <ConfettiCannon count={50} origin={{ x: -10, y: 0 }} />}
    </Container>
  );
}
