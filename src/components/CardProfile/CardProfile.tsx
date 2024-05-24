import colors from '@/styles/colors';
import React, { useEffect, useState } from 'react';
import { Avatar, Card, Name } from './style';

import firstBoyAvatar from '../../../assets/avatares/firstBoyAvatar.png';
import firstGirlAvatar from '../../../assets/avatares/firstGirlAvatar.png';
import fourthBoyAvatar from '../../../assets/avatares/fourthBoyAvatar.png';
import fourthGirlAvatar from '../../../assets/avatares/fourthGirlAvatar.png';
import secondBoyAvatar from '../../../assets/avatares/secondBoyAvatar.png';
import secondGirlAvatar from '../../../assets/avatares/secondGirlAvatar.png';
import thirdBoyAvatar from '../../../assets/avatares/thirdBoyAvatar.png';
import thirdGirlAvatar from '../../../assets/avatares/thirdGirlAvatar.png';

interface CardProps {
  name?: string;
  onClick?: () => void;
  disabled?: boolean;
  gender?: string;
}

const girlAvatars = [firstGirlAvatar, secondGirlAvatar, thirdGirlAvatar, fourthGirlAvatar];
const boyAvatars = [firstBoyAvatar, secondBoyAvatar, thirdBoyAvatar, fourthBoyAvatar];

const CardProfile: React.FC<CardProps> = ({ name, onClick, gender }) => {
  const [cardColor, setCardColor] = useState<string>('');
  const [avatar, setAvatar] = useState<any>();

  useEffect(() => {
    const getGenderColor = () => {
      return gender === 'female' ? colors.pink : colors.blue;
    };

    const getRandomAvatar = () => {
      return gender === 'female'
        ? girlAvatars[Math.floor(Math.random() * girlAvatars.length)]
        : boyAvatars[Math.floor(Math.random() * boyAvatars.length)];
    };

    setCardColor(getGenderColor());
    setAvatar(getRandomAvatar());
  }, [gender]);

  return (
    <>
      <Card backgroundColor={cardColor} onPress={onClick}>
        <Avatar source={avatar} />
        <Name>{name}</Name>
      </Card>
    </>
  );
};

export default CardProfile;
