import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { femaleAudioFiles, maleAudioFiles } from '../types/audioFiles';

const soundObject = new Audio.Sound();

const isBase64 = (str) => {
  const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  return base64Regex.test(str);
};

export const playAudio = async (gender, filename) => {
  let audioFile;

  if (isBase64(filename)) {
    const uri = `${FileSystem.documentDirectory}${Date.now()}.mp3`;

    await FileSystem.writeAsStringAsync(uri, filename, {
      encoding: FileSystem.EncodingType.Base64,
    });

    try {
      if (soundObject._loaded) {
        await soundObject.stopAsync();
        await soundObject.unloadAsync();
      }

      await soundObject.loadAsync({ uri });
      await soundObject.playAsync();
    } catch (error) {}
  } else {
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
      // console.error('Failed to play the sound:', error);
    }
  }
};
