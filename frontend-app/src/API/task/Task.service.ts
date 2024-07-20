import axiosInstance from '../axiosConfig';
import { CreateTaskType } from '../../@types/CreateTask.type';
const base_url = 'http://localhost:8080';

export const taskService = {
  async getTasks() {
    return axiosInstance.get(`${base_url}/tasks/`);
  },
  async createTask(data: CreateTaskType) {
    return axiosInstance.post(`${base_url}/tasks/create`, data);
  },
  async deleteTask(id: string) {
    return axiosInstance.delete(`${base_url}/tasks/delete/${id}`);
  }
};
