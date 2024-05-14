import { useFont } from '@/contexts/FontContext';
import React, { useState } from 'react';
import { Button, Container, CustomText } from './style';

type FontType = 'Nunito_700Bold' | 'DancingScript_700Bold';

export function FontSwap() {
  const { setFont } = useFont();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const texts = ['A', 'a', 'A', 'a'];

  const handleFontChange = (index: number) => {
    const font: FontType = index < 2 ? 'Nunito_700Bold' : 'DancingScript_700Bold';
    setFont(font);
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
