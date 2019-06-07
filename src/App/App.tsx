import React, { useState, useCallback } from 'react';
import { Dimensions } from 'react-native';
import { useTransition } from 'react-spring/native';

import { Container, AnimatedPage, Title } from './styles';

export const App = () => {
  const [index, set] = useState(0);
  const onTouchStart = useCallback(() => set(state => (state + 1) % 3), []);

  const pages = [
    { backgroundColor: 'red', content: 'R' },
    { backgroundColor: 'green', content: 'G' },
    { backgroundColor: 'blue', content: 'B' },
  ];

  const { height } = Dimensions.get('window');
  const transitions = useTransition(index, p => p, {
    initial: { translateY: 0 * height },
    from: { translateY: -1 * height },
    enter: { translateY: 0 * height },
    leave: { translateY: 1 * height },
  });

  return (
    <Container onTouchStart={onTouchStart}>
      {transitions.map(({ key, item, props: { translateY } }) => {
        return (
          <AnimatedPage
            key={key}
            style={{
              backgroundColor: pages[item].backgroundColor,
              transform: [{ translateY }],
            }}
          >
            <Title>{pages[item].content}</Title>
          </AnimatedPage>
        );
      })}
    </Container>
  );
};
