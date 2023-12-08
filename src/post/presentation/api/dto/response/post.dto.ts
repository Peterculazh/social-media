import { ApiProperty } from '@nestjs/swagger';

export class PostResponseDto {
    @ApiProperty({
        example: 'My first post',
        description: 'The title of the post',
    })
    title: string;

    @ApiProperty({
        example: 'This is the content of my first post',
        description: 'The content of the post',
    })
    content: string;

    @ApiProperty({
        example: 'some id',
        description: 'The id of the author',
    })
    authorId: string;

    @ApiProperty({
        example: '2021-01-01T00:00:00.000Z',
        description: 'The date when the post was created',
    })
    createdAt: Date;

    @ApiProperty({
        example: '2021-01-01T00:00:00.000Z',
        description: 'The date when the post was last time updated',
    })
    updatedAt: Date;
}
