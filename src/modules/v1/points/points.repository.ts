import { Model } from "mongoose";
import { Point, PointDocument } from "./schemas/points.schema";
import { CreatePointDto } from "./dto/create-point.dto"
import { InjectModel } from "@nestjs/mongoose";

export class PointsRepository {
    constructor(@InjectModel(Point.name) private pointModel: Model<PointDocument>) {}

    async create(createPointDto: CreatePointDto): Promise<Point> {
        const createdPoint = new this.pointModel(createPointDto);
        return createdPoint.save();
    }

    async findAll(): Promise<Point[]> {
        return this.pointModel.find().exec();
    }
}