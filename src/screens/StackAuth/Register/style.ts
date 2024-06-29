import colors from '@/styles/colors';
import fonts from '@/styles/fonts';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  gap: 16px;
`;

export const ContainerWrapper = styled.View`
  flex: 1;
  padding: ${Platform.OS === 'ios' ? '0px 16px 16px 16px' : '24px 16px'};
`;

export const Title = styled.Text`
  font-size: 36px;
  font-family: ${fonts.text_bold};
  color: ${colors.title};
  margin-bottom: 16px;
`;

export const WrapperBody = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;

export const WrapperInputs = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;
