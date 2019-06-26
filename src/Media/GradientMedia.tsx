import React from 'react';
import styled from 'styled-components/native';
import { LinearGradient as _GradientBackground } from 'expo-linear-gradient';

import { UserInterface } from '../UserInterface';
import { TextContent } from './TextContent';
import { useAudioPlayer } from './useAudioPlayer';

import { GradientMediaProps } from './types';

const GradientBackground = styled(_GradientBackground)`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const GradientMedia = ({
  producer,
  source,
  isLiked,
  isPlaying,
}: GradientMediaProps) => {
  useAudioPlayer(source.audio, isPlaying);

  return (
    <GradientBackground colors={[...source.colors]}>
      <UserInterface producer={producer} audio={source.audio} isLiked={isLiked}>
        {source.text ? (
          <TextContent
            style={
              source.text.textColor ? { color: source.text.textColor } : {}
            }
          >
            {source.text.content}
          </TextContent>
        ) : (
          undefined
        )}
      </UserInterface>
    </GradientBackground>
  );
};
