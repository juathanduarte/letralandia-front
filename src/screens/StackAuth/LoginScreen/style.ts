import styled from 'styled-components/native';

interface TextProps {
  color?: string;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const Title = styled.Text`
  font-size: 24px;
  margin-bottom: 16px;
`;

export const Input = styled.TextInput`
  height: 40px;
  width: 100%;
  border-color: gray;
  border-width: 1px;
  margin-bottom: 12px;
  padding-left: 8px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  align-self: flex-end;
  margin-bottom: 12px;
`;

export const LoginButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

export const RegisterButtonText = styled.Text`
  color: blue;
  font-size: 16px;
`;

export const Footer = styled.View`
  position: absolute;
  bottom: 0;
  margin-bottom: 16px;
`;

export const Text = styled.Text<TextProps>`
  font-size: 14px;
  color: ${({ color }) => color || 'black'};
`;

export const WrapperRow = styled.View`
  align-self: center;
  flex-direction: row;
  gap: 4px;
`;
