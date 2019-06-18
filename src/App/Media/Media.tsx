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

export type MediaProps<TSource extends Source = Source> = Readonly<{
  id: number;
  source: TSource;
  isPlaying: boolean;
}>;

const _Media = (props: MediaProps) => {
  const { id, source, isPlaying } = props;
  switch (source.type) {
    case SOURCE_TYPE_VIDEO:
      return <VideoMedia id={id} source={source} isPlaying={isPlaying} />;
    case SOURCE_TYPE_IMAGE:
      return <ImageMedia id={id} source={source} isPlaying={isPlaying} />;
    case SOURCE_TYPE_GRADIENT:
      return <GradientMedia id={id} source={source} isPlaying={isPlaying} />;
  }
};

export const Media = styled(_Media)`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
