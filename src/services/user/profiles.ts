import { api } from '../api';

export async function getProfiles(userId: string) {
  const { data } = await api.get(`/user/${userId}/profiles`);
  return data;
}
