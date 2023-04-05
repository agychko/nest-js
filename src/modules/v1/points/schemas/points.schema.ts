import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from "mongoose";

export type PointDocument = Point & Document;

@Schema()

export class Point {
    @Prop()
    value: number;
    @Prop({ required: true })
    userId: string;
    @Prop({ required: true })
    lessonId: string;
}
export const PointSchema = SchemaFactory.createForClass(Point);