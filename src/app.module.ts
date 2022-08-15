import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { V1Module } from './modules/v1/v1.module';
import { AppService } from './app.service';

@Module({
  imports: [V1Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UsersModule } from './modules/v1/users/users.module';

// @Module({
//   imports: [
//     MongooseModule.forRoot('mongodb://localhost:27017/users_db'),
//     UsersModule,
//   ],
// })
// export class AppModule {}
