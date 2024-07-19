import axios from 'axios';
import axiosInstance from '../axiosConfig';
const base_url = process.env.REACT_APP_DEVELOP_API;

export const userService = {
  async login(data: { email: string; password: string }) {
    return axios.post(`${base_url}/auth`, data);
  },
  async getUserId() {
    return axiosInstance.get(`${base_url}/auth/profile`);
  },
  async getUser(userId: string) {
    return axiosInstance.get(`${base_url}/auth/user/${userId}`);
  },

  async register(data: { firstName: string; lastName: string; email: string; password: string }) {
    return axios.post(`${base_url}/auth/register`, data);
  }
};
