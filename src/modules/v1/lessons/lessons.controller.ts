import { Controller, Body, Get, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LessonService } from "./lessons.service";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { Lesson } from "./schemas/lessons.schema";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags('Lessons')
@Controller('v1/lessons')
export class LessonsController {
    constructor(private readonly lessonsService: LessonService) { }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() createLessonDto: CreateLessonDto) {
        await this.lessonsService.create(createLessonDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<Lesson[]> {
        return this.lessonsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post('update')
    async updateById(
        @Body('_id') _id: string,
        @Body() updateLessonDto: UpdateLessonDto,
    ): Promise<Lesson> {
        return this.lessonsService.updateById(_id, updateLessonDto);
    }
}