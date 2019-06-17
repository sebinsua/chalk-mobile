import styled from 'styled-components/native';

import { Media as _Media } from './Media';

export const Container = styled.View`
  flex: 1;
`;

export const Media = styled(_Media)`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
