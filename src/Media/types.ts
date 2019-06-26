import { Source, GradientSource, ImageSource, VideoSource } from '../Source';
import { Producer } from '../Producer';

export type MediaProps<TSource extends Source = Source> = Readonly<{
  id: number;
  producer: Producer;
  source: TSource;
  isLiked: boolean;
  isPlaying: boolean;
}>;

export type ImageMediaProps = MediaProps<ImageSource>;
export type GradientMediaProps = MediaProps<GradientSource>;
export type VideoMediaProps = MediaProps<VideoSource>;
