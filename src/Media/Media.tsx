import React from 'react';
import styled from 'styled-components/native';

import { VideoMedia } from './VideoMedia';
import { ImageMedia } from './ImageMedia';
import { GradientMedia } from './GradientMedia';
import {
  SOURCE_TYPE_GRADIENT,
  SOURCE_TYPE_IMAGE,
  SOURCE_TYPE_VIDEO,
  Source,
} from '../Source';
import { Producer } from '../Producer';

export type MediaProps<TSource extends Source = Source> = Readonly<{
  id: number;
  producer: Producer;
  source: TSource;
  isPlaying: boolean;
  isLiked: boolean;
}>;

const _Media = (props: MediaProps) => {
  const { id, producer, source, isPlaying, isLiked } = props;
  switch (source.type) {
    case SOURCE_TYPE_VIDEO:
      return (
        <VideoMedia
          id={id}
          producer={producer}
          source={source}
          isLiked={isLiked}
          isPlaying={isPlaying}
        />
      );
    case SOURCE_TYPE_IMAGE:
      return (
        <ImageMedia
          id={id}
          producer={producer}
          source={source}
          isLiked={isLiked}
          isPlaying={isPlaying}
        />
      );
    case SOURCE_TYPE_GRADIENT:
      return (
        <GradientMedia
          id={id}
          producer={producer}
          source={source}
          isLiked={isLiked}
          isPlaying={isPlaying}
        />
      );
  }
};

export const Media = styled(_Media)`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
