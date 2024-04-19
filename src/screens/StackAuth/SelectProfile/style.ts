import fonts from '@/styles/fonts';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

interface TextProps {
  color?: string;
}

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-family: ${fonts.text_bold};
`;

export const WrapperBody = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 52px;
`;

export const WrapperCards = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const LogoImage = styled.Image`
  width: ${width * 0.75}px;
  height: ${height * 0.3}px;
  align-items: center;
`;
