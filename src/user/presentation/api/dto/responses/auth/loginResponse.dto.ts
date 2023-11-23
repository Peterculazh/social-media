import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ description: 'The access token of the user' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh token' })
  refreshToken: string;
}
