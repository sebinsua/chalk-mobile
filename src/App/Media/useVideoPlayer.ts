import { useRef, useEffect, MutableRefObject } from 'react';

export type PlaybackStatusError = Readonly<{
  isLoaded: false;
  androidImplementation?: string;
  error?: string;
}>;

export type PlaybackStatusSuccess = Readonly<{
  isLoaded: true;
  androidImplementation?: string;
  uri: string;
  progressUpdateIntervalMillis: number;
  durationMillis?: number;
  positionMillis: number;
  playableDurationMillis?: number;
  seekMillisToleranceBefore?: number;
  seekMillisToleranceAfter?: number;
  shouldPlay: boolean;
  isPlaying: boolean;
  isBuffering: boolean;
  rate: number;
  shouldCorrectPitch: boolean;
  volume: number;
  isMuted: boolean;
  isLooping: boolean;
  didJustFinish: boolean;
}>;

export type PlaybackStatus = PlaybackStatusError | PlaybackStatusSuccess;

export interface Video {
  playAsync: () => Promise<PlaybackStatus>;
  unloadAsync: () => Promise<PlaybackStatus>;
  pauseAsync: () => Promise<PlaybackStatus>;
  setPositionAsync: (
    positionMillis: number,
    tolerances?: {
      toleranceMillisBefore?: number;
      toleranceMillisAfter?: number;
    }
  ) => Promise<PlaybackStatus>;
  setIsMutedAsync: (isMuted: boolean) => Promise<PlaybackStatus>;
}

export function useVideoPlayer(
  isPlaying: boolean,
  isMuted: boolean
): MutableRefObject<Video | undefined> {
  const videoRef = useRef<Video>();

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.unloadAsync();
      }
    };
  }, []);
  useEffect(() => {
    async function playVideo(video: Video, im: boolean) {
      await video.setPositionAsync(0);
      await video.setIsMutedAsync(im);
      await video.playAsync();
    }
    async function pauseVideo(video: Video) {
      await video.setIsMutedAsync(true);
      await video.pauseAsync();
    }

    if (videoRef.current) {
      if (isPlaying) {
        playVideo(videoRef.current, isMuted);
      } else {
        pauseVideo(videoRef.current);
      }
    }
  }, [isPlaying, isMuted]);

  return videoRef;
}
