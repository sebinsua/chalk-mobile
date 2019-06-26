import { Producer } from './Producer';
import { Source } from './Source';

export type Page = Readonly<{
  id: number;
  producer: Producer;
  source: Source;
  isLiked: boolean;
}>;
