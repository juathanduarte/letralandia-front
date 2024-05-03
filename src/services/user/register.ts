import { api } from '../api';

interface RegisterProps {
  email: string;
  password: string;
  name: string;
}

export async function register(user: RegisterProps) {
  const { data } = await api.post('/user', user);
  return data;
}
