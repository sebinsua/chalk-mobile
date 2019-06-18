import React from 'react';
import styled from 'styled-components/native';
import { Video } from 'expo-av';

import { TextContent } from './TextContent';
import { useVideoWithExternalAudioPlayer } from './useVideoWithExternalAudioPlayer';

import { VideoMediaProps } from './types';

const VideoBackground = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const VideoMedia = ({ source, isPlaying }: VideoMediaProps) => {
  const [videoRef] = useVideoWithExternalAudioPlayer(source.audio, isPlaying);

  return (
    <>
      <Video
        ref={(v: any) => (videoRef.current = v)}
        source={source}
        resizeMode={Video.RESIZE_MODE_COVER}
        isLooping={true}
        isMuted={true}
        shouldPlay={false}
        style={{ width: '100%', height: '100%' }}
      />
      <VideoBackground>
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
      </VideoBackground>
    </>
  );
};
