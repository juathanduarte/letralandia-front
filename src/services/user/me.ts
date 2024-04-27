import { api } from '../api';

export async function getMe(accessToken) {
  try {
    const response = await api.get('/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('User data:', response.data);

    return response.data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
}
