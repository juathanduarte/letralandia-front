import colors from '@/styles/colors';
import fonts from '@/styles/fonts';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const HeaderWrapper = styled.View`
  flex-direction: row;
  background-color: ${colors.yellow};
  width: 100%;
  height: 80px;
  border-radius: 0 0 16px 16px;
  padding: ${Platform.OS === 'ios' ? '16px' : '24px 16px'};
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitleWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-size: 22px;
  font-family: ${fonts.text_semi_bold};
  color: ${colors.title};
  background-color: ${colors.yellow};
  border-radius: 24px;
  border: 1px solid ${colors.title};
  bottom: 15px;
  text-align: center;
  justify-content: center;
  width: 16%;
  padding: 2px;
`;

export const BodyWrapper = styled.View`
  padding: 0px 16px;
  gap: 32px;
`;
