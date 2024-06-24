import { CardGame } from '@/components/CardGame/CardGame';
import Icon from '@/components/Icon/Icon';
import { useAuth } from '@/contexts/AuthContext';
import { useUser } from '@/contexts/UserContext';
import ProfileModal from '@/screens/UserTab/Home/Components/ModalProfile/ModalProfile';
import { profileDetails } from '@/services/profile';
import { deleteProfile } from '@/services/profile/deleteProfile';
import colors from '@/styles/colors';
import { RootStackScreenProps } from '@/types/navigation';
import { removeAsyncStorage } from '@/utils/AsyncStorage';
import { playAudio } from '@/utils/playAudio';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import {
  Container,
  ScrollViewContainer,
  WelcomeButtonsContainer,
  WelcomeContainer,
  WelcomeDescription,
  WelcomeText,
  WelcomeTextContainer,
  WrapperCards,
  WrapperRow,
} from './style';

export function Home({ route }) {
  const navigation = useNavigation<RootStackScreenProps<'Home'>['navigation']>();
  const { state } = useAuth();
  const userId = state.userId;
  const { profileId, returnToParentArea } = route.params;
  const { setProfileId } = useUser();

  const [modalVisible, setModalVisible] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const games = [
    {
      id: 1,
      backgroundColor: colors.yellow,
      title: 'Complete a palavra',
      emoji: '🐈',
      emojiName: 'GATO',
      emojiViewName: 'G TO',
    },
    {
      id: 2,
      backgroundColor: colors.blue,
      title: 'Formule a palavra',
      emoji: '☀️',
      emojiName: 'SOL',
      emojiViewName: '   ',
    },
    {
      id: 3,
      backgroundColor: colors.pink,
      title: 'Organize as sílabas',
      emoji: '🐸',
      emojiName: 'SAPO',
      emojiSyllables: ['SA', 'PO'],
    },
    {
      id: 4,
      backgroundColor: colors.gray,
      title: 'Alfabeto',
      emoji: '🆎',
    },
  ];

  useEffect(() => {
    setProfileId(profileId);
  }, [profileId, setProfileId]);

  const fetchProfileDetails = async () => {
    try {
      setLoading(true);
      const data = await profileDetails(userId, profileId);
      setProfileData(data);
    } catch (error) {
      console.error('Failed to fetch profile details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileDetails();
  }, [route]);

  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    if (profileData !== null && !returnToParentArea) {
      playAudio(profileData.gender, 'bem_vindo');
    }
  }, [profileData]);

  const confirmDelete = async () => {
    await playAudio(profileData.gender, 'excluindo_perfil');
    Alert.alert('Excluir Perfil', 'Tem certeza de que deseja excluir este perfil?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => handleDeleteProfile(userId, profileId),
        style: 'destructive',
      },
    ]);
  };

  const handleDeleteProfile = async (userId, profileId) => {
    try {
      const data = await deleteProfile(userId, profileId);
      if (data !== null) navigation.navigate('SelectProfile', { reload: new Date().getTime() });
    } catch (error) {
      console.error('Failed to delete profile:', error);
    }
  };

  const handleLogout = async () => {
    await removeAsyncStorage({ key: 'accessToken' });
    navigation.navigate('Login');
  };

  const handleSelectGame = (gameId: number) => {
    switch (gameId) {
      case 1:
        navigation.navigate('SelectPhaseFirstGame', {
          profileGender: profileData.gender,
          gameId: 1,
          profileId,
        });
        break;
      case 2:
        navigation.navigate('SelectPhaseSecondGame', {
          profileGender: profileData.gender,
          gameId: 2,
          profileId,
        });
        break;
      case 3:
        navigation.navigate('SelectPhaseThirdGame', {
          profileGender: profileData.gender,
          gameId: 3,
          profileId,
        });
        break;
      case 4:
        navigation.navigate('Alphabet', { profileGender: profileData.gender });
        break;
      default:
        break;
    }
  };

  const handleGoBack = () => {
    navigation.navigate('SelectProfile', { reload: new Date().getTime() });
  };

  return (
    <Container>
      <TouchableOpacity onPress={handleGoBack}>
        <Icon icon="arrow-left" size={24} color={colors.title} lib="FontAwesome" />
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.title}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      ) : (
        <WelcomeContainer>
          <ProfileModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            profileId={profileId}
            gender={profileData?.gender}
            fetchProfileDetails={fetchProfileDetails}
          />
          <WelcomeTextContainer>
            <WelcomeText numberOfLines={1}>Olá, {profileData?.name}!</WelcomeText>
            <WelcomeButtonsContainer>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Icon icon="pencil" size={24} color={colors.title} lib="FontAwesome" />
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDelete}>
                <Icon icon="trash" size={24} color={colors.title} lib="FontAwesome" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout}>
                <Icon icon="logout" size={24} color={colors.title} lib="AntDesign" />
              </TouchableOpacity>
            </WelcomeButtonsContainer>
          </WelcomeTextContainer>
          <WelcomeDescription>Vamos aprender brincando?</WelcomeDescription>
          <ScrollViewContainer>
            <WrapperCards>
              <WrapperRow>
                {games.map((game) => (
                  <CardGame
                    key={game.id}
                    id={game.id}
                    backgroundColor={game.backgroundColor}
                    title={game.title}
                    emoji={game.emoji}
                    emojiName={game.emojiName}
                    emojiViewName={game.emojiViewName}
                    emojiSyllabes={game.emojiSyllables}
                    onPress={() => {
                      handleSelectGame(game.id);
                    }}
                  />
                ))}
              </WrapperRow>
            </WrapperCards>
          </ScrollViewContainer>
        </WelcomeContainer>
      )}
    </Container>
  );
}
