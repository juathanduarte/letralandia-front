import { CardGame } from '@/components/CardGame/CardGame';
import Icon from '@/components/Icon/Icon';
import { useAuth } from '@/contexts/AuthContext';
import ProfileModal from '@/screens/UserTab/Home/Components/ModalProfile/ModalProfile';
import { profileDetails } from '@/services/profile';
import { deleteProfile } from '@/services/profile/deleteProfile';
import { logout } from '@/services/user';
import colors from '@/styles/colors';
import { RootStackScreenProps } from '@/types/navigation';
import { removeAsyncStorage } from '@/utils/AsyncStorage';
import { useNavigation } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';
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
  const { profileId } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const games = [
    {
      id: 1,
      backgroundColor: colors.yellow,
      title: 'Jogo 1',
      emoji: '🐈',
      emojiName: 'GATO',
      emojiViewName: 'G TO',
    },
    {
      id: 2,
      backgroundColor: colors.blue,
      title: 'Jogo 2',
      emoji: '🐖',
      emojiName: 'PORCO',
      emojiViewName: '     ',
    },
    {
      id: 3,
      backgroundColor: colors.pink,
      title: 'Jogo 3',
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
    {
      id: 5,
      backgroundColor: colors.gray,
      title: 'Sílabas',
      emoji: '🆎',
    },
  ];

  const fetchProfileDetails = async () => {
    try {
      const data = await profileDetails(userId, profileId);
      setProfileData(data);
    } catch (error) {
      console.error('Failed to fetch profile details:', error);
    }
  };

  useEffect(() => {
    Speech.speak('Bem-vindo ao aplicativo!', {
      language: 'pt-BR',
    });

    fetchProfileDetails();
  }, [userId, profileId, route]);

  const confirmDelete = () => {
    const message = 'Tem certeza de que deseja excluir este perfil?';
    Speech.speak(message, {
      language: 'pt-BR',
    });

    Alert.alert('Excluir Perfil', message, [
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

  const handleDeleteProfile = async (userId: any, profileId: any) => {
    try {
      const data = await deleteProfile(userId, profileId);
      if (data !== null) navigation.navigate('SelectProfile', { reload: new Date().getTime() });
    } catch (error) {
      console.error('Failed to delete profile:', error);
    }
  };

  const handleLogout = () => {
    const data = logout();
    if (data !== null) {
      removeAsyncStorage({ key: 'accessToken' });
      navigation.navigate('Login');
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
      {profileData === null && <Text>Carregando...</Text>}
      <WelcomeContainer>
        <ProfileModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          profileId={profileId}
          fetchProfileDetails={fetchProfileDetails}
        />
        <WelcomeTextContainer>
          <WelcomeText>Olá, {profileData?.name}!</WelcomeText>
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
                    // TODO: implementar a navegação para a tela do jogo
                    console.log('CardGame pressed', game.id);
                  }}
                />
              ))}
            </WrapperRow>
          </WrapperCards>
        </ScrollViewContainer>
      </WelcomeContainer>
    </Container>
  );
}
