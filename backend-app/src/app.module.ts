import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/entities/user.entity';
import { UserModule } from './modules/users/user.module';
import { Task } from './modules/tasks/entities/task.entity';
import { TaskModule } from './modules/tasks/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        migrations: ['dist/migrations/*{.ts,.js}'],
        migrationsTableName: 'migrations_typeorm',
        migrationsRun: true,
        entities: [User, Task],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    TaskModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
