import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import Input from '@/components/Input/Input';
import { RegisterSchema, registerSchema } from '@/schemas';
import { RootStackScreenProps } from '@/types/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { Container, Title, WrapperBody, WrapperInputs } from './style';
import colors from '@/styles/colors';

export function Register() {
  const navigation = useNavigation<RootStackScreenProps<'Register'>['navigation']>();

  const {
    handleSubmit,
    control,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<RegisterSchema>({
    defaultValues: {},
    mode: 'onSubmit',
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = () => {
    console.log('Register');
  };

  const handlePassword = () => {
    console.log('Password');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <TouchableOpacity onPress={handleGoBack}>
        <Icon icon="arrow-left" size={24} color={colors.title} lib="FontAwesome" />
      </TouchableOpacity>
      <Title>Cadastro</Title>
      <WrapperBody>
        <WrapperInputs>
          <Controller
            name="name"
            control={control}
            render={({
              field: { value = '', onChange },
              fieldState: { invalid, error, isDirty },
            }) => (
              <Input
                variant={'login'}
                iconInput="user"
                label="Nome completo"
                iconSize={20}
                error={error?.message === 'Required' ? 'Campo obrigatório' : error?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
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
                error={
                  error?.message === 'Required'
                    ? 'Campo obrigatório'
                    : error?.message === 'Required'
                      ? 'Campo obrigatório'
                      : error?.message === 'Required'
                        ? 'Campo obrigatório'
                        : error?.message
                }
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Controller
            name="passwordConfirmation"
            control={control}
            render={({
              field: { value = '', onChange },
              fieldState: { invalid, error, isDirty },
            }) => (
              <Input
                variant={'password'}
                iconInput="lock"
                label="Confirme sua senha"
                iconSize={20}
                error={error?.message === 'Required' ? 'Campo obrigatório' : error?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </WrapperInputs>

        <Button
          variant="primary"
          size="large"
          label="Cadastrar"
          onClick={handleSubmit(handleRegister)}
        />
      </WrapperBody>
    </Container>
  );
}
