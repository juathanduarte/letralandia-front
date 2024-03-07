import React from 'react';
import { ActivityIndicator } from 'react-native';
import { ButtonContainer, ButtonIcon, ButtonLabel } from './style';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'small' | 'medium' | 'large';
  label?: string;
  icon?: any;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  success?: boolean;
  failed?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  label,
  icon,
  onClick,
  disabled,
  isLoading,
  success,
  failed,
}) => {
  return (
    <ButtonContainer
      variant={variant}
      size={size}
      onPress={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <>
          {icon && <ButtonIcon source={icon} />}
          <ButtonLabel>{label}</ButtonLabel>
        </>
      )}
    </ButtonContainer>
  );
};

export default Button;
