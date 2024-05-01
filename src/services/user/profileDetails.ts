import { api } from '../api';

export async function getProfileDetails(userId: string, profileId: string) {
  const { data } = await api.get(`/user/${userId}/profile/${profileId}`);
  return data;
}
