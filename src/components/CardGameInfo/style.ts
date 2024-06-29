import colors from '@/styles/colors';
import fonts from '@/styles/fonts';
import styled from 'styled-components/native';

interface CardContainerProps {
  backgroundColor: string;
  borderColor: string;
}

export const Container = styled.View``;

export const CardTitle = styled.Text`
  color: ${colors.title};
  font-family: ${fonts.text_bold};
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: bold;
`;

export const CardContainer = styled.View<CardContainerProps>`
  border: 4px solid ${(props) => props.borderColor};
  background-color: ${(props) => props.backgroundColor};
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 14px;
  flex-direction: row;
  gap: 8px;
  justify-content: space-between;
  flex-wrap: wrap;
  min-height: 280px;
`;

export const CardInfo = styled.View`
  flex: 1;
`;

export const CardTitleWrapper = styled.View`
  font-family: ${fonts.text_bold};
  background-color: ${colors.white};
  padding: 6px;
  border-radius: 4px;
  font-size: 18px;
  margin-bottom: 8px;
  align-items: center;
`;

export const TitleInfo = styled.Text`
  color: ${colors.title};
  font-family: ${fonts.text_bold};
  font-size: 18px;
`;

export const InfoTextWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const InfoText = styled.Text`
  color: ${colors.title};
  font-family: ${fonts.text_semi_bold};
  font-size: 16px;
  word-wrap: break-word;
`;

export const ChartWrapper = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const CardInfoNoInfo = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ErrorTextWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ErrorText = styled.Text`
  color: ${colors.title};
  font-family: ${fonts.text_semi_bold};
  font-size: 16px;
`;
