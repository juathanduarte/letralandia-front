import Icon from '@/components/Icon/Icon';
import { useUser } from '@/contexts/UserContext';
import colors from '@/styles/colors';
import { RootStackScreenProps } from '@/types/navigation';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import AuthModalParentArea from '../../../components/ModalAuthParentArea/ModalAuthParentArea';
import { Container } from './style';

export function ParentArea() {
  const navigation = useNavigation<RootStackScreenProps<'ParentArea'>['navigation']>();

  const [modalVisible, setModalVisible] = useState(false);
  const [question, setQuestion] = useState('Quanto é 9x7?');
  const [answer, setAnswer] = useState('63');
  const { profileId } = useUser();

  useFocusEffect(
    useCallback(() => {
      setQuestion('Quanto é\n9x7?');
      setAnswer('63');
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
