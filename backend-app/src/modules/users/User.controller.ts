import { Controller, Get } from '@nestjs/common';
import { UserService } from './User.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser() {
    return this.userService.getUsers();
  }
}
