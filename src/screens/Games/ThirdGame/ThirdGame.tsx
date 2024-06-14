import { FontSwap } from '@/components/FontSwap/FontSwap';
import Icon from '@/components/Icon/Icon';
import { useFont } from '@/contexts/FontContext';
import colors from '@/styles/colors';
import { RootStackScreenProps } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
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

const commonSyllables = [
  'ba',
  'be',
  'bi',
  'bo',
  'bu',
  'ca',
  'ce',
  'ci',
  'co',
  'cu',
  'da',
  'de',
  'di',
  'do',
  'du',
  'fa',
  'fe',
  'fi',
  'fo',
  'fu',
  'ga',
  'ge',
  'gi',
  'go',
  'gu',
  'la',
  'le',
  'li',
  'lo',
  'lu',
  'ma',
  'me',
  'mi',
  'mo',
  'mu',
  'na',
  'ne',
  'ni',
  'no',
  'nu',
  'pa',
  'pe',
  'pi',
  'po',
  'pu',
  'ra',
  're',
  'ri',
  'ro',
  'ru',
  'sa',
  'se',
  'si',
  'so',
  'su',
  'ta',
  'te',
  'ti',
  'to',
  'tu',
  'va',
  've',
  'vi',
  'vo',
  'vu',
  'bra',
  'cri',
  'flo',
  'gra',
  'pra',
  'tri',
  'blu',
  'cla',
  'dri',
  'fra',
  'gri',
  'pro',
  'tra',
  'ble',
  'cle',
  'dre',
  'fre',
  'gre',
  'pre',
  'tre',
  'blo',
  'clo',
  'dro',
  'fro',
  'gro',
  'pro',
  'tro',
];

export function ThirdGame({ route }) {
  const navigation = useNavigation<RootStackScreenProps<'ThirdGame'>['navigation']>();
  const { gameId, phaseId, profileGender, profileId } = route.params;
  const { font, isUpperCase } = useFont();
  const [gameData, setGameData] = useState<WordData[]>([]);
  const [syllablesView, setSyllablesToView] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fixedSyllables, setFixedSyllables] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [errors, setErrors] = useState<ErrorData[]>([]);
  const [openModalInfo, setOpenModalInfo] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<string>('');

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
      const { syllables } = gameData[currentWordIndex];
      generateOptions(syllables);
      const incomplete = generateArraySyllables(syllables);
      setFixedSyllables(incomplete);
      setSyllablesToView(incomplete);
      const generatedOptions = generateOptions(syllables);
      setOptions(generatedOptions);
    }
  }, [currentWordIndex, gameData]);

  const generateArraySyllables = (syllables: string) => {
    const arraySyllables = syllables.split('-');
    const emptyArray = arraySyllables.map(() => ' ');

    return emptyArray;
  };

  const generateOptions = (syllables: string): string[] => {
    const uniqueSyllables = Array.from(new Set(syllables.split('-')));
    const allSyllables: string[] = [...uniqueSyllables];

    const maxSyllableLength = Math.max(...uniqueSyllables.map((s) => s.length));

    const mirrorSyllable = (syllable: string): string => {
      return syllable.split('').reverse().join('');
    };

    let attempts = 0;
    const maxAttempts = 50;

    while (allSyllables.length < 9 && attempts < maxAttempts) {
      attempts++;
      const randomSyllable = uniqueSyllables[Math.floor(Math.random() * uniqueSyllables.length)];
      let newSyllable =
        Math.random() > 0.5
          ? mirrorSyllable(randomSyllable)
          : commonSyllables[Math.floor(Math.random() * commonSyllables.length)];

      if (newSyllable.length > maxSyllableLength) {
        newSyllable = newSyllable.substring(0, maxSyllableLength);
      }

      if (!allSyllables.includes(newSyllable)) {
        allSyllables.push(newSyllable);
      }
    }

    while (allSyllables.length < 9) {
      const fillerSyllable = commonSyllables[Math.floor(Math.random() * commonSyllables.length)];
      if (!allSyllables.includes(fillerSyllable) && fillerSyllable.length <= maxSyllableLength) {
        allSyllables.push(fillerSyllable);
      }
    }

    return allSyllables.sort(() => Math.random() - 0.5);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const formatLetter = (letter: string) => {
    return isUpperCase ? letter.toUpperCase() : letter.toLowerCase();
  };

  const handleSelectOption = (option: string) => {
    const newLettersView = [...syllablesView];
    const emptyIndex = newLettersView.indexOf(' ');

    if (emptyIndex !== -1) {
      newLettersView[emptyIndex] = option;
      setSyllablesToView(newLettersView);

      if (!newLettersView.includes(' ')) {
        const completedWord = newLettersView.join('');
        const completedWordLowerCase = completedWord.toLowerCase();
        const gameDataLowerCase = gameData[currentWordIndex].word.toLowerCase();
        setTimeout(async () => {
          if (completedWordLowerCase === gameDataLowerCase) {
            if (currentWordIndex < gameData.length - 1) {
              setTypeModal('success');
              setOpenModalInfo(true);
              playAudio(profileGender, 'parabens_acertou');
              setCurrentWordIndex((prevIndex) => prevIndex + 1);
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

              console.log('Time taken:', timeTaken);
              setTypeModal('success_end');
              console.log('setTypeModal', 'success_end');
              setOpenModalInfo(true);
              console.log('setOpenModalInfo', true);
              playAudio(profileGender, 'parabens_completou');
              console.log('playAudio', 'parabens_completou');
              setShowConfetti(true);
              setTimeout(() => {
                navigation.navigate('SelectPhaseThirdGame', {
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
            setSyllablesToView(fixedSyllables);
          }
        }, 200);
      }
    }
  };

  const currentWordData = gameData[currentWordIndex] || { word: '', incomplete: '', image: '' };

  return (
    <Container>
      <ModalInfo type={typeModal} modalVisible={openModalInfo} setModalVisible={setOpenModalInfo} />
      <HeaderWrapper>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon icon="arrow-left" size={24} color={colors.title} lib="FontAwesome" />
        </TouchableOpacity>
        <FontSwap color="pink" />
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
              {syllablesView.map((letter, index) => (
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
