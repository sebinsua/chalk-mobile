import React, { ReactNode } from 'react';
import { Text } from 'react-native';

export type LoadingProps = Readonly<{
  children?: ReactNode;
}>;

export const Loading = ({ children }: LoadingProps) => <Text>{children}</Text>;
