import colors from '@/styles/colors';
import fonts from '@/styles/fonts';
import styled, { css } from 'styled-components/native';

interface ButtonContainerProps {
  variant: string;
  size: string;
}

export const ButtonContainer = styled.TouchableOpacity<ButtonContainerProps>`
  ${(props) => getButtonVariant(props.variant)}
  ${(props) => getButtonSize(props.size)}
  ${(props) => getButtonBorder(props.size)}
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  width: ${(props) =>
    props.size === 'large'
      ? '100%'
      : props.size === 'medium'
        ? '50%'
        : props.size === 'small'
          ? '30%'
          : 'auto'};
`;

export const ButtonLabel = styled.Text`
  color: #fff;
  font-size: 20px;
  font-family: ${fonts.text_semi_bold};
`;

export const ButtonIcon = styled.Image`
  // Add styles for your icon here if needed
`;

const getButtonVariant = (variant: string) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${colors.title};
      `;
    case 'secondary':
      return css`
        background-color: ${colors.redLight};
      `;
    default:
      return css`
        background-color: #3498db;
      `;
  }
};

const getButtonSize = (size: string) => {
  switch (size) {
    case 'small':
      return css`
        padding: 8px;
      `;
    case 'medium':
      return css`
        padding: 12px;
      `;
    case 'large':
      return css`
        padding: 16px;
      `;
    default:
      return css`
        padding: 12px;
      `;
  }
};

const getButtonBorder = (size: string) => {
  switch (size) {
    case 'small':
      return css`
        border-radius: 12px;
      `;
    case 'medium':
      return css`
        border-radius: 16px;
      `;
    case 'large':
      return css`
        border-radius: 24px;
      `;
    default:
      return css`
        border-radius: 16px;
      `;
  }
};
