import colors from '@/styles/colors';
import styled from 'styled-components/native';

interface WrapperProps {
  error?: string;
}

export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const WrapperInput = styled.View<WrapperProps>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border: 1px solid ${(props) => (props.error ? colors.redLight : colors.gray)};
  border-radius: 16px;
  padding: 0 16px;
`;

export const WrapperIcon = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  gap: 15px;
  height: 100%;
`;

export const WrapperDefault = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 14px;
  color: ${colors.title};
  border: none;
`;

export const ErrorText = styled.Text`
  margin-bottom: 2px;
  color: ${colors.redLight};
  font-size: 12px;
`;
