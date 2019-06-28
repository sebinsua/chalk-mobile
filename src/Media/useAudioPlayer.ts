import { useRef, useEffect, MutableRefObject } from 'react';
import { Audio } from 'expo-av';

import { AudioSource } from '../Source';

export const useAudioPlayer = (
  audioSource: AudioSource | undefined,
  isPlaying: boolean
): MutableRefObject<Audio.Sound | undefined> => {
  const soundRef = useRef<Audio.Sound>();

  useEffect(() => {
    async function loadAudio(as: AudioSource, ip: boolean) {
      const { sound } = await Audio.Sound.createAsync(as, {
        isMuted: false,
        isLooping: true,
        shouldPlay: ip,
      });

      soundRef.current = sound;
    }

    if (audioSource) {
      loadAudio(audioSource, isPlaying);
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [audioSource, isPlaying]);

  return soundRef;
};
