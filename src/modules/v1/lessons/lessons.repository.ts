import { Model } from "mongoose";
import { Lesson, LessonDocument } from "./schemas/lessons.schema";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { InjectModel } from "@nestjs/mongoose";

export class LessonsRepository {
    constructor(@InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>) {}

    async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
        const createdLesson = new this.lessonModel(createLessonDto);
        return createdLesson.save();
    }

    async findAll(): Promise<Lesson[]> {
        return this.lessonModel.find().exec();
    }

    async updateById(
        _id: string, 
        updateLessonDto: UpdateLessonDto,
        ): Promise<Lesson> {
        const updatedLesson = this.lessonModel.findOneAndUpdate(
            { _id: _id }, 
            updateLessonDto,
            { new: true },
            ).exec();
        return updatedLesson;
    }
}