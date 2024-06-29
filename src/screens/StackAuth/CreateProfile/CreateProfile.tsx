import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import Input from '@/components/Input/Input';
import { useAuth } from '@/contexts/AuthContext';
import { createProfile } from '@/services/profile';
import colors from '@/styles/colors';

import vectorSelectProfile from '../../../../assets/vectors/vectorSelectProfile.png';
import {
  ButtonWrapper,
  Container,
  ContainerWrapper,
  GenderButton,
  GenderButtonWrapper,
  HeaderWrapper,
  InfoWrapper,
  LogoImage,
  Title,
  TitleWrapper,
} from './style';

export function CreateProfile() {
  const navigation = useNavigation();
  const { state } = useAuth();
  const userId = state.userId;
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const [error, setError] = useState('');
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOpen(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const validateInput = () => {
    if (!name.trim()) {
      setError('Campo obrigatório');
      return false;
    }
    setError('');
    return true;
  };

  const handleCreateProfile = async () => {
    if (validateInput()) {
      const profileData = {
        name,
        gender,
      };

      try {
        const data = await createProfile(userId, profileData);
        if (data && data.id && data.userId && data.name === name && data.gender === gender) {
          navigation.navigate('SelectProfile', { reload: new Date().getTime() });
        } else {
          setError('Erro ao criar o perfil. Por favor, tente novamente.');
        }
      } catch (error) {
        console.error('Erro ao criar perfil:', error);
        setError('Erro ao conectar ao serviço. Por favor, tente novamente.');
      }
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getButtonColor = (buttonGender) => {
    return gender === buttonGender
      ? buttonGender === 'male'
        ? colors.blue
        : colors.pink
      : buttonGender === 'male'
        ? colors.blueLight
        : colors.pinkLight;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Container>
          <ContainerWrapper>
            <HeaderWrapper>
              <TouchableOpacity onPress={handleGoBack}>
                <Icon icon="arrow-left" size={24} color={colors.title} lib="FontAwesome" />
              </TouchableOpacity>
            </HeaderWrapper>
            <TitleWrapper>
              <LogoImage source={vectorSelectProfile} resizeMode="contain" />
              <Title>Qual é seu nome?</Title>
            </TitleWrapper>
            <InfoWrapper>
              <Input
                variant={'login'}
                label="Digite o seu nome"
                iconSize={20}
                error={error}
                value={name}
                onChange={(text) => setName(text)}
              />
              <GenderButtonWrapper>
                <GenderButton onPress={() => setGender('male')} color={getButtonColor('male')}>
                  <Icon icon="male" size={24} color="white" lib="IonIcons" />
                </GenderButton>
                <GenderButton onPress={() => setGender('female')} color={getButtonColor('female')}>
                  <Icon icon="female" size={24} color="white" lib="IonIcons" />
                </GenderButton>
              </GenderButtonWrapper>
            </InfoWrapper>
            <ButtonWrapper>
              <Button
                variant="primary"
                size="large"
                label="Salvar e continuar"
                onClick={handleCreateProfile}
              />
            </ButtonWrapper>
          </ContainerWrapper>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
