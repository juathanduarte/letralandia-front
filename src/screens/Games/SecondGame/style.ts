import Icon from '@/components/Icon/Icon';
import colors from '@/styles/colors';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

interface LetterProps {
  letter: string;
  font: string;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.blueBackground};
`;

export const HeaderWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  border-radius: 0 0 16px 16px;
  padding: ${Platform.OS === 'ios' ? '16px' : '24px 16px'};
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

export const ImageGame = styled.ImageBackground`
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
  justify-content: flex-end;
  align-items: flex-end;
`;
export const PlayButton = styled.TouchableOpacity`
  margin: 8px;
`;

export const PlayIcon = styled(Icon)`
  color: ${colors.white};
`;

export const LettersWrapper = styled.View`
  flex-direction: row;
  margin-top: 16px;
  gap: 8px;
`;

export const Options = styled.View<LetterProps>`
  flex: 1;
  height: 75px;
  background-color: ${(props) => (props.letter === ' ' ? colors.blue : colors.blueLight)};
  border-radius: 8px;
  justify-content: ${(props) => (props.font === 'Pacifico_400Regular' ? '' : 'center')};
`;

export const Letter = styled.Text<LetterProps>`
  width: 100%;
  font-size: ${(props) => (props.font === 'Pacifico_400Regular' ? '40px' : '48px')};
  color: ${colors.title};
  font-family: ${(props) => props.font};
  text-align: center;
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
  background-color: ${colors.blueLight};
  border-radius: 8px;
  justify-content: center;
`;
