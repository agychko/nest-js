import { PartialType, OmitType } from "@nestjs/swagger";

import { CreateLessonDto } from "./create-lesson.dto";

export class UpdateLessonDto extends PartialType(
    CreateLessonDto
) {}