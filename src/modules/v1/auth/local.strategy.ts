import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(fullName: string, email: string): Promise<any> {
    const user = await this.authService.validateUser(fullName, email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
