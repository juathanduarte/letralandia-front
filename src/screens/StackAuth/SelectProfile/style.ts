import fonts from '@/styles/fonts';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  padding: 16px;
  justify-content: space-between;
`;

export const WrapperHeader = styled.View`
  gap: 16px;
`;

export const LogoImage = styled.Image`
  width: ${width * 0.75}px;
  height: ${height * 0.3}px;
  width: 100%;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-family: ${fonts.text_bold};
  text-align: center;
`;

export const ScrollViewContainer = styled.View`
  height: ${height * 0.4}px;
  width: 100%;
`;

export const WrapperCards = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

export const WrapperRow = styled.View`
  gap: 16px;
`;

export const Text = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text_regular};
  text-align: center;
`;