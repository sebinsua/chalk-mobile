import styled from 'styled-components/native';
import { animated } from 'react-spring/native';

export const Container = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: black;
`;

export const AnimatedPage = animated(styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`);
