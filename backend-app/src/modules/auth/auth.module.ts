import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { PasswordModule } from '../password/password.module';
import { PasswordService } from '../password/password.service';

@Module({
  imports: [
    UserModule,
    PasswordModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: jwtConstants(configService),
        signOptions: { expiresIn: '10h' },
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, UserService, PasswordService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
