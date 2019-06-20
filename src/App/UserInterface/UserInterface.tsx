import React, { ReactNode } from 'react';
import styled from 'styled-components/native';

import { TouchableHighlight, GestureResponderEvent } from 'react-native';
import { Avatar } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';

import { ImageSource } from '../Source';

export type UserInterfaceProps = {
  children: ReactNode;
};
export type MenuProps = {
  children: ReactNode;
};

const Menu = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 200;
  padding-right: 25;
  justify-content: space-evenly;
`;

export type AvatarButtonProps = Readonly<{
  source: ImageSource;
  onPress?: (event: GestureResponderEvent) => void;
}>;
const AvatarImage = styled(Avatar.Image)`
  box-shadow: 0px 0px 3px black;
`;
const AvatarButton = ({ source, onPress }: AvatarButtonProps) => (
  <TouchableHighlight onPress={onPress} underlayColor={'transparent'}>
    <AvatarImage size={48} source={source} />
  </TouchableHighlight>
);

export type LikeButtonProps = Readonly<{
  onPress?: (event: GestureResponderEvent) => void;
  selected?: boolean;
}>;
const Icon = styled(FontAwesome)`
  box-shadow: 0px 0px 3px black;
`;
const LikeButton = ({ onPress, selected = false }: LikeButtonProps) => (
  <TouchableHighlight onPress={onPress} underlayColor={'transparent'}>
    <Icon name="heart" size={48} color={selected ? 'red' : 'white'} />
  </TouchableHighlight>
);

export const UserInterface = ({ children }: UserInterfaceProps) => (
  <>
    {children}
    <Menu>
      <AvatarButton
        source={{
          type: 'image',
          uri:
            'https://scontent-lhr3-1.cdninstagram.com/vp/746ea09d5e5317fd64bb80b8ef913098/5DA0C6C0/t51.2885-19/s320x320/57468073_722917614825577_1521531394839281664_n.jpg?_nc_ht=scontent-lhr3-1.cdninstagram.com',
        }}
        onPress={() => console.log('pressed avatar')}
      />
      <LikeButton onPress={() => console.log('pressed like')} selected />
    </Menu>
  </>
);
