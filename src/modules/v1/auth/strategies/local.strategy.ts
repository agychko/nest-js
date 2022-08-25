import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '../../users/schemas/users.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'fullName',
      passwordField: 'email',
    });
  }

  async validate(fullName: string, email: string): Promise<User> {
    const user = await this.authService.validateUser(fullName, email);
    if (!user) {
      throw new UnauthorizedException({ message: '////User not found' });
    }
    return user;
  }
}
