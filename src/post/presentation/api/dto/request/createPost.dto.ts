import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @ApiProperty({
        example: 'My first post',
        description: 'The title of the post',
    })
    title: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(15)
    @ApiProperty({
        example: 'This is the content of my first post',
        description: 'The content of the post',
    })
    content: string;
}
