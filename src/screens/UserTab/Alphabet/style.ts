import colors from '@/styles/colors';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: ${Platform.OS === 'ios' ? '16px' : '24px 16px'};
`;

export const HeaderWrapper = styled.View`
  flex-direction: row;
  color: ${colors.blueLight};
  width: 100%;
  border-radius: 16px;
`;

export const VerticalCenteringWrapper = styled.View`
  flex: 1;
  justify-content: center;
`;

export const BodyWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ButtonWrapper = styled.View`
  flex: 1;
  margin: 5px;
  min-width: 100px;
`;
