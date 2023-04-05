import { MongooseModule } from "@nestjs/mongoose";
import { Point, PointSchema } from "./schemas/points.schema";
import { Module } from "@nestjs/common";
import { PointsController } from "./points.controller";
import { PointsRepository } from "./points.repository";
import { PointsService } from "./points.service";

@Module({
imports: [
    MongooseModule.forFeature([{name: Point.name, schema: PointSchema}]),
],
controllers: [PointsController],
providers: [PointsRepository, PointsService],
exports: [PointsService]
})
export class PointsModule {}