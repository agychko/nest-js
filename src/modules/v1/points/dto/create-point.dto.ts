import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePointDto {
    @ApiProperty()
    value: number;

    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsString()
    lessonId: string;
}