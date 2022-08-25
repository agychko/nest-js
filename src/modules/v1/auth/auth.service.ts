import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/users.schema';
// import { TokensRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    // private readonly tokensRepository: TokensRepository,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(fullName: string, email: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.fullName === fullName) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { fullName: user.fullName, email: user.email };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '60s',
      }),
    };
  }
}
