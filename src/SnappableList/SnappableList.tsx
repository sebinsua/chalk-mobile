import React, { useRef, useCallback } from 'react';

import { Dimensions } from 'react-native';
import Carousel, { CarouselStatic } from 'react-native-snap-carousel';
import { useRefreshControl } from './useRefreshControl';

import { Media } from '../Media';
import { Page } from '../Page';

export type SetCurrentIndexFn = (index: number) => void;

export type SnappableListProps = Readonly<{
  data?: ReadonlyArray<Page>;
  currentIndex?: number;
  setCurrentIndex?: SetCurrentIndexFn;
}>;

export const SnappableList = ({
  data = [],
  currentIndex,
  setCurrentIndex,
}: SnappableListProps) => {
  const carouselRef = useRef<CarouselStatic<{}>>();

  const refreshControl = useRefreshControl(async () => {
    console.log('refreshing');
  });

  const renderItem = useCallback(
    ({ item, index }: Readonly<{ item: Page; index: number }>) => (
      <Media
        id={item.id}
        producer={item.producer}
        source={item.source}
        isLiked={item.isLiked}
        isPlaying={currentIndex === index}
      />
    ),
    [currentIndex]
  );

  const viewport = Dimensions.get('window');
  return (
    <Carousel
      vertical
      ref={(c: any) => (carouselRef.current = c)}
      data={data}
      itemWidth={viewport.width}
      itemHeight={viewport.height}
      sliderHeight={viewport.height}
      inactiveSlideOpacity={1}
      inactiveSlideScale={1}
      refreshControl={refreshControl}
      renderItem={renderItem}
      onSnapToItem={setCurrentIndex}
    />
  );
};
