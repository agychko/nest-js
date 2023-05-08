import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from '../tokens/schemas/tokens.schema';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AccessJwtStrategy } from './strategies/access-jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants/constants';
import { AuthController } from './auth.controller';
import { UsersController } from '../users/users.controller';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { User, UserSchema } from '../users/schemas/users.schema';
import { TokensService } from '../tokens/tokens.service';
import { TokensController } from '../tokens/tokens.controller';
import { TokensRepository } from '../tokens/tokens.repository';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      // secret: jwtConstants.secret,
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [
    AuthController,
    UsersController,
    TokensController
  ],
  providers: [
    AuthService,
    TokensService,
    LocalStrategy,
    AccessJwtStrategy,
    RefreshJwtStrategy,
    UsersService,
    UsersRepository,
    TokensRepository
  ],
  exports: [AuthService, UsersService, TokensService],
})
export class AuthModule { }
