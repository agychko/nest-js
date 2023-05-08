import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTokenDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  refreshToken: string;
}