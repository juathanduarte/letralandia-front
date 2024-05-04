import colors from '@/styles/colors';
import fonts from '@/styles/fonts';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 32px 16px;
`;

export const Title = styled.Text`
  font-size: 36px;
  font-family: ${fonts.text_bold};
  color: ${colors.title};
  margin-bottom: 16px;
`;

export const WrapperBody = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;

export const WrapperInputs = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;
