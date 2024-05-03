import { api } from '../api';

export async function profileDetails(userId: string, profileId: string) {
  const { data } = await api.get(`/user/${userId}/profile/${profileId}`);
  return data;
}
