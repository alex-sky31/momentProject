import axiosInstance from '../axiosConfig';
import { CreateTaskType } from '../../@types/CreateTask.type';
import { Task } from '../../@types/Task.type';
const base_url = 'http://localhost:8080';

export const taskService = {
  async getTasks(userId: string) {
    return axiosInstance.get(`${base_url}/tasks/${userId}`);
  },
  async getTask(id: string) {
    return axiosInstance.get(`${base_url}/tasks/${id}`);
  },
  async updateTask(data: Task) {
    return axiosInstance.patch(`${base_url}/tasks/update/${data.id}`, data);
  },
  async createTask(data: CreateTaskType) {
    return axiosInstance.post(`${base_url}/tasks/create`, data);
  },
  async deleteTask(id: string) {
    return axiosInstance.delete(`${base_url}/tasks/delete/${id}`);
  }
};
