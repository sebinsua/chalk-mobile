import React, { ReactNode } from 'react';
import styled from 'styled-components/native';

import { FontAwesome } from '@expo/vector-icons';
import { Marquee as _Marquee } from './Marquee';

import { AvatarButton } from './AvatarButton';
import { LikeButton } from './LikeButton';

export type UserInterfaceProps = Readonly<{
  children: ReactNode;
}>;
export type MenuProps = Readonly<{
  children: ReactNode;
}>;

// TODO: Move into a Menu folder.
const Menu = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 200;
  margin-bottom: 45px;
  margin-right: 30px;
  justify-content: space-evenly;
`;

// TODO: Move into a Footer folder.
const Footer = styled.View`
  position: absolute;
  bottom: 0;
  padding: 30px;
`;
const Producer = styled.Text`
  font-weight: bold;
  color: white;
  box-shadow: 0px 0px 1px black;
`;
const AudioTitle = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;
const Icon = styled(FontAwesome)`
  box-shadow: 0px 0px 3px black;
  padding: 5px;
`;
const MarqueeContainer = styled.View`
  padding: 5px;
`;
const Marquee = styled(_Marquee)`
  font-weight: bold;
  color: white;
  box-shadow: 0px 0px 1px black;
`;

export const UserInterface = ({ children }: UserInterfaceProps) => (
  <>
    {children}
    <Footer>
      <Producer>@lioncoffeerecords</Producer>
      <AudioTitle>
        <Icon name="music" size={14} color={'white'} />
        <MarqueeContainer>
          <Marquee>
            Super long piece of text is long. The quick brown fox jumps over the
            lazy dog.
          </Marquee>
        </MarqueeContainer>
      </AudioTitle>
    </Footer>
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
