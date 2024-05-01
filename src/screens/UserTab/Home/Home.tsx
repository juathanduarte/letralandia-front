import { CardGame } from '@/components/CardGame/CardGame';
import Icon from '@/components/Icon/Icon';
import ProfileModal from '@/components/ModalProfile/ModalProfile';
import { useAuth } from '@/contexts/AuthContext';
import { getProfileDetails, logout } from '@/services/user';
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
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [profileDetails, setProfileDetails] = useState(null);

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

  useEffect(() => {
    Speech.speak('Bem-vindo ao aplicativo!', {
      language: 'pt-BR',
    });

    async function fetchProfileDetails() {
      try {
        const data = await getProfileDetails(userId, profileId);
        setProfileDetails(data);
      } catch (error) {
        console.error('Failed to fetch profile details:', error);
      }
    }

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
        onPress: () => deleteProfile(userId, profileId),
        style: 'destructive',
      },
    ]);
  };

  const deleteProfile = async (userId: any, profileId: any) => {
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
      {profileDetails === null && <Text>Carregando...</Text>}
      <WelcomeContainer>
        <ProfileModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          newName={newName}
          setNewName={setNewName}
          newEmail={newEmail}
          setNewEmail={setNewEmail}
        />
        <WelcomeTextContainer>
          <WelcomeText>Olá, {profileDetails?.name}!</WelcomeText>
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
