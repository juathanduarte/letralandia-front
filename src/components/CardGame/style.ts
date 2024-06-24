import colors from '@/styles/colors';
import fonts from '@/styles/fonts';
import styled from 'styled-components/native';

interface CardProps {
  backgroundColor?: string;
  borderColor?: string;
  width?: number;
  emoji?: string;
}

export const Card = styled.TouchableOpacity<CardProps>`
  width: 100%;
  height: 120px;
  border-radius: 16px;
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) => (props.borderColor ? `10px solid ${props.borderColor}` : 'none')};
  padding: ${(props) => (props.emoji ? '20px' : '0')};
  flex-direction: ${(props) => (props.emoji ? 'row' : 'column')};
  justify-content: ${(props) => (props.emoji ? 'space-between' : 'center')};
  align-items: center;
  gap: ${(props) => (props.emoji ? '20px' : '0')};
`;

export const Title = styled.Text`
  font-family: ${fonts.text_bold};
  font-size: 32px;
  color: ${colors.title};
  max-width: 50%;
  text-align: center;
  line-height: 36px;
`;

export const Emoji = styled.Text`
  font-size: 58px;
`;

export const Body = styled.View`
  align-items: center;
  justify-content: center;
  max-width: 50%;
  flex: 1;
`;

export const ContainerRectangle = styled.View`
  flex-direction: row;
`;

export const Rectangle = styled.View<CardProps>`
  width: 30px;
  height: 30px;
  background-color: ${(props) => {
    if (props.backgroundColor === colors.blue) return colors.blueLight;
    if (props.backgroundColor === colors.yellow) return colors.yellowLight;
    if (props.backgroundColor === colors.pink) return colors.pinkLight;
  }};
  border-radius: 8px;
  margin: 0 2px;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
`;

export const Letter = styled.Text`
  font-family: ${fonts.text_extra_bold};
  font-size: 16px;
  color: ${colors.title};
`;
