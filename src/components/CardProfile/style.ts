import colors from '@/styles/colors';
import fonts from '@/styles/fonts';
import styled from 'styled-components/native';

interface CardProps {
  backgroundColor: string;
}

export const Card = styled.TouchableOpacity<CardProps>`
  background-color: ${(props) => props.backgroundColor};
  padding: 20px;
  width: 100%;
  height: 70px;
  flex-direction: row;
  align-items: center;
  border-radius: 16px;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

export const Name = styled.Text`
  flex: 1;
  font-size: 20px;
  color: ${colors.title};
  font-family: ${fonts.text_light};
  text-align: center;
`;
