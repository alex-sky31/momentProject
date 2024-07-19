import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: any): Promise<any> {
    try {
      const userFind = await this.userService.findOneByEmail(
        dto.email,
        dto.password,
      );
      if (userFind) {
        const payload = { sub: userFind.id };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      } else {
        return { code: 400, user: 'Not found' };
      }
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async register(dto: any): Promise<any> {
    try {
      return await this.userService.create(dto).then(async (res) => {
        const payload = { sub: res.id, email: res.email };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getUserById(userId: string): Promise<any> {
    try {
      const user = await this.userService.findOne(userId);
      if (user) {
        delete user.password;
        return user;
      } else {
        return { code: 400, user: 'Not found' };
      }
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
