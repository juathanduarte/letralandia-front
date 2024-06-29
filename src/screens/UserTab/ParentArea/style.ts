import colors from '@/styles/colors';
import fonts from '@/styles/fonts';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ContainerWrapper = styled.View`
  padding: ${Platform.OS === 'ios' ? '0px 16px' : '32px 16px'};
`;

export const WelcomeTextContainer = styled.View``;

export const WelcomeText = styled.Text`
  font-size: 24px;
  color: ${colors.title};
  font-family: ${fonts.text_bold};
`;

export const BodyWrapper = styled.ScrollView``;

export const MarginBottom = styled.View`
  padding-bottom: ${Platform.OS === 'ios' ? '90px' : '70px'};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
