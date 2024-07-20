import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/createTask.dto';

@Controller('tasks')
export class TaskController {
  private readonly logger = new Logger(TaskController.name);

  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getTasks() {
    this.logger.verbose(`Get all tasks`);

    return this.taskService.geTasks();
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  async createTask(@Body() dto: CreateTaskDto) {
    this.logger.verbose(`Create task`);
    return this.taskService.create(dto);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
