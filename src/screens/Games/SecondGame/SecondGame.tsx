import { FontSwap } from '@/components/FontSwap/FontSwap';
import Icon from '@/components/Icon/Icon';
import ModalInfo from '@/components/ModalInfo/ModalInfo';
import { useFont } from '@/contexts/FontContext';
import { gamePhase } from '@/services/phase';
import { postInfoGame } from '@/services/profile-game-info';
import colors from '@/styles/colors';
import { RootStackScreenProps } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { playAudio } from '../../../utils/playAudio';
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
  PlayButton,
  PlayIcon,
  Separator,
} from './style';

interface WordData {
  word: string;
  syllables: string;
  size: number;
  image: string;
  audioMale: string;
  audioFemale: string;
}

interface ErrorData {
  word: string;
  count: number;
}

export function SecondGame({ route }) {
  const navigation = useNavigation<RootStackScreenProps<'SecondGame'>['navigation']>();
  const { gameId, phaseId, profileGender, profileId } = route.params;
  const { font, isUpperCase } = useFont();
  const [loading, setLoading] = useState<boolean>(true);
  const [gameData, setGameData] = useState<WordData[]>([]);
  const [lettersView, setLettersView] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [options, setOptions] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [openModalInfo, setOpenModalInfo] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<string>('');
  const [startTime, setStartTime] = useState<number>(0);
  const [errors, setErrors] = useState<ErrorData[]>([]);

  useEffect(() => {
    const fetchGamePhase = async () => {
      setLoading(true);
      try {
        const words = await gamePhase(gameId, phaseId);
        setGameData(words);
        setStartTime(Date.now());

        if (profileGender === 'male' && words[0]?.audioMale) {
          await playAudio('male', words[0].audioMale);
        } else if (profileGender === 'female' && words[0]?.audioFemale) {
          await playAudio('female', words[0].audioFemale);
        }
      } catch (error) {
        console.error('Failed to fetch game phase:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGamePhase();
  }, [gameId, phaseId, profileGender]);

  useEffect(() => {
    if (gameData.length > 0) {
      const { word } = gameData[currentWordIndex];
      setLettersView(new Array(word.length).fill(' '));
      setOptions(generateOptions(word));

      if (profileGender === 'male' && gameData[currentWordIndex]?.audioMale) {
        playAudio('male', gameData[currentWordIndex].audioMale);
      } else if (profileGender === 'female' && gameData[currentWordIndex]?.audioFemale) {
        playAudio('female', gameData[currentWordIndex].audioFemale);
      }
    }
  }, [currentWordIndex, gameData]);

  const generateOptions = (word: string) => {
    const uniqueLetters = Array.from(new Set(word.split('')));
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

  const handleSelectOption = async (option: string) => {
    const newLettersView = [...lettersView];
    const emptyIndex = newLettersView.indexOf(' ');

    if (emptyIndex !== -1) {
      newLettersView[emptyIndex] = option;
      setLettersView(newLettersView);

      if (!newLettersView.includes(' ')) {
        const completedWord = newLettersView.join('').toLowerCase();
        const gameDataWord = gameData[currentWordIndex].word.toLowerCase();

        if (completedWord === gameDataWord) {
          if (currentWordIndex < gameData.length - 1) {
            setTypeModal('success');
            setOpenModalInfo(true);
            playAudio(profileGender, 'parabens_acertou');
            setTimeout(() => {
              setCurrentWordIndex((prevIndex) => prevIndex + 1);
            }, 3500);
          } else {
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
              console.log('Game info posted successfully');
            } catch (error) {
              console.error('Error posting game info:', error);
            }
            setTypeModal('success_end');
            setOpenModalInfo(true);
            setShowConfetti(true);
            playAudio(profileGender, 'parabens_completou');
            setTimeout(() => {
              navigation.navigate('SelectPhaseSecondGame', {
                profileGender,
                gameId,
                returnData: true,
                profileId,
              });
            }, 3500);
          }
        } else {
          setTypeModal('error');
          setOpenModalInfo(true);
          playAudio(profileGender, 'ops_errou');
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
          setLettersView(new Array(gameDataWord.length).fill(' '));
        }
      }
    }
  };

  const handlePlayAudio = () => {
    if (profileGender === 'male' && currentWordData.audioMale) {
      playAudio('male', currentWordData.audioMale);
    } else if (profileGender === 'female' && currentWordData.audioFemale) {
      playAudio('female', currentWordData.audioFemale);
    }
  };

  const currentWordData = gameData[currentWordIndex] || {
    word: '',
    syllabes: '',
    size: 0,
    image: '',
    audioMale: '',
    audioFemale: '',
  };

  return (
    <Container>
      <ModalInfo type={typeModal} modalVisible={openModalInfo} setModalVisible={setOpenModalInfo} />
      <HeaderWrapper>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon icon="arrow-left" size={24} color={colors.title} lib="FontAwesome" />
        </TouchableOpacity>
        <FontSwap color="blue" />
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
            <ImageGame source={{ uri: `data:image/png;base64,${currentWordData.image}` }}>
              <PlayButton onPress={handlePlayAudio}>
                <PlayIcon icon="play-circle" size={48} color={colors.white} lib="FontAwesome" />
              </PlayButton>
            </ImageGame>

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
      {showConfetti && <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />}
    </Container>
  );
}
