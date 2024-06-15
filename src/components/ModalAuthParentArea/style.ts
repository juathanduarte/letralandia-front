import colors from '@/styles/colors';
import fonts from '@/styles/fonts';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled.View`
  flex-direction: row;
  width: 80%;
  background-color: white;
  border-radius: 16px;
  padding: 20px 30px;
  align-items: center;
  justify-content: space-between;
`;

export const ModalText = styled.Text`
  font-size: 32px;
  color: ${colors.title};
  font-family: ${fonts.text_bold};
  margin-bottom: 10px;
  text-align: center;
`;

export const ModalInput = styled.TextInput`
  background-color: ${colors.grayDark};
  padding: 5px;
  font-size: 32px;
  font-family: ${fonts.text_bold};
  text-align: center;
  min-width: 80px;
  min-height: 50px;
  border-radius: 5px;
`;
