import colors from '@/styles/colors';
import fonts from '@/styles/fonts';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const HeaderWrapper = styled.View`
  flex-direction: row;
  background-color: ${colors.gray};
  width: 100%;
  height: 65px;
  border-radius: 0 0 16px 16px;
  padding: ${Platform.OS === 'ios' ? '0px 16px 16px 16px' : '24px 16px'};
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitleAuxWrapper = styled.View`
  width: 100%;
  align-items: center;
`;

export const HeaderTitleWrapper = styled.View`
  border-radius: 24px;
  border: 1px solid ${colors.title};
  bottom: 30px;
  background-color: ${colors.gray};
`;

export const HeaderTitle = styled.Text`
  font-size: 22px;
  font-family: ${fonts.text_semi_bold};
  color: ${colors.title};
  padding: 8px;
`;

export const VerticalCenteringWrapper = styled.View`
  flex: 1;
  justify-content: center;
  padding: ${Platform.OS === 'ios' ? '16px' : '24px 16px'};
`;

export const BodyWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  bottom: 15px;
`;

export const ButtonWrapper = styled.View`
  flex: 1;
  margin: 5px;
  min-width: 100px;
`;
