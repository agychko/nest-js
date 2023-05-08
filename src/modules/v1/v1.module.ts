import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LessonsModule } from './lessons/lessons.module';
import { PointsModule } from './points/points.module';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/app'),
    // MongooseModule.forRoot(
    //   'mongodb+srv://User:usergmail.com@cluster0.wozxehz.mongodb.net/test',
    // ),
    UsersModule,
    TokensModule,
    AuthModule,
    LessonsModule,
    PointsModule
  ],
})
export class V1Module { }
