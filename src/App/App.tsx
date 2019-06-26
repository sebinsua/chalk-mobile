import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { useLocation } from './useLocation';
import { useFonts } from './useFonts';
import { Loading } from './Loading';
import { Pages, SnappableList } from '../SnappableList';
import { Container } from './styles';

import { theme } from '../theme';

const pages: Pages = [
  {
    id: 1,
    producer: {
      username: '@producer',
      logo: {
        type: 'image',
        uri:
          'https://scontent-lhr3-1.cdninstagram.com/vp/746ea09d5e5317fd64bb80b8ef913098/5DA0C6C0/t51.2885-19/s320x320/57468073_722917614825577_1521531394839281664_n.jpg?_nc_ht=scontent-lhr3-1.cdninstagram.com',
      },
    },
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
        title: 'Comfort Fit - Sorry',
        uri:
          'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3',
      },
    },
    isLiked: false,
  },
  {
    id: 2,
    producer: {
      username: '@producer',
      logo: {
        type: 'image',
        uri:
          'https://scontent-lhr3-1.cdninstagram.com/vp/746ea09d5e5317fd64bb80b8ef913098/5DA0C6C0/t51.2885-19/s320x320/57468073_722917614825577_1521531394839281664_n.jpg?_nc_ht=scontent-lhr3-1.cdninstagram.com',
      },
    },
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
    isLiked: true,
  },
  {
    id: 3,
    producer: {
      username: '@producer',
      logo: {
        type: 'image',
        uri:
          'https://scontent-lhr3-1.cdninstagram.com/vp/746ea09d5e5317fd64bb80b8ef913098/5DA0C6C0/t51.2885-19/s320x320/57468073_722917614825577_1521531394839281664_n.jpg?_nc_ht=scontent-lhr3-1.cdninstagram.com',
      },
    },
    source: {
      uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      type: 'video',
      text: {
        type: 'text',
        content: 'I work on top of videos, too!',
        textColor: 'orange',
      },
    },
    isLiked: false,
  },
  {
    id: 4,
    producer: {
      username: '@producer',
      logo: {
        type: 'image',
        uri:
          'https://scontent-lhr3-1.cdninstagram.com/vp/746ea09d5e5317fd64bb80b8ef913098/5DA0C6C0/t51.2885-19/s320x320/57468073_722917614825577_1521531394839281664_n.jpg?_nc_ht=scontent-lhr3-1.cdninstagram.com',
      },
    },
    source: {
      uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      type: 'video',
    },
    isLiked: false,
  },
  {
    id: 5,
    producer: {
      username: '@producer',
      logo: {
        type: 'image',
        uri:
          'https://scontent-lhr3-1.cdninstagram.com/vp/746ea09d5e5317fd64bb80b8ef913098/5DA0C6C0/t51.2885-19/s320x320/57468073_722917614825577_1521531394839281664_n.jpg?_nc_ht=scontent-lhr3-1.cdninstagram.com',
      },
    },
    source: {
      uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      type: 'video',
      audio: {
        type: 'audio',
        title: 'Comfort Fit - Sorry',
        uri:
          'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3',
      },
    },
    isLiked: false,
  },
];

export const App = () => {
  const fontsLoaded = useFonts({
    'open-sans-bold': require('../../assets/font/OpenSans-Bold.ttf'),
  });

  const location = useLocation();
  console.log('location', location);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {fontsLoaded ? (
          <SnappableList data={pages} />
        ) : (
          <Loading>Loading...</Loading>
        )}
      </Container>
    </ThemeProvider>
  );
};
