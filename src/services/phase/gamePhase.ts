import { api } from '../api';

export async function gamePhase(gameId: string, phaseId: string) {
  const { data } = await api.get(`/games/${gameId}/phases/${phaseId}/words`);
  return data;
}
