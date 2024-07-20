import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './entities/task.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule, UserModule],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule {}
