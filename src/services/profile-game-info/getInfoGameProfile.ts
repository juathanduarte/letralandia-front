import { api } from '../api';

interface GetInfoGameProfileProps {
  profileId: number;
}

export async function getInfoGameProfile({ profileId }: GetInfoGameProfileProps) {
  try {
    const { data } = await api.get(`/profile-game-info/${profileId}/summary`);
    return data;
  } catch (error) {
    console.error('Failed to get game info:', error);
    throw error;
  }
}
