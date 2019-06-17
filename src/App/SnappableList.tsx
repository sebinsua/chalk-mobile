import React, { useRef } from 'react';

import { Dimensions } from 'react-native';
import Carousel, { CarouselStatic } from 'react-native-snap-carousel';

import { Media } from './styles';

type Page = Readonly<{
  source: {
    uri: string;
    type: string;
  };
}>;

type SnappableListProps = Readonly<{
  data: ReadonlyArray<Page>;
}>;

export const SnappableList = (props: SnappableListProps) => {
  const carouselRef = useRef<CarouselStatic<{}>>();

  const viewport = Dimensions.get('window');
  return (
    <Carousel
      vertical
      ref={(c: any) => (carouselRef.current = c)}
      data={props.data}
      itemWidth={viewport.width}
      itemHeight={viewport.height}
      sliderHeight={viewport.height}
      inactiveSlideOpacity={1}
      inactiveSlideScale={1}
      renderItem={({ item, index }) => (
        <Media
          source={item.source}
          isMuted={0 !== index}
          shouldPlay={0 === index}
        />
      )}
    />
  );
};
