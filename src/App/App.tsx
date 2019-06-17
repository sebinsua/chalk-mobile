import React from 'react';

import { SnappableList } from './SnappableList';
import { Container } from './styles';

export const App = () => {
  return (
    <Container>
      <SnappableList
        data={[
          { backgroundColor: 'red', content: 'R' },
          { backgroundColor: 'green', content: 'G' },
          { backgroundColor: 'blue', content: 'B' },
        ]}
      />
    </Container>
  );
};
