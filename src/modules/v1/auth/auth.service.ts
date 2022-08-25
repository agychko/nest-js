import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
// import { User } from '../users/schemas/users.schema';
import { AuthRepository } from './auth.repository';
import { jwtConstants } from './constants/constants';
import IUser from '../users/interfaces/user.interface';
import { Token } from './schemas/tokens.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(fullName: string, email: string): Promise<IUser> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.fullName === fullName) {
      return user;
    }
    return null;
  }

  async login(user: IUser) {
    const payload = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    };
    const access_token: string = this.jwtService.sign(payload, {
      secret: jwtConstants.accessKey,
      expiresIn: '60s',
    });
    const refresh_token: string = this.jwtService.sign(payload, {
      secret: jwtConstants.refreshKey,
      expiresIn: '60m',
    });
    const token: Token = await this.authRepository.findByUserId(user._id);
    if (token) {
      await this.authRepository.updateByUserId(user._id, {
        refreshToken: refresh_token,
      });
    } else {
      await this.authRepository.create({
        userId: user._id,
        refreshToken: refresh_token,
      });
    }
    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }

  async logout(user: IUser) {
    await this.authRepository.deleteByUserId(user._id);
  }
}
