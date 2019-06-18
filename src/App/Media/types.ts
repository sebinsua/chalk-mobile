import { Source, GradientSource, ImageSource, VideoSource } from '../Source';

export type MediaProps<TSource extends Source = Source> = Readonly<{
  id: number;
  source: TSource;
  isPlaying: boolean;
}>;

export type ImageMediaProps = MediaProps<ImageSource>;
export type GradientMediaProps = MediaProps<GradientSource>;
export type VideoMediaProps = MediaProps<VideoSource>;
