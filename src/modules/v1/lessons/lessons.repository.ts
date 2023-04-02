import { Model } from "mongoose";
import { Lesson, LessonDocument } from "./schemas/lessons.schema";
import { CreateLessonDto } from "./dto/create-lesson.dto";
// import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { InjectModel } from "@nestjs/mongoose";

export class LessonsRepository {
    constructor(@InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>) {}

    async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
        const createdLesson = new this.lessonModel(createLessonDto);
        return createdLesson.save();
    }

    async findAll(): Promise<Lesson[]> {
        return this.lessonModel.find({}, null, {sort:{dateTime:1}}).exec();
    }
}