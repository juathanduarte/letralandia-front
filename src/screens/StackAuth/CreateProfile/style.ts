import fonts from '@/styles/fonts';
import { Dimensions, Platform } from 'react-native';
import styled from 'styled-components/native';

interface TextProps {
  color?: string;
}

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  padding: ${Platform.OS === 'ios' ? '16px' : '24px 16px'};
  justify-content: space-between;
`;

export const LogoImage = styled.Image`
  width: ${width * 0.75}px;
  height: ${height * 0.3}px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
export const Title = styled.Text`
  font-size: 32px;
  font-family: ${fonts.text_bold};
  text-align: center;
`;

export const WrapperInfo = styled.View``;

export const GenderButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

export const GenderButton = styled.TouchableOpacity<TextProps>`
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.color};
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  margin: 10px;
`;
