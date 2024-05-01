import colors from '@/styles/colors';
import fonts from '@/styles/fonts';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 16px;
  gap: 32px;
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
