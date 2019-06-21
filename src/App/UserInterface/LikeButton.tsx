import React from 'react';
import styled from 'styled-components/native';

import { TouchableHighlight, GestureResponderEvent } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export type LikeButtonProps = Readonly<{
  onPress?: (event: GestureResponderEvent) => void;
  selected?: boolean;
}>;

const Icon = styled(FontAwesome)`
  box-shadow: 0px 0px 3px black;
`;

export const LikeButton = ({ onPress, selected = false }: LikeButtonProps) => (
  <TouchableHighlight onPress={onPress} underlayColor={'transparent'}>
    <Icon name="heart" size={48} color={selected ? 'red' : 'white'} />
  </TouchableHighlight>
);
