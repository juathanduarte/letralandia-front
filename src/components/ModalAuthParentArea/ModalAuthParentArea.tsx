import { useUser } from '@/contexts/UserContext'; // Importar useUser
import colors from '@/styles/colors';
import { RootStackScreenProps } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import { Container, ModalContainer, ModalInput, ModalText } from './style';

interface AuthModalParentAreaProps {
  question: string;
  answer: string;
  modalVisible: boolean;
  setModalVisible: (authorized: boolean) => void;
}

function AuthModalParentArea({
  question,
  answer,
  modalVisible,
  setModalVisible,
}: AuthModalParentAreaProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [borderColor, setBorderColor] = useState(colors.title);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const navigation = useNavigation<RootStackScreenProps<'ParentArea'>['navigation']>();
  const { profileId } = useUser();

  const handleCloseModal = () => {
    setModalVisible(false);
    navigation.navigate('Tabs', {
      screen: 'Home',
      params: { profileId: profileId, returnToParentArea: true },
    });
  };

  useEffect(() => {
    if (userAnswer !== '') {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      const timeout = setTimeout(() => {
        if (userAnswer === answer) {
          setBorderColor(colors.greenLight);
          setTimeout(() => {
            setModalVisible(true);
          }, 1000);
        } else {
          setBorderColor(colors.redLight);
        }
      }, 1000);

      setDebounceTimeout(timeout);
    }

    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [userAnswer]);

  useEffect(() => {
    if (modalVisible) {
      setUserAnswer('');
      setBorderColor(colors.title);
    }
  }, [modalVisible]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}
    >
      <TouchableWithoutFeedback onPress={handleCloseModal}>
        <Container>
          <TouchableWithoutFeedback>
            <View>
              <ModalContainer>
                <ModalText>{question}</ModalText>
                <ModalInput
                  value={userAnswer}
                  onChangeText={setUserAnswer}
                  keyboardType="numeric"
                  style={{ borderColor: borderColor, borderWidth: 2 }}
                />
              </ModalContainer>
            </View>
          </TouchableWithoutFeedback>
        </Container>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default AuthModalParentArea;
