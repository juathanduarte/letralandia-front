import { useAuth } from '@/contexts/AuthContext';
import { updateProfile } from '@/services/profile';
import { playAudio } from '@/utils/playAudio';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-native';
import Button from '../../../../../components/Button/Button';
import Input from '../../../../../components/Input/Input';
import { Container, ContainerBody, ContainerFooter } from './style';

interface ProfileModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  profileId: string;
  fetchProfileDetails: () => void;
  gender: string;
}

function ProfileModal({
  modalVisible,
  setModalVisible,
  profileId,
  fetchProfileDetails,
  gender,
}: ProfileModalProps) {
  const [newName, setNewName] = useState('');
  const [errorName, setErrorName] = useState('');
  const { state } = useAuth();
  const userId = state.userId;

  useEffect(() => {
    if (modalVisible) {
      playAudio(gender, 'editando_nome');
    }
  }, [modalVisible]);

  const validateName = (text) => {
    if (text.trim() === '') {
      setErrorName('O nome não pode ser vazio.');
      return false;
    } else {
      setErrorName('');
      return true;
    }
  };

  const resetFields = () => {
    setNewName('');
    setErrorName('');
  };

  const handleCancel = () => {
    resetFields();
    setModalVisible(false);
  };

  const handleSave = async () => {
    const isNameValid = validateName(newName);
    if (isNameValid) {
      const data = await updateProfile(userId, profileId, { name: newName });
      if (data) {
        resetFields();
        setModalVisible(false);
        fetchProfileDetails();
      }
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
          <ContainerFooter>
            <Button variant="secondary" label="Cancelar" onClick={handleCancel} />
            <Button variant="primary" label="Salvar" onClick={handleSave} />
          </ContainerFooter>
        </ContainerBody>
      </Container>
    </Modal>
  );
}

export default ProfileModal;
