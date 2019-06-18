import React from 'react';

import { Pages, SnappableList } from './SnappableList';
import { Container } from './styles';

const pages: Pages = [
  {
    id: 1,
    source: {
      type: 'gradient',
      colors: ['pink', 'yellow'],
      text: {
        type: 'text',
        content: 'Hello World!',
        textColor: 'white',
      },
      audio: {
        type: 'audio',
        uri:
          'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3',
      },
    },
  },
  {
    id: 2,
    source: {
      type: 'image',
      uri:
        'http://cdn.iphonehacks.com/wp-content/uploads/2018/10/Chroma-576x1024.jpg',
      text: {
        type: 'text',
        content: 'I work on top of images, too!',
        textColor: 'white',
      },
    },
  },
  {
    id: 3,
    source: {
      uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      type: 'video',
      text: {
        type: 'text',
        content: 'I work on top of videos, too!',
        textColor: 'orange',
      },
    },
  },
  {
    id: 4,
    source: {
      uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      type: 'video',
    },
  },
  {
    id: 5,
    source: {
      uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      type: 'video',
      audio: {
        type: 'audio',
        uri:
          'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3',
      },
    },
  },
];

export const App = () => {
  return (
    <Container>
      <SnappableList data={pages} />
    </Container>
  );
};
