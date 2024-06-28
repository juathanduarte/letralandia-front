import colors from '@/styles/colors';
import fonts from '@/styles/fonts';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: ${Platform.OS === 'ios' ? '16px' : '24px 16px'};
`;

export const WelcomeTextContainer = styled.View``;

export const WelcomeText = styled.Text`
  font-size: 24px;
  color: ${colors.title};
  font-family: ${fonts.text_bold};
`;

export const BodyWrapper = styled.ScrollView`
  flex: 1;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
