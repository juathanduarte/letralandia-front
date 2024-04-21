import colors from '@/styles/colors';
import React, { useEffect, useState } from 'react';
import { Avatar, Card, Name } from './style';

import avatarMenina1 from '../../assets/avatarMenina1.png';
import avatarMenina2 from '../../assets/avatarMenina2.png';
import avatarMenina3 from '../../assets/avatarMenina3.png';
import avatarMenina4 from '../../assets/avatarMenina4.png';
import avatarMenino1 from '../../assets/avatarMenino1.png';
import avatarMenino2 from '../../assets/avatarMenino2.png';
import avatarMenino3 from '../../assets/avatarMenino3.png';
import avatarMenino4 from '../../assets/avatarMenino4.png';

interface CardProps {
  name?: string;
  onClick?: () => void;
  disabled?: boolean;
  gender?: string;
}

const girlAvatars = [avatarMenina1, avatarMenina2, avatarMenina3, avatarMenina4];
const boyAvatars = [avatarMenino1, avatarMenino2, avatarMenino3, avatarMenino4];

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
