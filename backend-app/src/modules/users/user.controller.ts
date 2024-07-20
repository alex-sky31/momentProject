import { Controller, Get, Logger, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser() {
    return this.userService.getUsers();
  }
}
