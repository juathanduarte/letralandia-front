import colors from '@/styles/colors';
import React, { useEffect, useState } from 'react';
import { Avatar, Card, Name } from './style';

interface CardProps {
  name?: string;
  icon?: any;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const CardProfile: React.FC<CardProps> = ({ name, icon, onClick, isLoading }) => {
  const [cardColor, setCardColor] = useState(colors.blue);

  useEffect(() => {
    const getRandomColor = () => {
      const colorsArray = [colors.yellow, colors.blue, colors.pink];
      const randomIndex = Math.floor(Math.random() * colorsArray.length);
      return colorsArray[randomIndex];
    };

    setCardColor(getRandomColor());
  }, []);

  return (
    <>
      <Card backgroundColor={cardColor} onPress={onClick}>
        <Avatar source={icon} />
        <Name>{name}</Name>
      </Card>
    </>
  );
};

export default CardProfile;
