import axiosService from './axios.service';

const userService = {
  getUsers: async () => {
    const response = await axiosService.get('/users');

    return response.data;
  },
};

export default userService;
