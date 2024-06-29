import Icon from '@/components/Icon/Icon';
import colors from '@/styles/colors';
import { RootStackScreenProps } from '@/types/navigation';
import { playAudio } from '@/utils/playAudio';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, TouchableOpacity } from 'react-native';
import {
  BodyWrapper,
  ButtonLetter,
  ButtonWrapper,
  CenteredView,
  Container,
  ContainerWrapper,
  HeaderTitle,
  HeaderTitleAuxWrapper,
  HeaderTitleWrapper,
  HeaderWrapper,
  ModalText,
  ModalView,
  TextLetter,
} from './style';

export function Alphabet({ route }) {
  const navigation = useNavigation<RootStackScreenProps<'Alphabet'>['navigation']>();
  const { profileGender } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState('');

  useEffect(() => {
    playAudio(profileGender, 'alfabeto');
  }, [route]);

  const letterWords = {
    A: { word: 'Abelha', emoji: '🐝' },
    B: { word: 'Bola', emoji: '⚽' },
    C: { word: 'Cachorro', emoji: '🐶' },
    D: { word: 'Dado', emoji: '🎲' },
    E: { word: 'Elefante', emoji: '🐘' },
    F: { word: 'Foca', emoji: '🦭' },
    G: { word: 'Gato', emoji: '🐈' },
    H: { word: 'Hipopotamo', emoji: '🦛' },
    I: { word: 'Iguana', emoji: '🦎' },
    J: { word: 'Jacare', emoji: '🐊' },
    K: { word: 'Kiwi', emoji: '🥝' },
    L: { word: 'Leao', emoji: '🦁' },
    M: { word: 'Macaco', emoji: '🐒' },
    N: { word: 'Navio', emoji: '🚢' },
    O: { word: 'Ovelha', emoji: '🐑' },
    P: { word: 'Pato', emoji: '🦆' },
    Q: { word: 'Queijo', emoji: '🧀' },
    R: { word: 'Rato', emoji: '🐀' },
    S: { word: 'Sapo', emoji: '🐸' },
    T: { word: 'Tigre', emoji: '🐅' },
    U: { word: 'Urso', emoji: '🐻' },
    V: { word: 'Vaca', emoji: '🐄' },
    W: { word: 'William', emoji: '👦' },
    X: { word: 'Xicara', emoji: '☕' },
    Y: { word: 'Yakisoba', emoji: '🍜' },
    Z: { word: 'Zebra', emoji: '🦓' },
  };

  const speakAndShowEmoji = (letter) => {
    const audio_path = `${letter}_${letterWords[letter].word}`.toLowerCase();
    playAudio(profileGender, audio_path);
    setCurrentEmoji(letterWords[letter].emoji);
    setModalVisible(true);
  };

  const handleGoBack = () => {
    navigation.goBack();
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
            <HeaderTitle>Alfabeto</HeaderTitle>
          </HeaderTitleWrapper>
        </HeaderTitleAuxWrapper>
        <ScrollView>
          <BodyWrapper>
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter, index) => (
              <ButtonWrapper key={index}>
                <ButtonLetter onPress={() => speakAndShowEmoji(letter)}>
                  <TextLetter>{letter}</TextLetter>
                </ButtonLetter>
              </ButtonWrapper>
            ))}
          </BodyWrapper>
        </ScrollView>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <CenteredView onPress={() => setModalVisible(false)}>
            <ModalView>
              <ModalText>{currentEmoji}</ModalText>
            </ModalView>
          </CenteredView>
        </Modal>
      </ContainerWrapper>
    </Container>
  );
}
