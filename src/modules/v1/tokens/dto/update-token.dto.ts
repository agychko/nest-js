
import { PartialType, OmitType } from "@nestjs/swagger";

import { CreateTokenDto } from "./create-token.dto";

export class UpdateTokenDto extends PartialType(
  OmitType(CreateTokenDto, ['userId'] as const),
) { }
