import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePointDto } from "./dto/create-point.dto";
import { PointsRepository } from "./points.repository";
import { Point } from "./schemas/points.schema";

@Injectable()
export class PointsService {
    constructor(private readonly pointsRepository: PointsRepository) { }

    async create(createPointDto: CreatePointDto) {
        return this.pointsRepository.create(createPointDto);
    }

    async findAll(): Promise<Point[]> {
        const pointsData = await this.pointsRepository.findAll();
        if (!pointsData || pointsData.length === 0) {
            throw new NotFoundException(`Points not found!`)
        }
        return pointsData;
    }
}