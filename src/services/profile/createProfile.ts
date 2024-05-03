import { Profile } from '@/types/profile';
import { api } from '../api';

export async function createProfile(userId: string, profileData: Profile) {
  const { data } = await api.post(`/user/${userId}/profile`, profileData);
  return data;
}
