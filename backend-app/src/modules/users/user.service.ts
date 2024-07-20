import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from '../auth/dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers() {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  findOneByEmail(email: string, password: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email: email, password: password });
  }
  create(data: CreateUserDto): Promise<User> {
    return this.userRepository.save({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    });
  }
}
