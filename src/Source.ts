export const SOURCE_TYPE_VIDEO = 'video';
export const SOURCE_TYPE_AUDIO = 'audio';
export const SOURCE_TYPE_IMAGE = 'image';
export const SOURCE_TYPE_GRADIENT = 'gradient';
export const SOURCE_TYPE_TEXT = 'text';

export type AudioSource = Readonly<{
  type: typeof SOURCE_TYPE_AUDIO;
  title: string;
  uri: string;
}>;

export type TextSource = Readonly<{
  type: typeof SOURCE_TYPE_TEXT;
  content?: string;
  textColor?: string;
}>;

export type VideoSource = Readonly<{
  type: typeof SOURCE_TYPE_VIDEO;
  uri: string;
  audio?: AudioSource;
  text?: TextSource;
}>;

export type ImageSource = Readonly<{
  type: typeof SOURCE_TYPE_IMAGE;
  uri: string;
  audio?: AudioSource;
  text?: TextSource;
}>;

export type GradientSource = Readonly<{
  type: typeof SOURCE_TYPE_GRADIENT;
  colors: ReadonlyArray<string>;
  audio?: AudioSource;
  text?: TextSource;
}>;

export type Source = VideoSource | ImageSource | GradientSource;
