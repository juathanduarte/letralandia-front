import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

interface TextProps {
  color?: string;
}

const { width, height } = Dimensions.get('window');

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const Title = styled.Text`
  font-size: 24px;
  margin-bottom: 16px;
`;

export const WrapperInputs = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;

export const Register = styled.TouchableOpacity`
  flex-direction: row;
  align-self: center;
`;

export const LoginButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

export const RegisterButtonText = styled.Text`
  color: blue;
  font-size: 16px;
`;

export const Text = styled.Text<TextProps>`
  font-size: 14px;
  color: ${({ color }) => color || 'black'};
`;

export const WrapperBody = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const WrapperButtons = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const ImageContainer = styled.View`
  width: ${width * 0.75}px;
  height: ${height * 0.4}px;
  align-items: center;
`;

export const LogoImage = styled.Image`
  flex: 1;
  width: 100%;
  height: 100%;
`;
