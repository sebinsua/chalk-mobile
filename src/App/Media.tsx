import React from 'react';
import { Video } from 'expo-av';

export type MediaProps = Readonly<{
  source: Readonly<{ uri: string }>;
  shouldPlay: boolean;
  isMuted: boolean;
}>;

export const Media = (props: MediaProps) => {
  return (
    <Video
      source={props.source}
      resizeMode={Video.RESIZE_MODE_STRETCH}
      isLooping={true}
      isMuted={props.isMuted}
      shouldPlay={props.shouldPlay}
    />
  );
};
