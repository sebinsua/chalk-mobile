import React from 'react';
import styled from 'styled-components/native';
import { Dimensions, ImageBackground as _ImageBackground } from 'react-native';

import { UserInterface } from '../UserInterface';
import { TextContent } from './TextContent';
import { useAudioPlayer } from './useAudioPlayer';

import { ImageMediaProps } from './types';

const ImageBackground = styled(_ImageBackground)`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const ImageMedia = ({
  producer,
  source,
  isLiked,
  isPlaying,
}: ImageMediaProps) => {
  useAudioPlayer(source.audio, isPlaying);

  const { width, height } = Dimensions.get('window');
  const imageSource = { uri: source.uri, width, height };
  return (
    <ImageBackground source={imageSource}>
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
    </ImageBackground>
  );
};
