import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { LinearGradient as _GradientBackground } from 'expo-linear-gradient';

import {
  Footer,
  ProducerName,
  AudioTitle,
  Icon,
  MarqueeContainer,
  Marquee,
} from './Footer';
import { SideMenu, LogoButton, LikeButton } from './SideMenu';

import { AudioSource } from '../Source';
import { Producer } from '../Producer';

export type UserInterfaceProps = Readonly<{
  producer: Producer;
  audio?: AudioSource;
  isLiked?: boolean;
  children: ReactNode;
}>;

const GradientBackground = styled(_GradientBackground)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const UserInterface = ({
  producer,
  audio,
  isLiked = false,
  children,
}: UserInterfaceProps) => (
  <>
    <GradientBackground
      colors={[
        'transparent',
        'transparent',
        'transparent',
        'rgba(0, 0, 0, 0.8)',
      ]}
    />
    {children}
    <Footer>
      <ProducerName>{producer.username}</ProducerName>
      {audio && audio.title ? (
        <AudioTitle>
          <Icon name="music" size={14} color={'white'} />
          <MarqueeContainer>
            <Marquee>{audio.title}</Marquee>
          </MarqueeContainer>
        </AudioTitle>
      ) : (
        undefined
      )}
    </Footer>
    <SideMenu>
      <LogoButton
        source={producer.logo}
        onPress={() => console.log('pressed logo')}
      />
      <LikeButton
        onPress={() => console.log('pressed like')}
        selected={isLiked}
      />
    </SideMenu>
  </>
);
