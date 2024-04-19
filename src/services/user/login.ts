import { api } from '../api';

export async function login(user: { email: string; password: string }) {
  const { data } = await api.post('/login', user);
  return data;
}
