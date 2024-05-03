import React from 'react';
import { Body, Card, ContainerRectangle, Emoji, Letter, Rectangle, Title } from './style';

interface CardGameProps {
  id: number;
  backgroundColor: string;
  title: string;
  emoji: string;
  emojiName?: string;
  emojiViewName?: string;
  emojiSyllabes?: string[];
  onPress: () => void;
}

const CardGame: React.FC<CardGameProps> = ({
  id,
  backgroundColor,
  title,
  emoji,
  emojiName = '',
  emojiViewName = '',
  emojiSyllabes = [],
  onPress,
}) => {
  const countLetters = (emojiName: string) => {
    return emojiName.length;
  };

  const lettersArray = Array.from(emojiViewName);

  return (
    <Card backgroundColor={backgroundColor} onPress={onPress}>
      <Title>{title}</Title>
      <Body>
        <Emoji>{emoji}</Emoji>
        <ContainerRectangle>
          {emojiSyllabes.length > 0 &&
            emojiSyllabes.map((syllable, index) => (
              <Rectangle key={index} backgroundColor={backgroundColor}>
                <Letter>{syllable}</Letter>
              </Rectangle>
            ))}
          {emojiSyllabes.length === 0 &&
            Array.from({ length: countLetters(emojiName) }).map((_, index) => (
              <Rectangle key={index} backgroundColor={backgroundColor}>
                <Letter>{id !== 2 && lettersArray[index]}</Letter>
              </Rectangle>
            ))}
        </ContainerRectangle>
      </Body>
    </Card>
  );
};

export { CardGame };
