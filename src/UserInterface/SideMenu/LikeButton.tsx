import React from 'react';
import styled from 'styled-components/native';

import { TouchableHighlight, GestureResponderEvent } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export type LikeButtonProps = Readonly<{
  onPress?: (event: GestureResponderEvent) => void;
  selected?: boolean;
}>;

const Icon = styled(FontAwesome as any)`
  box-shadow: 0px 0px 3px black;
`;

export const LikeButton = ({ onPress, selected = false }: LikeButtonProps) => (
  <TouchableHighlight onPress={onPress} underlayColor={'transparent'}>
    <Icon
      size={32}
      name={selected ? 'heart' : 'heart-o'}
      color={selected ? 'red' : 'white'}
    />
  </TouchableHighlight>
);
