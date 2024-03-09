import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { RootStackScreenProps } from '@/types/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import letralandiaLogo from '../../../assets/letralandiaLogo.png';
import { LoginSchema, loginSchema } from '../../../schemas';
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
// import { login } from '../../services/user';

export function Login() {
  const navigation = useNavigation<RootStackScreenProps<'Login'>['navigation']>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  // const { mutateAsync } = useMutation({
  //   // mutationFn: login,
  //   onError: (error) => {},
  //   onSuccess: (data) => {},
  // });

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handlePassword = () => {
    console.log('Password');
  };

  const handleLogin = async () => {
    console.log('Login');
    navigation.navigate('SelectProfile');

    // const data = await mutateAsync({
    //   email: getValues('email'),
    //   password: getValues('password'),
    // });
    // await signIn(data.accessToken, data.refreshToken);
  };

  //TODO: Verificar o por que do erro não estar chegando com a message correta.

  return (
    <Container>
      <WrapperBody>
        <ImageContainer>
          <LogoImage source={letralandiaLogo} resizeMode="contain" />
        </ImageContainer>
        <WrapperInputs>
          <Controller
            name="user"
            control={control}
            render={({
              field: { value = '', onChange },
              fieldState: { invalid, error, isDirty },
            }) => (
              <Input
                variant={'login'}
                iconInput="user"
                label="Usuário"
                iconSize={20}
                error={error?.message === 'Required' ? 'Campo obrigatório' : error?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({
              field: { value = '', onChange },
              fieldState: { invalid, error, isDirty },
            }) => (
              <Input
                variant={'password'}
                iconInput="lock"
                label="Senha"
                iconSize={20}
                error={error?.message === 'Required' ? 'Campo obrigatório' : error?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </WrapperInputs>

        <WrapperButtons>
          <Button
            variant="primary"
            size="large"
            label="Entrar"
            onClick={handleSubmit(handleLogin)}
          />
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
