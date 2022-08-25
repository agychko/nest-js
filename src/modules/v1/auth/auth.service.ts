import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(fullName: string, email: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.fullName === fullName) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { fullName: user.fullName, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
