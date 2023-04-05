import { Injectable } from "@nestjs/common";
import { Lesson } from "./schemas/lessons.schema";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { LessonsRepository } from "./lessons.repository";

@Injectable()
export class LessonService {
    constructor(private readonly lessonsRepository: LessonsRepository) {}

    async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
        return this.lessonsRepository.create(createLessonDto);
    }

    async findAll(): Promise<Lesson[]> {
        return this.lessonsRepository.findAll();
    }

    async updateById(_id: string, updateLessonDto: UpdateLessonDto ): Promise<Lesson> {
        return this.lessonsRepository.updateById(_id, updateLessonDto);
    }
}