import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import colors from '@/styles/colors';
import { RootStackScreenProps } from '@/types/navigation';
import { playAudio } from '@/utils/playAudio';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  BodyWrapper,
  ButtonWrapper,
  Container,
  HeaderTitle,
  HeaderTitleAuxWrapper,
  HeaderTitleWrapper,
  HeaderWrapper,
  VerticalCenteringWrapper,
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
    N: { word: 'Narval', emoji: '🐋' },
    O: { word: 'Ovelha', emoji: '🐑' },
    P: { word: 'Pato', emoji: '🦆' },
    Q: { word: 'Queijo', emoji: '🧀' },
    R: { word: 'Rato', emoji: '🐀' },
    S: { word: 'Sapo', emoji: '🐸' },
    T: { word: 'Tigre', emoji: '🐅' },
    U: { word: 'Urso', emoji: '🐻' },
    V: { word: 'Vaca', emoji: '🐄' },
    W: { word: 'Wombat', emoji: '🐨' },
    X: { word: 'Xicara', emoji: '☕' },
    Y: { word: 'Yak', emoji: '🦙' },
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
      <VerticalCenteringWrapper>
        <BodyWrapper>
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter, index) => (
            <ButtonWrapper key={index}>
              <Button label={letter} onClick={() => speakAndShowEmoji(letter)} variant="primary" />
            </ButtonWrapper>
          ))}
        </BodyWrapper>
      </VerticalCenteringWrapper>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.centeredView}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <TouchableOpacity style={styles.modalView} activeOpacity={1} onPress={() => {}}>
            <Text style={styles.modalText}>{currentEmoji}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </Container>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 48,
  },
});
