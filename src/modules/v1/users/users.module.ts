import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/users.schema';
import { UsersRepository } from './users.repository';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AccessJwtStrategy } from '../auth/strategies/access-jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      // secret: jwtConstants.secret,
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UsersController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard
    // },
    UsersRepository,
    UsersService
  ],
  exports: [UsersService],
})
export class UsersModule { }
