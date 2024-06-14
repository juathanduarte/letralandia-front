import { api } from '../api';

interface WordInfo {
  count: number;
  word: string;
}

interface ProfileGameInfoDto {
  profileId: number;
  gameId: number;
  phaseId: number;
  wordsInfo: WordInfo[];
  completionTime: number;
}

export async function postInfoGame(info: ProfileGameInfoDto) {
  try {
    const { data } = await api.post('/profile-game-info', info);
    return data;
  } catch (error) {
    console.error('Failed to post game info:', error);
    throw error;
  }
}
