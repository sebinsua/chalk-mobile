// See: https://github.com/deanhet/react-native-text-ticker

import React, { PureComponent, ReactNode } from 'react';
import styled from 'styled-components/native';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
  ScrollView,
  NativeModules,
  findNodeHandle,
  StyleProp,
  ViewStyle,
} from 'react-native';

const { UIManager } = NativeModules;

export const TextTickAnimationType = Object.freeze({
  auto: 'auto',
  scroll: 'scroll',
  bounce: 'bounce',
});

const Container = styled.View`
  overflow: hidden;
`;

export type MarqueeProps = Readonly<{
  style?: StyleProp<ViewStyle>;
  duration?: number;
  loop?: boolean;
  bounce?: boolean;
  scroll?: boolean;
  marqueeOnMount?: boolean;
  marqueeDelay?: number;
  isInteraction?: boolean;
  useNativeDriver?: boolean;
  onMarqueeComplete?: () => void;
  onScrollStart?: () => void;
  children?: ReactNode;
  repeatSpacer?: number;
  easing?: (value: number) => number;
  animationType?: 'auto' | 'scroll' | 'bounce';
  scrollingSpeed?: number;
}>;

export type MarqueeState = {
  animating: boolean;
  contentFits: boolean;
  shouldBounce: boolean;
  isScrolling: boolean;
};

export class Marquee extends PureComponent<MarqueeProps, MarqueeState> {
  static defaultProps = {
    style: {},
    loop: true,
    bounce: true,
    scroll: true,
    marqueeOnMount: true,
    marqueeDelay: 0,
    isInteraction: true,
    useNativeDriver: true,
    repeatSpacer: 50,
    easing: Easing.ease,
    animationType: 'auto',
    scrollingSpeed: 50,
  };

  textRef = null;
  containerRef: ScrollView | null = null;

  animatedValue = new Animated.Value(0);
  textWidth!: number;
  containerWidth!: number;
  distance?: number = undefined;

  timer?: number;
  hasFinishedFirstLoop: boolean = false;

  state = {
    animating: false,
    contentFits: false,
    shouldBounce: false,
    isScrolling: false,
  };

  componentDidMount() {
    this.invalidateMetrics();
    const { marqueeDelay, marqueeOnMount } = this.props;
    if (marqueeOnMount) {
      this.startAnimation(marqueeDelay || 0);
    }
  }

  componentDidUpdate(prevProps: MarqueeProps) {
    if (this.props.children !== prevProps.children) {
      this.resetScroll();
    }
  }

  componentWillUnmount() {
    this.stopAnimation();
    // Always stop timers when unmounting to avoid a common source of crashes.
    this.clearTimeout();
  }

  startAnimation = (timeDelay: number) => {
    if (this.state.animating) {
      return;
    }
    this.start(timeDelay);
  };

  animateScroll = () => {
    const {
      duration,
      marqueeDelay,
      loop,
      isInteraction,
      useNativeDriver,
      repeatSpacer,
      easing,
      children,
      onMarqueeComplete,
    } = this.props;
    this.setTimeout(() => {
      Animated.timing(this.animatedValue, {
        toValue: -this.textWidth - (repeatSpacer || 50),
        duration: duration || children.length * 150,
        easing: easing,
        isInteraction: isInteraction,
        useNativeDriver: useNativeDriver,
      }).start(({ finished }) => {
        if (finished) {
          if (onMarqueeComplete) {
            onMarqueeComplete();
          }
          if (loop) {
            this.animatedValue.setValue(0);
            this.animateScroll();
          }
        }
      });
    }, marqueeDelay);
  };

  animateBounce = () => {
    const {
      duration,
      marqueeDelay,
      loop,
      isInteraction,
      useNativeDriver,
      easing,
      scrollingSpeed,
    } = this.props;
    this.setTimeout(
      () => {
        Animated.sequence([
          Animated.timing(this.animatedValue, {
            toValue: -(this.distance || 0) - 10,
            duration: duration || (this.distance || 0) * (scrollingSpeed || 50),
            easing: easing,
            isInteraction: isInteraction,
            useNativeDriver: useNativeDriver,
          }),
          Animated.timing(this.animatedValue, {
            toValue: 10,
            duration: duration || (this.distance || 0) * (scrollingSpeed || 50),
            easing: easing,
            isInteraction: isInteraction,
            useNativeDriver: useNativeDriver,
          }),
        ]).start(({ finished }) => {
          if (finished) {
            this.hasFinishedFirstLoop = true;
          }
          if (loop) {
            this.animateBounce();
          }
        });
      },
      this.hasFinishedFirstLoop ? 0 : marqueeDelay
    );
  };

