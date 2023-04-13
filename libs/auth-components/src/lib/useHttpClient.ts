import { RootState } from '@starter-ws/reductor';
import axios from 'axios';
import { useSelector } from 'react-redux';

export function useHttpClient() {
  const token = useSelector((state: RootState) => state.auth.token);

  if (!token) {
    console.log('No está el access token');
  }

  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
