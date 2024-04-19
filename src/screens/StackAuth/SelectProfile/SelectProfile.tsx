import Button from '@/components/Button/Button';
import { RootStackScreenProps } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import vectorSelectProfile from '../../../assets/vectorSelectProfile.png';
import { Container, LogoImage, Title, WrapperBody } from './style';

import avatarMenina1 from '../../../assets/avatarMenina1.png';
import avatarMenina2 from '../../../assets/avatarMenina2.png';
import avatarMenina3 from '../../../assets/avatarMenina3.png';
import avatarMenina4 from '../../../assets/avatarMenina4.png';
import avatarMenino1 from '../../../assets/avatarMenino1.png';
import avatarMenino2 from '../../../assets/avatarMenino2.png';
import avatarMenino3 from '../../../assets/avatarMenino3.png';
import avatarMenino4 from '../../../assets/avatarMenino4.png';

const girlAvatars = [avatarMenina1, avatarMenina2, avatarMenina3, avatarMenina4];
const boyAvatars = [avatarMenino1, avatarMenino2, avatarMenino3, avatarMenino4];

export function SelectProfile() {
  const navigation = useNavigation<RootStackScreenProps<'SelectProfile'>['navigation']>();

  const handleCreateProfile = async () => {
    console.log('CreateProfile');
    navigation.navigate('CreateProfile');
  };

  return (
    <Container>
      <WrapperBody>
        <LogoImage source={vectorSelectProfile} resizeMode="contain" />

        <Title>Quem é você?</Title>
        {/* <WrapperCards>
          {[...Array(5)].map((_, index) => (
            <CardProfile
              key={index}
              name="Lorem Ipsum"
              icon={
                Math.random() < 0.5
                  ? girlAvatars[Math.floor(Math.random() * girlAvatars.length)]
                  : boyAvatars[Math.floor(Math.random() * boyAvatars.length)]
              }
            />
          ))}
        </WrapperCards> */}
        <Button variant="primary" size="large" label="Novo perfil" onClick={handleCreateProfile} />
      </WrapperBody>
    </Container>
  );
}
