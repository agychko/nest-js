import { ApiProperty } from '@nestjs/swagger';

export class CreateTokenDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  refreshToken: string;
}
