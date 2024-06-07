import colors from '@/styles/colors';
import fonts from '@/styles/fonts';
import styled from 'styled-components/native';

interface ButtonProps {
  isSelected: boolean;
  mainColor: string;
  lightColor: string;
}

interface CustomTextProps {
  isLastTwo: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  gap: 8px;
`;

export const Button = styled.TouchableOpacity<ButtonProps>`
  background-color: ${({ isSelected, lightColor }) =>
    isSelected ? colors[lightColor] : '#f0f0f0'};
  border: 3px solid ${({ mainColor }) => colors[mainColor]};
  width: 45px;
  height: 45px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
`;

export const CustomText = styled.Text<CustomTextProps>`
  font-size: 18px;
  font-family: ${({ isLastTwo }) =>
    isLastTwo ? fonts.cursive_text_regular : fonts.text_extra_bold};
`;
