import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { UserService } from '../users/user.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private userService: UserService,
  ) {}

  async getTasks(userId: string): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
  async findOne(id: string): Promise<Task> {
    return await this.taskRepository.findOne({ where: { id } });
  }

  async update(data: UpdateTaskDto, id: string): Promise<UpdateResult> {
    return await this.taskRepository.update(id, data);
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
