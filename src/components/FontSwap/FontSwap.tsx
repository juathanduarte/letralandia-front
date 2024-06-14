import { useFont } from '@/contexts/FontContext';
import React, { useEffect, useState } from 'react';
import { Button, Container, CustomText } from './style';

type FontType = 'Nunito_700Bold' | 'Pacifico_400Regular';

interface FontSwapProps {
  color: string;
}

const getColorScheme = (color) => {
  const colorSchemes = {
    yellow: { main: 'yellow', light: 'yellowLight' },
    blue: { main: 'blue', light: 'blueLight' },
    pink: { main: 'pink', light: 'pinkLight' },
  };
  return colorSchemes[color] || { main: 'yellow', light: 'yellowLight' };
};

export function FontSwap({ color }: FontSwapProps) {
  const { setFont, setIsUpperCase } = useFont();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const texts = ['B', 'b', 'B', 'b'];
  const { main, light } = getColorScheme(color);

  const handleFontChange = (index: number) => {
    const font: FontType = index < 2 ? 'Nunito_700Bold' : 'Pacifico_400Regular';
    const isUpperCase = index % 2 === 0;
    setFont(font);
    setIsUpperCase(isUpperCase);
    setSelectedIndex(index);
  };

  useEffect(() => {
    setFont('Nunito_700Bold');
    setIsUpperCase(true);
    setSelectedIndex(0);
  }, [setFont, setIsUpperCase]);

  return (
    <Container>
      {texts.map((text, index) => (
        <Button
          key={index}
          onPress={() => handleFontChange(index)}
          isSelected={index === selectedIndex}
          mainColor={main}
          lightColor={light}
        >
          <CustomText isLastTwo={index >= texts.length - 2}>{text}</CustomText>
        </Button>
      ))}
    </Container>
  );
}
