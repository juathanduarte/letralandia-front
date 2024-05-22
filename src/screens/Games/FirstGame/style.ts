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

export const BodyGame = styled.View`
  flex: 1;
  justify-content: center;
`;

export const HeaderGame = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: column;
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

export const Options = styled.View<LetterProps>`
  flex: 1;
  height: 100px;
  background-color: ${(props) => (props.letter === ' ' ? colors.yellow : colors.yellowLight)};
  border-radius: 8px;
  justify-content: ${(props) => (props.font === 'Pacifico_400Regular' ? '' : 'center')};
`;

export const Letter = styled.Text<LetterProps>`
  width: 100%;
  font-size: ${(props) => (props.font === 'Pacifico_400Regular' ? '42px' : '58px')};
  color: ${colors.title};
  font-family: ${(props) => props.font};
  text-align: center;
`;

export const OptionsSelect = styled.TouchableOpacity<LetterProps>`
  height: 100px;
  width: 30%;
  background-color: ${colors.yellowLight};
  border-radius: 8px;
  justify-content: center;
  margin-bottom: 8px;
`;

export const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${colors.white};
`;

export const LettersGame = styled.View`
  padding: ${Platform.OS === 'ios' ? '16px' : '24px 16px'};
  gap: 8px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;
