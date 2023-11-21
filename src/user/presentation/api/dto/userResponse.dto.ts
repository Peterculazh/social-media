import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
    @ApiProperty({ example: 'ca9ab97e-2a5e-45fc-a030-40be7a08dfe6', description: 'The id of the user' })
    id: string;
    @ApiProperty({ example: 'John_doe', description: 'The nickname of the user' })
    nickname: string;
    @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
    email: string;
    @ApiProperty({ example: '2021-09-05T19:00:00.000Z', description: 'The date of creation of the user' })
    createdAt: Date;
    @ApiProperty({ example: '2021-09-06T19:00:00.000Z', description: 'The date of latest update of the user' })
    updatedAt: Date;
}
