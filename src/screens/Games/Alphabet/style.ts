import colors from '@/styles/colors';
import fonts from '@/styles/fonts';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ContainerWrapper = styled.View`
  flex: 1;
  padding: ${Platform.OS === 'ios' ? '0px' : '24px 0px 0px 0px'};
`;

export const HeaderWrapper = styled.View`
  flex-direction: row;
  background-color: ${colors.greenGame};
  width: 100%;
  height: ${Platform.OS === 'ios' ? '65px' : '85px'};
  border-radius: 0 0 16px 16px;
  padding: ${Platform.OS === 'ios' ? '0px 16px 16px 16px' : '24px 16px'};
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitleAuxWrapper = styled.View`
  width: 100%;
  height: auto;
  align-items: center;
`;

export const HeaderTitleWrapper = styled.View`
  border-radius: 24px;
  border: 1px solid ${colors.title};
  bottom: 30px;
  background-color: ${colors.greenGame};
`;

export const HeaderTitle = styled.Text`
  font-size: 22px;
  font-family: ${fonts.text_semi_bold};
  color: ${colors.title};
  padding: 8px;
`;

export const BodyWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ButtonWrapper = styled.View`
  flex: 1 1 30%;
  margin: 5px;
  height: 100px;
`;

export const CenteredView = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalView = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
`;

export const ModalText = styled.Text`
  font-size: 48px;
`;

export const ButtonLetter = styled.TouchableOpacity`
  background-color: ${colors.greenGameButton};
  border-radius: 16px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TextLetter = styled.Text`
  font-size: 24px;
  font-family: ${fonts.text_semi_bold};
  color: ${colors.white};
`;
