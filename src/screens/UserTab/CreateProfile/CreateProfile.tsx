import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import vectorSelectProfile from '../../../assets/vectorSelectProfile.png';
import { Container, LogoImage, Title, WrapperBody } from './style';

// import { login } from '../../services/user';

import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileSchema, profileSchema } from '../../../schemas';

export function CreateProfile() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
  });

  // const { mutateAsync } = useMutation({
  //   // mutationFn: login,
  //   onError: (error) => {},
  //   onSuccess: (data) => {},
  // });

  const handleCreateProfile = async () => {
    console.log('CreateProfile');
    // navigation.navigate('Home' as never);

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
        <LogoImage source={vectorSelectProfile} resizeMode="contain" />

        <Title>Qual é seu nome?</Title>

        <Controller
          name="name"
          control={control}
          render={({
            field: { value = '', onChange },
            fieldState: { invalid, error, isDirty },
          }) => (
            <Input
              variant={'login'}
              label="Digite o seu nome"
              iconSize={20}
              error={error?.message === 'Required' ? 'Campo obrigatório' : error?.message}
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Button
          variant="primary"
          size="large"
          label="Salvar e continuar"
          onClick={handleSubmit(handleCreateProfile)}
        />
      </WrapperBody>
    </Container>
  );
}
