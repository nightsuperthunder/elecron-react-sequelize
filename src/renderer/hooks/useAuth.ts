import { useQuery, useQueryClient } from 'react-query';
import { ITokenResponse } from '../types/auth.type';

const useAuth = () => {
  const queryClient = useQueryClient();

  const setToken = async (token: ITokenResponse) => {
    localStorage.setItem('access_token', token.accessToken);
    localStorage.setItem('refresh_token', token.refreshToken);
    await queryClient.invalidateQueries(['token']);
  };

  const clearToken = async () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    await queryClient.invalidateQueries(['token']);
  };

  const { data: isAuth } = useQuery(
    'token',
    () => !!localStorage.getItem('access_token'),
    {
      initialData: !!localStorage.getItem('access_token'),
      retry: 1,
    },
  );

  return { isAuth, setToken, clearToken };
};

export default useAuth;
