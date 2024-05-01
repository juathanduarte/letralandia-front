import { AntDesign } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import IonIcons from '@expo/vector-icons/Ionicons';
import React from 'react';

type IconPropsBase = {
  size: number;
  color?: string;
};

type IconProps =
  | ({
      lib: 'IonIcons';
      icon: keyof typeof IonIcons.glyphMap;
    } & IconPropsBase)
  | ({
      lib: 'FontAwesome';
      icon: keyof typeof FontAwesome.glyphMap;
    } & IconPropsBase)
  | ({
      lib: 'AntDesign';
      icon: keyof typeof AntDesign.glyphMap;
    } & IconPropsBase);

const Libs = {
  IonIcons,
  FontAwesome,
  AntDesign,
};

export default function Icon({ icon, size, color = 'black', lib }: IconProps) {
  const Component = Libs[lib];
  // @ts-ignore
  return <Component name={icon} size={size} color={color} />;
}
