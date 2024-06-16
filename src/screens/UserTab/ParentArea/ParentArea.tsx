import Icon from '@/components/Icon/Icon';
import { useUser } from '@/contexts/UserContext';
import colors from '@/styles/colors';
import { RootStackScreenProps } from '@/types/navigation';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import AuthModalParentArea from '../../../components/ModalAuthParentArea/ModalAuthParentArea';
import { Container } from './style';

const generateRandomQuestionAndAnswer = () => {
  const operations = [
    { op: 'x', func: (a, b) => a * b, needsSecondOperand: true },
    { op: '²', func: (a) => a * a, needsSecondOperand: false },
  ];

  const randomOperation = operations[Math.floor(Math.random() * operations.length)];
  const a = Math.floor(Math.random() * 10) + 1;
  const b = randomOperation.needsSecondOperand ? Math.floor(Math.random() * 10) + 1 : a;

  const question = randomOperation.needsSecondOperand
    ? `Quanto é \n${a} ${randomOperation.op} ${b}?`
    : `Quanto é \n${a}${randomOperation.op}?`;
  const answer = randomOperation.func(a, b).toString();

  return { question, answer };
};

export function ParentArea() {
  const navigation = useNavigation<RootStackScreenProps<'ParentArea'>['navigation']>();

  const [modalVisible, setModalVisible] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const { profileId } = useUser();

  useFocusEffect(
    useCallback(() => {
      const { question, answer } = generateRandomQuestionAndAnswer();
      setQuestion(question);
      setAnswer(answer);
      setModalVisible(true);

      return () => {
        setModalVisible(false);
      };
    }, [])
  );

  const handleGoBack = () => {
    navigation.navigate('Tabs', {
      screen: 'Home',
      params: { profileId: profileId, returnToParentArea: true },
    });
  };

  return (
    <Container>
      <TouchableOpacity onPress={handleGoBack}>
        <Icon icon="arrow-left" size={24} color={colors.title} lib="FontAwesome" />
      </TouchableOpacity>
      <Text>Área dos pais</Text>
      <AuthModalParentArea
        question={question}
        answer={answer}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Container>
  );
}
