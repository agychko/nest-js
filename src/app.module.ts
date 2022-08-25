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
