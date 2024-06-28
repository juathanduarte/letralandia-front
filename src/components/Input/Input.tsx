import Icon from '@/components/Icon/Icon';
import colors from '@/styles/colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ErrorText, TextInput, Wrapper, WrapperDefault, WrapperIcon, WrapperInput } from './style';

interface InputProps {
  variant?: 'login' | 'password';
  label: string;
  iconInput?: any;
  iconSize?: any;
  onChange?: (value: string) => void;
  value?: string;
  error?: string;
  errorPassword?: string;
  onblur?: () => void;
  defaultValue?: string;
  inputNumber?: boolean;
  disableEdit?: boolean;
  maxLength?: number;
}

export default function Input({
  variant,
  iconInput,
  label,
  iconSize,
  onChange,
  value,
  error,
  errorPassword,
  onblur,
  defaultValue,
  inputNumber,
  disableEdit,
  maxLength,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Wrapper>
      <WrapperInput error={error} errorPassword={errorPassword}>
        {iconInput && (
          <WrapperIcon>
            <Icon icon={iconInput} size={iconSize} color={colors.title} lib="FontAwesome" />
            <TextInput
              {...(maxLength && { maxLength })}
              editable={!disableEdit}
              onBlur={onblur}
              placeholder={label}
              secureTextEntry={variant === 'password' && !showPassword}
              placeholderTextColor={colors.title}
              onChangeText={(value) => {
                const onlyNumber = value.replace(/[^0-9]/g, '');
                onChange && onChange(inputNumber ? onlyNumber : value);
              }}
              defaultValue={defaultValue}
              keyboardType={inputNumber ? 'numeric' : 'default'}
            />
            {variant === 'password' && (
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={iconSize}
                  color={colors.title}
                />
              </TouchableOpacity>
            )}
          </WrapperIcon>
        )}

        {!iconInput && (
          <WrapperDefault>
            <TextInput
              editable={!disableEdit}
              onBlur={onblur}
              placeholder={label}
              placeholderTextColor={colors.title}
              onChangeText={(value) => {
                const onlyNumber = value.replace(/[^0-9]/g, '');
                onChange && onChange(inputNumber ? onlyNumber : value);
              }}
              defaultValue={defaultValue}
              keyboardType={inputNumber ? 'numeric' : 'default'}
            />
          </WrapperDefault>
        )}
        {error && <ErrorText>{error}</ErrorText>}
      </WrapperInput>
    </Wrapper>
  );
}
