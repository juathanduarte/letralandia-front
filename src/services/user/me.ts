import { api } from '../api';

export async function getMe(accessToken) {
  try {
    const response = await api.get('/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
}
