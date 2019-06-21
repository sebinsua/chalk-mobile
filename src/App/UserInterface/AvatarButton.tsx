import React from 'react';
import styled from 'styled-components/native';

import { TouchableHighlight, GestureResponderEvent } from 'react-native';
import { Avatar } from 'react-native-paper';

import { ImageSource } from '../Source';

export type AvatarButtonProps = Readonly<{
  source: ImageSource;
  onPress?: (event: GestureResponderEvent) => void;
}>;

const AvatarImage = styled(Avatar.Image)`
  box-shadow: 0px 0px 3px black;
`;

export const AvatarButton = ({ source, onPress }: AvatarButtonProps) => (
  <TouchableHighlight onPress={onPress} underlayColor={'transparent'}>
    <AvatarImage size={48} source={source} />
  </TouchableHighlight>
);
