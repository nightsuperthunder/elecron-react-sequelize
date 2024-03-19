import axiosService from './axios.service';
import { ILoginForm, ISignupForm, ITokenResponse } from '../types/auth.type';

const authService = {
  login: async (data: ILoginForm) => {
    const response = await axiosService.post<ITokenResponse>(
      '/auth/login',
      data,
    );

    return response.data;
  },

  signup: async (data: ISignupForm) => {
    const response = await axiosService.post<ITokenResponse>(
      '/auth/register',
      data,
    );

    return response.data;
  },

  refresh: async (refreshToken: string) => {
    const response = await axiosService.post<ITokenResponse>('/auth/refresh', {
      refreshToken,
    });

    return response.data;
  },
};

export default authService;
