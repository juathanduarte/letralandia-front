import { Platform } from 'react-native';

const apiUrl = process.env.EXPO_PUBLIC_API_URl || 'http://192.168.0.101:3000';
// const apiUrl = 'http://192.168.0.101:3000';

/**
 * Checa qual o emulador e retorna a url local
 * @param {string} apiUrl
 * @return {*}  {string}
 */
function transformAPIUrl(apiUrl: string): string {
  if (Platform.OS === 'android') return apiUrl.replace('localhost', '10.0.2.2');
  if (Platform.OS === 'ios') return apiUrl.replace('localhost', '192.168.0.101');

  return apiUrl;
}

const API_URL: string = transformAPIUrl(apiUrl as string);
export { API_URL };
