import colors from '@/styles/colors';
import fonts from '@/styles/fonts';
import { Dimensions, Platform } from 'react-native';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: space-between;
`;

export const ContainerWrapper = styled.View`
  padding: ${Platform.OS === 'ios' ? '0px 16px' : '36px 16px'};
`;

export const WelcomeContainer = styled.View`
  flex-direction: column;
`;

export const WelcomeText = styled.Text`
  font-size: 32px;
  color: ${colors.title};
  font-family: ${fonts.text_bold};
  flex: 1;
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

export const MarginBottom = styled.View`
  /* padding-bottom: ${Platform.OS === 'ios' ? '0px' : '70px'}; */
`;
