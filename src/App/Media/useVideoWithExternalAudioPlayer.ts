import { useVideoPlayer } from './useVideoPlayer';
import { useAudioPlayer } from './useAudioPlayer';
import { AudioSource } from '../Source';

export function useVideoWithExternalAudioPlayer(
  audioSource: AudioSource | undefined,
  isPlaying: boolean
): [ReturnType<typeof useVideoPlayer>, ReturnType<typeof useAudioPlayer>] {
  const videoRef = useVideoPlayer(isPlaying, !!audioSource);
  const audioRef = useAudioPlayer(audioSource, isPlaying);
  return [videoRef, audioRef];
}
