import colors from '@/styles/colors';
import fonts from '@/styles/fonts';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const HeaderWrapper = styled.View`
  flex-direction: row;
  background-color: ${colors.pinkLight};
  width: 100%;
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
  background-color: ${colors.pinkLight};
  border-radius: 24px;
  border: 1px solid ${colors.title};
  bottom: 15px;
  text-align: center;
  justify-content: center;
  width: 16%;
  padding: 2px;
`;

export const VerticalCenteringWrapper = styled.View`
  flex: 1;
  justify-content: center;
  padding: ${Platform.OS === 'ios' ? '16px' : '24px 16px'};
`;
