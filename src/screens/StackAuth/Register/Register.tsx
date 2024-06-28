import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import Input from '@/components/Input/Input';
import { register } from '@/services/user';
import colors from '@/styles/colors';
import { RootStackScreenProps } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Container, Title, WrapperBody, WrapperInputs } from './style';

export function Register() {
  const navigation = useNavigation<RootStackScreenProps<'Register'>['navigation']>();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password2Error, setPassword2Error] = useState('');
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

  const handleRegister = async () => {
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isPassword2Valid = validatePassword2(password2);

    const user = { name, email, password };

    if (isNameValid && isEmailValid && isPasswordValid && isPassword2Valid) {
      try {
        const data = await register(user);
        if (data) {
          Alert.alert('Cadastro realizado com sucesso!');
          navigation.navigate('Login');
        }
      } catch (error) {
        Alert.alert(
          'Erro no cadastro',
          error.response?.data?.message || 'Ocorreu um erro inesperado.'
        );
      }
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const validateName = (text: string) => {
    if (text.trim() === '') {
      setNameError('O nome não pode ser vazio.');
      return false;
    } else {
      setNameError('');
      return true;
    }
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    const data = re.test(email);
    if (!data) {
      setEmailError('E-mail inválido.');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}$/;
    const data = re.test(password);
    if (password.trim() === '') {
      setPasswordError('A senha não pode ser vazia.');
      return false;
    } else if (!data) {
      setPasswordError(
        'A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'
      );
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const validatePassword2 = (password: string) => {
    if (password !== password2) {
      setPassword2Error('As senhas não coincidem.');
      return false;
    } else if (password2.trim() === '') {
      setPassword2Error('A senha não pode ser vazia.');
      return false;
    } else {
      setPassword2Error('');
      return true;
    }
  };

  const handleNameChange = (text: string) => {
    setName(text);
    if (text.trim() !== '') {
      setNameError('');
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    const re = /\S+@\S+\.\S+/;
    if (re.test(text)) {
      setEmailError('');
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}$/;
    if (re.test(text)) {
      setPasswordError('');
    }
  };

  const handlePassword2Change = (text: string) => {
    setPassword2(text);
    if (text === password) {
      setPassword2Error('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Container>
          <TouchableOpacity onPress={handleGoBack}>
            <Icon icon="arrow-left" size={24} color={colors.title} lib="FontAwesome" />
          </TouchableOpacity>
          <Title>Cadastro</Title>
          <WrapperBody>
            <WrapperInputs>
              <Input
                variant={'login'}
                iconInput="user"
                label="Nome"
                iconSize={20}
                error={nameError}
                value={name}
                onChange={handleNameChange}
              />
              <Input
                variant={'login'}
                iconInput="envelope"
                label="E-mail"
                iconSize={20}
                error={emailError}
                value={email}
                onChange={handleEmailChange}
              />
              <Input
                variant={'password'}
                iconInput="lock"
                label="Senha"
                iconSize={20}
                error={passwordError}
                errorPassword={
                  passwordError ===
                    'A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.' &&
                  passwordError
                }
                value={password}
                onChange={handlePasswordChange}
              />
              <Input
                variant={'password'}
                iconInput="lock"
                label="Confirme sua senha"
                iconSize={20}
                error={password2Error}
                value={password2}
                onChange={handlePassword2Change}
              />
            </WrapperInputs>
            <Button variant="primary" size="large" label="Cadastrar" onClick={handleRegister} />
          </WrapperBody>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
