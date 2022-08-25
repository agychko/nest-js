import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/users_db'),
    UsersModule,
    AuthModule,
  ],
  // controllers: [AuthController],
})
export class V1Module {}
