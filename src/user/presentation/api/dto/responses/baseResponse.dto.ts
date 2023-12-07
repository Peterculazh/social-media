import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto {
    @ApiProperty({ example: true, description: 'The status of the response' })
    success: boolean;

    @ApiProperty({
        example: 'The request was successful',
        description: 'The message of the response',
    })
    message?: string;
}
