import colors from '@/styles/colors';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

interface LetterProps {
  letter: string;
  font: string;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.yellowBackground};
`;

export const HeaderWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  border-radius: 0 0 16px 16px;
  padding: ${Platform.OS === 'ios' ? '0px 16px 16px 16px' : '32px 16px 16px 16px'};
  justify-content: space-between;
  align-items: center;
`;

export const GameWrapper = styled.View`
  flex: 1;
  padding: 0 16px 16px;
`;

export const HeaderGame = styled.View`
  flex: 1;
`;

export const ImageGame = styled.Image`
  flex: 1;
  border-radius: 8px;
`;

export const LettersWrapper = styled.View`
  flex-direction: row;
  margin-top: 16px;
  gap: 8px;
`;

export const Options = styled.View<LetterProps>`
  flex: 1;
  height: 75px;
  background-color: ${(props) => (props.letter === ' ' ? colors.yellow : colors.yellowLight)};
  border-radius: 8px;
  justify-content: ${(props) => (props.font === 'Pacifico_400Regular' ? '' : 'center')};
`;

export const LetterContainer = styled.View`
  position: relative;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const Letter = styled.Text<LetterProps>`
  font-size: ${(props) => (props.font === 'Pacifico_400Regular' ? '40px' : '48px')};
  color: ${colors.title};
  font-family: ${(props) => props.font};
  text-align: center;
`;

export const PencilIcon = styled.View`
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

export const Separator = styled.View`
  width: 100%;
  height: 1px;
  margin: 16px 0;
  background-color: ${colors.white};
`;

export const LettersGame = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

export const OptionsSelect = styled.TouchableOpacity<LetterProps>`
  flex: 1;
  flex-basis: 30%;
  height: 70px;
  background-color: ${colors.yellowLight};
  border-radius: 8px;
  justify-content: center;
`;
