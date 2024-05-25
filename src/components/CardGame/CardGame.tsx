import React from 'react';
import { Body, Card, ContainerRectangle, Emoji, Letter, Rectangle, Title } from './style';

interface CardGameProps {
  id: number;
  backgroundColor: string;
  borderColor?: string;
  title: string;
  emoji?: string;
  rating?: number;
  emojiName?: string;
  emojiViewName?: string;
  emojiSyllabes?: string[];
  onPress: () => void;
}

const CardGame: React.FC<CardGameProps> = ({
  id,
  backgroundColor,
  borderColor,
  title,
  rating,
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

  const getRating = (rating: number) => {
    // se for 1, retorne 1 emoji de estrela, se for 2, retorne 2, se for 3, retorne 3
    return Array.from({ length: rating }).map((_, index) => '⭐️');
  };

  return (
    <Card
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      onPress={onPress}
      emoji={emoji}
    >
      <Title>{title}</Title>
      <Title>{getRating(rating)}</Title>
      {emoji && (
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
      )}
    </Card>
  );
};

export { CardGame };
