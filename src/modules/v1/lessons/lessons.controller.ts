import { Controller, Body, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LessonService } from "./lessons.service";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { Lesson } from "./schemas/lessons.schema";

@ApiTags('Lessons')
@Controller('v1/lessons')
export class LessonsController {
    constructor(private readonly lessonsService: LessonService) {}

    @Post('create')
    async create(@Body() createLessonDto: CreateLessonDto) {
        await this.lessonsService.create(createLessonDto);
    }

    @Get()
    async findAll(): Promise<Lesson[]> {
        return this.lessonsService.findAll();
    }
}