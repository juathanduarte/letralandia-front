import { api } from '../api';

interface ProfileData {
  name?: string;
  gender?: string;
}

export async function updateProfile(userId: string, profileId: string, profileData: ProfileData) {
  const { data } = await api.put(`/user/${userId}/profile/${profileId}`, profileData);
  return data;
}
