import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { PointsService } from "./points.service";
import { ApiTags } from "@nestjs/swagger";
import { CreatePointDto } from "./dto/create-point.dto";
import { Point } from "./schemas/points.schema";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags('Points')
@Controller('v1/points')
export class PointsController {
    constructor(private readonly pointsService: PointsService) { }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() createPointDto: CreatePointDto) {
        return this.pointsService.create(createPointDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<Point[]> {
        return this.pointsService.findAll();
    }
}