import Button from '@/components/Button/Button';
import colors from '@/styles/colors';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Footer, ForgotPassword, Input, Text, WrapperRow } from './style';

export function Login() {
  const handleRegister = () => {
    console.log('Register');
  };

  return (
    <Container>
      <Input placeholder="Usuário" />

      <Input placeholder="Senha" secureTextEntry={true} />

      <ForgotPassword>
        <Text color={colors.greenLight}>Esqueceu sua senha?</Text>
      </ForgotPassword>

      <Button variant="primary" size="large" label="Entrar" />

      <WrapperRow>
        <Text>Não possui conta?</Text>
        <TouchableOpacity onPress={handleRegister}>
          <Text color={colors.greenLight}>Cadastre-se</Text>
        </TouchableOpacity>
      </WrapperRow>

      <Footer>
        <Text>Direitos Reservados - Juathan Coelho Duarte © 2024</Text>
      </Footer>
    </Container>
  );
}
