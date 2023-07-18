import { Injectable, NotFoundException } from "@nestjs/common";
import { Lesson } from "./schemas/lessons.schema";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { LessonsRepository } from "./lessons.repository";

@Injectable()
export class LessonService {
    constructor(private readonly lessonsRepository: LessonsRepository) { }

    async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
        return this.lessonsRepository.create(createLessonDto);
    }

    async findAll(): Promise<Lesson[]> {
        const lessonsData = await this.lessonsRepository.findAll();
        if (!lessonsData || lessonsData.length === 0) {
            throw new NotFoundException(`Lessons not found!`)
        }
        return lessonsData;
    }

    async updateById(_id: string, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
        const exsistingLesson = await this.lessonsRepository.updateById(_id, updateLessonDto);
        if (!exsistingLesson) {
            throw new NotFoundException(`Lesson with id: ${_id} not exsist!`)
        }
        return exsistingLesson;
    }
}