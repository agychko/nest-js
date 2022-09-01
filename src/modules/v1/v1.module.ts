import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/app'),
    // MongooseModule.forRoot('mongodb://localhost:27017/app'),
    UsersModule,
    AuthModule,
  ],
})
export class V1Module {}
