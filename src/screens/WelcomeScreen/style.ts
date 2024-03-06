import colors from '@/styles/colors';
import fonts from '@/styles/fonts';
import { Dimensions, Image } from 'react-native';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ImageContainer = styled.View`
  width: ${width * 0.75}px;
  height: ${height * 0.75}px;
  align-items: center;
`;

export const LogoImage = styled(Image)`
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const LogoText = styled.Text`
  font-size: ${Math.min(width, height) * 0.1}px;
  font-family: ${fonts.text_extra_bold};
  color: ${colors.title};
  bottom: 100px;
`;
