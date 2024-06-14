// @Param('profileId') profileId: number,
// @Param('gameId') gameId: number,

import { api } from '../api';

interface GetInfoGameProps {
  profileId: number;
  gameId: number;
}

export async function getInfoGame({ profileId, gameId }: GetInfoGameProps) {
  try {
    const { data } = await api.get(`/profile-game-info/${profileId}/${gameId}/phases`);
    return data;
  } catch (error) {
    console.error('Failed to get game info:', error);
    throw error;
  }
}
