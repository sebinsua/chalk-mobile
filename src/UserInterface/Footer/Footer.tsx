import styled from 'styled-components/native';

import { FontAwesome } from '@expo/vector-icons';
import { Marquee as _Marquee } from './Marquee';

export const Footer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;

  margin-left: 25px;
  margin-bottom: 25px;
  justify-content: space-between;
`;

export const ProducerName = styled.Text`
  font-family: open-sans-bold;
  font-weight: bold;
  color: white;
  box-shadow: 0px 0px 1px black;

  padding: 5px;
`;

export const AudioTitle = styled.View`
  flex-direction: row;

  padding: 5px;
`;

export const Icon = styled(FontAwesome as any)`
  box-shadow: 0px 0px 3px black;

  margin-top: 2px;
  margin-right: 8px;
`;

export const MarqueeContainer = styled.View``;

export const Marquee = styled(_Marquee)`
  font-family: open-sans-bold;
  font-weight: bold;
  color: white;
  box-shadow: 0px 0px 1px black;
`;
