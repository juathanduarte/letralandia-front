import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import letralandiaLogo from '../../../assets/letralandiaLogo.png';
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

import { AuthActionTypes, useAuth } from '@/contexts/AuthContext';
import { login } from '@/services/user';

export function Login() {
  const navigation = useNavigation();
  const { dispatch } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setEmailError('E-mail inválido.');
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError(
        'A senha deve conter pelo menos um número, uma letra maiúscula, uma minúscula, um caractere especial e ter no mínimo 8 caracteres.'
      );
      return;
    }

    const user = { email, password };

    const data = await login(user);

    if (data.access_token && data.userId) {
      dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: {
          accessToken: data.access_token,
          userId: data.userId,
        },
      });

      navigation.navigate('SelectProfile');
    }
  };

  // Validação de e-mail usando regex
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Validação de senha usando regex
  function validatePassword(password) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}$/;
    return re.test(password);
  }

  return (
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
  );
}
