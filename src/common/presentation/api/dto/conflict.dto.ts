import { ApiProperty } from '@nestjs/swagger';
import { IErrorResponse } from '../interfaces/error-response.interface';

export class ConflictDto implements IErrorResponse {
    @ApiProperty({
        example: 409,
        description: 'The status code of the error',
    })
    statusCode: number;

    @ApiProperty({
        example: 'Already exists',
        description: 'The name of the error',
    })
    message: string;

    @ApiProperty({
        example: '2021-01-01T00:00:00.000Z',
        description: 'The timestamp of the error',
    })
    timestamp?: string;

    @ApiProperty({
        example: '/api/v1/auth/register',
        description: 'The path of the error',
    })
    path?: string;
}
