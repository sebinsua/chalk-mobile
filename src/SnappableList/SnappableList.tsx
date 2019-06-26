import React, { useRef, useState } from 'react';

import { Dimensions } from 'react-native';
import Carousel, { CarouselStatic } from 'react-native-snap-carousel';

import { Media } from '../Media';
import { Page } from '../Page';

export type Pages = ReadonlyArray<Page>;

export type SnappableListProps = Readonly<{
  data: Pages;
}>;

export const SnappableList = (props: SnappableListProps) => {
  const carouselRef = useRef<CarouselStatic<{}>>();
  const [currentIndex, setCurrentIndex] = useState(0);

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
      renderItem={({
        item,
        index,
      }: Readonly<{ item: Page; index: number }>) => (
        <Media
          id={item.id}
          producer={item.producer}
          source={item.source}
          isLiked={item.isLiked}
          isPlaying={currentIndex === index}
        />
      )}
      onSnapToItem={(index: number) => setCurrentIndex(index)}
    />
  );
};
