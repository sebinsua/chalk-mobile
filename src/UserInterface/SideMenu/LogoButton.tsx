import React from 'react';
import styled from 'styled-components/native';

import { TouchableHighlight, GestureResponderEvent } from 'react-native';
import { Avatar } from 'react-native-paper';

import { ImageSource } from '../../Source';

export type LogoButtonProps = Readonly<{
  source: ImageSource;
  onPress?: (event: GestureResponderEvent) => void;
}>;

const LogoImage = styled(Avatar.Image)`
  box-shadow: 0px 0px 3px black;
`;

export const LogoButton = ({ source, onPress }: LogoButtonProps) => (
  <TouchableHighlight onPress={onPress} underlayColor={'transparent'}>
    <LogoImage size={32} source={source} />
  </TouchableHighlight>
);
