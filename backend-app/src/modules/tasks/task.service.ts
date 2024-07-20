import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, DeleteResult, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/createTask.dto';
import { UserService } from '../users/user.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private userService: UserService,
  ) {}

  async geTasks() {
    return await this.taskRepository.find();
  }

  async findOne(id: string): Promise<Task> {
    return await this.taskRepository.findOne({ where: { id } });
  }
  async create(data: CreateTaskDto): Promise<Task> {
    const user = await this.userService.findOne(data.userId);
    if (user) {
      const task = this.taskRepository.create(data);
      task.user = user;
      return this.taskRepository.save(task);
    } else {
      throw new Error('User not found');
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.taskRepository.delete(id);
  }
}
