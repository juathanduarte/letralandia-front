import Button from '@/components/Button/Button';
import CardProfile from '@/components/CardProfile/CardProfile';
import Icon from '@/components/Icon/Icon';
import { useAuth } from '@/contexts/AuthContext';
import { getProfiles } from '@/services/user';
import { RootStackScreenProps } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import avatarMenina1 from '../../../assets/avatarMenina1.png';
import avatarMenina2 from '../../../assets/avatarMenina2.png';
import avatarMenina3 from '../../../assets/avatarMenina3.png';
import avatarMenina4 from '../../../assets/avatarMenina4.png';
import avatarMenino1 from '../../../assets/avatarMenino1.png';
import avatarMenino2 from '../../../assets/avatarMenino2.png';
import avatarMenino3 from '../../../assets/avatarMenino3.png';
import avatarMenino4 from '../../../assets/avatarMenino4.png';
import { Container, LogoImage, Title, WrapperBody, WrapperCards } from './style';

import vectorSelectProfile from '../../../assets/vectorSelectProfile.png';

const girlAvatars = [avatarMenina1, avatarMenina2, avatarMenina3, avatarMenina4];
const boyAvatars = [avatarMenino1, avatarMenino2, avatarMenino3, avatarMenino4];

export function SelectProfile() {
  const navigation = useNavigation<RootStackScreenProps<'SelectProfile'>['navigation']>();
  const { state } = useAuth();
  const userId = state.userId;
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    async function fetchProfiles() {
      if (userId) {
        const profiles = await getProfiles(userId);
        setProfiles(profiles);
      }
    }

    fetchProfiles();
  }, []);

  const handleCreateProfile = () => {
    navigation.navigate('CreateProfile');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <TouchableOpacity onPress={handleGoBack}>
        <Icon icon="arrow-left" size={24} color="black" lib="FontAwesome" />
      </TouchableOpacity>
      <WrapperBody>
        <LogoImage source={vectorSelectProfile} resizeMode="contain" />
        <Title>Quem é você?</Title>
        <WrapperCards>
          {profiles.length === 0 && <Text>Nenhum perfil</Text>}
          {profiles.map((profile) => (
            <CardProfile
              key={profile.id}
              name={profile.name}
              icon={
                Math.random() < 0.5
                  ? girlAvatars[Math.floor(Math.random() * girlAvatars.length)]
                  : boyAvatars[Math.floor(Math.random() * boyAvatars.length)]
              }
            />
          ))}
        </WrapperCards>
        <Button variant="primary" size="large" label="Novo perfil" onClick={handleCreateProfile} />
      </WrapperBody>
    </Container>
  );
}
