import { api } from '../api';

export async function logout() {
  const { data } = await api.post('/logout');
  console.log('logout', data);
  return data;
}
