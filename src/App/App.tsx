import React from 'react';

import { SnappableList } from './SnappableList';
import { Container } from './styles';

export const App = () => {
  return (
    <Container>
      <SnappableList
        data={[
          {
            source: {
              uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
              type: 'video',
            },
          },
          {
            source: {
              uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
              type: 'video',
            },
          },
          {
            source: {
              uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
              type: 'video',
            },
          },
        ]}
      />
    </Container>
  );
};
