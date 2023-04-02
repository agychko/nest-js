import { ApiProperty } from "@nestjs/swagger";

export class CreateLessonDto {
    @ApiProperty()
    dateTime: Date;

    @ApiProperty()
    contents: string;

    @ApiProperty()
    homeTask: string;
}