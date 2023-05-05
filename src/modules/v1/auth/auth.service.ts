import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import IUser from '../users/interfaces/user.interface';
import { Token } from '../tokens/schemas/tokens.schema';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/schemas/users.schema';
import { TokensService } from '../tokens/tokens.service';
import { comparePassword } from '../utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokensService,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  // async validateUser(email: string, password: string): Promise<IUser> {
  //   return this.usersService.validateUser(email, password);
  // }

  async validateUser(email: string, password: string): Promise<IUser> {
    const user = await this.usersService.findByEmail(email);
    const comparedPassword = await comparePassword(password, user.password);
    console.log(comparedPassword);
    if (user && comparedPassword) {
      return user;
    }
    return null;
  }

  async generateJwt(user: IUser) {
    const payload = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
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
    return { access_token, refresh_token };
  }

  async register(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  async login(user: IUser) {
    const { access_token, refresh_token } = await this.generateJwt(user);
    const userId = user.id;
    console.log(userId);
    console.log(user);
    const token: Token | null | undefined = await this.tokenService.findByUserId(userId);
    console.log(token.userId);
    if (token) {
      await this.tokenService.updateByUserId(userId, {
        refreshToken: refresh_token,
      });
    } else {
      await this.tokenService.create({
        userId: userId,
        refreshToken: refresh_token,
      });
    }
    return {
      user: user,
      userId: user._id,
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }

  async logout(user: IUser) {
    await this.tokenService.deleteByUserId(user._id);
  }
}
