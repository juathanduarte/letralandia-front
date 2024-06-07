import colors from '@/styles/colors';
import React, { useEffect } from 'react';
import { Modal } from 'react-native';
import Icon from '../Icon/Icon';
import { Container, IconContainer, ModalContainer, ModalText } from './style';

interface InfoModalProps {
  type: string;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

function InfoModal({ type, modalVisible, setModalVisible }: InfoModalProps) {
  let modalColor = colors.greenLight;
  let iconName = 'check-circle';

  if (type === 'error') {
    modalColor = colors.redLight;
    iconName = 'error';
  } else if (type === 'warning') {
    modalColor = colors.yellowLight;
    iconName = 'warning';
  }

  useEffect(() => {
    if (modalVisible) {
      const timeout = type !== 'success_end' ? 3500 : 4000;
      const timer = setTimeout(() => {
        setModalVisible(false);
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [modalVisible, setModalVisible, type]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <Container>
        <ModalContainer color={modalColor}>
          <IconContainer>
            {type === 'success' && (
              <Icon icon="check-circle" size={50} color={colors.green} lib="FontAwesome" />
            )}
            {type === 'error' && (
              <Icon icon="warning" size={50} color={colors.red} lib="FontAwesome" />
            )}
            {type === 'warning' && (
              <Icon icon="alert" size={50} color={colors.yellow} lib="IonIcons" />
            )}
            {type === 'success_end' && (
              <Icon icon="check-circle" size={50} color={colors.green} lib="FontAwesome" />
            )}
          </IconContainer>
          {type === 'success' && <ModalText>Você acertou!</ModalText>}
          {type === 'error' && <ModalText>Você errou!</ModalText>}
          {type === 'warning' && <ModalText>Algo deu errado!</ModalText>}
          {type === 'success_end' && (
            <ModalText>Parabéns! Você completou todas palavras desta fase!</ModalText>
          )}
        </ModalContainer>
      </Container>
    </Modal>
  );
}

export default InfoModal;