  start = async (_?: number) => {
    this.setState({ animating: true });
    this.setTimeout(async () => {
      await this.calculateMetrics();
      if (!this.state.contentFits) {
        const { onScrollStart } = this.props;
        if (onScrollStart && typeof onScrollStart === 'function') {
          onScrollStart();
        }
        if (this.props.animationType === 'auto') {
          if (this.state.shouldBounce && this.props.bounce) {
            this.animateBounce();
          } else {
            this.animateScroll();
          }
        } else if (this.props.animationType === 'bounce') {
          this.animateBounce();
        } else if (this.props.animationType === 'scroll') {
          this.animateScroll();
        }
      }
    }, 100);
  };

  stopAnimation() {
    this.animatedValue.setValue(0);
    this.setState({ animating: false, shouldBounce: false });
  }

  async calculateMetrics() {
    return new Promise(async resolve => {
      try {
        const measureWidth = (node: any): Promise<number> =>
          new Promise(async (resolve, reject) => {
            // nodehandle is not always there, causes crash. modified to check..
            const nodeHandle = findNodeHandle(node);
            if (nodeHandle) {
              UIManager.measure(
                nodeHandle,
                (x: number, y: number, w: number) => {
                  // console.log('Width: ' + w)
                  return resolve(w);
                }
              );
            } else {
              return reject('nodehandle_not_found');
            }
          });

        const [containerWidth, textWidth] = await Promise.all([
          measureWidth(this.containerRef),
          measureWidth(this.textRef),
        ]);

        this.containerWidth = containerWidth;
        this.textWidth = textWidth;
        this.distance = textWidth - containerWidth;

        this.setState({
          // This is 1 instead of 0 to get around rounding errors from:
          // https://github.com/facebook/react-native/commit/a534672
          contentFits: this.distance <= 1,
          shouldBounce: this.distance < this.containerWidth / 8,
        });
        // console.log(`distance: ${this.distance}, contentFits: ${this.state.contentFits}`)
        resolve([]);
      } catch (error) {
        console.warn(
          'react-native-text-ticker: could not calculate metrics',
          error
        );
      }
    });
  }

  invalidateMetrics = () => {
    this.distance = undefined;
    this.setState({ contentFits: false });
  };

  clearTimeout() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  }

  setTimeout(fn: Function, time: number = 0) {
    this.clearTimeout();
    this.timer = setTimeout(fn, time);
  }

  resetScroll = () => {
    this.clearTimeout();
    this.setState({ isScrolling: true });
    this.animatedValue.setValue(0);
    this.setTimeout(() => {
      this.setState({ isScrolling: false });
      this.start();
    }, this.props.marqueeDelay || 3000);
  };

  render() {
    const { style, children, repeatSpacer, scroll, ...props } = this.props;
    const { animating, contentFits, isScrolling } = this.state;
    return (
      <Container>
        <Text
          {...props}
          numberOfLines={1}
          style={[style, { opacity: animating ? 0 : 1 }]}
        >
          {this.props.children}
        </Text>
        <ScrollView
          ref={c => (this.containerRef = c)}
          horizontal
          scrollEnabled={scroll ? !this.state.contentFits : false}
          scrollEventThrottle={16}
          onScroll={this.resetScroll}
          showsHorizontalScrollIndicator={false}
          style={{
            ...StyleSheet.absoluteFillObject,
            display: animating ? 'flex' : 'none',
          }}
          onContentSizeChange={() => this.calculateMetrics()}
        >
          <Animated.Text
            ref={(c: any) => (this.textRef = c)}
            numberOfLines={1}
            {...props}
            style={[
              style,
              { transform: [{ translateX: this.animatedValue }], width: null },
            ]}
          >
            {this.props.children}
          </Animated.Text>
          {!contentFits && !isScrolling ? (
            <View style={{ paddingLeft: repeatSpacer }}>
              <Animated.Text
                numberOfLines={1}
                {...props}
                style={[
                  style,
                  {
                    transform: [{ translateX: this.animatedValue }],
                    width: null,
                  },
                ]}
              >
                {this.props.children}
              </Animated.Text>
            </View>
          ) : null}
        </ScrollView>
      </Container>
    );
  }
}
