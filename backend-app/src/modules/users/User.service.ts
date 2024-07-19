import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity';
import { first } from 'rxjs';
import { CreateUserDto } from '../auth/dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  async getUsers() {
    return await this.UserRepository.find();
  }

  async findOne(customerId: string): Promise<User> {
    return await this.UserRepository.findOne({ where: { id: customerId } });
  }

  findOneByEmail(email: string, password: string): Promise<User | null> {
    return this.UserRepository.findOneBy({ email: email, password: password });
  }
  create(data: CreateUserDto): Promise<User> {
    return this.UserRepository.save({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    });
  }
}
