import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly loginService: AuthService) {}

  @Post('/')
  async login(@Body() dto: LoginUserDto) {
    this.logger.verbose(`Login user email ${dto.email}`);
    return this.loginService.login(dto);
  }
  @Post('/register')
  async register(@Body() dto: CreateUserDto) {
    this.logger.verbose(`Create user ${dto.email}`);
    return this.loginService.register(dto);
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Get('user/:id')
  getUser(@Param('id') id: string) {
    return this.loginService.getUserById(id);
  }
}
