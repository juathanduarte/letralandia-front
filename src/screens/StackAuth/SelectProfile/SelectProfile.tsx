import Button from '@/components/Button/Button';
import CardProfile from '@/components/CardProfile/CardProfile';
import Icon from '@/components/Icon/Icon';
import { useAuth } from '@/contexts/AuthContext';
import { getProfiles } from '@/services/user';
import { RootStackScreenProps } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
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

import colors from '@/styles/colors';
import vectorSelectProfile from '../../../../assets/vectors/vectorSelectProfile.png';
import { removeAsyncStorage } from '@/utils/AsyncStorage';

export function SelectProfile({ route }) {
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
  }, [userId, route.params?.reload]);

  const handleCreateProfile = () => {
    navigation.navigate('CreateProfile');
  };

  const handleSelectProfile = (profileId: number) => {
    navigation.navigate('Tabs', {
      screen: 'Home',
      params: { profileId: profileId },
    });
  };

  const handleGoBack = async () => {
    await removeAsyncStorage({ key: 'accessToken' });
    navigation.navigate('Login');
  };

  return (
    <Container>
      <WrapperHeader>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon icon="arrow-left" size={24} color={colors.title} lib="FontAwesome" />
        </TouchableOpacity>
        <LogoImage source={vectorSelectProfile} resizeMode="contain" />
      </WrapperHeader>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.title}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      ) : (
        <>
          {profiles.length === 0 && <Text>Nenhum perfil registrado, crie um! 😀</Text>}
          {profiles.length > 0 && (
            <>
              <Title>Quem é você?</Title>
              <ScrollViewContainer>
                <WrapperCards>
                  <WrapperRow>
                    {error && <Text>{error}</Text>}
                    {profiles.map((profile) => (
                      <CardProfile
                        key={profile.id}
                        name={profile.name}
                        gender={profile.gender}
                        onClick={() => {
                          handleSelectProfile(profile.id);
                        }}
                      />
                    ))}
                  </WrapperRow>
                </WrapperCards>
              </ScrollViewContainer>
            </>
          )}
          <Button
            variant="primary"
            size="large"
            label="Novo perfil"
            onClick={handleCreateProfile}
          />
        </>
      )}
    </Container>
  );
}
