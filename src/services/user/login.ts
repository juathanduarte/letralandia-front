import { api } from '../api';

export async function login(user: { email: string; password: string }) {
  console.log('user', user);
  console.log('api', api);
  const { data } = await api.post('/login', user);
  return data;
}
