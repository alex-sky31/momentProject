import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Controller('tasks')
export class TaskController {
  private readonly logger = new Logger(TaskController.name);

  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Get('/user/:userId')
  async getTasks(@Param('userId') userId: string) {
    this.logger.verbose(`Get all tasks`);
    return this.taskService.getTasks(userId);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getTaskById(@Param('id') id: string) {
    this.logger.verbose(`Get task ${id}`);
    return this.taskService.getTaskById(id);
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  async createTask(@Body() dto: CreateTaskDto) {
    this.logger.verbose(`Create task`);
    return this.taskService.create(dto);
  }

  @UseGuards(AuthGuard)
  @Patch('/update/:id')
  async updateTask(@Body() dto: UpdateTaskDto, @Param('id') id: string) {
    this.logger.verbose(`Update task ${id}`);
    return this.taskService.update(dto, id);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  deleteTask(@Param('id') id: string) {
    this.logger.verbose(`Delete task ${id}`);
    return this.taskService.delete(id);
  }
}
