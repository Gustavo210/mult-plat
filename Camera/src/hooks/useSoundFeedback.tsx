import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useCallback } from "react";
import { Vibration } from "react-native";

const shortBipSource = require("../assets/audios/shortBip.mp3");
const longBipSource = require("../assets/audios/longBip.mp3");

export interface SoundFeedbackResult {
  playShortBip: () => void;
  playLongBip: () => void;
}

export function useSoundFeedback(): SoundFeedbackResult {
  const shortBipPlayer = useAudioPlayer(shortBipSource);
  const longBipPlayer = useAudioPlayer(longBipSource);

  const shortBipStatus = useAudioPlayerStatus(shortBipPlayer);
  const longBipStatus = useAudioPlayerStatus(longBipPlayer);

  const playShortBip = useCallback(() => {
    try {
      Vibration.vibrate(50);
      if (longBipStatus.playing) {
        longBipPlayer.pause();
      }

      shortBipPlayer.seekTo(0);
      shortBipPlayer.play();
    } catch (error) {
      console.error("Error playing short bip", error);
    }
  }, [shortBipPlayer, longBipPlayer, longBipStatus.playing]);

  const playLongBip = useCallback(() => {
    try {
      Vibration.vibrate(150);

      if (shortBipStatus.playing) {
        shortBipPlayer.pause();
      }

      longBipPlayer.seekTo(0);
      longBipPlayer.play();
    } catch (error) {
      console.error("Error playing long bip", error);
    }
  }, [longBipPlayer, shortBipPlayer, shortBipStatus.playing]);

  return { playShortBip, playLongBip };
}
