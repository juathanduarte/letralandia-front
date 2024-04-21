import Button from '@/components/Button/Button';
import CardProfile from '@/components/CardProfile/CardProfile';
import Icon from '@/components/Icon/Icon';
import { useAuth } from '@/contexts/AuthContext';
import { getProfiles } from '@/services/user';
import { RootStackScreenProps } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Container,
  LogoImage,
  ScrollViewContainer,
  Text,
  Title,
  WrapperCards,
  WrapperHeader,
  WrapperRow,
} from './style';

import vectorSelectProfile from '../../../assets/vectorSelectProfile.png';

export function SelectProfile() {
  const navigation = useNavigation<RootStackScreenProps<'SelectProfile'>['navigation']>();
  const { state } = useAuth();
  const userId = state.userId;
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProfiles() {
      if (!userId) return;

      setLoading(true);
      try {
        const fetchedProfiles = await getProfiles(userId);
        setProfiles(fetchedProfiles);
      } catch (err) {
        setError('Failed to load profiles');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfiles();
  }, [userId]);

  const handleCreateProfile = () => {
    navigation.navigate('CreateProfile');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <WrapperHeader>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon icon="arrow-left" size={24} color="black" lib="FontAwesome" />
        </TouchableOpacity>
        <LogoImage source={vectorSelectProfile} resizeMode="contain" />
      </WrapperHeader>
      {profiles.length === 0 && <Text>Nenhum perfil registrado, crie um! 😀</Text>}
      {profiles.length > 0 && (
        <>
          <Title>Quem é você?</Title>
          <ScrollViewContainer>
            <WrapperCards>
              <WrapperRow>
                {error && <Text>{error}</Text>}
                {profiles.map((profile) => (
                  <CardProfile key={profile.id} name={profile.name} gender={profile.gender} />
                ))}
              </WrapperRow>
            </WrapperCards>
          </ScrollViewContainer>
        </>
      )}
      <Button variant="primary" size="large" label="Novo perfil" onClick={handleCreateProfile} />
    </Container>
  );
}
