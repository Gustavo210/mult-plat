import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Vibration } from "react-native";

import longBip from "../assets/audios/longBip.mp3";
import shortBip from "../assets/audios/shortBip.mp3";

export interface SoundFeedbackResult {
  playShortBip: () => Promise<void>;
  playLongBip: () => Promise<void>;
}

export function useSoundFeedback(): SoundFeedbackResult {
  const [shortBipSound, setShortBipSound] = useState<Audio.Sound | null>(null);
  const [longBipSound, setLongBipSound] = useState<Audio.Sound | null>(null);

  async function loadSounds(): Promise<void> {
    try {
      const { sound: shortSound } = await Audio.Sound.createAsync(shortBip);
      const { sound: longSound } = await Audio.Sound.createAsync(longBip);
      setShortBipSound(shortSound);
      setLongBipSound(longSound);
    } catch (error) {
      console.error("Erro ao carregar os sons de feedback", error);
    }
  }

  useEffect(function () {
    loadSounds();

    return function cleanup() {
      if (shortBipSound) {
        shortBipSound.unloadAsync();
      }
      if (longBipSound) {
        longBipSound.unloadAsync();
      }
    };
  }, []);

  async function playShortBip(): Promise<void> {
    try {
      Vibration.vibrate(50);
      if (shortBipSound) {
        await shortBipSound.playFromPositionAsync(0);
      }
    } catch (error) {
      console.error("Erro ao tocar o bip curto", error);
    }
  }

  async function playLongBip(): Promise<void> {
    try {
      Vibration.vibrate(150);
      if (longBipSound) {
        await longBipSound.playFromPositionAsync(0);
      }
    } catch (error) {
      console.error("Erro ao tocar o bip longo", error);
    }
  }

  return { playShortBip, playLongBip };
}
