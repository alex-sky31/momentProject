import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { PasswordService } from '../password/password.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, PasswordService],
  controllers: [],
  exports: [UserService],
})
export class UserModule {}
