import { Body, Controller, Get, Post } from "@nestjs/common";
import { PointsService } from "./points.service";
import { ApiTags } from "@nestjs/swagger";
import { CreatePointDto } from "./dto/create-point.dto";
import { Point } from "./schemas/points.schema";

@ApiTags('Points')
@Controller('v1/points')
export class PointsController {
    constructor(private readonly pointsService: PointsService) {}

    @Post('create')
    async create(@Body() createPointDto: CreatePointDto) {
        return this.pointsService.create(createPointDto);
    }

    @Get()
    async findAll(): Promise<Point[]> {
       return this.pointsService.findAll(); 
    }
}