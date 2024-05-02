import { api } from '../api';

export async function deleteProfile(userId: string, profileId: string) {
  const { data } = await api.delete(`/user/${userId}/profile/${profileId}`);
  return data;
}
