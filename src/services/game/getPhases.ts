// localhost: 3000 / games / 1 / phases;

import { api } from '../api';

export async function getPhases(gameId: string) {
  console.log('gameId', gameId);
  const { data } = await api.get(`/games/${gameId}/phases`);
  return data;
}
