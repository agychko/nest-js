import { ApiProperty } from "@nestjs/swagger";

export class CreatePointDto {
    @ApiProperty()
    value: number;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    lessonId: string;
}