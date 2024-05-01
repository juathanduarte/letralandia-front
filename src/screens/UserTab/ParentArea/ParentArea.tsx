import Icon from '@/components/Icon/Icon';
import colors from '@/styles/colors';
import { RootStackScreenProps } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Container } from './style';

export function ParentArea() {
  const navigation = useNavigation<RootStackScreenProps<'ParentArea'>['navigation']>();

  const handleGoBack = () => {
    navigation.navigate('SelectProfile', { reload: new Date().getTime() });
  };

  return (
    <Container>
      <TouchableOpacity onPress={handleGoBack}>
        <Icon icon="arrow-left" size={24} color={colors.title} lib="FontAwesome" />
      </TouchableOpacity>
      <Text>Área dos pais</Text>
    </Container>
  );
}
