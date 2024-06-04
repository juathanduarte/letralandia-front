import fonts from '@/styles/fonts';
import styled from 'styled-components/native';

interface ModalContainerProps {
  color?: string;
}

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
`;

export const ModalContainer = styled.View<ModalContainerProps>`
  width: 80%;
  background-color: ${({ color }) => color || 'white'};
  padding: 20px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
`;

export const IconContainer = styled.View`
  margin-right: 10px;
`;

export const ModalText = styled.Text`
  color: white;
  font-size: 16px;
  font-family: ${fonts.text_bold};
  text-align: center;
  flex: 1;
`;
