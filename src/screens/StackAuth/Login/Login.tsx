import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { AuthActionTypes, useAuth } from '@/contexts/AuthContext';
import { login } from '@/services/user';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import letralandiaLogo from '../../../../assets/logos/letralandiaLogo.png';

import {
  Container,
  ImageContainer,
  LogoImage,
  Register,
  Text,
  WrapperBody,
  WrapperButtons,
  WrapperInputs,
} from './style';

export function Login() {
  const navigation = useNavigation();
  const { dispatch } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
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

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setEmailError('E-mail inválido.');
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError('Senha inválida.');
      return;
    }

    const user = { email, password };

    try {
      const data = await login(user);

      if (data.access_token && data.userId) {
        dispatch({
          type: AuthActionTypes.LOGIN_SUCCESS,
          payload: {
            accessToken: data.access_token,
            userId: data.userId,
          },
        });

        setEmailError('');
        setPasswordError('');

        navigation.navigate('SelectProfile');
      }
    } catch (error) {
      if (error.response?.data.message === 'E-mail não encontrado.') {
        setEmailError('E-mail não encontrado.');
      } else if (error.response?.data.message === 'Senha incorreta.') {
        setPasswordError('Senha incorreta.');
      } else {
        Alert.alert('Erro de autenticação', 'Ocorreu um erro inesperado. Tente novamente.');
      }
    }
  };

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePassword(password) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}$/;
    return re.test(password);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Container>
          <WrapperBody>
            <ImageContainer>
              <LogoImage source={letralandiaLogo} resizeMode="contain" />
            </ImageContainer>
            <WrapperInputs>
              <Input
                variant={'login'}
                iconInput="envelope"
                label="E-mail"
                iconSize={20}
                error={emailError}
                value={email}
                onChange={setEmail}
              />
              <Input
                variant={'password'}
                iconInput="lock"
                label="Senha"
                iconSize={20}
                error={passwordError}
                value={password}
                onChange={setPassword}
              />
            </WrapperInputs>
            <WrapperButtons>
              <Button variant="primary" size="large" label="Entrar" onClick={handleLogin} />
              <Register onPress={handleRegister}>
                <Text>Não possui conta?</Text>
                <Text style={{ fontWeight: 'bold' }}> Cadastre-se</Text>
                <Text>.</Text>
              </Register>
            </WrapperButtons>
          </WrapperBody>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
