import { Audio } from 'expo-av';
import { femaleAudioFiles, maleAudioFiles } from '../types/audioFiles';

const soundObject = new Audio.Sound();

export const playAudio = async (gender, filename) => {
  let audioFile;

  if (gender === 'male') {
    audioFile = maleAudioFiles[filename];
  } else if (gender === 'female') {
    audioFile = femaleAudioFiles[filename];
  }

  if (!audioFile) {
    console.error('Arquivo de áudios não encontrado.');
    return;
  }

  try {
    if (soundObject._loaded) {
      await soundObject.stopAsync();
      await soundObject.unloadAsync();
    }

    await soundObject.loadAsync(audioFile);
    await soundObject.playAsync();
  } catch (error) {
    console.error('Failed to play the sound:', error);
  }
};
