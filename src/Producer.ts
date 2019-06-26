import { ImageSource } from './Source';

export type Producer = Readonly<{
  username: string;
  logo: ImageSource;
}>;
