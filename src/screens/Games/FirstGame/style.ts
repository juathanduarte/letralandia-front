import colors from '@/styles/colors';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

interface LetterProps {
  letter: string;
  font: string;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.yellowBackground};
`;

export const HeaderWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  border-radius: 0 0 16px 16px;
  padding: ${Platform.OS === 'ios' ? '16px' : '24px 16px'};
  justify-content: space-between;
  align-items: center;
`;

export const BodyGame = styled.View``;

export const HeaderGame = styled.View`
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

export const Emoji = styled.Text`
  font-size: 200px;
`;

export const LettersWrapper = styled.View`
  flex-direction: row;
  margin-top: 16px;
  gap: 8px;
`;

export const Letter = styled.Text<LetterProps>`
  font-size: 64px;
  color: ${colors.title};
  font-family: ${(props) => props.font};
`;

export const Options = styled.View<LetterProps>`
  width: 80px;
  height: 80px;
  background-color: ${(props) => (props.letter === ' ' ? colors.yellow : colors.yellowLight)};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${colors.white};
`;

export const LettersGame = styled.View``;
