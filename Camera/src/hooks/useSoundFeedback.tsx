import { useAudioPlayer } from "expo-audio";
import { Vibration } from "react-native";

const shortBipSource = require("../assets/audios/shortBip.mp3");
const longBipSource = require("../assets/audios/longBip.mp3");

export interface SoundFeedbackResult {
  playShortBip: () => Promise<void>;
  playLongBip: () => Promise<void>;
}

export function useSoundFeedback(): SoundFeedbackResult {
  const shortBipPlayer = useAudioPlayer(shortBipSource);
  const longBipPlayer = useAudioPlayer(longBipSource);

  async function playShortBip(): Promise<void> {
    try {
      Vibration.vibrate(50);
      if (shortBipPlayer) {
        shortBipPlayer.seekTo(0);
        await shortBipPlayer.play();
      }
    } catch (error) {
      console.error("Erro ao tocar o bip curto", error);
    }
  }

  async function playLongBip(): Promise<void> {
    try {
      Vibration.vibrate(150);
      if (longBipPlayer) {
        longBipPlayer.seekTo(0);
        await longBipPlayer.play();
      }
    } catch (error) {
      console.error("Erro ao tocar o bip longo", error);
    }
  }

  return { playShortBip, playLongBip };
}
