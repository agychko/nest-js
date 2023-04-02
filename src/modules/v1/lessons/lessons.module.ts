import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LessonsController } from "./lessons.controller";
import { LessonService } from "./lessons.service";
import { LessonsRepository } from "./lessons.repository";
import { Lesson, LessonSchema } from "./schemas/lessons.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }])
    ],
    controllers: [LessonsController],
    providers: [LessonService, LessonsRepository],
    exports: [LessonService],
})
export class LessonsModule {}