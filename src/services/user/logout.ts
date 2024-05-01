import { api } from '../api';

export async function logout() {
  const { data } = await api.post('/logout');
  return data;
}
