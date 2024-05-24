import colors from '@/styles/colors';
import fonts from '@/styles/fonts';
import { Dimensions, Platform } from 'react-native';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  padding: ${Platform.OS === 'ios' ? '16px' : '24px 16px'};
  /* gap: 32px; */
`;

export const WelcomeContainer = styled.View`
  flex-direction: column;
`;

export const WelcomeText = styled.Text`
  font-size: 32px;
  color: ${colors.title};
  font-family: ${fonts.text_bold};
`;

export const WelcomeTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const WelcomeButtonsContainer = styled.View`
  flex-direction: row;
  gap: 16px;
`;

export const WelcomeDescription = styled.Text`
  font-size: 16px;
  color: ${colors.title};
  font-family: ${fonts.text_extra_light};
`;

export const ScrollViewContainer = styled.View`
  margin-top: 16px;
  height: ${height * 0.75}px;
  width: 100%;
`;

export const WrapperCards = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

export const WrapperRow = styled.View`
  gap: 16px;
`;
