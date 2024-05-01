import React, { useState } from 'react';
import { Modal } from 'react-native';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { Container, ContainerBody, ContainerFooter } from './style';

function ProfileModal({
  modalVisible,
  setModalVisible,
  newName,
  setNewName,
  newEmail,
  setNewEmail,
}) {
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const validateName = (text) => {
    if (text.trim() === '') {
      setErrorName('O nome não pode ser vazio.');
      return false;
    } else {
      setErrorName('');
      return true;
    }
  };

  const validateEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setErrorEmail('Por favor, insira um e-mail válido.');
      return false;
    } else {
      setErrorEmail('');
      return true;
    }
  };

  const resetFields = () => {
    setNewName('');
    setNewEmail('');
    setErrorEmail('');
    setErrorName('');
  };

  const handleCancel = () => {
    resetFields();
    setModalVisible(false);
  };

  const handleSave = () => {
    const isNameValid = validateName(newName);
    const isEmailValid = validateEmail(newEmail);
    if (isNameValid && isEmailValid) {
      // TODO: Implementar a lógica para salvar as alterações e fechar o modal
      setModalVisible(false);
    }
  };

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
        <ContainerBody>
          <Input
            variant={'login'}
            label="Edite seu nome"
            iconSize={20}
            iconInput={'user'}
            error={errorName}
            value={newName}
            onChange={(text) => {
              setNewName(text);
              validateName(text);
            }}
          />
          <Input
            variant={'login'}
            label="Edite seu e-mail"
            iconSize={20}
            iconInput={'envelope'}
            error={errorEmail}
            value={newEmail}
            onChange={(text) => {
              setNewEmail(text);
              validateEmail(text);
            }}
          />
          <ContainerFooter>
            <Button variant="primary" label="Salvar" onClick={handleSave} />
            <Button variant="secondary" label="Cancelar" onClick={handleCancel} />
          </ContainerFooter>
        </ContainerBody>
      </Container>
    </Modal>
  );
}

export default ProfileModal;
