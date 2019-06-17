import React, { useRef } from 'react';

import { Dimensions } from 'react-native';
import Carousel, { CarouselStatic } from 'react-native-snap-carousel';

import { AnimatedPage, Title } from './styles';

type Page = Readonly<{
  backgroundColor: 'red' | 'green' | 'blue';
  content: string;
}>;

type SnappableListProps = Readonly<{
  data: ReadonlyArray<Page>;
}>;

const renderItem = (props: { item: Page; index: number }) => (
  <AnimatedPage style={{ backgroundColor: props.item.backgroundColor }}>
    <Title>{props.item.content}</Title>
  </AnimatedPage>
);

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
      renderItem={renderItem}
    />
  );
};
