import colors from '@/styles/colors';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const HeaderWrapper = styled.View`
  flex-direction: row;
  background-color: ${colors.gray};
  width: 100%;
  border-radius: 0 0 16px 16px;
  padding: ${Platform.OS === 'ios' ? '16px' : '24px 16px'};
  justify-content: space-between;
  align-items: center;
`;
