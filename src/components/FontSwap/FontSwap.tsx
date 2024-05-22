import { useFont } from '@/contexts/FontContext';
import React, { useState } from 'react';
import { Button, Container, CustomText } from './style';

type FontType = 'Nunito_700Bold' | 'Pacifico_400Regular';

export function FontSwap() {
  const { setFont, setIsUpperCase } = useFont();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const texts = ['B', 'b', 'B', 'b'];

  const handleFontChange = (index: number) => {
    const font: FontType = index < 2 ? 'Nunito_700Bold' : 'Pacifico_400Regular';
    const isUpperCase = index % 2 === 0;
    setFont(font);
    setIsUpperCase(isUpperCase);
    setSelectedIndex(index);
  };

  return (
    <Container>
      {texts.map((text, index) => (
        <Button
          key={index}
          onPress={() => handleFontChange(index)}
          isSelected={index === selectedIndex}
        >
          <CustomText isLastTwo={index >= texts.length - 2}>{text}</CustomText>
        </Button>
      ))}
    </Container>
  );
}
